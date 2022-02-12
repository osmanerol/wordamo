<script>
export default {
  name: 'AppLoading'
}
</script>

<template>
  <div class="app-loading">
    <b-spinner 
      variant="light" 
      type="grow" 
      label="Spinning"
    />
  </div>
</template>

<style lang="scss" scoped>
.app-loading {
  width: 100%;
  height: 100%;
  display: flex;justify-content: center;
  align-items: center;
}
</style>