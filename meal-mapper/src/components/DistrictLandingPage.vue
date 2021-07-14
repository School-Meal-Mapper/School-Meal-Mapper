<template>
  <div class="home">
    <!-- +++++++++++++++ rename skippers --->
    <!--
    <a class="skip-to-main" href="#search-filter-wrapper" v-if="!checkParam">
      Skip to results.
    </a> --->
    <!-- Above: meal site skipper; Below: landing page skipper -->
    <!--
    <a class="skip-to-main" href="#mealsite-info" v-if="checkParam">
      Skip to main.
    </a> --->
    <!-- 
    <app-header
      :logoLink="logoLink"
      :language="language.name"
      @search="searchLoc"
      @language-selected="changeLanguage"
      :socialMedia="socialMediaico"
      :hasFaqs="faqUrl != null"
    >
      <theme-header :districtAbbr="districtAbbr" :logoFormat="logoFormat" :districtName="districtName"></theme-header>
    </app-header>  --->
    <div class="d-flex">
      <b-button class="find-site" v-on:click="mapLink">{{ this.$t('landingPage.findFreeMealsNearMe') }}</b-button>
      <div class="district-buttons">
        <!-- +++++++++++++++ add icon and change the on:click --->
        <!-- +++++++++++++++ statements need to become vars and 18 should be var based on meal site #'s--->
        <p class="program-info" id="mealsite-info">{{ 'Join us this summer for free meals at one of our 18 locations!' }}</p>
        <p>
          <b-button v-on:click="mapLink" class="prog-btns">{{ 'Learn More About Free Meals' }}</b-button>
          <b-icon-question-circle-fill></b-icon-question-circle-fill>
          <b-button v-on:click="mapLink" class="prog-btns">{{ 'Menu & Special Events' }}</b-button>
          <b-icon-calendar3></b-icon-calendar3>
          <b-button v-on:click="mapLink" class="prog-btns">{{ 'Register for Free School-Year Meals' }}</b-button>
          <b-icon-check2-square></b-icon-check2-square>
          <b-button v-on:click="mapLink" class="prog-btns">{{ 'Get Money for Groceries' }}</b-button>
          <b-icon-cart4></b-icon-cart4>
          <b-button v-on:click="mapLink" class="prog-btns">{{ 'Not Your Local Meal Provider?' }}</b-button>
          <!-- +++++++++++++++ need button for find another sponsor --->
          <b-button v-on:click="mapLink" class="prog-btns">{{ 'Need Help? Connect With Us!' }}</b-button>
          <b-icon-chat-text></b-icon-chat-text>
        </p>
      </div>
    </div>
    <!--
    <div class="d-flex" id="wrapper" :class="{ toggled: isFilterOpen }" v-if="!!entries && showMap">
      <results-list
        :location="locationData"
        @location-selected="passLocation"
        @hover-over="passHover"
        @hover-leave="passNoHover"
        @search="searchLoc"
      />
    </div>
    --->
    <router-view />
  </div>
</template>
<!-- 
<style lang="scss">
// @import './themes/DurhamMeal/SCSS/custom.scss';
// </style>
-->

<script>
import { districtData } from '../themes/MealsForFamilies/districtData'

document.documentElement.style.setProperty('--primary-color', districtData.colors.primaryColor)
document.documentElement.style.setProperty('--banner-light', districtData.colors.bannerColor)
document.documentElement.style.setProperty('--banner-dark', districtData.colors.bannerColorDark)
document.documentElement.style.setProperty('--nav-link-light', districtData.colors.navLink)
document.documentElement.style.setProperty('--nav-link-dark', districtData.colors.navLinkDark)

export default {
  name: 'DLP',
  props: {
    msg: String
  },
  watch: {
    currentPage: 'fetchData'
  },
  created() {
    this.fetchData()
    this.mapLink()
  },
  components: {
    //AppHeader,
    //ThemeHeader
  },
  data() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    return {
      entries: null,
      need: 'none',
      language: { name: 'English', iso: 'en' },
      darkModeMediaQuery: darkModeMediaQuery,
      darkMode: darkModeMediaQuery.matches,
      mapUrl: '',
      attribution: null,
      socialMediaico: districtData.socialMedia,
      hoverItem: null,
      districtAbbr: districtData.districtAbbr,
      logoFormat: districtData.logoFormat,
      districtName: districtData.districtName,
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
    mapLink() {
      location.href = '/map'
      return true
    },
    /*
    setDarkMode(darkMode) {
      this.mapUrl = darkMode ? districtData.maps.dark.url : districtData.maps.normal.url
      this.attribution = darkMode ? districtData.maps.dark.attribution : districtData.maps.normal.attribution
    },
    boxSelected: function (content) {
      this.highlightFilters = addOrRemove(this.highlightFilters, content.need)
    },
    needSelected: function (val) {
      this.need = val
      this.highlightFilters = []
    }, */
    changeLanguage: function (item) {
      this.language = item
      this.$root.updateLang(item.iso)
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
          /*this.searchLocData = latLng(location.lat, location.lon)
          const distances = this.filteredMarkers.map((entry) =>
            haversineDistance([location.lat, location.lon], [entry.marker.gsx$lat.$t, entry.marker.gsx$lon.$t], true)
          )
          const index = distances.indexOf(Math.min(...distances))
          const val = {
            locValue: index,
            isSetbyMap: false
          }
          this.passLocation(val)
          */
        })
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
    /*
    districtOptions() {
      if (this.selectedState == 'nc') {
        return districts[this.selectedState]
      }
      if (this.selectedState == null) {
        return [{ value: null, text: this.$t('landingPage.youMustSelectState') }]
      } else {
        return [{ value: null, text: this.$t('landingPage.youMustSelectState') }]
      }
    }, */
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
      return urlString.includes('/map')
    }
  }
}
</script>

<style>
.root {
  --primary-color: blue;
  --banner-light: '#E9ECEF';
  --banner-dark: '#212529';
  --nav-link-light: '#F8F8F8';
  --nav-link-dark: '#F8F8F8';
}
/*
body {
  color: #808080 !important;
  background-color: #ffffff !important;
} */
/*styles the find site button*/
.find-site {
  /* padding and margin if not pretty*/
  /* font-family: Noto Sans; */
  text-align: center;
  color: #000000;
  background-color: #79b80a;
}
/*styles the background for bottom half of page*/
.district-buttons {
  /* margin: 20vh auto;*/
  text-align: center;
  background-color: #ffffff;
}
/*styles the message at top*/
.program-info {
  /* font-family: Noto Sans;*/
  text-align: center;
  color: #ffffff;
  background-color: #0051ba;
}
/*styles the 6 buttons on figma*/
.prog-btns {
  text-align: center;
  color: #ffffff;
  background-color: #0051ba;
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
