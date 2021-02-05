
import app from './lib/router'

import Home from './views/home'
import Missing from './views/missing'

// import * as subscriptions from './subscriptions'

app({
  state: {
    resize: {
      link: true,
      ratio: 4 / 3,
      width: 800,
      height: 600
    },
    clipboard: {
      copied: false
    }
  },
  pages: {
    '/': Home,
    '/missing': Missing
  },
  rewrites: {
    // '/detail': /^\/dp\/[0-9a-f]{24}$/i,
    // '/user': /^\/user\/\w+$/i
  },
  mount: (state, dispatch) => {
    // const gtmanager = subscriptions.gtmanager(state, dispatch)
    // gtmanager({ id: 'GTM-xxx' })

    window.resizeTo(480 + 16, 316 + 42)
  }
})

// Google Tag Manager
window.dataLayer = window.dataLayer || []
window.dataLayer.push({
  'gtm.start': Date.now(),
  'event': 'gtm.js'
})
