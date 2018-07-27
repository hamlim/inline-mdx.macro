import { inline, imports } from 'inline-mdx.macro'
imports()

const SomeMDXComponent = inline`

## This is some MDX source

<SomeComponent />

import Foo from './foo';
import Another from './another';

~~strikethrough~~
`
