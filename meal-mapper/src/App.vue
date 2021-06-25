<template>
  <div class="home">
    <a class="skip-to-main" href="#search-filter-wrapper" v-if="!checkParam">
      Skip to main content.
    </a>
    <app-header
      :logoLink="logoLink"
      :language="language.name"
      @search="searchLoc"
      @language-selected="changeLanguage"
      :socialMedia="socialMediaico"
      :hasFaqs="faqUrl != null"
    >
      <theme-header :districtAbbr="districtAbbr" :logoFormat="logoFormat"></theme-header>
    </app-header>
    <!--<faq :questions="faqs" :info="info" /> -->
    <!-- <covid-pop-up /> -->
    <div class="d-flex" v-if="checkParam">
      <div class="district-buttons">
        <p class="intro">{{ this.$t('landingPage.welcomeStatement') }}</p>
        <p>
          <b-form-select v-model="selectedState" :options="states">{{ this.$t('landingPage.pleaseSelectState') }}</b-form-select>
          <br />
          <br />
          <b-form-select v-model="selectedDistrict" :options="districtOptions" :disabled="this.selectedState !== 'nc'">{{
            this.$t('landingPage.findYourCountyAndSelectProvider')
          }}</b-form-select>
        </p>
        <b-button :disabled="this.selectedDistrict === null" v-on:click="districtLink">{{
          this.$t('landingPage.findFreeMealsNearMe')
        }}</b-button>
      </div>
    </div>
    <div class="d-flex" id="wrapper" :class="{ toggled: isFilterOpen }" v-if="!!entries && showMap">
      <results-list
        :filteredMarkers="highlightFilteredMarkers"
        :location="locationData"
        @location-selected="passLocation"
        @hover-over="passHover"
        @hover-leave="passNoHover"
        @search="searchLoc"
        :info="info"
        v-if="showList"
        :showResults="showResults"
        :selected-day="day"
        :hasFaqs="faqUrl != null"
      />
      <share-modal :business="locationData.currentBusiness" />
      <suggest-edit-modal :currentBusiness="locationData.currentBusiness" />
      <div id="page-content-wrapper">
        <resource-map
          :filteredMarkers="filteredMarkers"
          :class="{ noselection: need == 'none' }"
          :location="locationData"
          :attribution="attribution"
          :hoverIt="hoverItem"
          :searchLocationData="searchLocData"
          @hover-over="passHover"
          @hover-leave="passNoHover"
          @location-selected="passLocation"
          @bounds="boundsUpdated"
          @center="centerUpdated"
          :mapUrl="mapUrl"
          :centroid="centroid"
        />
      </div>
    </div>
    <router-view />
  </div>
</template>
<!-- 
<style lang="scss">
// @import './themes/DurhamMeal/SCSS/custom.scss';
// </style>
-->

<script>
import AppHeader from './components/Header.vue'

import ResourceMap from './components/ResourceMap.vue'
import ShareModal from './components/ShareModal.vue'
import SuggestEditModal from './components/EditForm.vue'
//import Faq from './components/FAQ.vue'
//import CovidPopUp from './components/CovidPopUp.vue'
import ResultsList from './components/ResultsList.vue'

import { latLng } from 'leaflet'
import { haversineDistance, sortByDistance } from './utilities'

import { dayFilters, booleanFilters, dayAny, nc, districts } from './constants'

import { districtData } from './themes/MealsForFamilies/districtData'
import ThemeHeader from './themes/MealsForFamilies/components/theme.header'

function extend(obj, src) {
  for (var key in src) {
    obj.push(src[key])
  }
  return obj
}

function addOrRemove(array, item) {
  const exists = array.includes(item)

  if (exists) {
    return array.filter((c) => {
      return c !== item
    })
  } else {
    const result = array
    result.push(item)
    return result
  }
}

