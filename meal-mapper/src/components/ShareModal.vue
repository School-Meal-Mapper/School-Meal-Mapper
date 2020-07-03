<template>
  <b-modal id="share-location" size="lg" dialog-class="m-0 m-md-auto" centered hide-footer>
    <template v-slot:modal-title>
      {{ $t('sharelocation.share') }}
    </template>
    <p v-if="business !== null">
      {{ $t('sharelocation.share-site') }}:
      <br />
      <br />
      <b> {{ business.marker.gsx$mealsitename.$t }} </b>
      <br />
      {{ getAddress(business.marker) }} <br />
      <br />
      {{ $t('sharelocation.link') }}
      <br />
      <input readonly type="text" :value="shareLink(addressURL(business.marker))" class="w-75" id="share-link" />
      <b-button variant="link" @click="copyShareLink()">{{ $t('sharelocation.copy') }}</b-button>
      <br />
      <br />
    </p>
    <div v-if="business !== null">
      <div>
        <i class="fa fa-envelope fa-lg" id="email-icon" aria-hidden="true" />
        <a :href="emailLink(business.marker)">
          <span class="emailText">{{ $t('sharelocation.email') }} </span>
        </a>
      </div>
      <br />
      <div>
        <i class="fa fa-mobile fa-lg" id="text-icon" aria-hidden="true" />
        <a :href="emailLink(business.marker)">
          <span class="sendText">{{ $t('sharelocation.text') }} </span>
        </a>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { getAddress } from '../utilities'
export default {
  name: 'share-modal',
  components: {},
  props: {
    business: Object
  },
  methods: {
    addressURL: function (marker) {
      var address = marker.gsx$mealsiteaddress.$t
      address = address.replace(/\s/g, '%20')
      var city = marker.gsx$city.$t.replace(/\s/g, '%20')
      var state = marker.gsx$state.$t.replace(/\s/g, '%20')
      address = address + '%2C%20' + city + '%2C%20' + state + '%20' + marker.gsx$zip.$t
      return address
    },
    shareLink: function (address) {
      return 'https://www.google.com/maps/search/?api=1&query=' + address
    },
    copyShareLink: function () {
      var copyText = document.getElementById('share-link')
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand('copy')
      alert(this.$tc('sharelocation.copied'))
    },
    emailLink: function (marker) {
      const mailto = 'mailto:?subject='
      var subject = 'Find free meals for students at ' + marker.gsx$mealsitename.$t
      subject = encodeURI(subject)
      subject += '&body='
      var body =
        'I thought you might be interested in visiting the ' +
        marker.gsx$mealsitename.$t +
        ' school meal site, located at ' +
        getAddress(marker) +
        '. This site provides free meals for students in the Chapel Hill-Carrboro school district during the summer. ' +
        'Click this link to access the meal site in Google Maps: '
      body = encodeURI(body)
      var address = encodeURI(this.addressURL(marker))
      body += this.shareLink(address).replace('&', '%26') + '.'
      body +=
        encodeURI('\n\n') +
        'For more information about school meal sites in the Chapel Hill-Carrboro school district, visit https://school-meal-mapper.github.io/School-Meal-Mapper/.'
      return mailto + subject + body
    },
    getAddress: getAddress
  }
}
</script>

<style lang="scss">
.emailText {
  padding-left: 10px;
}
.sendText {
  padding-left: 10px;
}
</style>
