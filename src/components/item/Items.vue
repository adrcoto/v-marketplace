<!--v-bind="{ [`xs${card.flex}`]: true }"-->
<template>
    <v-layout justify-center row>
        <v-flex sm8 md12 xl11>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex v-for="(item, index) in items" :key="item.item_id" xs12 sm6 md4 lg3 xl2>
                            <v-layout justify-center>
                                <v-hover>
                                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 20 : 2}`" width="92%"
                                            height="95%"
                                            class="item-card mb-4">
                                        <v-img :src="item.images.length > 0 ? API_URL + item.images[0].filename : require('../../assets/no-available-image.png')"
                                               height="185">

                                            <v-expand-transition>
                                                <div v-if="hover"
                                                     class="d-flex transition-fast-in-fast-out v-card--reveal">
                                                    <v-card-actions>
                                                        <v-btn icon @click="like = !like"
                                                               :class="{'hover-btn-pressed': like, 'hover-btn': !like}"
                                                               class="hover-btn">
                                                            <v-icon>favorite</v-icon>
                                                            <!--                                                            http://dev.shop/storage/images/images/jG1QCFkVHIW4kDqwbCzl30pNhxC38Moehy1961Wn.jpeg-->
                                                        </v-btn>
                                                        <v-btn icon class="hover-btn">
                                                            <v-icon>bookmark</v-icon>
                                                        </v-btn>
                                                        <v-btn icon class="hover-btn">
                                                            <v-icon>share</v-icon>
                                                        </v-btn>
                                                        <v-spacer></v-spacer>
                                                    </v-card-actions>
                                                </div>
                                            </v-expand-transition>
                                        </v-img>

                                        <v-card-title primary-title
                                                      class="item-card-title subheading font-weight-bold">
                                            {{item.title}}
                                        </v-card-title>
                                        <v-chip class="price" color="primary" app>
                                            {{item.price}}
                                        </v-chip>
                                        <v-card-actions class="item-card-action">
                                            <div v-if="hover"
                                                 class="d-flex transition-fast-in-fast-out">
                                                    <span>
                                                        <v-icon class="grey--text">location_on</v-icon>
                                                        {{item.location}}
                                                    </span>
                                            </div>
                                            <div v-else>
                                                <span>
                                                    <v-icon class="gray--text">query_builder</v-icon>
                                                    {{item.created_at}}
                                                </span>
                                            </div>
                                            <v-spacer/>
                                            <v-btn icon @click="show = !show" class="arrow-icon">
                                                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
                                                </v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-hover>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
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
        }),
        computed: {
            items() {
                return this.$store.getters.items;
            },
        },
    };
</script>

<!--                <v-flex sm2 class="ml-3">
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

<style scoped>
    .price {
        position: absolute;
        top: 170px;
        right: 10px;
        height: 30px;
        padding: 0 6px;
        line-height: 30px;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
        opacity: .8;
    }

    .item-card-title {
        height: 110px;
        overflow: hidden;
    }

    .hover-btn {
        color: #1976d2;
        opacity: .8;
    }

    .hover-btn:hover {
        color: orangered;
    }

    .hover-btn-pressed {
        color: orangered;
    }
</style>