export default {
  name: 'app',
  props: {
    msg: String
  },
  watch: {
    currentPage: 'fetchData'
  },
  created() {
    this.fetchData()
    this.states.unshift({ value: null, text: this.$t('landingPage.pleaseSelectState') })
    var urlString = window.location.href
    //var url = new URL(urlString)
    console.log('testing')
    console.log(urlString)
  },
  components: {
    ShareModal,
    SuggestEditModal,
    AppHeader,
    //Faq,
    //CovidPopUp,
    ResourceMap,
    ThemeHeader,
    ResultsList
  },
  data() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    return {
      entries: null,
      faqUrl: null,
      provInfo: null,
      need: 'none',
      day: dayAny,
      isFilterOpen: true,
      language: { name: 'English', iso: 'en' },
      locationData: {
        locValue: null,
        locId: null,
        currentBusiness: null,
        isSetByMap: false
      },
      selectedState: null,
      selectedDistrict: null,
      states: nc,
      districts: districts,
      searchLocData: false,
      showList: false,
      showResults: false,
      highlightFilters: [],
      bounds: null,
      centroid: {
        lat: districtData.settings.initialMapCenter.lat,
        lng: districtData.settings.initialMapCenter.lng,
        zoom: districtData.settings.initialMapZoom
      },
      darkModeMediaQuery: darkModeMediaQuery,
      darkMode: darkModeMediaQuery.matches,
      mapUrl: '',
      attribution: null,
      socialMediaico: districtData.socialMedia,
      hoverItem: null,
      districtAbbr: districtData.districtAbbr,
      logoFormat: districtData.logoFormat,
      zip: '',
      logoLink: null
    }
  },
  mounted() {
    this.setDarkMode(this.darkMode)
    this.darkModeMediaQuery.addListener((e) => {
      this.darkMode = e.matches
      this.setDarkMode(this.darkMode)
    })
  },
  methods: {
    districtLink() {
      if (this.selectedDistrict != null) {
        location.href = '/?' + this.selectedDistrict
      }
    },
    setDarkMode(darkMode) {
      this.mapUrl = darkMode ? districtData.maps.dark.url : districtData.maps.normal.url
      this.attribution = darkMode ? districtData.maps.dark.attribution : districtData.maps.normal.attribution
    },
    centerUpdated(center) {
      this.centroid = { lat: center.lat, lng: center.lng }
    },
    boundsUpdated: function (bounds) {
      this.bounds = bounds
      this.showList = true
      if (this.locationData.currentBusiness == null) {
        this.showResults = true
      }
    },
    getDay: function (day) {
      if (day == 0) {
        return 6
      } else {
        return day - 1
      }
    },
    boxSelected: function (content) {
      this.highlightFilters = addOrRemove(this.highlightFilters, content.need)
    },
    isAnyDaySelected(day) {
      return day >= dayAny
    },
    needSelected: function (val) {
      this.need = val
      this.highlightFilters = []
    },
    daySelected: function (val) {
      this.day = val
      this.highlightFilters = []
    },
    changeLanguage: function (item) {
      this.language = item
      this.$root.updateLang(item.iso)
    },
    async fetchData() {
      const res = await fetch(districtData.data.spreadsheetUrl)
      console.log(res)
      if (districtData.data.faqUrl != null) {
        this.faqUrl = districtData.data.faqUrl
        /*const res2 = await fetch(districtData.data.faqUrl)
        const faqs = await res2.json()
        this.faqs = faqs.feed.entry
        this.faqs = this.faqs.slice(0, 20) // don't want a district to have more than 20*/
      }
      if (districtData.data.providerinfoUrl != null) {
        const res3 = await fetch(districtData.data.providerinfoUrl)
        const info = await res3.json()
        this.info = info.feed.entry
      }
      const entries = await res.json()

      // if (entries !== null) {
      //   entries.forEach(c => {
      //     c
      //   });
      // }

      this.entries = entries.feed.entry
      this.logoLink = this.entries[0]['gsx$redirectlink'].$t
    },
    latLng,
    passLocation: function (val) {
      val.currentBusiness = this.filteredMarkers[val.locValue]
      this.locationData = val
      this.showList = true
      this.showResults = false
      this.isFilterOpen = true
      var proName = this.filteredMarkers[val.locValue].marker.gsx$mealsitename.$t
        ? ', ' + this.filteredMarkers[val.locValue].marker.gsx$mealsitename.$t
        : ''
      window.gtag('event', val.isSetByMap ? 'Marker clicked' : 'List item clicked', {
        event_category: 'View details - (' + this.language.name + ')',
        event_label: this.filteredMarkers[val.locValue].marker.gsx$mealsitename.$t + proName
      })
    },
    passHover: function (item) {
      this.hoverItem = item
    },
    passNoHover: function () {
      this.hoverItem = null
    },
    searchLoc: function (location) {
      for (var index = 0; index < this.filteredMarkers.length; index++) {
        const entry = this.filteredMarkers[index].marker
        if (
          entry['gsx$mealsitename'].$t.toLowerCase().includes(location.toLowerCase()) ||
          location.toLowerCase().includes(entry['gsx$mealsiteaddress1'].$t.toLowerCase()) ||
          entry['gsx$mealsiteaddress1'].$t.toLowerCase().includes(location.toLowerCase())
        ) {
          const val = {
            locValue: index,
            isSetbyMap: false
          }
          this.passLocation(val)
          return
        }
      }
      var fetchString = 'https://nominatim.openstreetmap.org/search?key=9Rl2TaZFQpBPsnQmQo6cq79sl3Rf9EfA&q=' + location + '&format=json'
      fetch(fetchString)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            alert(this.$t('searchBar.noResults'))
            return
          }
          var location = null
          var i
          for (i = 0; i < data.length; i++) {
            if (data[i].lat >= 34 && data[i].lat <= 36.21 && data[i].lon <= -75.3 && data[i].lon >= -84.15) {
              //Making sure result is in NC
              location = data[i]
              break
            }
          }
          if (location == null) {
            alert(this.$t('searchBar.noResults'))
            return
          }
          this.searchLocData = latLng(location.lat, location.lon)
          var distances = []
          this.filteredMarkers.forEach((entry) => {
            distances.push(haversineDistance([location.lat, location.lon], [entry.marker.gsx$lat.$t, entry.marker.gsx$lon.$t], true))
          })
          const index = distances.indexOf(Math.min(...distances))
          const val = {
            locValue: index,
            isSetbyMap: false
          }
          this.passLocation(val)
        })
    },
    dateComp(dateString) {
      var month = new Date().getMonth()
      var date = new Date().getDate()
      var year = new Date().getFullYear()
      var compYear = parseInt(dateString.split('/')[2])
      var compMonth = parseInt(dateString.split('/')[0])
      var compDate = parseInt(dateString.split('/')[1])
      return compYear > year || (compYear == year && compMonth > month) || (compYear == year && compMonth == month && compDate > date)
    },
    searchZip(event) {
      if (event.which === 13) {
        event.preventDefault()
        if (this.zip.length != 5) {
          alert('Please enter a valid zipcode')
        } else {
          console.log(this.zip)
        }
      }
    }
  },
  computed: {
    districtOptions() {
      if (this.selectedState == 'nc') {
        return districts[this.selectedState]
      }
      if (this.selectedState == null) {
        return [{ value: null, text: this.$t('landingPage.youMustSelectState') }]
      } else {
        return [{ value: null, text: this.$t('landingPage.youMustSelectState') }]
      }
    },
    /**
     * Checks to see if the URL is for the landing page or for a meal site.
     * @returns {Boolean} True --> landing page; False --> meal site
     */
    checkParam() {
      //var urlString = window.location.href
      //var url = new URL(urlString)
      //console.log(url.searchParams.has('d'))
      console.log(this.$route.path)
      return this.$route.path == '/' && this.districtAbbr == 'mff'
    },
    showMap() {
      var urlString = window.location.href
      return urlString.includes('?')
    },
    filteredMarkers() {
      if (this.entries == null) return null

      var markers
      markers = this.entries
      // Only show markers whose meal site status is open
      markers = markers.filter((m) => m['gsx$mealsitestatus'].$t.toLowerCase() == 'open')
      // Only show markers whose end date hasn't passed
      markers = markers.filter((m) => m['gsx$enddate'].$t == '' || this.dateComp(m['gsx$enddate'].$t))
      //logoLink = markers[0]['gsx$redirectlink'].$t
      // Filter out the boolean items
      this.highlightFilters.forEach((element) => {
        if (booleanFilters.includes(element)) {
          markers = markers.filter((c) => c['gsx$' + element].$t == '1')
        }
      })

      var today = new Date().getDay()
      var selectedDay = today
      if (!this.isAnyDaySelected(this.day)) {
        selectedDay = this.day
      }

      const dayFilter = dayFilters[this.getDay(selectedDay)]
      var open = markers.filter((c) => c[dayFilter].$t !== '0')
      var closed = markers.filter((c) => c[dayFilter].$t == '0')

      var retList = extend(
        open.map((marker) => ({
          marker,
          oc: true,
          distance: haversineDistance([this.centroid.lat, this.centroid.lng], [marker.gsx$lat.$t, marker.gsx$lon.$t], true)
        })),
        closed.map((marker) => ({
          marker,
          oc: false,
          distance: haversineDistance([this.centroid.lat, this.centroid.lng], [marker.gsx$lat.$t, marker.gsx$lon.$t], true)
        }))
      ).sort(sortByDistance)
      return retList
    },
    highlightFilteredMarkers() {
      var contained = [] //makers in map boundingbox
      this.filteredMarkers.forEach((m) => {
        if (this.bounds.contains(latLng(m.marker.gsx$lat.$t, m.marker.gsx$lon.$t))) contained.push(m)
      })
      if (!this.isAnyDaySelected(this.day)) {
        return contained
      }

      return contained.map((m) => {
        let obj = Object.assign({}, m)
        obj.oc = true
        return obj
      })
    }
  }
}
</script>

<style>
body {
  color: #808080 !important;
  background-color: #ffffff !important;
}
.district-buttons {
  margin: 20vh auto;
  text-align: center;
  color: #000000;
}
.btn-secondary:disabled {
  background-color: #e9ecef !important;
  border-color: #a9a9a9 !important;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000000 !important;
  }
  .district-buttons {
    color: #f5f5f5;
  }
  .custom-select {
    color: #f5f5f5 !important;
  }
  select:disabled {
    color: #000000 !important;
  }
}

.skip-to-main {
  background: #ffec60;
  color: black;
  left: 50%;
  padding: 7px;
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  transition: transform 0.3s;
  z-index: 1000000000;
  border-radius: 50px;
}
.skip-to-main:focus {
  transform: translateY(0%);
}
</style>
