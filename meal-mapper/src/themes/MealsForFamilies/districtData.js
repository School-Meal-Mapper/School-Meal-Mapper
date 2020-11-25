/*
  districtData.js

  Exported as districtData and imported in App, Header, FAQ, and other places that rely on
  district properties and conditional theming. Currently, info is hardcoded in for convenience and
  ease of use. If the project scales, our practices for keeping this data should change.
*/

var districtName = 'chapelhill'
var primaryColor = null
var bannerColor = null
var bannerColorDark = null
var initialMapCenterLat = null
var initialMapCenterLng = null
var initialMapZoom = null
var clusterZoom = null
var maxZoom = null
var minZoom = null
var spreadsheetUrl = null
var lightUrl = null
var lightAttribution = null
var darkUrl = null
var darkAttribution = null
var navLink = '#f8f8ff'
var navLinkDark = '#f8f8ff'

var urlString = window.location.href
var url = new URL(urlString)
var district = url.searchParams.get('d')

//const county = urlString.split('/')[3]

switch (district) {
  case 'chapelhill':
    // district name and theming
    districtName = 'chapelhill'
    primaryColor = '#0063b1'
    bannerColor = '#E9ECEF'
    bannerColorDark = '#212529'
    navLink = '#313639'
    navLinkDark = '#f8f8ff'
    // map settings for district-specific page
    initialMapCenterLat = 35.943068
    initialMapCenterLng = -79.097216
    initialMapZoom = 12
    clusterZoom = 12
    maxZoom = 17
    minZoom = 12
    // data source urls and attributions
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1DTbNqqclTQ6_RqVKc2chMoomz5HZxVv1owW2h67qWro/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  case 'durham':
    // district name and theming
    districtName = 'durham'
    primaryColor = '#024379'
    bannerColor = '#024379'
    bannerColorDark = '#113858'
    // map settings for district-specific page
    initialMapCenterLat = 35.994
    initialMapCenterLng = -78.8986
    initialMapZoom = 11
    clusterZoom = 13
    maxZoom = 17
    minZoom = 11
    // data source urls and attributions
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1kclyQ5Q-sOOSLARn_qaLxXUnq5f6Q8XWGNvAM5po6E0/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  case 'cms':
    // district name and theming
    districtName = 'cms'
    primaryColor = '#0ba2ae'
    bannerColor = '#04ACD4'
    bannerColorDark = '#015A6E'
    // map settings for district-specific page
    initialMapCenterLat = 35.2271
    initialMapCenterLng = -80.8431
    initialMapZoom = 10
    clusterZoom = 13
    maxZoom = 17
    minZoom = 10
    // data source urls and attributions
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1fZBlAwDsSkLPxy2CU3nafPMIAjWKsbY7dDySCaspu6I/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  case 'roanoke':
    // district name and theming
    districtName = 'roanoke'
    primaryColor = '#d59402'
    bannerColor = '#333333'
    bannerColorDark = '#000000'
    // map settings for district-specific page
    initialMapCenterLat = 36.4615
    initialMapCenterLng = -77.6541
    initialMapZoom = 14
    clusterZoom = 14
    maxZoom = 17
    minZoom = 14
    // data source urls and attributions
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1d6kgVHTBBsSnG7dzx51iPPrbnkxS0MUewwTC1KB0tCQ/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  case 'chatham':
    // district name and theming
    districtName = 'chatham'
    primaryColor = '#6d375c'
    bannerColor = '#ECE8EF'
    bannerColorDark = '#151414'
    // map settings for district-specific page
    initialMapCenterLat = 35.7235
    initialMapCenterLng = -79.4622
    initialMapZoom = 11
    clusterZoom = 14
    maxZoom = 17
    minZoom = 11
    // data source urls and attributions
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1r6uyEPzmiPzdb77niHbgHzSoPGth9Pzt1FiriviJkyU/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  case 'wake':
    // district name and theming
    districtName = 'wake'
    primaryColor = '#005498'
    bannerColor = '#005498'
    bannerColorDark = '#002543'
    // map settings for district-specific page
    initialMapCenterLat = 35.7796
    initialMapCenterLng = -78.6382
    initialMapZoom = 10
    clusterZoom = 12
    maxZoom = 17
    minZoom = 10
    // data source urls and attributions
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1JYqkJR8BtNC71Uerg0PTOPdr3KCz6NW4N0kbFiSBHOU/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  default:
    // current default is chapel hill (i.e. what happens when you don't type in a query). This should change to nav page.
    // district name and theming
    districtName = 'chapelhill'
    primaryColor = '#0063b1'
    bannerColor = '#E9ECEF'
    bannerColorDark = '#212529'
    navLink = '#313639'
    navLinkDark = '#f8f8ff'
    // map settings for district-specific page
    initialMapCenterLat = 35.943068
    initialMapCenterLng = -79.097216
    initialMapZoom = 12
    clusterZoom = 12
    maxZoom = 17
    minZoom = 12
    // data source urls and attributions
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1DTbNqqclTQ6_RqVKc2chMoomz5HZxVv1owW2h67qWro/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
}

// console.log("DEBUG: primary theme color: " +  SCSSvariables.theme-color-primary)

export const districtData = {
  districtName: districtName,
  colors: {
    primaryColor: primaryColor,
    bannerColor: bannerColor,
    bannerColorDark: bannerColorDark,
    navLink: navLink,
    navLinkDark: navLinkDark
  },
  settings: {
    initialMapCenter: {
      lat: initialMapCenterLat,
      lng: initialMapCenterLng
    },
    initialMapZoom: initialMapZoom,
    clusterZoom: clusterZoom,
    maxZoom: maxZoom,
    minZoom: minZoom
  },
  socialMedia: [{}],
  data: {
    spreadsheetUrl: spreadsheetUrl
  },
  maps: {
    normal: {
      url: lightUrl,
      attribution: lightAttribution
    },
    dark: {
      url: darkUrl,
      attribution: darkAttribution
    }
  }
}