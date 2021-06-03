<template>
  <v-app :style="{ backgroundImage: ($route.meta.showBackgroundImage)? whiteBackGroundImage: '' }">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    whiteBackGroundImage: `url(${require('@/assets/bg.jpg')})`
  })
};
</script>

<style scoped>
</style>
