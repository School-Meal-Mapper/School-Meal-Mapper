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
      ]
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
        var nodemailer = require('nodemailer')
        var transport = nodemailer.createTransport({
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: 'fb3370a77cb4d3',
            pass: 'fa89669c951b5c'
          }
        })
        var toEmail
        if (business.marker.gsx$contact.$t.includes('@')) {
          toEmail = business.marker.gsx$contact.$t
        } else toEmail = 'ecp.3299@gmail.com'
        var emailText =
          'A user has indicated that there is a problem with the listing for ' +
          business.marker.gsx$mealsitename.$t +
          '. The error is in the following '
        if (this.selected.length == 1) {
          emailText += 'category:'
        } else emailText += 'categories:'
        this.selected.forEach((element) => (emailText += ' ' + element))
        var mailOptions = {
          from: 'ecp.3299@gmail.com',
          to: toEmail,
          subject: 'Incorrect information for ' + business.marker.gsx$mealsitename.$t + ' listing',
          text: emailText
        }
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error)
          }
          console.log('Message sent: %s', info.messageId)
        })

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
</style>
