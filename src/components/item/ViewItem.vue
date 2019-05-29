<template>
    <v-layout row justify-center>
        <v-flex lg8 md10 sm10 xl5 xs11 mr-4>
            <div v-if="!item">Loading Please wait...</div>
            <!--Title-->
            <v-card v-if="item" class="pa-5">
                <v-card-title class="display-1 font-weight-bold">
                    {{item.title}}
                </v-card-title>

                <!--                Location, Date & Price-->
                <v-layout row align-center justify-space-between>
                    <v-flex>
                        <v-layout column>
                            <v-flex>
                                <div class="grey--text mb-1 subheading">
                                    <v-icon right class="grey--text">location_on</v-icon>
                                    {{item.location}}
                                </div>
                            </v-flex>
                            <v-flex>
                                <div class="grey--text mb-1 subheading">
                                    <v-icon right class="grey--text">query_builder</v-icon>
                                    {{item.created_at}}
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex class="text-xs-right mr-2">
                        <v-chip class="display-1 price" color="primary">
                            {{item.price}}
                            <span class="ml-2" v-if="item.currency === 0">lei</span>
                            <span class="ml-2" v-else>€</span>
                        </v-chip>
                    </v-flex>
                </v-layout>

                <!--                Images-->
                <v-card-text class="mb-1">
                    <v-carousel delimiter-icon="stop"
                                prev-icon="arrow_back"
                                next-icon="arrow_forward">
                        <v-carousel-item
                                v-for="image in item.images"
                                :key="image.id"
                                :src="API_URL + image.filename"
                        ></v-carousel-item>
                    </v-carousel>
                </v-card-text>
                <v-card-text>

                    <v-layout justify-space-between row wrap>
                        <!--                        Manufacurer-->
                        <v-flex xs5 v-if="item.manufacturer" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Producător</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.manufacturer}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <!--                        Model-->
                        <v-flex xs5 v-if="item.model" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Model</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.model}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <!--                        Manufacurer Year-->
                        <v-flex xs5 v-if="item.manufacturer_year && item.manufacturer_year !== 0" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">An fabricație</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.manufacturer_year}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <!--                        Status-->
                        <v-flex xs5 v-if="item.used !== null" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Stare</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{getStatus}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>


                        <!--                        Engine-->
                        <v-flex xs5 v-if="item.engine" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Capacitate motor</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.engine}} &#13220;
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <!--                        Power-->
                        <v-flex xs5 v-if="item.power" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Putere</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.power}} cp
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <!--                        Gearbox-->
                        <v-flex xs5 v-if="item.gearbox" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Cutie de viteze</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.gearbox}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <!--                        Drive-->
                        <v-flex xs5 v-if="item.drive" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Transmisie</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.drive}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>


                        <!--                        Fuel-->
                        <v-flex xs5 v-if="item.gearbox" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Combustibil</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.fuel_type}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <!--                        Body-->
                        <v-flex xs5 v-if="item.body" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Caroserie</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.body}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>


                        <!--                        Mileage-->
                        <v-flex xs5 v-if="item.mileage" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Rulaj</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.mileage}} km
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <!--                        Pollution Class-->
                        <v-flex xs5 v-if="item.emission_class" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Normă de poluare</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.emission_class}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <!--                        Origin-->
                        <v-flex xs5 v-if="item.origin" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Țară de origine</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.origin}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <!--                        Color-->
                        <v-flex xs5 v-if="item.color" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">Culoare</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.color}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <!--                        VIN-->
                        <v-flex xs5 v-if="item.VIN" class="mb-4">
                            <v-layout row align-center>
                                <v-flex>
                                    <v-label class="grey--text subheading">VIN</v-label>
                                </v-flex>
                                <v-spacer/>

                                <v-flex text-xs-right>
                                    <label class="font-weight-medium subheading">
                                        {{item.VIN}}
                                    </label>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>

                    <v-layout row justify-space-between wrap>
                        <!--                        Pollutin Tax-->
                        <v-flex xs5 v-if="item.pollution_tax" class="mb-4">
                            <v-icon left color="success">done</v-icon>
                            <v-label>Timbru de mediu platit
                            </v-label>
                        </v-flex>

                        <!--                        Registered-->
                        <v-flex xs5 v-if="item.registered" class="mb-4">
                            <v-icon left color="success">done</v-icon>
                            <v-label>Înmatriculat
                            </v-label>
                        </v-flex>

                        <!--                        Damaged-->
                        <v-flex xs5 v-if="item.damaged !== undefined" class="mb-4">
                            <v-icon left :color="item.damaged === 0 ? 'success' : 'warning'">done</v-icon>
                            <v-label v-if="item.damaged === 0">Fară accident</v-label>
                            <v-label v-if="item.damaged === 1"> Avariat</v-label>
                        </v-flex>

                        <!--                        First Owner-->
                        <v-flex xs5 v-if="item.first_owner" class="mb-4">
                            <v-icon left color="success">done</v-icon>
                            <v-label>Primul proprietar
                            </v-label>
                        </v-flex>

                        <!--                        Right hand drive-->
                        <v-flex xs5 v-if="item.right_hand_drive" class="mb-4">
                            <v-icon left color="success">done</v-icon>
                            <v-label>Volan pe dreapta
                            </v-label>
                        </v-flex>

                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs2 sm2 md2 ml2 xl2 class="profile">
            <v-card>
                <v-card color="blue-grey darken-2" class="white--text">
                    <v-layout justify-center>
                        <v-card-title primary-title class="mr-3">
                            <v-avatar size="75px" tile>
                                <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
                            </v-avatar>
                            <span class="subheading">Coto Adrian</span>
                        </v-card-title>
                    </v-layout>
                </v-card>

                <v-card-title class="mr-3">
                    <v-btn large color="success" class="text-none font-weight-regular subheading dim">
                        <v-icon left>phone</v-icon>
                        0727576572
                    </v-btn>

                    <v-btn large color="info" class="text-none font-weight-regular subheading dim">
                        <v-icon left>message</v-icon>
                        Trimite mesaj
                    </v-btn>

                    <v-btn large color="teal" dark class="text-none font-weight-regular subheading dim">
                        <v-icon left>star_border</v-icon>
                        Salvează Anunțul
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import axios from '../../axios-auth';

    export default {
        data() {
            return {
                API_URL: 'http://dev.shop/storage/',
                item: null,
            };
        },
        computed: {
            getStatus() {
                return this.item.used ? 'Utilizat' : 'Nou';
            },
        },
        mounted() {
            this.item = this.$store.getters.item(this.$route.query.id);
            console.log(this.item);
        },
    };
</script>

<style scoped>
    .price {
        opacity: .9;
        color: #fff;
    }

    .profile {
        margin: auto;
        position: fixed;
        left: 1100px;
        right: 0;
        z-index: 9990
    }

    .dim {
        width: 100%;
    }
</style>
