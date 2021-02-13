export const dayAny = 7

export const weekdays = [
  { day: 'any', pos: dayAny },
  { day: 'monday', pos: 1 },
  { day: 'tuesday', pos: 2 },
  { day: 'wednesday', pos: 3 },
  { day: 'thursday', pos: 4 },
  { day: 'friday', pos: 5 },
  { day: 'saturday', pos: 6 },
  { day: 'sunday', pos: 0 }
]

export const weekdaysJs = [
  { day: 'sunday' },
  { day: 'monday' },
  { day: 'tuesday' },
  { day: 'wednesday' },
  { day: 'thursday' },
  { day: 'friday' },
  { day: 'saturday' }
]

export const weekdayHours = [
  { day: 'monday' },
  { day: 'tuesday' },
  { day: 'wednesday' },
  { day: 'thursday' },
  { day: 'friday' },
  { day: 'saturday' },
  { day: 'sunday' }
]

export const openStreetMapAttribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

export const dayFilters = ['mon', 'tues', 'wed', 'thr', 'fri', 'sat', 'sun'].map((attr) => `gsx$${attr}`)
export const days = ['sun', 'mon', 'tues', 'wed', 'thr', 'fri', 'sat'].map((attr) => `gsx$${attr}`)
export const seniorDayFilters = ['mon', 'tues', 'wed', 'thr', 'fri', 'sat', 'sun'].map((attr) => `gsx$sp${attr}`)

export const states = [
  { value: 'al', text: 'Alabama' },
  { value: 'ak', text: 'Alaska' },
  { value: 'az', text: 'Arizona' },
  { value: 'ar', text: 'Arkansas' },
  { value: 'ca', text: 'California' },
  { value: 'co', text: 'Colorado' },
  { value: 'ct', text: 'Connecticut' },
  { value: 'de', text: 'Delaware' },
  { value: 'fl', text: 'Florida' },
  { value: 'ga', text: 'Georgia' },
  { value: 'hi', text: 'Hawaii' },
  { value: 'id', text: 'Idaho' },
  { value: 'il', text: 'Illinois' },
  { value: 'in', text: 'Indiana' },
  { value: 'ia', text: 'Iowa' },
  { value: 'ks', text: 'Kansas' },
  { value: 'ky', text: 'Kentucky' },
  { value: 'la', text: 'Louisiana' },
  { value: 'me', text: 'Maine' },
  { value: 'md', text: 'Maryland' },
  { value: 'ma', text: 'Massachusetts' },
  { value: 'mi', text: 'Michigan' },
  { value: 'mn', text: 'Minnesota' },
  { value: 'ms', text: 'Mississippi' },
  { value: 'mo', text: 'Missouri' },
  { value: 'mt', text: 'Montana' },
  { value: 'ne', text: 'Nebraska' },
  { value: 'nv', text: 'Nevada' },
  { value: 'nh', text: 'New Hampshire' },
  { value: 'nj', text: 'New Jersey' },
  { value: 'nm', text: 'New Mexico' },
  { value: 'ny', text: 'New York' },
  { value: 'nc', text: 'North Carolina' },
  { value: 'nd', text: 'North Dakota' },
  { value: 'oh', text: 'Ohio' },
  { value: 'ok', text: 'Oklahoma' },
  { value: 'or', text: 'Oregon' },
  { value: 'pa', text: 'Pennsylvania' },
  { value: 'ri', text: 'Rhode Island' },
  { value: 'sc', text: 'South Carolina' },
  { value: 'sd', text: 'South Dakota' },
  { value: 'tn', text: 'Tennessee' },
  { value: 'tx', text: 'Texas' },
  { value: 'ut', text: 'Utah' },
  { value: 'vt', text: 'Vermont' },
  { value: 'va', text: 'Virginia' },
  { value: 'wa', text: 'Washington' },
  { value: 'wv', text: 'West Virginia' },
  { value: 'wi', text: 'Wisconsin' },
  { value: 'wy', text: 'Wyoming' }
]

export const districts = {
  nc: [
    { value: 'chccs', text: 'Chapel Hill-Carrboro City Schools' },
    { value: 'cms', text: 'Charlotte-Mecklenburg Schools' },
    { value: 'chatham', text: 'Chatham County Schools' },
    { value: 'dps', text: 'Durham Public Schools' },
    { value: 'jcps', text: 'Johnston County Public Schools' },
    { value: 'rss', text: 'Roanoke Rapids Graded School District' },
    { value: 'wake', text: 'Wake County Public Schools' }
  ]
}

export const booleanFilters = [
  'in-storepickup',
  'curbside',
  'specialhours',
  'mealstudent',
  'mealpublic',
  'familymeal',
  'orderonline',
  'payonline',
  'mustpreorder',
  'discountmedical',
  'delivery',
  'freeproduce',
  'freegroceries',
  'farmpick-up',
  'farmersmarket'
]
