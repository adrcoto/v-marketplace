<!--v-bind="{ [`xs${card.flex}`]: true }"-->
<template>
    <v-layout row justify-center>
        <v-flex xs3 sm2 class="mx-3">
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
        <v-flex xs9 sm11>
            <v-card>
                <v-container fluid grid-list-md>
                    <v-layout row wrap>
                        <v-flex v-for="card in cards" :key="card.title" xs12 sm6 md3>
                            <v-hover>
                                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-1 mb-3">

                                    <v-img :src="card.src" height="250px">
                                        <v-expand-transition>
                                            <div v-if="hover"
                                                 class="d-flex transition-fast-in-fast-out v-card--reveal display-3">
                                                <v-card-actions>
                                                    <v-btn icon>
                                                        <v-icon color="white">favorite</v-icon>
                                                    </v-btn>
                                                    <v-btn icon>
                                                        <v-icon color="white">bookmark</v-icon>
                                                    </v-btn>
                                                    <v-btn icon>
                                                        <v-icon color="white">share</v-icon>
                                                    </v-btn>
                                                    <v-spacer></v-spacer>
                                                </v-card-actions>
                                            </div>
                                        </v-expand-transition>
                                    </v-img>

                                    <v-card-title primary-title class="item-card-title">
                                        <div>
                                            <div class="subheading font-weight-bold">{{card.title}}
                                            </div>
                                        </div>
                                    </v-card-title>
                                    <v-chip color="primary" text-color="white" class="item-card-price">
                                        <span>PRET</span>
                                        <span class="mx-1">2500</span>
                                        <v-icon>attach_money</v-icon>

                                    </v-chip>
                                    <v-card-actions class="item-card-action">
                                        <v-icon class="grey--text location-icon">location_on</v-icon>
                                        {{card.location}}
                                        <v-spacer/>
                                        <v-btn icon @click="show = !show" class="arrow-icon">
                                            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                                        </v-btn>
                                    </v-card-actions>

                                </v-card>
                            </v-hover>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import Home from '../../views/Home';

    export default {
        components: {Home},
        data: () => ({
            show: false,
            cards: [
                // {title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12},
                {
                    title: 'Buton reglare lumini Vw Scirocco 2008-prezent Cod: 1K8941333',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_5.jpg',
                    location: 'Bucuresti, Ilfov',
                    flex: 3,
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_2.jpg',
                    location: 'Craiova, Dolj',
                    flex: 3,
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/6/100/10042046_iphone-8-64-gb-space-grey_1.jpg',
                    location: 'Bals, Olt',
                    flex: 3,
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/896/8964358_husa-plastic-slim-perforata-huawei-mate-10-10-pro-10-lite_2.jpg',
                    location: 'Bucuresti, Ilfov',
                    flex: 3,
                },
                {title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3},
                {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3},
                {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3},
                {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3},
                {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3},
                {
                    title: 'Far Skoda Fabia 2 stanga - dreapta de la 2007 pana la 2010',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/987/9879088_far-skoda-fabia-2-stanga-dreapta-de-la-2007-pana-la-2010_1.jpg',
                    flex: 3,
                },
                {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3},
                {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3},
                {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3},
                {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3},
                {title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3},
                {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3},
                {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3},
                {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3},

            ],
        }),
    };
</script>

<style scoped>

    .item-card-price {
        position: absolute;
        top: 165px;
        right: 10px;
        height: 30px;
        padding: 0 6px;
        line-height: 30px;
        font-size: 18px;
        opacity: .8;
    }

    /*.item-card-title {*/
    /*    position: absolute;*/
    /*    top: 210px;*/
    /*}*/

    /*.item-card-action {*/
    /*    position: absolute;*/
    /*    bottom: 0;*/
    /*}*/


</style>
