<template>
  <b-modal id="share-location" size="lg" dialog-class="m-0 m-md-auto" centered hide-footer>
    <template v-slot:modal-title>
      {{ $t('sharelocation.share') }}
    </template>
    <p v-if="business !== null">
      <b> {{ business.marker.gsx$mealsitename.$t }} </b>
      <br />
      {{ getAddress(business.marker) }} <br />
      <br />
      {{ $t('sharelocation.link') }}
      <br />
      <input readonly type="text" :value="shareLink(addressURL(business.marker))" class="w-75" id="share-link" />
      <b-button variant="link" @click="copyShareLink()">{{ $t('sharelocation.copy') }}</b-button>
      <span>
        <a :href="emailLink(business.marker)">
          <i class="fa fa-envelope fa-lg" aria-hidden="true" />
        </a>
      </span>
    </p>
  </b-modal>
</template>

<script>
import { getAddress } from '../utilities'
export default {
  name: 'share-modal',
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
      var subject = 'Info on ' + marker.gsx$mealsitename.$t + ' Meal Site'
      subject = encodeURI(subject)
      subject += '&body='
      var body = 'Here is a link to ' + marker.gsx$mealsitename.$t + ', a school meal site located at ' + getAddress(marker) + ': '
      body = encodeURI(body)
      var address = encodeURI(this.addressURL(marker))
      body += this.shareLink(address).replace('&', '%26') + '.'
      body += encodeURI('\n\n') + 'For more information, visit https://school-meal-mapper.github.io/School-Meal-Mapper/.'
      return mailto + subject + body
    },
    getAddress: getAddress
  }
}
</script>

<style lang="scss"></style>
