# `inline-mdx.macro`

[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

[![npm version](https://img.shields.io/badge/npm-1.0.0-brightgreen.svg)](https://github.com/hamlim/inline-mdx.macro)

A babel-macro for converting mdx into an inline component.

```js
/** @jsx mdx */
import { mdx } from '@mdx-js/react'
import { inline } from 'inline-mdx.macro'

const SomeMDXComponent = inline`

## This is some MDX source

<SomeComponent />

~~strikethrough~~
`
```

generates...

```js
/** @jsx mdx */
import { mdx } from '@mdx-js/react'
const SomeMDXComponent = ...;
// you can now do <SomeMDXComponent />
```

## ⚠️ Important! ⚠️

You must add the following to any file using the `inline` macro:

```js
/** @jsx mdx */
import { mdx } from '@mdx-js/react'
```

This ensures mdx picks up on the jsx code and renders it correctly.
