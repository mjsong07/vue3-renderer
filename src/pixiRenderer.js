import { createRenderer } from '@vue/runtime-core'

import * as PIXI from 'pixi.js';

console.log("PIXI",PIXI)
const { createApp: originCa } = createRenderer({
  createElement(type) {
    let element;

    switch (type) {
      case 'container':
        element = new PIXI.Container();
        break;
      case 'sprite':
        element = new PIXI.Sprite(PIXI.Texture.WHITE);  // 示例为白色纹理精灵
        break;
      case 'text':
        element = new PIXI.Text('Hello, Pixi!', { fill: 0x000000 });
        break;
      default:
        console.warn('Unknown element type:', type);
    }

    return element;
  },
  insert(el, parent) {
    console.log('insert', el, parent)
    if (parent instanceof PIXI.Container) {
      parent.addChild(el);
    } else {
      console.warn('Parent is not a PIXI.Container', parent);
    }
  },
  remove(el) {
    if (el.parent) {
      el.parent.removeChild(el);
    }
  },
  setElementText(el, text) {
    if (el instanceof PIXI.Text) {
      el.text = text;
    } else {
      console.warn('setElementText is not applicable for this element type');
    }
  },
  patchProp(el, key, prevValue, nextValue) {
    console.log("patchProp", el, key, prevValue, nextValue)
    if (key === 'x') {
      el.x = nextValue;
    } else if (key === 'y') {
      el.y = nextValue;
    } else if (key === 'texture') {
      el.texture = PIXI.Texture.from(nextValue);
    } else if (key === 'fill') {
      // 动态设置文字颜色
      if (el instanceof PIXI.Text) {
        el.style.fill = nextValue;
      }
    }
  },
  createText(text) {
    return new PIXI.Text(text);
  },
  parentNode(el) {
    return el.parent;
  },
  nextSibling(el) {
    return null; // Pixi 没有兄弟节点的概念
  },
  setScopeId() {},
  cloneNode() {},
  insertStaticContent() {},

})

function createApp(...args) {
  const app = originCa(...args)
  return {
    mount(selector) { 
      const pixi1 = new PIXI.Application({ width: 800, height: 600 ,backgroundColor:0xffff9d});  
      document.querySelector(selector).appendChild(pixi1.view) 
      app.mount(pixi1.stage)
    },
  }
}

export { createApp }
