<!--v-bind="{ [`xs${card.flex}`]: true }"-->
<template>
    <v-layout justify-center row>
        <v-flex xs6 sm8 md10 lg11 xl10>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex :key="item.item_id" v-for="(item, index) in items" xs12 sm6 md4 lg3 xl2>
                            <v-layout justify-center>
                                <v-hover>
                                    <v-card :class="`elevation-${hover ? 20 : 2}`" class="item-card mb-4" height="90%"
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
                                            <span class="ml-2" v-if="item.currency === 0">LEI</span>
                                            <span class="ml-2" v-else>EURO</span>
                                        </v-chip>
                                        <v-card-actions class="item-card-action">
                                            <div class="d-flex transition-fast-in-fast-out" v-if="hover">
                                                    <span>
                                                        <v-icon class="grey--text">location_on</v-icon>
                                                        {{item.location}}
                                                    </span>
                                            </div>
                                            <div v-else>
                                                <span>
                                                    <v-icon class="gray--text">query_builder</v-icon>
                                                    {{calculateDate(item.created_at)}}
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
        methods: {
            calculateDate(createdDate) {
                const created = new Date(createdDate);

                const createdYear = created.getFullYear();
                const createdMonth = created.getMonth() + 1;
                const createdDay = created.getDate();
                const createdHour = created.getHours();
                const createdMin = created.getMinutes();

                const actual = new Date();
                const actualYear = actual.getFullYear();
                const actualDay = new Date().getDate();

                let date = '';

                if (actualDay - createdDay === 1)
                    date = 'Ieri ' + createdHour + ':' + createdMin;
                else if (createdDay - actualDay === 0)
                    date = 'Azi ' + createdHour + ':' + createdMin;
                else {
                    if (createdYear === actualYear)
                        date = createdDay + ' ' + this.setMonthName(createdMonth);
                    else
                        date = createdDay + ' ' + this.setMonthName(createdMonth) + ' ' + createdYear;
                }

                console.log(' ');
                return date;
            },

            setMonthName(number) {
                switch (number) {
                    case 1 :
                        return 'ian';
                    case 2 :
                        return 'feb';
                    case 3 :
                        return 'mar';
                    case 4 :
                        return 'apr';
                    case 5 :
                        return 'mai';
                    case 6 :
                        return 'iun';
                    case 7 :
                        return 'iul';
                    case 8 :
                        return 'aug';
                    case 9:
                        return 'sep';
                    case 10 :
                        return 'oct';
                    case 11 :
                        return 'noi';
                    case 12 :
                        return 'dec';
                    default:
                        return 'not a month';
                }
            },
        },
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
        color: #3c444b;
        opacity: .9;
    }

    .hover-btn:hover {
        color: orangered;
    }

    .hover-btn-pressed {
        color: orangered;
    }

</style>
