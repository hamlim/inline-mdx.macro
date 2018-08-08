const SomeMDXComponent = ({
  components
}) => {
  var components = _ref.components;
  return React.createElement(MDXTag, {
    name: "wrapper",
    components: components
  }, React.createElement(MDXTag, {
    name: "h2",
    components: components
  }, "This is some MDX source"), React.createElement(SomeComponent, null), React.createElement(MDXTag, {
    name: "p",
    components: components
  }, React.createElement(MDXTag, {
    name: "del",
    components: components,
    parentName: "p"
  }, "strikethrough")));
};