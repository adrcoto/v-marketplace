<!--v-bind="{ [`xs${card.flex}`]: true }"-->
<template>
    <v-layout justify-center row>
        <v-flex sm8 md12 xl11>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex v-for="card in cards" :key="card.title" xs12 sm6 md4 lg3 xl2>
                            <v-layout justify-center>
                                <v-hover>
                                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 20 : 2}`" width="92%"
                                            height="95%"
                                            class="item-card mb-4">
                                        <v-img :src="card.src" height="185">
                                            <v-expand-transition>
                                                <div v-if="hover"
                                                     class="d-flex transition-fast-in-fast-out v-card--reveal">
                                                    <v-card-actions>
                                                        <v-btn icon @click="like = !like"
                                                               :class="{'hover-btn-pressed': like, 'hover-btn': !like}"
                                                               class="hover-btn">
                                                            <v-icon>favorite</v-icon>
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

                                        <v-card-title primary-title class="item-card-title subheading font-weight-bold">
                                            {{card.title}}
                                        </v-card-title>
                                        <v-chip class="price" color="primary" app>
                                            61.500 EUR
                                        </v-chip>
                                        <v-card-actions class="item-card-action">
                                            <div v-if="hover"
                                                 class="d-flex transition-fast-in-fast-out">
                                                    <span>
                                                        <v-icon class="grey--text">location_on</v-icon>
                                                        {{card.location}}
                                                    </span>
                                            </div>
                                            <div v-else>
                                                <span>
                                                    <v-icon class="gray--text">query_builder</v-icon>
                                                    {{card.date}}
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
    import Home from '../../views/Home';

    export default {
        components: {Home},
        data: () => ({
            like: false,
            show: false,
            cards: [
                // {title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12},
                {
                    title: 'Buton reglare lumini Vw Scirocco 2008-prezent Cod: 1K8941333',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_5.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '23.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_2.jpg',
                    location: 'Craiova, Dolj',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/6/100/10042046_iphone-8-64-gb-space-grey_1.jpg',
                    location: 'Bals, Olt',
                    date: 'Acum o ora',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/896/8964358_husa-plastic-slim-perforata-huawei-mate-10-10-pro-10-lite_2.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Buton reglare lumini Vw Scirocco 2008-prezent Cod: 1K8941333',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_5.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '23.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_2.jpg',
                    location: 'Craiova, Dolj',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/6/100/10042046_iphone-8-64-gb-space-grey_1.jpg',
                    location: 'Bals, Olt',
                    date: 'Acum o ora',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/896/8964358_husa-plastic-slim-perforata-huawei-mate-10-10-pro-10-lite_2.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Buton reglare lumini Vw Scirocco 2008-prezent Cod: 1K8941333',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_5.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '23.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_2.jpg',
                    location: 'Craiova, Dolj',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/6/100/10042046_iphone-8-64-gb-space-grey_1.jpg',
                    location: 'Bals, Olt',
                    date: 'Acum o ora',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/896/8964358_husa-plastic-slim-perforata-huawei-mate-10-10-pro-10-lite_2.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Buton reglare lumini Vw Scirocco 2008-prezent Cod: 1K8941333',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_5.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '23.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_2.jpg',
                    location: 'Craiova, Dolj',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/6/100/10042046_iphone-8-64-gb-space-grey_1.jpg',
                    location: 'Bals, Olt',
                    date: 'Acum o ora',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/896/8964358_husa-plastic-slim-perforata-huawei-mate-10-10-pro-10-lite_2.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Buton reglare lumini Vw Scirocco 2008-prezent Cod: 1K8941333',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_5.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '23.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_2.jpg',
                    location: 'Craiova, Dolj',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/6/100/10042046_iphone-8-64-gb-space-grey_1.jpg',
                    location: 'Bals, Olt',
                    date: 'Acum o ora',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/896/8964358_husa-plastic-slim-perforata-huawei-mate-10-10-pro-10-lite_2.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Buton reglare lumini Vw Scirocco 2008-prezent Cod: 1K8941333',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_5.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '23.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_2.jpg',
                    location: 'Craiova, Dolj',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/6/100/10042046_iphone-8-64-gb-space-grey_1.jpg',
                    location: 'Bals, Olt',
                    date: 'Acum o ora',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/896/8964358_husa-plastic-slim-perforata-huawei-mate-10-10-pro-10-lite_2.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Buton reglare lumini Vw Scirocco 2008-prezent Cod: 1K8941333',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_5.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '23.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_2.jpg',
                    location: 'Craiova, Dolj',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/6/100/10042046_iphone-8-64-gb-space-grey_1.jpg',
                    location: 'Bals, Olt',
                    date: 'Acum o ora',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/896/8964358_husa-plastic-slim-perforata-huawei-mate-10-10-pro-10-lite_2.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Buton reglare lumini Vw Scirocco 2008-prezent Cod: 1K8941333',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_5.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '23.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_2.jpg',
                    location: 'Craiova, Dolj',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/6/100/10042046_iphone-8-64-gb-space-grey_1.jpg',
                    location: 'Bals, Olt',
                    date: 'Acum o ora',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/896/8964358_husa-plastic-slim-perforata-huawei-mate-10-10-pro-10-lite_2.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Buton reglare lumini Vw Scirocco 2008-prezent Cod: 1K8941333',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_5.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '23.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_2.jpg',
                    location: 'Craiova, Dolj',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/6/100/10042046_iphone-8-64-gb-space-grey_1.jpg',
                    location: 'Bals, Olt',
                    date: 'Acum o ora',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/896/8964358_husa-plastic-slim-perforata-huawei-mate-10-10-pro-10-lite_2.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Buton reglare lumini Vw Scirocco 2008-prezent Cod: 1K8941333',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_5.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '23.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media2.lajumate.ro/media/i/new_details/5/100/10049795_opel-astra-caravan_2.jpg',
                    location: 'Craiova, Dolj',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/6/100/10042046_iphone-8-64-gb-space-grey_1.jpg',
                    location: 'Bals, Olt',
                    date: 'Acum o ora',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/896/8964358_husa-plastic-slim-perforata-huawei-mate-10-10-pro-10-lite_2.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Best airlines',
                    src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Far Skoda Fabia 2 stanga - dreapta de la 2007 pana la 2010',
                    src: 'https://media1.lajumate.ro/media/i/new_details/8/987/9879088_far-skoda-fabia-2-stanga-dreapta-de-la-2007-pana-la-2010_1.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Best airlines',
                    src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },
                {
                    title: 'Favorite road trips',
                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    location: 'Bucuresti, Ilfov',
                    date: '02.05.2019',
                },

            ],
        }),
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
        color: white;
    }

    .hover-btn:hover {
        color: orangered;
    }

    .hover-btn-pressed {
        color: orangered;
    }


</style>
