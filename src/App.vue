<template>
  <v-app>
    <the-header />
    <v-main>
      <v-container class="theme-content">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from './components/TheHeader';

export default {
  name: 'App',
  components: {
    TheHeader
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.theme-content {
  max-width: 760px;
}
</style>