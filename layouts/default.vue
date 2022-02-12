<script>
export default {
  name: 'DefaultLayout',
}
</script>

<template>
  <div class="app">
    <client-only>
      <b-container>
        <app-header />
        <main>
          <Nuxt />
        </main>
      </b-container>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  max-width: 540px;
  width: 100%;
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    main {
      flex: 1;
      padding-bottom: .5rem;
    }
  }
}  
</style>
