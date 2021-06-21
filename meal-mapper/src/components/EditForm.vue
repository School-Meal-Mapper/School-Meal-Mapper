<template>
  <b-modal id="suggest-edit" size="lg" dialog-class="m-0 m-md-auto" centered scrollable>
    <template v-slot:modal-title>
      {{ $t('suggestEdit.suggestEditTitle') }}
    </template>
    <p v-if="currentBusiness !== null">
      {{ $t('suggestEdit.whatNeedsCorrecting') }}
    </p>
    <div>
      <b-form-group>
        <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="options" name="flavour-1"></b-form-checkbox-group>
      </b-form-group>
      {{ $t('suggestEdit.additionalComments') }}
      <b-form-input v-model="text" :placeholder="$t('suggestEdit.enterCommentsPrompt')"></b-form-input>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="primary" class="float-right" @click="submitForm(currentBusiness)">{{ $t('suggestEdit.submitForm') }}</b-button>
        <b-button variant="danger" class="float-left" @click="reset()">{{ $t('suggestEdit.resetButton') }}</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'suggest-edit-modal',
  props: {
    currentBusiness: Object
  },
  data() {
    return {
      selected: [],
      options: [
        { text: this.$t('suggestEdit.siteName'), value: 'suggestEdit.siteName' },
        { text: this.$t('suggestEdit.address'), value: 'suggestEdit.address' },
        /*
        { text: this.$tc('suggest-edit.contact'), value: 'contact' },
        { text: this.$tc('suggestedit.social'), value: 'social' },*/
        { text: this.$t('suggestEdit.hours'), value: 'suggestEdit.hours' }
      ],
      text: ''
    }
  },
  methods: {
    reset: function () {
      this.selected = []
    },
    async postForm(arr) {
      const urlbase = 'https://docs.google.com/forms/d/e/1FAIpQLSeHMzatGVcqUcFdyxJMNtaDUApJaE_-enb3yFdWXlkOc84mXA/formResponse'
      const form_entries = [
        'entry.1322101299',
        'entry.963360749',
        'entry.1587815264',
        'entry.91941245',
        'entry.383547902',
        'entry.351688335',
        'entry.729350868',
        'entry.117758355'
      ]
      const query = form_entries.reduce((u, e, i) => {
        return u + e + '=' + encodeURI(arr[i]) + '&'
      }, '?')
      // POST to google form
      try {
        await fetch(urlbase + query.slice(0, -1), {
          method: 'post',
          mode: 'no-cors'
        })
      } catch (e) {
        alert(this.$t('suggest-edit.submission-error'))
      }
    },
    submitForm: function (business) {
      if (this.selected.length == 0) {
        alert(this.$tc('suggest-edit.select-checkbox'))
      } else {
        let data = [business.marker.gsx$mealsitename.$t, business.marker.gsx$contact.$t]
        this.options.forEach((option) => {
          if (this.selected.includes(option.value)) {
            data.push(1)
          } else data.push(0)
        })
        data.push(this.text)
        this.postForm(data)
        alert(this.$tc('suggest-edit.form-submitted') + business.marker.gsx$mealsitename.$t + '!')
        this.selected = []
      }
    }
  }
}
</script>

<style lang="scss">
.error {
  color: theme-color(danger);
  size: 0.75rem;
}
.close {
  color: #000 !important;
  @media (prefers-color-scheme: dark) {
    color: #eee !important;
  }
}
</style>
