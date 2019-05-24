<template>
    <v-layout justify-center>
        <v-flex xs6>
            <v-card>
                <v-text-field
                        flat
                        solo-inverted
                        hide-details
                        prepend-inner-icon="search"
                        :label="'Căutare in ' + itemsLength + ' anuțuri disponibile'"
                        @keyup.enter="query"
                        v-model="q"
                ></v-text-field>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
       data: () => ({
           q: ''
       }),
        methods: {
            query() {
                this.$store.dispatch('loadItems', this.q);
            }
        },
        computed: {
           itemsLength(){
               return this.$store.getters.items.length
           }
        }
    };
</script>

<style scoped>

</style>
