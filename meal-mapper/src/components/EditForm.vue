<template>
  <b-modal id="suggest-edit" size="lg" dialog-class="m-0 m-md-auto" centered scrollable>
    <template v-slot:modal-title>
      {{ $t('suggest-edit.edit') }}
    </template>
    <p>
      {{ $t('suggest-edit.instructions') }} <b>{{ currentBusiness.marker.gsx$mealsitename.$t }}.</b>
    </p>
    <div>
      <b-form-group>
        <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="options" name="flavour-1"></b-form-checkbox-group>
      </b-form-group>
      {{ $t('suggest-edit.additional-comments') }}
      <b-form-input v-model="text" :placeholder="$t('suggest-edit.enter-comments')"></b-form-input>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="primary" class="float-right" @click="submitForm(currentBusiness)">{{ $t('suggest-edit.submit') }}</b-button>
        <b-button variant="danger" class="float-left" @click="reset()">{{ $t('suggest-edit.reset') }}</b-button>
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
        { text: this.$tc('suggest-edit.name'), value: 'name' },
        { text: this.$tc('suggest-edit.address'), value: 'address' },
        { text: this.$tc('suggest-edit.contact'), value: 'contact' },
        { text: this.$tc('suggest-edit.social'), value: 'social' },
        { text: this.$tc('suggest-edit.hours'), value: 'hours' }
      ],
      text: ''
    }
  },
  methods: {
    reset: function () {
      this.selected = []
    },
    submitForm: function (business) {
      if (this.selected.length == 0) {
        alert(this.$tc('suggest-edit.select-checkbox'))
      } else {
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
</style>
