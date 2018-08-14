# `inline-mdx.macro`

[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

[![npm version](https://img.shields.io/badge/npm-0.2.5-brightgreen.svg)](https://github.com/hamlim/inline-mdx.macro)

A babel-macro for converting mdx into an inline component.

```js
import { inline } from 'inline-mdx.macro'
import { MDXTag } from '@mdx-js/tag'

const SomeMDXComponent = inline`

## This is some MDX source

<SomeComponent />

~~strikethrough~~
`
```

generates...

```js
const SomeMDXComponent = ({ components, ...props }) => (
  <MDXTag name="wrapper" components={components}>
    <MDXTag name="h2" components={components}>{`This is some MDX source`}</MDXTag>{' '}
    <SomeComponent />{' '}
    <MDXTag name="p" components={components}>
      <MDXTag
        name="del"
        components={components}
        parentName="p"
      >
        {`strikethrough`}
      </MDXTag>
    </MDXTag>
  </MDXTag>
)
```

### You can also use `import` inline as well

```js
import React from 'react'
import { inline, imports } from 'inline-mdx.macro'
imports()

const SomeMDXComponent = inline`

## This is some MDX source

<SomeComponent />

import Foo from './foo';
import Another from './another';

~~strikethrough~~
`
```

generates ...

```js
import Foo from './foo'
import Another from './another'

const SomeMDXComponent = ({ components, ...props }) => (
  <MDXTag name="wrapper" components={components}>
    <MDXTag
      name="h2"
      components={components}
    >{`This is some MDX source`}</MDXTag>
    <SomeComponent />
    <MDXTag name="p" components={components}>
      <MDXTag
        name="del"
        components={components}
        parentName="p"
      >{`strikethrough`}</MDXTag>
    </MDXTag>
  </MDXTag>
)
```

### Getting started

#### Set up an application

  Recommended setup - set up an application from scratch

  [yarn](https://yarnpkg.com/en/docs/cli/) or [npm](https://docs.npmjs.com/cli/install) can be used

  create a package.json file
  ```
    npm init

    yarn init
  ```

  install webpack and webpack-cli as dev dependencies
  ```
    npm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D

    yarn add webpack webpack-cli webpack-dev-server html-webpack-plugin -D
  ```

  add to package.json
  ```
    "scripts": {
      "start": "webpack-dev-server --mode development --open",
      "build": "webpack --mode production"
    },
  ```

  install and save react and react-dom
  ```
    npm i react react-dom

    yarn add react react-dom
  ```

  install and save the following dev dependencies
  ```
    npm i @babel/core babel-core@^7.0.0-0 babel-loader @babel/preset-env @babel/preset-react -D

    yarn add @babel/core babel-core@^7.0.0-0 babel-loader @babel/preset-env @babel/preset-react -D
  ```

  create a [webpack](https://webpack.js.org/guides/getting-started/#using-a-configuration) config. Example of a basic webpack config file:
  ```
    const HtmlWebPackPlugin = require("html-webpack-plugin");

    const htmlPlugin = new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    });

    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      },
      plugins: [htmlPlugin]
    };
  ```

  create a .babelrc file and add the following presets
  ```
    {
      "presets": ["@babel/preset-env", "@babel/preset-react"]
    }
  ```

#### Install and save the following dev dependencies
  ```
    npm i inline-mdx.macro babel-plugin-macros @mdx-js/tag -D

    yarn add inline-mdx-macro babel-plugin-macros @mdx-js/tag -D
  ```

#### Add [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/user.md) to your babel config file
  ```
    "plugins": [
      "babel-plugin-macros"
    ]
  ```

### TODO

_readme driven development 😆_

- [x] plugin that works for the default case
- [x] hoist imports somehow?
