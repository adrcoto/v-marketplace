<template>
    <v-layout justify-center>
        <v-flex xs6>
            <v-card>
                <v-text-field
                        flat
                        solo-inverted
                        hide-details
                        prepend-inner-icon="search"
                        label="Search"
                ></v-text-field>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'Search',
    };
</script>

<style scoped>

</style>