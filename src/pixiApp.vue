<template>
  <container>
      <sprite :x="x" :y="y" :texture="texture"></sprite>
      <text :fill="color" >点击我{{num}}</text>
    </container>
</template>
<script>
import {ref} from 'vue' 

export default {
  setup(){ 
      const y = ref(100)
      const x = ref(100)  
      const num = ref(0)  
      const color = ref(0x000000)  
      const texture = ref('https://pixijs.io/examples/examples/assets/bunny.png')  
      window.addEventListener('click', (e) => { //点击自动移动
        y.value =  y.value  + 3 
        x.value =  x.value  + 3
        color.value = 0xbbbbbb
        num.value++
      })
      return {y,x,texture,num,color}
  }
}
</script>