<template>
    <v-layout column justify-center>
        <v-layout column justify-center>
            <v-flex>
                <div class="text-md-center" v-if="favorites === null"> Nu aveți anuțuri favorite</div>
            </v-flex>
            <v-flex v-if="favorites !== null" :key="favorite.item_id" v-for="favorite in favorites">
                <v-card-text>
                    <v-hover>
                        <v-card @click.stop="viewItem(favorite)" style="cursor: pointer"
                                :class="`elevation-${hover ? 20 : 2}`" class="item-card"
                                slot-scope="{ hover }">
                            <v-layout row>
                                <v-flex xs3 md3 lg3 x13>
                                    <v-img :src="favorite.images.length > 0 ? API_URL + favorite.images[0].filename : require('../../assets/no-available-image.png')"
                                           height="125">
                                    </v-img>
                                </v-flex>
                                <v-flex xs7 md7 lg7 x17>
                                    <div class="ml-3 mt-3">
                                        <div class="item-card-title title">
                                            {{favorite.title}}
                                        </div>
                                        <div class="mt-3">
                                            <v-icon>location_on</v-icon>
                                            {{favorite.location}}
                                        </div>
                                        <v-spacer/>
                                        <div>
                                            <v-icon>query_builder</v-icon>
                                            {{favorite.created_at}}
                                        </div>
                                    </div>
                                </v-flex>
                                <v-flex xs2 md2 lg2 x12>
                                    <v-layout column>
                                        <div class="mt-2 mb-3">
                                            <v-chip dark color="primary" class="subheading">
                                                {{favorite.price}}
                                                <span class="ml-2" v-if="favorite.currency === 0">lei</span>
                                                <span class="ml-2" v-else>€</span>
                                            </v-chip>
                                        </div>
                                        <div class="ml-4">
                                            <v-tooltip left>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn @click.stop="removeFromFavorites(favorite.item_id)" icon
                                                           color="warning" v-on="on">
                                                        <v-icon>star_half</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>Șterge anunțul din lista de favorite</span>
                                            </v-tooltip>
                                        </div>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-hover>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    export default {
        data: () => ({
            API_URL: 'http://dev.shop/storage/',
        }),
        methods: {
            viewItem(item) {
                this.$router.push({path: '/anunt/' + item.slug, query: {id: item.item_id}});
            },
            removeFromFavorites(id) {
                this.$store.dispatch('removeFromFavorite', id);
            }
        },
        computed: {
            favorites() {
              return this.$store.getters.favorites;
            },
        },

    };
</script>

<style scoped>

</style>