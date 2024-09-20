import { createRenderer } from '@vue/runtime-core'

// 创建canvas上下文
let ctx
function draw(ele, isChild) {
  if (!isChild) {
    ctx.clearRect(0, 0, 500, 500)
  }
  ctx.fillStyle = ele.fill || 'white'
  if (ele.isShow !== false) {
    ctx.fillRect(...ele.pos)
    if (ele.text) {
      ctx.fillStyle = ele.color || 'white'
      ele.fontSize = ele.type == 'h1' ? 20 : 12
      ctx.font = (ele.fontSize || 18) + 'px serif'
      ctx.fillText(ele.text, ele.pos[0] + 10, ele.pos[1] + ele.fontSize)
    }
  }

  ele.child &&
    ele.child.forEach((c) => {
      console.log('ele.child', c)
      draw(c, true)
    })
}

const { createApp: originCa } = createRenderer({
  createElement(type) {
    return {
      type,
    }
  },

  patchProp(el, key, prev, next) {
    el[key] = next
  },
  insert: (child, parent, anchor) => {
    console.log('child,parent', child, parent)
    if (typeof child == 'string') {
      parent.text = child
    } else {
      child.parent = parent
      if (!parent.child) {
        parent.child = [child]
      } else {
        parent.child.push(child)
      }
    }
    if (parent.nodeName) {
      draw(child)
      if (child.onClick) {
        ctx.canvas.addEventListener(
          'click',
          () => {
            //这里把canvas的点击事件委托给了 dom 的click
            child.onClick()
            setTimeout(() => {
              draw(child)
            })
          },
          false
        )
      }
    }
  },
  remove(el, parent) {},
  setElementText(node, text) {
    node.text = text
  },
  createText() {
    // Canvas不需要文本节点
  },
  parentNode(node) {
    // Canvas没有父子关系
  },
  nextSibling(node) {
    // 同上
  },
})

function createApp(...args) {
  const app = originCa(...args)
  return {
    mount(selector) {
      const canvas = document.createElement('canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      document.querySelector(selector).appendChild(canvas)
      ctx = canvas.getContext('2d')
      app.mount(canvas)
    },
  }
}
export { createApp }
