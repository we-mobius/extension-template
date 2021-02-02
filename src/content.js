// https://developer.chrome.com/docs/extensions/mv3/content_scripts/
import {
  injectScript,
  globalVar, makeElementBasedMessageProxy
} from 'MobiusUtils'

console.log('[ContentJS] start...', chrome)
console.error(chrome)
globalVar('messageProxy', makeElementBasedMessageProxy(
  'kit4web-message-channel-proxy',
  'extension-message',
  'content'
))

globalVar('messageProxy').receive(mes => {
  console.log('[ContentJS] receives: ', mes.detail)
})

// chrome.runtime.sendMessage({ greeting: 'hello' })
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.error('content receives:', message, sender, sendResponse)
  injectScript(chrome.runtime.getURL('inject.js'), () => {
    console.log('[ContentJS] content injectScript callback')
  })
})

console.log('[ContentJS] executed!')
