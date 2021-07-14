<template>
  <div v-if="!subvalue" class="tag-icon" aria-label="Tag" :style="lookup[value].css">
    {{ lookup[value].text }}
  </div>
  <div v-else class="tag-icon" aria-label="Tag" :style="lookup[value].css">
    {{ lookup[value].text }}
  </div>
</template>

<script>
/**
 * Tag.vue defines a common Tag object that will be used throughout the site.
 *
 * Tags will have a pill box shaped with no drop shadow by default. Only when
 * they are a button will they have a drop shadow.
 *
 * All tags with the same name will have a predefined color scheme here. This
 * way we can ensure contrast and consistency.
 *
 * When creating a tag, pass the "value" property to it. Values are defined in
 * the "created" hook in this file and they are based on the column names in
 * the spreadsheet minus any underscores. For dropdown columns like
 * "dietaryoptionsoffered", please pass an additonal "subvalue" property to it.
 *
 * For example, a "Vegetarian" tag should have a value of
 * "dietaryoptionsoffered" and a subvalue of "vegetarian"
 */
const lookup = {
  transitfriendly: {
    css: {
      'background-color': 'blue',
      color: 'white'
    },
    text: 'Near Transit'
  },
  foodpantry: {
    css: {
      'background-color': 'red',
      color: 'white'
    },
    text: 'Food Pantry'
  },
  prepackagedmealsavailable: {
    css: {
      'background-color': 'orange',
      color: 'black'
    },
    text: 'Prepackaged Meals Available'
  },
  dietaryoptionsoffered: {
    vegetarian: {
      css: {
        'background-color': 'green',
        color: 'white'
      },
      text: 'Vegetarian Options'
    },
    kosher: {
      css: {
        'background-color': 'azure',
        color: 'black'
      },
      text: 'Kosher Options'
    },
    halal: {
      css: {
        'background-color': 'gray',
        color: 'white'
      },
      text: 'Halal Options'
    },
    dairyfree: {
      css: {
        'background-color': 'white',
        color: 'black'
      },
      text: 'Dairy-Free Options'
    },
    nutfree: {
      css: {
        'background-color': 'yellow',
        color: 'black'
      },
      text: 'Nut-Free Options'
    },
    glutenfree: {
      css: {
        'background-color': 'purple',
        color: 'white'
      },
      text: 'Gluten-Free Options'
    }
  },
  hotmealsavailable: {
    css: {
      'background-color': 'darkred',
      color: 'white'
    },
    text: 'Hot Meals'
  }
}

export default {
  created() {
    this.lookup = lookup
  },
  props: {
    value: {
      type: String,
      required: true
    },
    subvalue: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.tag-icon {
  display: inline-block;
  padding: 0 15px;
  height: 1.3em; /* or ~ 20px */
  border-radius: 1.3em; /* must be same as height */
  line-height: 1.3em; /* must be same as height */
  text-align: center;
  vertical-align: middle;
}
</style>
