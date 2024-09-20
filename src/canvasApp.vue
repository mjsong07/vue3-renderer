<template>
  <div @click="setName('yyyy')" :pos="[10,10,300,300]" fill="#eee">
      <h1 :pos="[20,20,200,100]" fill="red" color="#000">counter :{{count}}</h1>
      <span :pos="pos" fill="black" >hi {{name}}</span>
      <span :isShow="isShow" :pos="[210,10,50,50]" :fill="color" >2222</span>
  </div>
  </template>
  <script setup>
  import {ref} from 'vue'
  const name = ref('xxxxx')
  const color = ref('blue')
  const isShow = ref(true)
  const pos = ref([20,120,200,100])
  const count = ref(1)

  const setName = (n)=>{
    name.value = n
    pos.value[1]+=20
    count.value+=1
    color.value = 'green'
    isShow.value = !isShow.value
  }
  </script>