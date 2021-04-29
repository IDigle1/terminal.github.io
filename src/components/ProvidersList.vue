<template>
    <v-row>
        <v-col cols="12">
            <h2 class="text-center">Выберите оператора</h2>
        </v-col>
        <v-col cols="12">
            <provider-item v-for="provider in getProviders" :provider="provider" :key="provider.code" />
        </v-col>
    </v-row>
</template>

<script>
import ProviderItem from '@/components/ProviderItem';
import { FETCH_PROVIDERS } from '../store/types/actions.types';

export default {
    components: {
        ProviderItem
    },
    computed: {
        getProviders() {
            return this.$store.getters.getProviders;
        }
    },
    mounted() {
        this.$store.dispatch(FETCH_PROVIDERS);
    }
}
</script>

<style>

</style>