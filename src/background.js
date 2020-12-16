try {
// Copyright (c) 2012 The Chromium Authors. All rights reserved.
  // Use of this source code is governed by a BSD-style license that can be
  // found in the LICENSE file.

  // The onClicked callback function.

  chrome.contextMenus.onClicked.addListener(function onClickHandler (info, tab) {
    if (info.menuItemId === 'xixi') {
      // 注意不能使用location.href，因为location是属于background的window对象
      console.log(info)
      chrome.tabs.create({ url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(info.selectionText) })
    }
    if (info.menuItemId == 'radio1' || info.menuItemId == 'radio2') {
      console.log('radio item ' + info.menuItemId +
                ' was clicked (previous checked state was ' +
                info.wasChecked + ')')
    } else if (info.menuItemId == 'checkbox1' || info.menuItemId == 'checkbox2') {
      console.log(JSON.stringify(info))
      console.log('checkbox item ' + info.menuItemId +
                ' was clicked, state is now: ' + info.checked +
                ' (previous state was ' + info.wasChecked + ')')
    } else {
      console.log('item ' + info.menuItemId + ' was clicked')
      console.log('info: ' + JSON.stringify(info))
      console.log('tab: ' + JSON.stringify(tab))
    }
  })

  // Set up context menu tree at install time.
  chrome.runtime.onInstalled.addListener(function () {
  // Create one test item for each context type.
    var contexts = ['page', 'selection', 'link', 'editable', 'image', 'video',
      'audio']
    for (var i = 0; i < contexts.length; i++) {
      var context = contexts[i]
      var title = "Test '" + context + "' menu item"
      var id = chrome.contextMenus.create({
        title: title,
        contexts: [context],
        id: 'context' + context
      })
      console.log("'" + context + "' item:" + id)
    }

    // Create a parent item and two children.
    chrome.contextMenus.create({ title: 'Test parent item', id: 'parent' })
    chrome.contextMenus.create(
      { title: 'Child 1', parentId: 'parent', id: 'child1' })
    chrome.contextMenus.create(
      { title: 'Child 2', parentId: 'parent', id: 'child2' })
    console.log('parent child1 child2')

    // Create some radio items.
    chrome.contextMenus.create({
      title: 'Radio 1',
      type: 'radio',
      id: 'radio1'
    })
    chrome.contextMenus.create({
      title: 'Radio 2',
      type: 'radio',
      id: 'radio2'
    })
    console.log('radio1 radio2')

    // Create some checkbox items.
    chrome.contextMenus.create(
      { title: 'Checkbox1', type: 'checkbox', id: 'checkbox1' })
    chrome.contextMenus.create(
      { title: 'Checkbox2', type: 'checkbox', id: 'checkbox2' })
    console.log('checkbox1 checkbox2')

    // Intentionally create an invalid item, to show off error checking in the
    // create callback.
    console.log('About to try creating an invalid item - an error about ' +
      'duplicate item child1 should show up')
    chrome.contextMenus.create({ title: 'Oops', id: 'child10' }, function () {
      if (chrome.extension.lastError) {
        console.log('Got expected error: ' + chrome.extension.lastError.message)
      }
    })
  })

  chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
      id: 'sampleContextMenu',
      title: 'Sample Context Menu',
      contexts: ['selection']
    })
  })
  chrome.contextMenus.create({
    id: 'xixi',
    title: '使用度娘搜索：%s', // %s表示选中的文字
    contexts: ['selection']// 只有当选中文字时才会出现此右键菜单
  })
} catch (err) {
  console.log(err)
}
