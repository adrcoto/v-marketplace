<template>
    <div>
        <v-card color="orange">
            <v-card-title>
                <v-layout align-center justify-center row>
                    <v-flex xs5 xl4 class="mr-2">
                        <v-text-field
                                :append-icon="qFilter ? 'clear' : ''"
                                @click:append="clearQ"
                                flat
                                solo-inverted
                                light
                                hide-details
                                prepend-inner-icon="search"
                                :label="'Căutare in ' + itemsMaxLength + ' anuțuri disponibile'"
                                :value="qFilter"
                                @input="setQFilter"
                                @keyup.enter="sendRequest"
                                @blur="sendRequest"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs xl4 class="ml-2 mr-2">
                        <v-text-field style="cursor: pointer"
                                      flat
                                      light
                                      solo-inverted
                                      hide-details
                                      prepend-inner-icon="location_on"
                                      :label="location.name"
                                      @click="location.dialog = true"
                                      v-model="locationFilter.value"
                        ></v-text-field>
                        <v-dialog max-width="875" v-model="location.dialog">
                            <v-card>
                                <!-- Toolbar -->
                                <v-toolbar dark color="blue darken-3">
                                    <!-- Toolbar -> Title -->
                                    <v-toolbar-title>
                                        <v-card-title class="subheading">Locație</v-card-title>
                                    </v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <!-- Toolbar -> Title -->
                                    <v-toolbar-title>
                                        <v-card-title class="subheading" v-model="location.district">
                                            {{location.district}}
                                        </v-card-title>
                                    </v-toolbar-title>
                                </v-toolbar>
                                <!-- Location container -->
                                <v-card-text>
                                    <v-layout class="location-container" row>
                                        <!-- Map -->
                                        <v-flex class="scroll-y" xs9>
                                            <app-romanian-map
                                                    @selectedDistrict="districtWasSelected"></app-romanian-map>
                                        </v-flex>
                                        <v-divider vertical/>
                                        <!-- Cities list -> Title -->
                                        <v-flex class="scroll-y" xs3>
                                            <v-list class="ml-3" dense>
                                                <div v-if="location.district">
                                                    <v-list-tile @click="searchDistrict(location.district)">
                                                        <v-list-tile-title>
                                                            Județul {{location.district}}
                                                        </v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-divider></v-divider>
                                                </div>
                                                <v-list-tile v-for="city in location.cities" :key="city.name"
                                                             @click="setLocation(city.name)">
                                                    <v-list-tile-title>
                                                        {{city.name}}
                                                    </v-list-tile-title>
                                                </v-list-tile>
                                            </v-list>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-flex>

                    <v-flex xs5 xl4 class="ml-2">
                        <v-select
                                light
                                v-model="categoryFilter.value"
                                :items="categories"
                                item-text="name"
                                item-value="id"
                                menu-props="offsetY"
                                return-object
                                flat
                                solo-inverted
                                hide-details
                                prepend-inner-icon="view_module"
                                @change="setCategoryFilter"
                                label="Alege o categorie"
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-card-title>
        </v-card>

        <transition name="slide" type="animation">
            <v-card class="mt-4" v-if="categoryFilter.value || subcategoryFilter.value">
                <v-card-title>
                    <v-list dense>
                        <v-layout align-center justify-center row wrap>
                            <v-flex v-for="subcategory in subcategories" :key="subcategory.id">
                                <v-list-tile @click="setSubcategoryFilter(subcategory)">
                                    <v-list-tile-content>
                                        {{subcategory.name}}
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-flex>
                        </v-layout>
                    </v-list>
                </v-card-title>
            </v-card>
        </transition>
        <!--        v-if="qFilter || locationFilter.city || locationFilter.district ||categoryFilter.value || subcategoryFilter.value"-->
        <transition name="slide" type="animation">
            <v-layout class="mt-1" row wrap align-center>
                <v-chip label color="primary" close text-color="white" class="mr-2" @input="clearFilters">
                    <v-icon left>label</v-icon>
                    Filtre active:
                </v-chip>

                <transition-group name="fade">
                    <v-chip class="ml-2 mr-2" color="teal" text-color="white" close v-if="qFilter" @input="clearQ"
                            key="q">
                        <v-avatar>
                            <v-icon>search</v-icon>
                        </v-avatar>
                        {{qFilter}}
                    </v-chip>

                    <v-chip class="ml-2 mr-2" close color="teal" text-color="white" v-if="locationFilter.district"
                            @input="clearLocation" key="location">
                        <v-avatar>
                            <v-icon>location_on</v-icon>
                        </v-avatar>
                        <span v-if="locationFilter.city">{{locationFilter.city}},&nbsp;</span>
                        {{locationFilter.district}}
                    </v-chip>

                    <v-chip class="ml-2 mr-2" close color="teal" text-color="white" v-if="categoryFilter.value"
                            @input="clearCategory" key="category">
                        <v-avatar>
                            <v-icon>view_module</v-icon>
                        </v-avatar>
                        {{categoryFilter.name}}
                    </v-chip>

                    <v-chip class="ml-2" close color="teal" text-color="white" v-if="subcategoryFilter.value"
                            @input="clearSubcategory" key="subcategory">
                        <v-avatar>
                            <v-icon>view_quilt</v-icon>
                        </v-avatar>
                        {{subcategoryFilter.name}}
                    </v-chip>
                </transition-group>
                <v-spacer></v-spacer>

                <div style="width: 50px">
                    <v-select
                            label="Anunțuri"
                            menu-props="offsetY"
                            :items="perPage"
                            item-text="name"
                            dense
                            :value="perPageFilter"
                            @change="setPerPageFilter"
                    >
                    </v-select>
                </div>
            </v-layout>
        </transition>
    </div>

