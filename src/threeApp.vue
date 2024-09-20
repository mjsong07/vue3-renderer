<template>
  <div
      camera="PerspectiveCamera"
      :cameraPos=cameraPos
      scene="Scene"
      :bgColor="bgColor"
      geometry="BoxGeometry"
      :geometryArg="[0.2,0.2,0.2]"
      material="MeshNormalMaterial"
      mesh="Mesh"
      :meshY="y"
      :meshX="x" 
  >
  </div> 
</template>
<script>
import {ref} from 'vue'
export default {
  setup(){ 
      const y = ref(0.3)
      const x = ref(0.3)  
      const bgColor = ref(0x000000)  
      const cameraPos = ref({z:1})  
      window.addEventListener('mousemove',function(e){
          y.value = e.clientX/500
          x.value = e.clientY/500
      }) 
      window.addEventListener('click',function(e){
        cameraPos.value.z = cameraPos.value.z + 0.5
        bgColor.value = 0x00b578
      }) 
      return {y,x,cameraPos,bgColor}
  }
}
</script>