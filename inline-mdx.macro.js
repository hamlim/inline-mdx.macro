const { createMacro } = require('babel-plugin-macros')
const mdx = require('@mdx-js/mdx')
const restSpreadSyntax = require('babel-plugin-syntax-object-rest-spread')
const jsxSyntax = require('babel-plugin-syntax-jsx')

module.exports = createMacro(inlineMDX)

function inlineMDX({ references, babel, state }) {
  const { types: t } = babel
  const { inline = [], imports = [] } = references
  let mdxImports = []
  inline.forEach(reference => {
    const funcName = reference.parentPath.parent.id.name
    let rawCode = reference.parent.quasi.quasis[0].value.raw
    let transformedFunction = mdx.sync(rawCode).replace('export default', '')
    transformedFunction = transformedFunction
      .split('\n')
      .map(line => {
        if (line.includes('import')) {
          mdxImports.push(line)
          return null
        } else {
          return line
        }
      })
      .filter(Boolean)
      .join('\n')
    let { ast, code } = babel.transform(
      `const ${funcName} = ${transformedFunction}`,
      {
        plugins: [jsxSyntax, restSpreadSyntax],
        ast: true,
      },
    )
    reference.parentPath.replaceWith(
      t.arrowFunctionExpression(
        [
          // build out a function argument that looks like
          // ({ components, ...props })
          t.objectPattern([
            t.objectProperty(
              t.identifier('components'),
              t.identifier('components'),
              false,
              // set shorthand to true, otherwise it generates
              // ({ components: components })
              true,
            ),
            // spread in props
            t.restElement(t.identifier('props')),
          ]),
        ],
        // :this_is_fine_dog:
        // ensure we grab the last function, in case babel
        // transforms the above code into more than one function
        ast.program.body[ast.program.body.length - 1].declarations[0].init.body,
      ),
    )
  })
  // Process any imports and add them where `imports` was called from
  imports.forEach(reference => {
    let { ast, code } = babel.transform(
      [`import {MDXTag} from '@mdx-js/tag'`].concat(mdxImports).join('\n'),
      {
        ast: true,
      },
    )
    reference.parentPath.replaceWithMultiple(
      ast.program.body.map(impNode => {
        return t.importDeclaration(impNode.specifiers, impNode.source)
      }),
    )
  })
}