</template>

<script>
    import RomanianMap from '../item/RomanianMap'

    export default {
        data: () => ({
            category: {
                value: 0,
                name: '',
            },
            s: false,
            perPage: [
                15, 20, 30
            ],
            subcategory: {
                value: 0,
                name: '',
            },
            location: {
                name: 'Toată Romania',
                value: null,
                active: true,
                district: '',
                city: '',
                cities: '',
                chip: false,
                dialog: false,
            },
        }),
        methods: {
            setQFilter(q) {
                this.$store.commit('setQ', q);
            },

            setSubcategoryFilter(subcategory) {
                this.subcategory.value = subcategory.id;

                this.$store.commit('setSubcategory', {
                    name: subcategory.name,
                    value: subcategory.id,
                });

                this.sendRequest();
            },
            setCategoryFilter(category) {
                this.$store.dispatch('loadSubcategories', category.id);

                this.$store.commit('setCategory', {
                    name: category.name,
                    value: category.id,
                });

                this.$store.dispatch('clearSubcategory');

                this.sendRequest();
            },
            sendRequest() {
                this.$store.dispatch('loadItems');
            },
            setLocation(name) {
                this.location.dialog = false;

                this.$store.commit('setCity', name);
                this.$store.commit('setDistrict', this.location.district);

                this.$store.commit('setLocation', name + ', ' + this.location.district);
                this.sendRequest();
            },
            districtWasSelected(district) {
                this.location.district = district.name;
                this.location.cities = district.cities;
            },
            searchDistrict(dist) {

                this.$store.commit('setDistrict', dist);
                this.location.value = 'Județul ' + dist;
                this.location.dialog = false;

                this.$store.commit('setLocation', 'Județul ' + this.location.district);
                this.$store.dispatch('clearCity');

                this.sendRequest();
            },
            setPerPageFilter(perPage){
                this.$store.commit('setPage', 1);
                this.$store.commit('setPerPage', perPage);
                this.sendRequest();
            },

            /** Clear Chips */
            clearQ() {
                this.$store.dispatch('clearQ');
                this.sendRequest();
            },
            clearLocation() {
                this.$store.dispatch('clearLocation');
                this.sendRequest();
            },
            clearCategory() {
                this.$store.dispatch('clearCategory');
                this.$store.dispatch('clearSubcategory');
                this.$store.dispatch('clearLoadedSubcategories');
                this.sendRequest();
            },
            clearSubcategory() {
                this.$store.dispatch('clearSubcategory');
                this.sendRequest();
            },

            clearFilters() {
                this.$store.dispatch('clearQ');
                this.$store.dispatch('clearLocation');
                this.$store.dispatch('clearCategory');
                this.$store.dispatch('clearSubcategory');
                this.$store.dispatch('clearLoadedSubcategories');
                this.sendRequest();
            }
        },
        computed: {
            itemsMaxLength() {
                return this.$store.getters.itemsCount;
            },
            categories() {
                return this.$store.getters.categories;
            },
            subcategories() {
                return this.$store.getters.subcategories;
            },


            /** Filters */
            qFilter() {
                return this.$store.getters.q;
            },
            locationFilter() {
                return this.$store.getters.location;
            },
            categoryFilter() {
                return this.$store.getters.category;
            },
            subcategoryFilter() {
                return this.$store.getters.sub_category;
            },
            perPageFilter(){
                return this.$store.getters.perPage;
            }
        },
        components: {
            appRomanianMap: RomanianMap
        },
    };
</script>

<style scoped>
    .location-container {
        height: 400px;
    }

    .filters {
        /*height: 325px;*/
        /*background-image: url("https://images.cdn2.stockunlimited.net/preview1300/mobile-shopping-banner_2022428.jpg?fbclid=IwAR1zXJfcLwcDb-nZoH9zAWP6ZeAZ0ECdIrQsr7iz7paolL4gW3PhI-nq9jk");*/
        /*background-position: center;*/
        /*background-repeat: no-repeat;*/
        /*background-size: cover;*/
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

    /*asdasdsadsa*/

    .slide-enter {
        opacity: 0;
    }

    .slide-enter-active {
        animation: slide-in .25s ease-out forwards;
        transition: opacity .25s;
    }

    .slide-leave {

    }

    .slide-leave-active {
        animation: slide-out .25s ease-out forwards;
        transition: opacity .5s;
        opacity: 0;
    }

    .slide-move {
        transition: transform .25s;
    }

    @keyframes slide_in {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(20px);
        }
    }
</style>
