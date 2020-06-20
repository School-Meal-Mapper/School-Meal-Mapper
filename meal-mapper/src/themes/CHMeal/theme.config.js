export const theme = {
  settings: {
    initialMapCenter: {
      lat: 35.943068,
      lng: -79.097216
    },
    initialMapZoom: 12
  },
  socialMedia: [
    {
      name: 'GitHub',
      icon: 'github',
      url: 'https://github.com/code-for-chapel-hill/School-Meal-Mapper'
    }
  ],
  data: {
    spreadsheetUrl: 'https://spreadsheets.google.com/feeds/list/1wdW0piXpOlL1REibmqeuM86HayW9smBIaS3FsitpquE/1/public/values?alt=json'
  },
  maps: {
    normal: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', // 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      attribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }
  }
}
