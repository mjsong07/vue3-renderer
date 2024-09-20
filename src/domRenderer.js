import { createRenderer } from '@vue/runtime-core'
 
const { createApp: originCa } = createRenderer({
  
  createElement(tag) {
    return document.createElement(tag)
  },
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  },
  setElementText(el, text) {
    el.textContent = text
  },
  createText(text) {
    return document.createTextNode(text)
  },
  patchProp(el, key, prevValue, nextValue) {
    if (key.startsWith('on')) {
      // 处理事件绑定
      const eventName = key.slice(2).toLowerCase()
      if (prevValue) {
        el.removeEventListener(eventName, prevValue)
      }
      el.addEventListener(eventName, nextValue)
    } else {
      if (nextValue === null || nextValue === undefined) {
        el.removeAttribute(key)
      } else {
        el.setAttribute(key, nextValue)
      }
    }
  },
  remove(el) {
    const parent = el.parentNode
    if (parent) {
      parent.removeChild(el)
    }
  },

  parentNode(node) {
    return node.parentNode
  },
  nextSibling(node) {
    return node.nextSibling
  }


})

function createApp(...args) {
  const app = originCa(...args)
  return {
    mount(selector) {  
      const div  = document.createElement('div') 
      document.querySelector(selector).appendChild(div) 
      app.mount(div)
    },
  }
}
export { createApp }
