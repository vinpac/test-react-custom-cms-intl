import { setAddon, configure } from '@storybook/react'
import infoAddon, {
  setDefaults as setInfoAddonDefaults,
} from '@storybook/addon-info'
import './storybook.css'
import '../.dist/static/_index.css'

// automatically import all files ending in *.stories.js
const sourceDirReq = require.context(
  '../src/components',
  true,
  /\.stories\.tsx?$/,
)
const storiesDirReq = require.context('../stories', true, /\.stories\.tsx?$/)
function loadStories() {
  sourceDirReq.keys().forEach(filename => sourceDirReq(filename))
  storiesDirReq.keys().forEach(filename => storiesDirReq(filename))
}

setInfoAddonDefaults({
  inline: true,
  styles: {
    header: {
      h1: {
        fontFamily: 'Roboto, Helvetica, sans-serif',
        fontSize: '35px',
        marginBottom: '10px',
      },
      h2: {
        fontFamily: 'Roboto, Helvetica, sans-serif',
        fontSize: '24px',
        fontWeight: 'normal',
        color: '#444',
      },
      body: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    infoContent: {
      borderTop: '1px solid #eee',
      paddingTop: '20px',
    },
    infoBody: {
      padding: '0',
      borderWidth: '0',
      lineHeight: '1.5',
      boxShadow: 'none',
    },
    source: {
      h1: {
        fontFamily: 'Roboto, Helvetica, sans-serif',
        fontSize: '25px',
        marginBottom: '10px',
      },
      code: {
        background: '#900',
      },
    },
    propTableHead: {
      fontFamily: 'Roboto, Helvetica, sans-serif',
      margin: '20px 0',
      marginRight: '20px',
      fontSize: '24px',
      fontWeight: 'normal',
      color: '#444',
    },
  },
})
setAddon(infoAddon)
configure(loadStories, module)
