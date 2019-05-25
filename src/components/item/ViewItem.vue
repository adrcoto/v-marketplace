<template>
    <v-layout justify-center row>
        <v-flex xs6 sm8 md10 lg11 xl10>
            <v-card class="pa-5">
                <v-card-title>
                    <h2>{{ this.$route.params.title}}</h2>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data: () => ({}),
        methods: {

        }
    };
</script>

<style scoped>

</style>
