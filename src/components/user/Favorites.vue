<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout column justify-center>
        <v-layout row v-if="favorites.length > 1">
            <v-spacer></v-spacer>
            <div style="width: 50px">
                <v-select
                        label="Anunțuri"
                        menu-props="offsetY"
                        :items="perPageOptions"
                        item-text="name"
                        dense
                        :value="perPage"
                        @change="setPerPageFilter"
                >
                </v-select>
            </div>
        </v-layout>
        <div class="text-md-center" v-else>
            Nu aveți anunțuri favorite
        </div>
        <v-layout column justify-center>
            <v-flex>
                <div class="text-md-center" v-if="favorites === null"> Nu aveți anuțuri favorite</div>
            </v-flex>
<!--            <transition-group name="slide" type="animation">-->
                <v-flex v-if="favorites !== null" :key="favorite.item_id" v-for="favorite in favorites">
                    <v-hover>
                        <v-card @click.stop="viewItem(favorite)" style="cursor: pointer"
                                :class="`elevation-${hover ? 10 : 2}`" class="item-card mb-4"
                                slot-scope="{ hover }">
                            <v-layout row>
                                <v-flex xs3 md3 lg3 x13>
                                    <v-img :src="favorite.images.length > 0 ? API_URL + favorite.images[0].filename : require('../../assets/no-available-image.png')"
                                           height="155">
                                    </v-img>
                                </v-flex>
                                <v-flex xs6 sm6 md6 lg6 xl8>
                                    <v-layout>
                                        <v-flex>
                                            <div class="ml-3 mt-3">
                                                <div class="item-card-title title">
                                                    {{favorite.title}}
                                                </div>
                                                <div class="mt-4">
                                                    <v-icon>location_on</v-icon>
                                                    {{favorite.city}}, {{favorite.district}}
                                                </div>
                                                <div class="mt-1">
                                                    <v-icon>query_builder</v-icon>
                                                    {{favorite.created_at}}
                                                </div>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs2 md2 lg2 x11>
                                    <v-layout column align-end class="mr-3">
                                        <div class="mt-2 mb-5">
                                            <v-chip dark color="primary" class="subheading">
                                                {{favorite.price}}
                                                <span class="ml-2" v-if="favorite.currency === 0">lei</span>
                                                <span class="ml-2" v-else>€</span>
                                            </v-chip>
                                        </div>
                                        <div class="mt-1">
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
                </v-flex>
<!--            </transition-group>-->
        </v-layout>
        <v-spacer/>
        <div class="text-xs-center" v-if="favorites.length > 0">
            <v-pagination
                    :value="page"
                    :length="Math.ceil(itemsMaxLength / perPage)"
                    circle
                    :total-visible="pagesVisible"
                    @input="changePage"
            ></v-pagination>
        </div>
    </v-layout>
</template>

<script>
    export default {
        data: () => ({
            API_URL: 'http://dev.shop/storage/',
            pagesVisible: 10,
            perPageOptions: [
                10, 15, 20, 30
            ],
        }),
        methods: {
            viewItem(item) {
                this.$router.push({path: '/anunt/' + item.slug, query: {id: item.item_id}});
            },
            removeFromFavorites(id) {
                if (this.favorites.length === 1)
                    if (this.page > 1)
                        this.$store.commit('setFavoritesItemsPage', this.page - 1);
                this.$store.dispatch('removeFromFavorite', id);
            },
            changePage(page) {
                this.$store.commit('setFavoritesItemsPage', page);
                this.$store.dispatch('loadFavorites')
            },
            setPerPageFilter(perPage) {
                this.$store.commit('setFavoritesItemsPage', 1);
                this.$store.commit('setFavoritesItemsPerPage', perPage);
                this.$store.dispatch('loadFavorites')
            },
        },
        computed: {
            favorites() {
                return this.$store.getters.favorites;
            },
            itemsMaxLength() {
                return this.$store.getters.favoritesItemsCount;
            },
            perPage() {
                return this.$store.getters.favoritesItemsPerPage;
            },
            page() {
                return this.$store.getters.favoritesItemsPage;
            },
        },

    };
</script>

<style scoped>
    .item-card-title {
        height: 50px;
        overflow: hidden;
    }


    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 0.5s;
    }

    .fade-leave {
        /*opacity: 1;*/
    }

    .fade-leave-active {
        transition: opacity 0.5s;
        opacity: 0;
    }

    .slide-enter {
        opacity: 0;
    }

    .slide-enter-active {
        animation: slide-in 1.0s ease-out forwards;
        transition: opacity 1.0s;
    }

    .slide-leave {

    }

    .slide-leave-active {
        animation: slide-out 1.0s ease-out forwards;
        transition: opacity 1.0s;
        opacity: 0;
        position: absolute;
    }

    .slide-move {
        transition: transform 1.0s;
    }

    @keyframes slide_in {
        from {
            transform: translateX(100px);
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(100px);
        }
    }
</style>