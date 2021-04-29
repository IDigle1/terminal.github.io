<template>
  <v-card class="provider-item mb-2">
      <v-card-title @click="changeProvider(provider.code)">{{provider.name}}</v-card-title>
  </v-card>
</template>

<script>
export default {
    name: "ProviderItem",
    props: {
        provider: {
            name: String,
            code: String
        }
    },
    methods: {
        changeProvider(code) {
            this.$router.push(`/provider/${code}`)
        }
    }
    
}
</script>

<style>
    .provider-item {
        cursor: pointer;
    }
</style>