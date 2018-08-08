const SomeMDXComponent = ({
  components,
  ...props
}) => <MDXTag name="wrapper" components={components}><MDXTag name="h2" components={components}>{`This is some MDX source`}</MDXTag>
  <SomeComponent />
  <MDXTag name="p" components={components}><MDXTag name="del" components={components} parentName="p">{`strikethrough`}</MDXTag></MDXTag></MDXTag>;