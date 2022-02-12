<script>
export default {
  name: 'ErrorLayout',
  created() {
    this.$router.push('/')
  }
}
</script>

<template>
  <b-container class="error">
    404
  </b-container>
</template>

<style lang="scss" scoped>
</style>