<template>
  <h1>domApp测试</h1>
  <div>
    <p @click="handleClick"> 点我{{cnt}}</p> 
  </div> 
</template>
<script setup>
import {ref} from 'vue' 
const cnt = ref(0)
  const handleClick = () =>  {
        console.log("") 
      cnt.value++
    }
</script>