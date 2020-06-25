<template>
  <b-modal id="suggest-edit" size="lg" dialog-class="m-0 m-md-auto" centered scrollable>
    <template v-slot:modal-title>
      Suggest an edit
    </template>
    <p>
      Please use this form to let us know what is incorrect about the listing for <b>{{ currentBusiness.marker.gsx$mealsitename.$t }}.</b>
    </p>
    <div>
      <b-form-group>
        <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="options" name="flavour-1"></b-form-checkbox-group>
      </b-form-group>
      Additional comments:
      <b-form-input v-model="text" placeholder="Enter comments"></b-form-input>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="primary" class="float-right" @click="submitForm(currentBusiness)">Submit</b-button>
        <b-button variant="danger" class="float-left" @click="reset()">Reset</b-button>
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
        { text: 'Site name', value: 'name' },
        { text: 'Address', value: 'address' },
        { text: 'Contact information', value: 'contact' },
        { text: 'Social media', value: 'social' },
        { text: 'Hours', value: 'hours' }
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
        alert('Please select at least one checkbox')
      } else {
        alert('The form has been submitted. Thank you for your help updating the entry for ' + business.marker.gsx$mealsitename.$t + '!')
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
