<template>
    <v-layout justify-center>
        <v-flex lg8 md10 sm10 xl6 xs11>
            <v-tabs v-model="tab" class="mb-3" color="transparent" lider-color="white" grow
            >
                <v-tab v-for="tabItem in tabItems" :key="tabItem.name" class="mr-3">{{tabItem.name}}</v-tab>
            </v-tabs>
            <v-tabs-items>
                <v-tab-item v-for="n in tabItems.length" :key="n">
                    <!--                    <v-layout justify-center>-->
                    <!--                        <v-flex lg8 md10 sm10 xl6 xs11>-->
                    <v-card class="pa-4">
                        <component :is="'app-' + components[tab]"></component>
                    </v-card>
                    <!--                        </v-flex>-->
                    <!--                    </v-layout>-->
                </v-tab-item>
            </v-tabs-items>
        </v-flex>
    </v-layout>
</template>

<script>
    import MyItems from './MyItems';
    import Messages from './Messages';
    import Favorites from './Favorites';
    import Settings from './Settings';

    export default {
        data() {
            return {
                tabItems: [
                    {name: 'Anuțurile mele'},
                    {name: 'Mesaje'},
                    {name: 'Favorite'},
                    {name: 'Setări cont'},
                ],
                tab: 0,
                components: [
                    'my-items',
                    'messages',
                    'favorites',
                    'settings',
                ],
            };
        },
        components: {
            appMyItems: MyItems,
            appMessages: Messages,
            appFavorites: Favorites,
            appSettings: Settings,
        },


        created() {
            this.$store.dispatch('loadFavorites').then(response => {
                if (response && response.data && response.data.responseType === 'success') {
                    this.$store.commit('setFavorites', response.data.data);
                } else {
                    this.$store.dispatch('loadFavorites');
                }
            });
        },
    };
</script>

<style scoped>

</style>
