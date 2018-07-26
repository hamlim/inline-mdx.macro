const { createMacro } = require('babel-plugin-macros')
const mdx = require('@mdx-js/mdx')
const jsxSyntax = require('babel-plugin-syntax-jsx')

module.exports = createMacro(inlineMDX)

function inlineMDX({ references, babel, state }) {
  const { types: t } = babel
  const { inline = [] } = references
  inline.forEach(reference => {
    const funcName = reference.parentPath.parent.id.name
    let rawCode = reference.parent.quasi.quasis[0].value.raw
    let transformedFunction = mdx.sync(rawCode).replace('export default', '')
    let { ast, code } = babel.transform(
      `const ${funcName} = ${transformedFunction}`,
      {
        plugins: [jsxSyntax],
        ast: true,
      },
    )
    reference.parentPath.replaceWith(
      t.arrowFunctionExpression(
        [
          t.objectPattern([
            t.objectProperty(
              t.identifier('components'),
              t.identifier('components'),
              false,
              // set shorthand to true, otherwise it generates
              // ({ components: components })
              true,
            ),
          ]),
        ],
        // :its_fine_dog:
        ast.program.body[0].declarations[0].init.body,
      ),
    )
  })
}
