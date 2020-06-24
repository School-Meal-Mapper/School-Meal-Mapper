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
    </div>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="primary" class="float-right" @click="submitForm()">Submit</b-button>
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
      ]
    }
  },
  methods: {
    reset: function () {
      this.selected = []
    },
    submitForm: function () {
      alert('The form has been submitted.')
      this.selected = []
    }
  }
}
</script>

<style lang="scss"></style>
