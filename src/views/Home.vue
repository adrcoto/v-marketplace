<template>
    <v-layout>
        <app-items></app-items>
    </v-layout>
</template>

<script>
    import items from '../components/item/Items';


    export default {
        components: {
            appItems: items
        },
        methods: {

        }
    };
</script>
