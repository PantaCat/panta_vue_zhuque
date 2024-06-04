<template>
  <div className="home">
    <keep-alive>
      <component :is="ArrangeProject"/>
    </keep-alive>
  </div>
</template>

<script setup>
// @ is an alias to /src
import {defineAsyncComponent, onMounted} from "vue";
const ArrangeProject = defineAsyncComponent(()=>{ return import('../components/ArrangeProject.vue')})

</script>

<!--<script>-->
<!--import {defineAsyncComponent, onMounted} from "vue";-->
<!--export default {-->
<!--  setup() {-->
<!--    const ArrangeProject = defineAsyncComponent(()=>{ return import('../components/ArrangeProject.vue')});-->
<!--    return {-->
<!--      ArrangeProject-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--基础写法-->
<!--<template>-->
<!--  <div className="home">-->
<!--    <ArrangeProject />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// @ is an alias to /src-->
<!--import ArrangeProject from '@/components/ArrangeProject.vue'-->

<!--export default {-->
<!--  name: 'ArrangeView',-->
<!--  components: {-->
<!--    ArrangeProject-->
<!--  }-->
<!--}-->
<!--</script>-->
