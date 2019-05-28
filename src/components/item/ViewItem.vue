<template>
    <v-layout justify-center row>
        <v-flex xs6 sm8 md10 lg11 xl10>
            <v-card class="pa-5">
                <v-card-title>
                    <h2>{{ this.$route.params.title}}</h2>
                </v-card-title>

                <v-btn @click="doTheTrick">Do the trick</v-btn>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data: () => ({}),
        methods: {
            doTheTrick(){
                console.log(this.$store.getters.item(this.$route.params.title));
            },
        }
    };
</script>

<style scoped>

</style>
