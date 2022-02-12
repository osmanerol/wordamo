<script>
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex' 
import trWords from '../constants/trWords'
import enWords from '../constants/enWords'

export default {
  name: 'IndexPage',
  data() {
    return {
      value: null,
      max: 10,
      letterCount: 5,
      wordSource: [],
      lastWords: [],
      lastWordIndexes: [],
      letterIndexes: [],
      timer: null,
      selectedWord: null,
      currentWord: null,
      renderedWord: [],
      showError: false,
      showCorrect: false,
    }
  },
  computed: {
    ...mapState([
      'gameStarted'
    ]),
    locale() {
      return this.$i18n.locale === 'tr' ? 'tr-TR' : 'en-US'
    },
    keyboard() {
      if(this.$i18n.locale === 'tr') {
        return [
          ['e', 'r', 't', 'y', 'u', 'ı', 'o', 'p', 'ğ', 'ü'],
          ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ş', 'i'],
          ['enter', 'z', 'c', 'v', 'b', 'n', 'm', 'ö', 'ç', 'sil']
        ]
      }
      else {
        return [
          ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
          ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
          ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete']
        ]
      }
    },
  },
  methods: {
    ...mapMutations([
      'setGameStarted'
    ]),
    findWordSource() {
      switch(this.$i18n.locale) {
        case 'tr':
          this.wordSource = [...trWords[5]]
          break
        case 'en':
          this.wordSource = [...enWords[5]]
          break
        default: 
          this.wordSource = [...enWords[5]]
          break
      }
    },
    gameStart() {
      this.findWordSource()
      this.setGameStarted(true)
      this.lastWords = []
      this.letterIndexes = []
      this.value = 0
      this.timer = 3 * 60
      this.step()
    },
    step() {
      let index
      do {
        index = Math.floor(Math.random() * this.wordSource.length - 1)
      }while(this.lastWords.includes(this.wordSource[index]))
      this.lastWords.push(this.wordSource[index])
      this.currentWord = this.wordSource[index]
      this.letterIndexes.push(Math.floor(Math.random() * this.letterCount))
      let letterIndex
      do {
        letterIndex = Math.floor(Math.random() * this.letterCount)
      }while(letterIndex === this.letterIndexes[0])
      this.letterIndexes.push(letterIndex)
      this.renderedWord = ['', '', '', '', '']
      this.renderedWord[this.letterIndexes[0]] = this.currentWord[this.letterIndexes[0]]
      this.renderedWord[this.letterIndexes[1]] = this.currentWord[this.letterIndexes[1]]
    },
    startConfetti() {
      this.$confetti.start({
        particles: [
          { type: 'circle' },
          { type: 'rect' }
        ],
        defaultColors: [
          '#CE82C7',
          '#B1D0E0',
          '#FFBB00',
          '#8D5BE9'
        ],
      })
      setTimeout(() => {
        this.stopConfetti()
        this.$bvModal.show('finish-game-modal')
      }, 2000)
    },
    stopConfetti() {
      this.$confetti.stop()
    },
    countdownEnd() {
      this.$bvModal.show('time-over-modal')
    },
    type(letter) {
      this.showError = false
      this.showCorrect = false
      if(letter === 'enter') {
        const suggestedWord = this.renderedWord.join().replaceAll(',', '')
        if(this.wordSource.includes(suggestedWord)) {
          this.value += 1
          this.showCorrect = true
          this.letterIndexes = []
          if(this.value === this.max) {
            this.startConfetti()
          }
          else {
            this.step()
          }
        }
        else {
          this.showError = true
          setTimeout(() => {
            this.showError = false
          }, 1000)
        }
      }
      else if(['delete', 'sil'].includes(letter)) {
        const emptyIndex = _.findIndex(this.renderedWord, element => element === '')
        let deleteIndex
        if(emptyIndex !== -1) {
          deleteIndex = emptyIndex - 1
        }
        else {
          deleteIndex = this.renderedWord.length -1
        }
        while(this.letterIndexes.includes(deleteIndex)) {
          deleteIndex -= 1
        }
        this.$set(this.renderedWord, deleteIndex, '')
      }
      else {
        const emptyIndex = _.findIndex(this.renderedWord, element => element === '')
        if(emptyIndex !== -1) {
          this.$set(this.renderedWord, emptyIndex, letter)
        }
      }
    }
  },
}
</script>

<template>
  <section class="index">
    <div class="game-container">
      <app-button
        v-if="!gameStarted"
        type="primary"
        size="lg"
        :text="$t('start')"
        @click="gameStart"
      />
      <div 
        v-else
        class="game-content"
      >
        <b-alert 
          show
          variant="primary"
        >
          <vue-countdown 
            ref="countdown"
            :time="timer" 
            format="mm:ss" 
            @on-end="countdownEnd"
          >
            <template slot-scope="{ time }">{{ time }}</template>
          </vue-countdown>
        </b-alert>
        <b-progress 
          :value="value" 
          :max="max" 
          variant="success"
        />
        <div class="game-boxes">
          <span 
            v-for="(item, index) in renderedWord"
            :key="index"
            class="box"
            :class="{ active: letterIndexes.includes(index), error: showError, correct: showCorrect }"
          >
            {{ item.toLocaleUpperCase(locale) }}
          </span>
        </div>
      </div>
    </div>
    <div class="game-keyboard-container">
      <div 
        v-for="(item, index) in keyboard"
        :key="index"
        class="keyboard-row"
      >
        <span 
          v-for="(rowItem, rowIndex) in item"
          :key="rowIndex"
          class="keyboard-row-item"
          :class="{ large: ['enter', 'delete', 'sil'].includes(rowItem) }"
          @click="type(rowItem)"
        >
          {{ rowItem.toLocaleUpperCase(locale) }}
        </span>
      </div>
    </div>
    <finish-game-modal @restart="setGameStarted(false)" />
    <time-over-modal @restart="setGameStarted(false)" />
    <info-modal />
  </section>
</template>

<style lang="scss" scoped>
.index {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .game-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .app-button {
      max-width: 200px;
    }
    .game-content ::v-deep {
      flex: 1;
      width: 100%;
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .alert {
        width: fit-content;
        margin-bottom: 1rem;
        .countdown {
          width: fit-content;
          font-size: var(--fs-9);
          font-weight: var(--medium-weight);
        }
      }
      .progress {
        margin-bottom: 2rem;
      }
      .game-boxes {
        margin-right: auto;
        margin-left: auto;
        max-width: 324px;
        width: 100%;
        max-height: 60px;
        height: 100%;
        display: flex;
        flex-direction: row;
        gap: 6px;
        .box {
          flex: 1;
          border: 2px solid var(--gray-color);
          color: var(--white-color);
          font-size: var(--fs-22);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          transition: 1s;
        }
        .active {
          background-color: var(--gray-color);
        }
        .error {
          animation: error 1s;
        }
        .correct {
          animation: correct 1s;
        }
      }
    }
  }
  .game-keyboard-container {
    color: var(--white-color);
    display: flex;
    flex-direction: column;
    gap: 8px;
    .keyboard-row {
      display: flex;
      gap: 4px;
      &-item {
        flex: 1;
        background-color: var(--gray-color);
        border-radius: .4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 52px;
        font-size: var(--fs-10);
        font-weight: var(--bold-weight);
        cursor: pointer;
        transition: .2s all;
      }
      .large {
        flex: 2;
      }
    }
  }
}

@keyframes error {
  from {
    background-color: var(--red-color);
  }
}

@keyframes correct {
  from {
    background-color: var(--green-color);
  }
}
</style>