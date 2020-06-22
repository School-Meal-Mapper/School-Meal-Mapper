export function businessIcon() {
  return 'fas fa-utensils'
}

export function getAddress(marker) {
  var address = marker.gsx$mealsiteaddress !== undefined && marker.gsx$mealsiteaddress.$t !== '' ? marker.gsx$mealsiteaddress.$t + ', ' : ''
  address = address + (marker.gsx$city !== undefined && marker.gsx$city.$t !== '' ? marker.gsx$city.$t + ', ' : '')
  address = address + (marker.gsx$state !== undefined && marker.gsx$state.$t !== '' ? marker.gsx$state.$t + ' ' : '')
  return address + (marker.gsx$zip !== undefined && marker.gsx$zip.$t !== '' ? marker.gsx$zip.$t : '')
}

// See: https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript

/**
 * Calculates the haversine distance between point A, and B.
 * @param {number[]} latlngA [lat, lng] point A
 * @param {number[]} latlngB [lat, lng] point B
 * @param {boolean} isMiles If we are using miles, else km.
 */
export function haversineDistance([lat1, lon1], [lat2, lon2], isMiles = false) {
  const toRadian = (angle) => (Math.PI / 180) * angle
  const distance = (a, b) => (Math.PI / 180) * (a - b)
  const RADIUS_OF_EARTH_IN_KM = 6371

  const dLat = distance(lat2, lat1)
  const dLon = distance(lon2, lon1)

  lat1 = toRadian(lat1)
  lat2 = toRadian(lat2)

  // Haversine Formula
  const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.asin(Math.sqrt(a))

  let finalDistance = RADIUS_OF_EARTH_IN_KM * c

  if (isMiles) {
    finalDistance /= 1.60934
  }

  return finalDistance
}

export function sortByName(a, b) {
  var nameA = a.marker.gsx$providername.$t.toUpperCase() // ignore upper and lowercase
  var nameB = b.marker.gsx$providername.$t.toUpperCase() // ignore upper and lowercase
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  // names must be equal
  return 0
}

export function sortByDistance(a, b) {
  if (a.distance < b.distance) {
    return -1
  }
  if (a.distance > b.distance) {
    return 1
  }

  // names must be equal
  return 0
}
