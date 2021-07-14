<template>
  <b-dropdown id="dropdown-tags" text="Filter by Tags">
    <!-- <div>wowowowow</div> -->
    <b-form-checkbox-group v-model="tagsSelected" :options="tags" id="checkboxes-tags" stacked />
  </b-dropdown>
</template>

<script>
export default {
  name: 'ResultsFilter',
  created() {
    this.tags = [
      // add a system where each meal provider can decide which tags want to show up? or just removing those tags
      // the values of the checkbox must be the same as the spreadsheet's column name!
      { text: 'Near Transit', value: 'transitfriendly' },
      { text: 'Open Outside of Business Hours', value: 'openlate' },
      { text: 'Adults Too', value: 'adults' },
      { text: 'Food Pantry', value: 'foodpantry' },
      { text: 'Prepackaged Meals Available', value: 'prepackagedmealsavailable' },
      { text: 'Hot Meals', value: 'hotmealsavailable' },
      { text: 'Vegetarian/Vegan', value: 'dietaryoptionsoffered.vegetarian' },
      { text: 'Kosher/Halal', value: 'dietaryoptionsoffered.kosher' },
      { text: 'Dairy-Free', value: 'dietaryoptionsoffered.dairy-free' },
      { text: 'Nut-Free', value: 'dietaryoptionsoffered.nut-free' },
      { text: 'Gluten-Free', value: 'dietaryoptionsoffered.gluten-free' }
    ]
  },
  data() {
    return {
      tagsSelected: []
    }
  },
  watch: {
    tagsSelected: function () {
      this.$emit('select', this.tagsSelected) // maybe has this., if it does, remove the param
    }
  }
}
</script>

<style>
#dropdown-tags {
  width: 100%;
}
#checkboxes-tags {
  padding-left: 10px;
}
</style>
