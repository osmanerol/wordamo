<script>
export default {
  name: 'InfoModal',
}
</script>

<template>
  <b-modal 
    id="info-modal" 
    :title="$t('infoModalTitle')"
    centered
    size="md"
    hide-footer
    no-stacking
    no-close-on-backdrop
  >
    <p>{{ $t('infoModalText') }}</p>
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
      color: var(--white-color);
    }
  }
}
</style>