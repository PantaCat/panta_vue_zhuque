<template>
  <div className="home">
    <ArrangeProject />
  </div>
</template>

<script>
// @ is an alias to /src
import ArrangeProject from '@/components/ArrangeProject.vue'

export default {
  name: 'ArrangeView',
  components: {
    ArrangeProject
  }
}
</script>
