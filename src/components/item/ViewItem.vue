<template>
    <v-layout row justify-center>
        <v-flex xs1 sm1 md1 lg1 xl1>

        </v-flex>
        <!--Item && OwnerItems-->
        <v-flex xs11 sm10 md10 lg7 xl5>

            <h2 class="text-xs-center mt-5" v-if="!item">{{loadingMessage}}</h2>

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
                                <div class="mb-1">
                                    <v-label>
                                        <v-icon right class="grey--text">location_on</v-icon>
                                        {{item.city}}, {{item.district}}
                                    </v-label>
                                </div>
                            </v-flex>
                            <v-flex>
                                <v-label>
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
                        <v-flex xs5
                                v-if="item.manufacturer_year !== undefined && item.manufacturer_year !== '0' && item.manufacturer_year !== 'null'"
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

                        <!--                       Negotiable -->
                        <v-flex xs5 v-if="item.negotiable" class="mb-4">
                            <div>
                                <v-icon left color="success">done</v-icon>
                                <v-label>Negociabil</v-label>
                            </div>
                        </v-flex>

                        <!--                       change-->
                        <v-flex xs5 v-if="item.change" class="mb-4">
                            <div>
                                <v-icon left color="success">done</v-icon>
                                <v-label>Se acceptă schimburi</v-label>
                            </div>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <article class="desc">
                            <br/>{{item.description}}
                        </article>
                    </v-layout>
                </v-card-text>
            </v-card>

            <!-- Owner Items -->
            <v-card class="pa-1" v-if="userItems !== undefined && userItems !== null && userItems.length > 1">
                <v-card-title class="subheading">
                    Anuțurile utilizatorului &nbsp; <span class="font-weight-medium"> {{user.name}}</span>
                </v-card-title>
                <v-divider/>
            </v-card>
            <v-layout column justify-center class="mt-3">
                <v-flex :key="userItem.item_id" v-for="userItem in userItems"
                        v-if="item.item_id !== userItem.item_id">
                    <v-hover>
                        <v-card @click="viewItem(userItem)" style="cursor: pointer"
                                :class="`elevation-${hover ? 12 : 2}`" class="item-card mb-3 "
                                slot-scope="{ hover }">
                            <v-layout row>
                                <v-flex xs3 md3 lg3 x13>
                                    <v-img :src="userItem.images.length > 0 ? API_URL + userItem.images[0].filename : require('../../assets/no-available-image.png')"
                                           height="125">
                                        <span v-if="userItem.negotiable" class="negotiable"
                                              title="Anunt negociabil"></span>
                                    </v-img>
                                </v-flex>
                                <v-flex xs7 md7 lg7 x17>
                                    <div class="ml-3 mt-2">
                                        <div class="item-card-title font-weight-medium subheading">
                                            {{userItem.title}}
                                        </div>
                                        <div class="mt-2">
                                            <span class="caption grey--text">
                                                <v-icon class="grey--text">location_on</v-icon>
                                                {{userItem.city}}, {{userItem.district}}
                                            </span>
                                        </div>

                                        <div>
                                            <span class="caption grey--text">
                                                <v-icon class="grey--text">query_builder</v-icon>
                                                {{userItem.created_at}}
                                            </span>
                                        </div>
                                    </div>
                                </v-flex>
                                <v-flex class="ml-3">
                                    <v-chip dark color="primary mt-2" class="subheading">
                                        {{userItem.price}}
                                        <span class="ml-2" v-if="item.currency === 0">lei</span>
                                        <span class="ml-2" v-else>€</span>
                                    </v-chip>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-hover>
                </v-flex>
            </v-layout>
            <div class="text-xs-center" v-if="userItems.length > 0">
                <v-pagination
                        :value="page"
                        :length="Math.ceil(count / 10)"
                        circle
                        :total-visible="pagesVisible"
                        @input="changePage"
                ></v-pagination>
            </div>
        </v-flex>
        <!--Owner-->
        <v-flex ml-4 xs1 sm1 md1 lg1 xl1>
            <v-card class="profile" v-if="user">
                <v-card :img="require('../../assets/view-item-user.jpg')">
                    <div>
                        <v-card-title class="justify-center">
                            <v-avatar class="mr-2" size="85px">
                                <v-img :src="user.avatar === '' ? require('../../assets/no-avatar-view-item.png') : AVATAR_API_URL + user.avatar"
                                       alt="Vuetify"></v-img>
                            </v-avatar>
                        </v-card-title>
                        <v-card-title class="justify-center wrap">
                            <v-label dark>{{user.name}}</v-label>
                        </v-card-title>
                    </div>
                </v-card>

                <v-card-title class="mr-3">
                    <v-btn v-if="user.phone" @click="number = true" large color="success"
                           class="text-none font-weight-regular subheading dim">
                        <v-icon left>phone</v-icon>
                        <!--                        <span v-if="number">{{user.phone}}</span>-->
                        <span v-if="number">{{formatPhone}}</span>
                        <span v-if="!number">{{user.phone.substring(0, 4) + ' ' + maskPhone.toString()}}</span>
                    </v-btn>

                    <!--<v-btn v-if="!isMine" large color="info" class="text-none font-weight-regular subheading dim">
                        <v-icon left>message</v-icon>
                        Trimite mesaj
                    </v-btn>-->

                    <v-btn @click="addToFavorites(item.item_id)" large color="teal" dark
                           class="text-none font-weight-regular subheading dim">
                        <v-icon left>star_border</v-icon>
                        <span>Salvează anunțul</span>
                    </v-btn>

                    <v-btn v-if="isMine" @click.stop="editItem(item)" large color="primary" dark
                           class="text-none font-weight-regular subheading dim">
                        <v-icon left>edit</v-icon>
                        <span>Actualizeaă anunțul</span>
                    </v-btn>
                </v-card-title>
                <div class="pl-2 pr-2">
                    <iframe class="dim" height="215"
                            :src="'https://maps.google.com/maps?q=' + item.city + '%2C%20' + item.district + '&t=&z=10&ie=UTF8&iwloc=&output=embed'">
                    </iframe>
                </div>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

    import {calculateDate} from "../../util/util";

    export default {
        data() {
            return {
                API_URL: process.env.VUE_APP_API_URL,
                AVATAR_API_URL: process.env.VUE_APP_AVATAR_URL,
                number: false,
                pagesVisible: 10,
                loadingMessage: 'Loading ... please wait',
                cycle: true,
            };
        },
        methods: {
            changePage(page) {
                this.$store.commit('setViewOwnerItemsPage', page);
                this.getItems();
            },
            viewItem(item) {
                this.item = item;
                this.$router.replace({path: '/anunt/' + item.slug, query: {id: item.item_id}});
                window.scrollTo(0, 0);
            },
            editItem(item) {
                this.$router.push({path: '/anunt/modificare/' + item.slug, query: {id: item.item_id}});
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
                                color: this.$store.getters.colors.warning,
                            });
                    }
                } else {
                    this.$store.dispatch('showLogin');
                }
            },
            getItems() {
                const actual = new Date();
                const actualYear = actual.getFullYear();
                const actualDay = new Date().getDate();

                this.$store.dispatch('_ownerItems', this.$route.query.id).then(res => {
                    if (res && res.data && res.data.responseType === 'success') {
                        const userItems = res.data.data.items;
                        userItems.forEach((userItem) => {
                            userItem.created_at = calculateDate(actual, actualDay, actualYear, new Date(userItem.created_at.date));
                        });

                        this.$store.commit('_setOwnerItems', userItems);
                        this.$store.commit('_setOwnerItemsCount', res.data.data.total);
                    }
                }); // ends axios getItems
            }
        },

        computed: {
            page() {
                return this.$store.getters.viewOwnerItemsPage;
            },
            count() {
                return this.$store.getters._ownerItemsCount;
            },
            item() {
                return this.$store.getters._item.item;
            },
            user() {
                return this.$store.getters._item.user;
            },
            userItems() {
                return this.$store.getters._ownerItems;
            },
            getStatus() {
                return this.item.used ? 'Utilizat' : 'Nou';
            },
            maskPhone() {
                let characters = this.user.phone.length;

                let mask = '';
                for (let i = 0; i < characters - 4; i++) {
                    if (i === 3 || i === 6)
                        mask += ' ';
                    mask += 'x';
                }
                return mask;
            },
            favorites() {
                return this.$store.getters.favorites;
            },
            isMine() {
                return this.item.owner === this.$store.getters.user.id;
            },
            formatPhone() {
                let phone = this.user.phone;

                return phone.substring(0, 4) + ' ' + phone.substring(4, 7) + ' ' + phone.substring(7, 10);
            },

        },
        mounted() {
            window.scrollTo(0, 0);
            this.$store.dispatch('getItem', {
                id: this.$route.query.id,
                slug: this.$route.params.title
            }).then(response => {
                if (response && response.data && response.data.responseType === 'success') {

                    const item = response.data.data.item;
                    const actual = new Date();
                    const actualYear = actual.getFullYear();
                    const actualDay = new Date().getDate();

                    // item.created_at = this.calculateDate(actual, created);

                    item.created_at = calculateDate(actual, actualDay, actualYear, new Date(item.created_at.date));

                    const object = {
                        item: item,
                        user: response.data.data.user,
                    };
                    this.$store.commit('setItem', object);

                    this.getItems();
                    this.loadingMessage = 'Loading ... please wait';
                } //ends if response usccess
                else {
                    this.loadingMessage = 'Nici un rezulat';
                }
            }); //ends axios getItem
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
        position: -webkit-sticky;
        position: sticky;
        top: 90px;
        width: 275px;
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

    .item-card-title {
        height: 50px;
        overflow: hidden;
    }

    .dim {
        width: 100%;
    }

    .desc {
        white-space: pre-wrap;
    }
</style>
