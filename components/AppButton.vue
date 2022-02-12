<script>
export default {
  name: 'AppButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    click: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<template>
  <button
    :type="type"
    :size="size"
    :disabled="disabled"
    class="app-button"
    @click="$emit('click')"
  >
    {{ text }}  
  </button>
</template>

<style lang="scss" scoped>
.app-button {
  border: none;
  border-radius: .4rem;
  transition: .2s all;
  font-weight: var(--medium-weight);
  &[type="primary"] {
    background-color: var(--green-color);
    color: var(--white-color);
  }
  &[type="secondary"] {
    background-color: transparent;
    border: 1px solid var(--light-blue-color);
    color: var(--light-blue-color);
  }
  &[type="danger"] {
    background-color: var(--red-color);
    color: var(--white-color);
  }
  &[size="sm"] {
    padding: .5rem 1rem;
    font-size: var(--fs-8);
  }
  &[size="md"] {
    padding: .6rem 1rem;
    font-size: var(--fs-10);
  }
  &[size="lg"] {
    padding: .8rem 2rem;
    font-size: var(--fs-14);
  }
  &:hover {
    transform: scale(1.04);
  }
}
</style>