import Foo from './foo';
import Another from './another';

/** @jsx mdx */
import { mdx } from '@mdx-js/react';

const SomeMDXComponent = function () {
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  /* @jsx mdx */


  const makeShortcode = name => function MDXDefaultShortcode(props) {
    console.warn("Component " + name + " was not imported, exported, or provided by MDXProvider as global scope");
    return <div {...props} />;
  };

  const SomeComponent = makeShortcode("SomeComponent");
  const layoutProps = {};
  const MDXLayout = "wrapper";

  function MDXContent(_ref) {
    let {
      components
    } = _ref,
        props = _objectWithoutProperties(_ref, ["components"]);

    return <MDXLayout {...layoutProps} {...props} components={components} mdxType="MDXLayout">
    <h2>{`This is some MDX source`}</h2>
    <SomeComponent mdxType="SomeComponent" />

    <p><del parentName="p">{`strikethrough`}</del></p>
    </MDXLayout>;
  }

  MDXContent.isMDXComponent = true;
  return MDXContent;
}();
