<template>
  <div class="home">
    <app-header :language="language.name" @search="searchLoc" @language-selected="changeLanguage" :socialMedia="socialMediaico">
      <theme-header :districtName="districtName"></theme-header>
    </app-header>
    <faq-modal />
    <covid-pop-up />

    <div class="d-flex" id="wrapper" :class="{ toggled: isFilterOpen }" v-if="!!entries">
      <results-list
        :filteredMarkers="highlightFilteredMarkers"
        :location="locationData"
        @location-selected="passLocation"
        @hover-over="passHover"
        @hover-leave="passNoHover"
        v-if="showList"
        :showResults="showResults"
        :selected-day="day"
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
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'

import ResourceMap from './components/ResourceMap.vue'
import ShareModal from './components/ShareModal.vue'
import SuggestEditModal from './components/EditForm.vue'
import FaqModal from './components/FAQ.vue'
import CovidPopUp from './components/CovidPopUp.vue'

import ResultsList from './components/ResultsList.vue'

import { latLng } from 'leaflet'
import { haversineDistance, sortByDistance } from './utilities'

import { dayFilters, booleanFilters, dayAny } from './constants'

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
  },
  components: {
    ShareModal,
    SuggestEditModal,
    AppHeader,
    FaqModal,
    CovidPopUp,
    ResourceMap,
    ThemeHeader,
    ResultsList
  },
  data() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    return {
      entries: null,
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
      districtName: districtData.districtName
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
      const entries = await res.json()

      // if (entries !== null) {
      //   entries.forEach(c => {
      //     c
      //   });
      // }

      this.entries = entries.feed.entry
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
      var fetchString = 'https://nominatim.openstreetmap.org/search?key=9Rl2TaZFQpBPsnQmQo6cq79sl3Rf9EfA&q=' + location + '&format=json'
      fetch(fetchString)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            alert(this.$t('search.noresults'))
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
            alert(this.$t('search.noresults'))
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
    }
  },
  computed: {
    filteredMarkers() {
      if (this.entries == null) return null

      var markers
      markers = this.entries

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

<style></style>
