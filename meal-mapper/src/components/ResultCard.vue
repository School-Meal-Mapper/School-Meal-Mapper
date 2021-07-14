<template>
  <b-card class="result-card" :title="result.marker.gsx$mealsitename.$t">
    <hr />
    <b-card-text class="result-card-text"
      ><i class="fas fa-directions" />
      {{ icon_spacing + result.marker.gsx$mealsiteaddress1.$t }}
      <template v-if="result.marker.gsx$mealsiteaddress2.$t == ''">
        <br />
        {{ icon_spacing + result.marker.gsx$mealsiteaddress2.$t }}
      </template>
    </b-card-text>
    <hr />
    <b-card-text class="result-card-text"
      ><i class="far fa-clock" />
      {{ icon_spacing }}
      <span v-if="checkOpen(result)">
        <b><span class="open-indicator">Open </span>today until {{ getTodaysTime(result) }}.</b>
      </span>
      <span v-else>
        <b><span class="closed-indicator">Closed </span>now. </b>
        Opens at {{ getTomorrowsTime(result) }}
      </span>
    </b-card-text>
    <hr />
    <b-card-text class="result-card-text"> <i class="fas fa-phone" />{{ icon_spacing + result.marker.gsx$contactphone.$t }} </b-card-text>
    <b-card-text class="result-card-text"> <i class="fas fa-comments" />{{ icon_spacing + 'English, Spanish' }} </b-card-text>
    <hr />
    <b-card-text class="result-card-text" v-if="result.marker.gsx$weblink.$t">
      <i class="fas fa-globe" />{{ icon_spacing + result.marker.gsx$weblink.$t }}
    </b-card-text>
    <b-card-text class="result-card-text" v-if="result.marker.gsx$notes.$t"
      >{{ result.marker.gsx$notes.$t.slice(0, 100) + '...' }}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    display: String,
    result: Object
  },
  created() {
    this.icon_spacing = '    '
  },
  methods: {
    checkOpen() {
      return true
    },
    getTodaysTime() {
      return '6:00 pm'
    },
    getTomorrowsTime() {
      return '12 pm Tuesday'
    },
    lookupTags() {
      // should make an overall ResultCard component that allows includes these functions
      // the ResultCard should have condensed, preview, and full
    }
  }
}
</script>

<style>
.result-card-text {
  margin: 10px 0 10px 0;
}

.result-card hr {
  margin: 3px;
}

.result-card i {
  font-size: 1.2em;
  filter: drop-shadow(2px 2px 0.8px lightgray);
  margin-right: 0.5em;
}

.result-card .card-title {
  /* part of bootstrap-vue's auto-generated classes */
  font-size: 1.2em;
  margin-bottom: 15px;
}

.result-card {
  background-color: white;
  color: black;
  padding: 25px 40px;
  margin: 20px 0 0 0;
}

.open-indicator {
  color: green;
}

.closed-indicator {
  color: red;
}
</style>
