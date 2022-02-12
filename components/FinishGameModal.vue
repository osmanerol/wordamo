<script>
export default {
  name: 'FinishGameModal',
  props: {
    restart: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    playAgain() {
      this.$bvModal.hide('finish-game-modal')
      this.$emit('restart')
    }
  }
}
</script>

<template>
  <b-modal 
    id="finish-game-modal" 
    :title="$t('finishGameModalTitle')"
    centered
    size="md"
    hide-footer
    no-stacking
    no-close-on-backdrop
  >
    <p class="mb-3">{{ $t('finishGameModalText') }}</p>
    <app-button
      :text="$t('playAgain')"
      type="primary"
      size="sm"
      @click="playAgain"
    />
  </b-modal>
</template>

<style lang="scss" scoped>
::v-deep .modal {
  margin: auto;
  .modal-dialog {
    max-width: 380px;
    margin: auto;
    .modal-header {
      border: none;
    }
    .modal-content {
      background-color: var(--dark-gray-color);
      color: var(--white-color);
      border-radius: 16px;
      .modal-body {
        padding: 1rem 1rem 1.5rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
    .close {
      display: none;
    }
  }
}
</style>