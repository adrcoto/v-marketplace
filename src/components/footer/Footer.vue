<template>
    <v-footer dark height="auto">
        <v-card class="flex" flat tile>
            <v-card-actions style="height: 55px"  class="justify-center" :class="{'grey darken-3': dark, 'blue darken-3': !dark}">
                &copy;&nbsp;<strong>V</strong>—Marketplace
                &nbsp;—&nbsp;<strong>Vue.js & Vuetify.js</strong>&nbsp;—&nbsp;2019
            </v-card-actions>
        </v-card>
    </v-footer>
</template>
<script>
    export default {
        data: () => ({}),
        computed: {
            dark() {
                return this.$store.getters.darkTheme;
            }
        }
    }
</script>
<style scoped>

</style>