<template>
  <span>
    <b-list-group class="list-group-flush">
      <b-list-group-item variant="sideNav" button class="backtolist" id="back-to-list-nav" @click="$emit('close-details')">
        <i class="fas fa-arrow-left" />
        {{ $t('label.backtolist') }}
      </b-list-group-item>
    </b-list-group>
    <b-list-group class="list-group-flush business-details" id="business-details-nav">
      <b-list-group-item variant="sideNav" :class="infotype">
        <div>
          <div class="title">
            <div class="busName">
              <h5>{{ business.marker.gsx$mealsitename.$t }}</h5>
            </div>
          </div>
          <p v-if="getAddress(business.marker) !== ''">
            <b>{{ $t('label.address') }}:</b><br />
            {{ getAddress(business.marker) }}
          </p>

          <p v-if="business.marker.gsx$sitedescription != null">
            {{ business.marker.gsx$sitedescription.$t }}
          </p>
          <icon-list-item icon="fa fa-directions" :title="$t('getdirections')" :link="directionsLink(addressURL(business.marker))" />
          <i class="fas fa-share-alt fa-lg" id="share-icon" aria-hidden="true" />
          <b-button variant="link" class="share-button" @click="$bvModal.show('share-location')">{{
            $t('sharelocation.shareloc')
          }}</b-button>

          <p>
            <icon-list-item
              v-if="business.marker.gsx$contact !== undefined && !!business.marker.gsx$contact.$t"
              icon="fas fa-phone-alt"
              :title="business.marker.gsx$contact.$t"
              :link="'tel:' + business.marker.gsx$contact.$t"
            />

            <icon-list-item
              v-if="business.marker.gsx$weblink !== undefined && !!business.marker.gsx$weblink.$t"
              icon="fas fa-globe"
              :title="getDomain(business.marker.gsx$weblink.$t)"
              :link="business.marker.gsx$weblink.$t"
            />

            <icon-list-item
              v-if="business.marker.gsx$twitter !== undefined && !!business.marker.gsx$twitter.$t"
              icon="fa fa-twitter"
              :title="'@' + business.marker.gsx$twitter.$t"
              :link="'https://www.twitter.com/' + business.marker.gsx$twitter.$t"
            />

            <icon-list-item
              v-if="business.marker.gsx$instagram !== undefined && !!business.marker.gsx$instagram.$t"
              icon="fa fa-instagram"
              :title="'@' + business.marker.gsx$instagram.$t"
              :link="'https://www.instagram.com/' + business.marker.gsx$instagram.$t"
            />

            <icon-list-item
              v-if="business.marker.gsx$facebook !== undefined && !!business.marker.gsx$facebook.$t"
              icon="fa fa-facebook-square"
              :title="'@' + business.marker.gsx$facebook.$t.split('/')[3]"
              :link="business.marker.gsx$facebook.$t"
            />
          </p>
          <opening-hours :business="business.marker" :title="$t('label.openinghours')"></opening-hours>

          <template v-if="business.marker.gsx$notes !== undefined && !!business.marker.gsx$notes.$t">
            <p>
              <b>{{ $t('label.notes') }}:</b><br />{{ business.marker.gsx$notes.$t }}
            </p>
          </template>

          <p class="updated" v-if="getLastUpdatedDate != 'Invalid Date'">
            {{ $t('label.details-last-updated') }}: {{ getLastUpdatedDate }}
          </p>

          <p>
            <b-button variant="outline-primary" size="sm" class="suggest-edit" @click="$bvModal.show('suggest-edit')">
              {{ $t('suggest-edit.edit') }}
            </b-button>
          </p>
        </div>
      </b-list-group-item>
    </b-list-group>
  </span>
</template>

<script>
import OpeningHours from './OpeningHours.vue'
import IconListItem from './IconListItem.vue'
import { getAddress } from '../utilities'
import { districtData } from '../themes/MealsForFamilies/districtData'

document.documentElement.style.setProperty('--primary-color', districtData.colors.primaryColor)
document.documentElement.style.setProperty('--banner-light', districtData.colors.bannerColor)
document.documentElement.style.setProperty('--banner-dark', districtData.colors.bannerColorDark)
document.documentElement.style.setProperty('--nav-link-light', districtData.colors.navLink)
document.documentElement.style.setProperty('--nav-link-dark', districtData.colors.navLinkDark)

export default {
  name: 'BusinessDetails',
  components: {
    OpeningHours,
    IconListItem
  },
  data() {
    return {}
  },
  props: {
    infotype: { type: String },
    icon: { type: String },
    business: Object
  },
  methods: {
    getDomain: function (url) {
      var urlParts = url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)
      return urlParts[0]
    },
    addressURL: function (marker) {
      var address = marker.gsx$mealsiteaddress1.$t
      address = address.replace(/\s/g, '%20')
      var city = marker.gsx$city.$t.replace(/\s/g, '%20')
      var state = marker.gsx$state.$t.replace(/\s/g, '%20')
      address = address + '%2C%20' + city + '%2C%20' + state + '%20' + marker.gsx$zip.$t
      return address
    },
    directionsLink: function (address) {
      return 'https://www.google.com/maps/dir/?api=1&destination=' + address
    },
    getAddress: getAddress
  },
  computed: {
    getLastUpdatedDate: function () {
      return new Date(Date.parse(this.business.marker.gsx$lastupdate.$t)).toLocaleDateString()
    }
  }
}
</script>

<style scoped lang="scss">
.root {
  --primary-color: blue;
  --banner-light: '#E9ECEF';
  --banner-dark: '#212529';
  --nav-link-light: '#F8F8F8';
  --nav-link-dark: '#F8F8F8';
}

.business-details {
  max-height: calc(100vh - 86px - 62px);
  overflow-y: auto;
  overflow-x: hidden;
}
.backtolist {
  font-size: 0.8rem;
  padding-top: 30px;

  i {
    margin-right: 0.375rem;
  }

  // &:hover {
  //   background: rgba(0, 0, 0, 0.05) !important;
  //   cursor: pointer;
  // }
}

.title {
  margin: 0 0 0.75rem 0;
  display: inline-block;

  i {
    font-size: 3rem;
    //color: theme-color('quinary');
    margin: 7px 10px 7px 0;
    float: left;
  }
}

.busName {
  margin-left: 0px;
  width: 208px;
}

.green {
  font-size: 0.8rem;
  // color: #666;

  & > div {
    width: 243px;
  }
}

.updated {
  color: #aaa;
}

.btn-outline-primary {
  color: #313639 !important;
  border-color: #313639 !important;
  @media (prefers-color-scheme: dark) {
    color: #f8f8f8 !important;
    border-color: #f8f8f8 !important;
  }
}

.btn-outline-primary:hover {
  color: var(--nav-link-light) !important;
  background-color: var(--banner-light) !important;
  @media (prefers-color-scheme: dark) {
    color: var(--nav-link-dark) !important;
    background-color: var(--banner-dark) !important;
  }
}

.share-button {
  font-size: 0.8rem;
  padding: 0.375rem 1rem;
  color: #007bff;
}

@media (max-width: 768px) {
  #business-details-nav {
    display: none;
  }
  #back-to-list-nav {
    display: none;
  }
}
</style>
