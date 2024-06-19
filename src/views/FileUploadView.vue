<template>
  <div className="home">
    <keep-alive>
      <component :is="FileUploadProject"/>
    </keep-alive>
  </div>
</template>

<script setup>
import {defineAsyncComponent} from "vue";
const FileUploadProject = defineAsyncComponent(()=>{ return import('@/components/FileUploadProject.vue')})

</script>
