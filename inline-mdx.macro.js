const { createMacro } = require('babel-plugin-macros')
const mdx = require('@mdx-js/mdx')
const {
  default: restSpreadSyntax,
} = require('@babel/plugin-proposal-object-rest-spread')
const { default: jsxSyntax } = require('@babel/plugin-syntax-jsx')
const { parse } = require('@babel/parser')

module.exports = createMacro(inlineMDX)

function inlineMDX({ references, babel, state }) {
  const { types: t } = babel
  const { inline = [], imports = [] } = references
  inline.forEach(reference => {
    // Collect all imports from within the MDX string
    let mdxImports = []
    function importVisitor() {
      return {
        visitor: {
          ImportDeclaration(path) {
            // imports in mdx can sometimes include a comment, so we want to remove
            // them. Additionally, because we remove them below we also want to
            // clone them so we keep the reference
            mdxImports.push(t.removeComments(t.cloneNode(path.node)))
            path.remove()
          },
        },
      }
    }
    // Grab the raw mdx code
    let rawCode = reference.parent.quasi.quasis[0].value.raw
    // Transform mdx code
    let mdxCode = mdx.sync(rawCode)
    // collect imports here
    let { code } = babel.transform(mdxCode, {
      plugins: [jsxSyntax, restSpreadSyntax, importVisitor],
    })
    // replace export default
    code = code.replace('export default function', `function`)
    // replaceWithMultiple will wrap the ast in an iife, adding the `return`
    // before the last node, in this case we want to return the function MDXContent component
    code += `\nMDXContent`
    // transform the code back to an ast
    let ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', restSpreadSyntax],
    })
    // Replace the inline`` content with the ast above
    reference.parentPath.replaceWithMultiple(ast.program.body)
    // Insert any imports we encountered
    reference.hub.file.path.node.body.unshift(...mdxImports)
  })
}
