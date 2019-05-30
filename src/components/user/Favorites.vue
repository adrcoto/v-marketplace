<template>
    <v-layout column justify-center>
        <v-layout column justify-center>
            <v-flex :key="favorite.item_id" v-for="favorite in favorites">
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
                                        <div>
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
                                    <v-card-text class="text-md-right">
                                        <v-chip dark color="primary" class="subheading">
                                            {{favorite.price}}
                                            <span class="ml-2" v-if="favorite.currency === 0">lei</span>
                                            <span class="ml-2" v-else>€</span>
                                        </v-chip>
                                    </v-card-text>
                                    <v-card-text>
                                        <v-tooltip left>
                                            <template v-slot:activator="{ on }">
                                                <v-btn @click.stop="removeFromFavorites(favorite.item_id)" icon color="error" v-on="on">
                                                    <v-icon>star</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Șterge anunțul din lista de favorite</span>
                                        </v-tooltip>
                                    </v-card-text>
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
            removeFromFavorites(id){
                this.$store.dispatch('removeFromFavorite', id);
            }
        },
        computed: {
            favorites() {
                let wtf = [];
                this.$store.getters.favorites.forEach((favorite) => {
                    wtf.push(this.$store.getters.items.find(item => item.item_id === favorite.item));
                });

                return wtf;
            },
        },
    };
</script>

<style scoped>

</style>