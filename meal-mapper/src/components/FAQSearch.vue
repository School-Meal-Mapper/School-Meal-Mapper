<template>
  <div>
    <b-form-input v-model="terms" type="search" @change="findText" placeholder="Look for keywords."></b-form-input>
    <div class="results">
      <b-button @click="emitAccordionOpen">Open qna 1</b-button>
      <b-button>Open qna 2</b-button>
      <b-button>Open qna 3</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'faq-search',
  props: {
    sheetsQnA: Object,
    translateQuestion: Function, // these are functions passed by FAQ to process the Q&A from the 'sheetsQnA' object
    translateAnswer: Function // this is done so function can just be changed in FAQ.vue without needing to be changed here
  },
  created() {
    this.sheetsQnA.forEach((qna) => {
      this.questions.push(this.translateQuestion(qna, this.$i18n.locale))
      this.answers.push(this.translateAnswer(qna, this.$i18n.locale))
    })
  },
  data() {
    return {
      questions: [],
      answers: [],
      terms: ''
    }
  },
  methods: {
    findText() {
      console.log(this.terms)
    },
    emitAccordionOpen(event) {
      console.log(event)
    }
  }
}
</script>

<style></style>
