<template>
  <provider :provider="getCurrentProvider" />
</template>

<script>
import Provider from '@/components/Provider'
import { FETCH_PROVIDER } from '../store/types/actions.types';

export default {
  name: 'ProviderPage',
  components: {
    Provider
  },
  computed: {
    getCurrentProvider() {
      return this.$store.getters.getCurrentProvider
    }
  },
  created() {
    this.$store.dispatch(FETCH_PROVIDER, this.$route.params.code);
  }
}
</script>

<style>

</style>
