/*
  districtData.js

  Exported as districtData and imported in App, Header, FAQ, and other places that rely on
  district properties and conditional theming. Currently, info is hardcoded in for convenience and
  ease of use. If the project scales, our practices for keeping this data should change.
*/

var districtAbbr = 'mff'
var districtName = 'Meals 4 Families'
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
var faqUrl = null
var providerinfoUrl = null
var lightUrl = null
var lightAttribution = null
var darkUrl = null
var darkAttribution = null
var navLink = '#f8f8ff'
var navLinkDark = '#f8f8ff'

var urlString = window.location.href
var url = new URL(urlString)
var hash = url.hash.split('/')[1]

//var district = url.searchParams.get('d')

//const county = urlString.split('/')[3]

//switch (district) {
//case 'chapelhill':
if (url.searchParams.has('chccs') || hash == 'chccs') {
  // district name and theming
  districtAbbr = 'chapelhill'
  districtName = 'Chapel Hill-Carrboro City Schools'
  primaryColor = '#0063b1'
  //bannerColor = '#00a5ad'
  bannerColor = '0051BA'
  bannerColorDark = '#00224f'
  //bannerColorDark = '#0c6364'
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
  spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1suJY9SWEYxrQIBfb9VYl33cKNbWwBcxMaJc-hOCKVyY/1/public/values?alt=json'
  faqUrl = 'https://spreadsheets.google.com/feeds/list/1suJY9SWEYxrQIBfb9VYl33cKNbWwBcxMaJc-hOCKVyY/2/public/values?alt=json'
  providerinfoUrl = 'https://spreadsheets.google.com/feeds/list/1suJY9SWEYxrQIBfb9VYl33cKNbWwBcxMaJc-hOCKVyY/3/public/values?alt=json'
  lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
  lightAttribution =
    '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
  darkAttribution =
    '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
} /* else if (url.searchParams.has('dps') || hash == 'dps') {
  //case 'durham':
  // district name and theming
  districtAbbr = 'durham'
  districtName = 'Durham Public Schools'
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
  faqUrl = 'https://spreadsheets.google.com/feeds/list/1kclyQ5Q-sOOSLARn_qaLxXUnq5f6Q8XWGNvAM5po6E0/2/public/values?alt=json'
  lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
  lightAttribution =
    '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
  darkAttribution =
    '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
} else if (url.searchParams.has('cms') || hash == 'cms') {
  //case 'cms':
  // district name and theming
  districtAbbr = 'cms'
  districtName = 'Charlotte-Mecklenburg Schools'
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
} else if (url.searchParams.has('rss')) {
  //case 'roanoke':
  // district name and theming
  districtAbbr = 'roanoke'
  districtName = 'Roanoke Rapids Graded School District'
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
}  else if (
  url.searchParams.has('chatham') ||
  hash == 'chatham'
) {
  //case 'chatham':
  // district name and theming
  districtAbbr = 'chatham'
  districtName = 'Chatham County Schools'
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
} else if (url.searchParams.has('wake') || hash == 'wake') {
  //case 'wake':
  // district name and theming
  districtAbbr = 'wake'
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
}  else if (
  url.searchParams.has('jcps') ||
  hash == 'jcps'
) {
  //case 'wake':
  // district name and theming
  districtAbbr = 'johnston'
  districtName = 'Johnston County Public Schools'
  primaryColor = '#005498'
  bannerColor = '#0e2c6c'
  bannerColorDark = '#0e2c6c'
  // map settings for district-specific page
  initialMapCenterLat = 35.56928878
  initialMapCenterLng = -78.42296134 
  initialMapZoom = 10
  clusterZoom = 12
  maxZoom = 17
  minZoom = 10
  // data source urls and attributions
  spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1ldO41Qh93H-C9jZ4Y2SkAbdz1vfTdxQVup7GTVz-6I8/1/public/values?alt=json'
  lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
  lightAttribution =
    '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
  darkAttribution =
    '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}  */ else {
  if (urlString.includes('?')) {
    location.href = '/'
  }
  //default:
  // current default is chapel hill (i.e. what happens when you don't type in a query). This should change to nav page.
  // district name and theming
  districtAbbr = 'mff'
  districtName = 'Meals 4 Families'
  primaryColor = '#0063b1'
  bannerColor = '#1E5ADC'
  bannerColorDark = '#32325B'
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
  spreadsheetUrl = ''
  lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
  lightAttribution =
    '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
  darkAttribution =
    '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}

// console.log("DEBUG: primary theme color: " +  SCSSvariables.theme-color-primary)

export const districtData = {
  districtAbbr: districtAbbr,
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
    spreadsheetUrl: spreadsheetUrl,
    faqUrl: faqUrl,
    providerinfoUrl: providerinfoUrl
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
