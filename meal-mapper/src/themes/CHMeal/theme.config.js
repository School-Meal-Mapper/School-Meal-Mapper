export const theme = {
  settings: {
    initialMapCenter: {
      lat: 39.8283,
      lng: -98.5795,
    },
    initialMapZoom: 5,
  },
  socialMedia: [
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com/code-for-chapel-hill/School-Meal-Mapper",
    },
  ],
  data: {
    spreadsheetUrl:
      "https://spreadsheets.google.com/feeds/cells/1wdW0piXpOlL1REibmqeuM86HayW9smBIaS3FsitpquE/1/public/full?alt=json",
  },
  maps: {
    normal: {
      url:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
    dark: {
      url:
        "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png", // 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      attribution:
        '&copy; <a href="https://carto.com/">Carto</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
  },
};
