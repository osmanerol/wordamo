<script>

export default {
  name: 'ChangeLanguageModal',
  props: {
    accept: {
      type: Function,
      default: () => { }
    }
  },
  methods: {
    closeModal() {
      this.$bvModal.hide('change-language-modal')
    },
    acceptModal() {
      this.$emit('accept')
      this.closeModal()
    }
  }
}
</script>

<template>
  <b-modal 
    id="change-language-modal" 
    :title="$t('changeLangaugeModalTitle')"
    centered
    size="md"
    hide-footer
    no-stacking
    no-close-on-backdrop
  >
    <p>{{ $t('changeLangaugeModalText') }}</p>
    <div class="buttons">
      <app-button
        :text="$t('dontChange')"
        type="secondary"
        size="sm"
        @click="closeModal"
      />
      <app-button
        :text="$t('change')"
        type="primary"
        size="sm"
        @click="acceptModal"
      />
    </div>
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
        .buttons {
          display: flex;
          gap: 1rem;
        }
      }
    }
    .close {
      color: var(--white-color);
    }
  }
}
</style>