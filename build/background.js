/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

try {
  // Copyright (c) 2012 The Chromium Authors. All rights reserved.
  // Use of this source code is governed by a BSD-style license that can be
  // found in the LICENSE file.
  // The onClicked callback function.
  chrome.contextMenus.onClicked.addListener(function onClickHandler(info, tab) {
    if (info.menuItemId === 'xixi') {
      // 注意不能使用location.href，因为location是属于background的window对象
      console.log(info);
      chrome.tabs.create({
        url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(info.selectionText)
      });
    }

    if (info.menuItemId == 'radio1' || info.menuItemId == 'radio2') {
      console.log('radio item ' + info.menuItemId + ' was clicked (previous checked state was ' + info.wasChecked + ')');
    } else if (info.menuItemId == 'checkbox1' || info.menuItemId == 'checkbox2') {
      console.log(JSON.stringify(info));
      console.log('checkbox item ' + info.menuItemId + ' was clicked, state is now: ' + info.checked + ' (previous state was ' + info.wasChecked + ')');
    } else {
      console.log('item ' + info.menuItemId + ' was clicked');
      console.log('info: ' + JSON.stringify(info));
      console.log('tab: ' + JSON.stringify(tab));
    }
  }); // Set up context menu tree at install time.

  chrome.runtime.onInstalled.addListener(function () {
    // Create one test item for each context type.
    var contexts = ['page', 'selection', 'link', 'editable', 'image', 'video', 'audio'];

    for (var i = 0; i < contexts.length; i++) {
      var context = contexts[i];
      var title = "Test '" + context + "' menu item";
      var id = chrome.contextMenus.create({
        title: title,
        contexts: [context],
        id: 'context' + context
      });
      console.log("'" + context + "' item:" + id);
    } // Create a parent item and two children.


    chrome.contextMenus.create({
      title: 'Test parent item',
      id: 'parent'
    });
    chrome.contextMenus.create({
      title: 'Child 1',
      parentId: 'parent',
      id: 'child1'
    });
    chrome.contextMenus.create({
      title: 'Child 2',
      parentId: 'parent',
      id: 'child2'
    });
    console.log('parent child1 child2'); // Create some radio items.

    chrome.contextMenus.create({
      title: 'Radio 1',
      type: 'radio',
      id: 'radio1'
    });
    chrome.contextMenus.create({
      title: 'Radio 2',
      type: 'radio',
      id: 'radio2'
    });
    console.log('radio1 radio2'); // Create some checkbox items.

    chrome.contextMenus.create({
      title: 'Checkbox1',
      type: 'checkbox',
      id: 'checkbox1'
    });
    chrome.contextMenus.create({
      title: 'Checkbox2',
      type: 'checkbox',
      id: 'checkbox2'
    });
    console.log('checkbox1 checkbox2'); // Intentionally create an invalid item, to show off error checking in the
    // create callback.

    console.log('About to try creating an invalid item - an error about ' + 'duplicate item child1 should show up');
    chrome.contextMenus.create({
      title: 'Oops',
      id: 'child10'
    }, function () {
      if (chrome.extension.lastError) {
        console.log('Got expected error: ' + chrome.extension.lastError.message);
      }
    });
  });
  chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
      id: 'sampleContextMenu',
      title: 'Sample Context Menu',
      contexts: ['selection']
    });
  });
  chrome.contextMenus.create({
    id: 'xixi',
    title: '使用度娘搜索：%s',
    // %s表示选中的文字
    contexts: ['selection'] // 只有当选中文字时才会出现此右键菜单

  });
} catch (err) {
  console.log(err);
}

/***/ })

/******/ });
//# sourceMappingURL=background.js.map