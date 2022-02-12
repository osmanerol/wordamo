<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppHeaderComponent',
  data() {
    return {
      selectedLanguage: null
    }
  },
  computed: {
    ...mapState([
      'gameStarted'
    ])
  },
  methods: {
    ...mapMutations([
      'setGameStarted'
    ]),
    showInfoModal() {
      this.$bvModal.show('info-modal')
    },
    changeLanguage(language) {
      this.selectedLanguage = language
      if(this.gameStarted) {
        this.$bvModal.show('change-language-modal')
      }
      else {
        this.acceptChangeLanguage(language)
      }
    },
    acceptChangeLanguage(language) {
      if(language) {
        this.$i18n.locale = language
      }
      else {
        this.$i18n.locale = this.selectedLanguage
        this.setGameStarted(false)
      }
      localStorage.setItem('language', this.$i18n.locale)
    }
  }
}
</script>

<template>
  <header class="header">
    <b-icon 
      icon="exclamation-circle-fill" 
      class="info-icon"
      @click="showInfoModal"
    />
    <h1 class="brand">WORDAMO</h1>
    <b-dropdown
      :text="$i18n.locale.toUpperCase()"
      right 
      no-caret
      variant="link"
      class="languages-dropdown"
    >
      <b-dropdown-item-button @click="changeLanguage('tr')">Türkçe</b-dropdown-item-button>
      <b-dropdown-item-button @click="changeLanguage('en')">English</b-dropdown-item-button>
    </b-dropdown>
    <change-language-modal 
      @accept="acceptChangeLanguage"
    />
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--dark-gray-color);
  padding: .5rem 0;
  .info-icon {
    color: var(--white-color);
    font-size: var(--fs-12);
    cursor: pointer;
  }
  .brand {
    color: var(--white-color);
    font-size: var(--fs-20);
    font-weight: var(--bold-weight);
    letter-spacing: .2rem;
    margin: 0;
  }
  .languages-dropdown ::v-deep {
    .dropdown-toggle {
      color: var(--white-color);
      padding: 0;
      font-size: var(--fs-12);
      font-weight: var(--bold-weight);
      text-decoration: none;
      outline: none;
      border: none;
      box-shadow: none;
    }
    .dropdown-menu {
      margin: 0;
      padding: 0; 
      min-width: 0;
      background-color: var(--dark-gray-color);
      li {
        .dropdown-item {
          color: var(--white-color);
          padding: .8rem 1rem;
          font-size: var(--fs-9);
          font-weight: var(--medium-weight);  
          transition: .2s all;
          &:hover {
            background-color: var(--dark-gray-color);
            color: var(--light-blue-color);
          }
        }
      }
    }
  }
}
</style>