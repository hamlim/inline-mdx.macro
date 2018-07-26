import {inline} from 'inline-mdx.macro'
import { MDXTag } from '@mdx-js/tag'

const SomeMDXComponent = inline`

## This is some MDX source

<SomeComponent />

~~strikethrough~~
`
