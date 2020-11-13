// import SCSSvariables from './SCSS/custom.scss';

var districtName = 'chapelhill'
var primaryColor = null
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

var urlString = window.location.href

const county = urlString.split('/')[3]

switch (county) {
  case 'chapelhill':
    districtName = 'chapelhill'
    primaryColor = 'd59402'
    initialMapCenterLat = 35.943068
    initialMapCenterLng = -79.097216
    initialMapZoom = 12
    clusterZoom = 12
    maxZoom = 17
    minZoom = 12
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1DTbNqqclTQ6_RqVKc2chMoomz5HZxVv1owW2h67qWro/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  case 'durham':
    districtName = 'durham'
    primaryColor = ''
    initialMapCenterLat = 35.994
    initialMapCenterLng = -78.8986
    initialMapZoom = 11
    clusterZoom = 13
    maxZoom = 17
    minZoom = 11
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1kclyQ5Q-sOOSLARn_qaLxXUnq5f6Q8XWGNvAM5po6E0/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  case 'cms':
    districtName = 'cms'
    primaryColor = ''
    initialMapCenterLat = 35.2271
    initialMapCenterLng = -80.8431
    initialMapZoom = 10
    clusterZoom = 13
    maxZoom = 17
    minZoom = 10
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1fZBlAwDsSkLPxy2CU3nafPMIAjWKsbY7dDySCaspu6I/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  case 'roanoke':
    districtName = 'roanoke'
    primaryColor = ''
    initialMapCenterLat = 36.4615
    initialMapCenterLng = -77.6541
    initialMapZoom = 14
    clusterZoom = 14
    maxZoom = 17
    minZoom = 14
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1d6kgVHTBBsSnG7dzx51iPPrbnkxS0MUewwTC1KB0tCQ/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  case 'chatham':
    districtName = 'chatham'
    primaryColor = ''
    initialMapCenterLat = 35.7235
    initialMapCenterLng = -79.4622
    initialMapZoom = 11
    clusterZoom = 14
    maxZoom = 17
    minZoom = 11
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1r6uyEPzmiPzdb77niHbgHzSoPGth9Pzt1FiriviJkyU/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  case 'wake':
    districtName = 'wake'
    primaryColor = ''
    initialMapCenterLat = 35.7796
    initialMapCenterLng = -78.6382
    initialMapZoom = 10
    clusterZoom = 12
    maxZoom = 17
    minZoom = 10
    spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1JYqkJR8BtNC71Uerg0PTOPdr3KCz6NW4N0kbFiSBHOU/1/public/values?alt=json'
    lightUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    lightAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    darkUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    darkAttribution =
      '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    break
  default:
    districtName = 'chapelhill'
    primaryColor = 'd59402'
    initialMapCenterLat = 35.943068
    initialMapCenterLng = -79.097216
    initialMapZoom = 12
    clusterZoom = 12
    maxZoom = 17
    minZoom = 12
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
    primaryColor: primaryColor
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
