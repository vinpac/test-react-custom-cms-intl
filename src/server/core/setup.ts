import { resolve } from 'path'

// @ts-ignore
import { setConfig } from 'next/config'

// @ts-ignore
const config = __non_webpack_require__(resolve('next.config.js'))
setConfig(config)
