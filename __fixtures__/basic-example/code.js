/** @jsx mdx */
import {mdx} from '@mdx-js/react'
import { inline } from '../../inline-mdx.macro'

const SomeMDXComponent = inline`

## This is some MDX source

<SomeComponent />

~~strikethrough~~
`
