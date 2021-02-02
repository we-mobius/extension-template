console.log('chrome:', chrome)
// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
// chrome.runtime.onInstalled.addListener(function () {

// })

// https://developer.chrome.com/docs/extensions/reference/contextMenus
chrome.contextMenus.create({
  id: 'load',
  type: 'normal',
  title: 'Load extension on this page',
  contexts: ['page']
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const { menuItemId } = info
  if (menuItemId === 'load') {
    const message = { contextMenus: [{ id: 'load', type: 'normal' }] }
    console.log('background sends:', message)
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, message)
    })
  }
})

// https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('background receives:', message, sender, sendResponse)
})
