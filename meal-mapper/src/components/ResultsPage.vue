<template>
  <div id="result-page">
    <nav id="page-header">
      <b-button @click="test"><i class="fas fa-chevron-left" /> Back to Provider Home</b-button>
      <div><results-filter @select="updateTagsSelected" /></div>
    </nav>
    <main>
      <result-card v-for="(item, index) in filteredResults" v-bind:key="index" :result="item" />
      <p v-if="filteredResults.length == 0">
        So sorry, there are no results with the selected tags.
      </p>
    </main>
  </div>
</template>

<script>
import ResultCard from './ResultCard.vue'
import ResultsFilter from './ResultsFilter.vue'
// import Tag from './Tag.vue'
/**
 * ResultsPage.vue replaces ResultsList.vue
 */
export default {
  components: { ResultCard, ResultsFilter },
  // components: { Tag },
  props: {
    results: Array,
    location: Object
  },
  created() {
    this.filteredResults = this.results
  },
  data() {
    return {
      tagsSelected: [],
      filteredResults: []
    }
  },
  methods: {
    test() {
      console.log(this.results, 'results passed in')
      console.log(this.filteredResults, 'self-filtered results')
    },
    updateTagsSelected: function (tagsSelected) {
      this.tagsSelected = tagsSelected

      let unreactiveResults = this.results
      this.tagsSelected.forEach((tag) => {
        unreactiveResults = unreactiveResults.filter((m) => {
          try {
            const splittedTag = tag.split('.')
            if (splittedTag[0] == 'dietaryoptionsoffered') {
              return m.marker['gsx$dietaryoptionsoffered'].$t.toLowerCase().includes(splittedTag[1])
            }
            return m.marker['gsx$' + tag].$t == 'TRUE'
          } catch (e) {
            /* I used try-catch because for some reason if the column doesn't exist, it stops function execution rather 
               than returning undefined.
            */
            console.error(`Note! The tag name (${tag}) is not set up right. Check the spreadsheet or the checkbox's value attribute.`)
            return true
          }
        })
      })

      this.filteredResults = unreactiveResults // this sends the data to be reacted upon
    }
  },
  watch: {
    tagsSelected: function () {
      this.$emit('select', this.tagsSelected) // push tags up
      // App.vue does not have a watch operation on tagsSelected so it will not react to the state change
      // however, we still pass the value up as App.vue might need this data if the user wants to switch
      // to map view.
    }
  }
}
</script>

<style>
#result-page {
  background-color: #eee;
  width: 100%;
  overflow: auto;
}

#page-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  height: 50px;
}
</style>
