<!--v-bind="{ [`xs${card.flex}`]: true }"-->
<template>
    <v-layout justify-center row>
        <v-flex sm2 class="ml-3 mr-3">
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
        </v-flex>
        <v-flex xs6 sm8 md10 lg11 xl10>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex :key="item.item_id" v-for="item in items" xs12 sm6 md4 lg3 xl2>
                            <v-layout justify-center>
                                <v-hover>
                                    <v-card @click="viewItem(item)" style="cursor: pointer"
                                            :class="`elevation-${hover ? 20 : 2}`" class="item-card mb-4"
                                            slot-scope="{ hover }"
                                            width="90%">
                                        <v-img :src="item.images.length > 0 ? API_URL + item.images[0].filename : require('../../assets/no-available-image.png')"
                                               height="165">

                                            <v-expand-transition>
                                                <div class="d-flex transition-fast-in-fast-out v-card--reveal"
                                                     v-if="hover">
                                                    <v-card-actions>
                                                        <v-btn :class="{'hover-btn-pressed': like, 'hover-btn': !like}"
                                                               @click="like = !like"
                                                               class="hover-btn"
                                                               icon>
                                                            <v-icon>favorite</v-icon>
                                                            <!--                                                            http://dev.shop/storage/images/images/jG1QCFkVHIW4kDqwbCzl30pNhxC38Moehy1961Wn.jpeg-->
                                                        </v-btn>
                                                        <v-btn class="hover-btn" icon>
                                                            <v-icon>bookmark</v-icon>
                                                        </v-btn>
                                                        <v-btn class="hover-btn" icon>
                                                            <v-icon>share</v-icon>
                                                        </v-btn>
                                                        <v-spacer></v-spacer>
                                                    </v-card-actions>
                                                </div>
                                            </v-expand-transition>
                                        </v-img>

                                        <!--                                        /<v-card-title class="item-card-title subheading font-weight-bold"-->
                                        <!--                                                      primary-title>-->
                                        <v-layout align-start justify-start
                                                  class="ml-3 mt-4 mr-2 item-card-title subheading font-weight-bold">
                                            {{item.title}}
                                        </v-layout>
                                        <!--                                        </v-card-title>-->
                                        <!---->
                                        <v-chip app class="price" color="primary">
                                            {{item.price}}
                                            <span class="ml-2" v-if="item.currency === 0">lei</span>
                                            <span class="ml-2" v-else>€</span>
                                        </v-chip>
                                        <v-card-actions class="item-card-action">
                                            <div class="d-flex transition-fast-in-fast-out" v-if="hover">
                                                    <span class="caption grey--text">
                                                        <v-icon class="grey--text">location_on</v-icon>
                                                        {{item.location}}
                                                    </span>
                                            </div>
                                            <div v-else>
                                                 <span class="caption grey--text">
                                                    <v-icon class="grey--text">query_builder</v-icon>
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
                </v-container>
                <div class="text-xs-center">
                    <v-pagination
                            v-model="page"
                            :length="Math.ceil(itemsMaxLength / perPage)"
                            circle
                            :total-visible="pagesVisible"
                            @input="changePage"
                    ></v-pagination>
                </div>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {

        data: () => ({
            API_URL: 'http://dev.shop/storage/',
            like: false,
            show: false,
            pagesVisible: 10,
            page: 0,
            perPage: 24,
        }),
        methods: {
            viewItem(item) {
                this.$router.push({path: '/anunt/' + item.slug, query: {id: item.item_id}});
            },
            changePage(page) {
                this.$store.dispatch('loadItems', {
                    page,
                    perPage: this.perPage,
                });
            },
        },
        computed: {
            items() {
                return this.$store.getters.items;
            },
            itemsMaxLength() {
                return this.$store.getters.itemsCount;
            },
        },
        // watch: {
        //     page(val) {
        //         this.takeItemsOnPage(val);
        //     },
        // },
    };
</script>


<style scoped>
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

</style>
