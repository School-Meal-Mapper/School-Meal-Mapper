<template>
  <b-list-group class="list-group list-group-flush">
    <b-list-group-item variant="sideNav" :class="infotype">
      <i class="fas" :class="icon" />
      <div>
        <slot></slot>
      </div>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { districtData } from '../themes/MealsForFamilies/districtData'

document.documentElement.style.setProperty('--primary-color', districtData.colors.primaryColor)
console.log('InfoPanel ran')

export default {
  name: 'InfoPanel',
  data() {
    return {}
  },
  props: {
    infotype: { type: String },
    icon: { type: String }
  }
}
</script>

<style lang="scss">
.root {
  --primary-color: red;
}

.note,
.handwash {
  font-size: 0.8rem;
}

.note i,
.handwash i {
  font-size: 3rem;
  color: var(--primary-color);
  // @media (prefers-color-scheme: dark) {
  //   color: theme-color-level(primary, 5);
  // }
  margin: 7px 10px 0 0;
  float: left;
}

.handwash i {
  color: var(--primary-color);
  // @media (prefers-color-scheme: dark) {
  //   color: theme-color-level(primary, 5);
  // }
}

.note div,
.handwash div {
  display: inline-block;
  width: 185px;
}
</style>
