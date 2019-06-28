<template>
    <v-layout justify-center row>
        <!--         <v-flex sm2 class="ml-3 mr-3">
                     <v-card>
                         <v-layout column justify-center>
                             <v-layout row>
                                 <v-card-title>
                                     Filtreaza rezultatele
                                 </v-card-title>
                             </v-layout>
                             <v-card-text>
                                 Pret
                             </v-card-text>
                             <v-layout row>
                                 <v-card-text>

                                     <v-text-field placeholder="Pret minim" type="number">
                                     </v-text-field>
                                 </v-card-text>
                                 <v-card-text>
                                     <v-text-field placeholder="Pret maxim" type="number">
                                     </v-text-field>
                                 </v-card-text>
                             </v-layout>
                         </v-layout>
                     </v-card>
                 </v-flex>-->
        <v-label v-if="items.length === 0">Nici un rezultat!</v-label>
        <v-flex>
            <v-layout row wrap>
                <v-flex :key="item.item_id" v-for="item in items" xs12 sm6 md4 lg3 class="xl5-custom">
                    <v-layout justify-center>
                        <v-hover>
                            <v-card @click.stop="viewItem(item)" style="cursor: pointer"
                                    :class="`elevation-${hover ? 20 : 2}`" class="item-card mb-4"
                                    slot-scope="{ hover }"
                                    width="92%">
                                <v-img gradient lazy-src
                                       :src="item.images.length > 0 ? API_URL + item.images[0].filename : require('../../assets/no-available-image.png')"
                                       height="165">
                                    <span v-if="item.negotiable" class="negotiable" title="Anunt negociabil"></span>
                                    <v-expand-transition>
                                        <div class="d-flex transition-fast-in-fast-out v-card--reveal"
                                             v-if="hover">
                                            <v-card-actions>
                                                <v-spacer></v-spacer>

                                                <v-btn :class="{'hover-btn-pressed': isFavorite(item.item_id), 'hover-btn': !like}"
                                                       @click.stop="addToFavorites(item.item_id)"
                                                       class="hover-btn"
                                                       v-on="on"
                                                       icon>
                                                    <v-icon>favorite</v-icon>
                                                </v-btn>
                                            </v-card-actions>
                                        </div>
                                    </v-expand-transition>
                                </v-img>
                                <v-layout align-start justify-start style="font-size: 15px"
                                          class="ml-3 mt-4 mr-2 item-card-title font-weight-bold">
                                    {{item.title}}
                                </v-layout>

                                <v-chip app class="price" color="primary">
                                    {{item.price}}
                                    <span class="ml-2" v-if="item.currency === 0">lei</span>
                                    <span class="ml-2" v-else>€</span>
                                </v-chip>
                                <v-card-actions class="item-card-action">
                                    <div class="d-flex transition-fast-in-fast-out align-center" v-if="hover">
                                        <v-icon class="grey--text">location_on</v-icon>
                                        <span class="caption grey--text">
                                             {{item.city}}, {{item.district}}
                                        </span>
                                    </div>
                                    <div class="d-flex align-center" v-else>
                                        <v-icon class="grey--text">query_builder</v-icon>
                                        <span class="ml-1 caption grey--text">
                                            {{item.created_at}}
                                        </span>
                                    </div>
                                    <v-spacer/>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-layout>
                </v-flex>
            </v-layout>
            <div class="text-xs-center" v-if="items.length > 0">
                <v-pagination
                        :value="page"
                        :length="Math.ceil(itemsMaxLength / perPage)"
                        circle
                        :total-visible="pagesVisible"
                        @input="changePage"
                ></v-pagination>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data: () => ({
            API_URL: process.env.VUE_APP_API_URL,
            like: false,
            show: false,
            pagesVisible: 10,
        }),
        methods: {
            viewItem(item) {
                this.$router.push({path: '/anunt/' + item.slug, query: {id: item.item_id}});
            },
            changePage(page) {
                this.$store.commit('setPage', page);
                this.$store.dispatch('loadItems')
            },
            addToFavorites(id) {
                if (this.$store.getters.isAuthenticated) {
                    if (this.isFavorite(id)) {
                        this.$store.dispatch('removeFromFavorite', id);
                    } else {
                        this.$store.dispatch('addToFavorite', id);
                    }
                } else
                    this.$store.commit('showLogin');
            },
            isFavorite(id) {
                if (this.favorites) {
                    return this.favorites.find(favorite => favorite.item_id === id);
                }
            },
        },
        computed: {
            items() {
                return this.$store.getters.items;
            },
            favorites() {
                return this.$store.getters.favorites;
            },
            itemsMaxLength() {
                return this.$store.getters.itemsCount;
            },
            perPage() {
                return this.$store.getters.perPage;
            },
            page() {
                return this.$store.getters.page;
            }
        },
    };
</script>


<style scoped>

    @media (min-width: 1264px) and (max-width: 1903px) {
        .flex.lg5-custom {
            width: 20%;
            max-width: 20%;
            flex-basis: 20%;
        }
    }

    @media (min-width: 1264px) and (max-width: 1903px) {
        .flex.lg5-custom {
            width: 20%;
            max-width: 20%;
            flex-basis: 20%;
        }
    }

    @media (min-width: 1904px) {
        .flex.xl5-custom {
            width: 20%;
            max-width: 20%;
            flex-basis: 20%;
        }
    }

    .price {
        position: absolute;
        top: 145px;
        right: 10px;
        height: 30px;
        padding: 0 6px;
        line-height: 30px;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
        opacity: .9;
    }

    .item-card-title {
        height: 80px;
        overflow: hidden;
    }

    .hover-btn {
        color: orange;
        opacity: .9;
    }

    .hover-btn:hover {
        color: orangered;
    }

    .hover-btn-pressed {
        color: orangered;
    }


    .negotiable {
        background: url("../../assets/banner.png");
        text-indent: -1000em;
        overflow: hidden;
        display: inline-block;
        position: absolute;
        width: 83px;
        height: 82px;
    }

</style>