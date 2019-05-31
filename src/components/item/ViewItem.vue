<template>
    <v-layout row justify-center>
        <v-flex xs1 sm1 md1 ml1 xl1>
        </v-flex>
        <!--Item-->
        <v-flex lg7 md10 sm10 xl5 xs11 mr-4 ml-4>
            <div v-if="!item">Loading Please wait...</div>
            <v-card v-if="item" class="pa-1 mb-3">
                <!--Title-->
                <v-card-title class="display-1 font-weight-bold">
                    {{item.title}}
                </v-card-title>

                <!--                Location, Date & Price-->
                <v-layout row align-center justify-space-between>
                    <v-flex>
                        <v-layout column>
                            <v-flex>
                                <v-label class="mb-1">
                                    <v-icon right class="grey--text">location_on</v-icon>
                                    {{item.location}}
                                </v-label>
                            </v-flex>
                            <v-flex>
                                <v-label class="mb-1">
                                    <v-icon right class="grey--text">query_builder</v-icon>
                                    {{item.created_at}}
                                </v-label>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex class="text-xs-right mr-2">
                        <v-chip class="price" color="primary">
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
                                next-icon="arrow_forward"
                                :cycle="cycle"
                    >
                        <v-carousel-item
                                v-for="image in item.images"
                                :key="image.id"
                                :src="API_URL + image.filename"
                                lazy
                                v-if="item.images.length > 0"></v-carousel-item>

                        <v-carousel-item
                                v-if="item.images.length <= 0"
                                :src="require('../../assets/no-available-image.png')"
                        >
                        </v-carousel-item>
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
                        <v-flex xs5 v-if="item.manufacturer_year !== undefined && item.manufacturer_year != 0"
                                class="mb-4">
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
                        <v-flex xs5
                                v-if="item.damaged !== undefined && (item.item_type === 32 || item.item_type === 33 || item.item_type === 34 || item.item_type === 35)"
                                class="mb-4">
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

                    <v-layout row>
                        <article class="desc">
                            <br/>{{item.description}}
                        </article>
                    </v-layout>
                </v-card-text>
            </v-card>

            <v-card class="pa-1" v-if="userItems !== undefined && userItems !== null && userItems.length > 1">
                <v-card-title class="subheading">
                    Anuțurile utilizatorului &nbsp; <span class="font-weight-medium"> {{user.name}}</span>
                </v-card-title>
                <v-divider/>
                <v-layout column justify-center>
                    <v-flex :key="userItem.item_id" v-for="userItem in userItems"
                            v-if="item.item_id !== userItem.item_id">
                        <v-card-text>
                            <v-hover>
                                <v-card @click="viewItem(userItem)" style="cursor: pointer"
                                        :class="`elevation-${hover ? 20 : 2}`" class="item-card"
                                        slot-scope="{ hover }">
                                    <v-layout row>
                                        <v-flex xs3 md3 lg3 x13>
                                            <v-img :src="userItem.images.length > 0 ? API_URL + userItem.images[0].filename : require('../../assets/no-available-image.png')"
                                                   height="125">
                                            </v-img>
                                        </v-flex>
                                        <v-flex xs7 md7 lg7 x17>
                                            <div class="ml-3 mt-3">
                                                <div class="item-card-title title">
                                                    {{userItem.title}}
                                                </div>
                                                <div>
                                                    <v-icon>location_on</v-icon>
                                                    {{userItem.location}}
                                                </div>
                                                <v-spacer/>
                                                <div>
                                                    <v-icon>query_builder</v-icon>
                                                    {{userItem.created_at}}
                                                </div>
                                            </div>
                                        </v-flex>
                                        <v-flex xs2 md2 lg2 x12>
                                            <v-chip dark color="primary" class="subheading">
                                                {{userItem.price}}
                                                <span class="ml-2" v-if="item.currency === 0">lei</span>
                                                <span class="ml-2" v-else>€</span>
                                            </v-chip>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </v-hover>
                        </v-card-text>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
        <!--Owner-->
        <v-flex xs1 sm1 md1 ml1 xl1>
            <v-card class="profile" v-if="user">
                <v-card color="blue-grey darken-2" class="white--text">
                    <v-layout justify-center>
                        <v-card-title class="mr-3">
                            <v-avatar size="75px" tile>
                                <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
                            </v-avatar>
                            <v-label dark>{{user.name}}</v-label>
                        </v-card-title>
                    </v-layout>
                </v-card>

                <v-card-title class="mr-3">
                    <v-btn v-if="user.phone" @click="number = true" large color="success"
                           class="text-none font-weight-regular subheading dim">
                        <v-icon left>phone</v-icon>
                        <span v-if="number">{{user.phone}}</span>
                        <span v-if="!number">{{user.phone.substring(0, 4) + maskPhone.toString()}}</span>
                    </v-btn>

                    <v-btn large color="info" class="text-none font-weight-regular subheading dim">
                        <v-icon left>message</v-icon>
                        Trimite mesaj
                    </v-btn>

                    <v-btn @click="addToFavorites(item.item_id)" large color="teal" dark
                           class="text-none font-weight-regular subheading dim">
                        <v-icon left>star_border</v-icon>
                        <span>Salvează Anunțul</span>
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
                number: false,
                item: null,
                user: null,
                userItems: null,
                itemsLength: 0,
                cycle: false,
                months: ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'],
            };
        },
        methods: {
            viewItem(item) {
                this.item = item;
                this.$router.replace({path: '/anunt/' + item.slug, query: {id: item.item_id}});
            },
            calculateDate(actual, created) {
                const actualYear = actual.getFullYear();
                const actualDay = new Date().getDate();

                const createdYear = created.getFullYear();
                const createdMonth = created.getMonth() + 1;
                const createdDay = created.getDate();
                const createdHour = created.getHours();
                const createdMin = created.getMinutes();

                let date = '';

                if (actualDay - createdDay === 1)
                    date = 'Ieri ' + createdHour + ':' + createdMin;
                else if (createdDay - actualDay === 0)
                    date = 'Azi ' + createdHour + ':' + createdMin;
                else
                    date = createdDay + ' ' + this.months[createdMonth - 1];

                if (createdYear !== actualYear)
                    date = createdDay + ' ' + this.months[createdMonth - 1] + ' ' + createdYear;

                return date;
            },
            isFavorite(id) {
                if (this.favorites)
                    if (this.favorites.find(favorite => favorite.item === id))
                        return true;

                return false;
            },
            addToFavorites(id) {
                if (this.$store.getters.isAuthenticated) {
                    if (this.item) {
                        if (!this.isFavorite(id))
                            this.$store.dispatch('addToFavorite', id);
                        else
                            this.$store.commit('setSnack', {
                                message: 'Anunțul există deja in lista dumneavoastră de anunțuri favorite',
                                color: this.$store.getters.colors.warning
                            });
                    }
                } else {
                    this.$store.dispatch('showLogin')
                }
            },
        },

        computed: {
            getStatus() {
                return this.item.used ? 'Utilizat' : 'Nou';
            },
            maskPhone() {
                let characters = this.user.phone.length;

                let mask = '';
                for (let i = 0; i < characters; i++)
                    mask += 'x';
                return mask;
            },
            favorites() {
                return this.$store.getters.favorites;
            },
        },
        mounted() {
            //this.item = this.$store.getters.item(this.$route.query.id);
            const actual = new Date();
            axios.get('/item/' + this.$route.query.id).then(response => {
                if (response && response.data && response.data.responseType === 'success') {

                    this.item = response.data.data.item;
                    this.user = response.data.data.user;


                    const actual = new Date();
                    const created = new Date(this.item.created_at.date);

                    this.item.created_at = this.calculateDate(actual, created);

                    axios.get('/search', {
                        params: {
                            owner: this.user.id,
                            page: 0,
                            perPage: 10,
                        },
                    }).then(res => {
                        if (res && res.data && res.data.responseType === 'success') {
                            this.userItems = res.data.data.items;
                            this.userItems.forEach((userItem) => {
                                userItem.created_at = this.calculateDate(actual, new Date(userItem.created_at.date));
                            });

                            this.itemsLength = res.data.data.maxLength - 1;
                        } else {

                        }
                    });
                } else {
                    this.$store.commit('setSnack', {
                        message: 'Error loading item',
                        color: this.$store.getters.colors.warning,
                    });
                }
            });

        },
    };
</script>

<style scoped>
    .price {
        opacity: .9;
        color: #fff;
        font-size: 24px;
    }

    .profile {
        position: fixed;
        width: 275px;
    }

    .item-card-title {
        height: 50px;
        overflow: hidden;
    }

    .dim {
        width: 100%;
    }

    .item-card-title {
        overflow: hidden;
    }

    .desc {
        white-space: pre-wrap;
    }
</style>
