<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout justify-center>
        <v-flex lg7 md9 sm9 xl5 xs10>
            <v-card class="pa-5">
                <v-card-title>
                    <h2>Adaugare anunt nou</h2>
                </v-card-title>
                <v-form lazy-validation ref="form" v-model="valid">
                    <v-text-field :counter="60"
                                  :rules="[rules.title.required, rules.title.length]"
                                  class="mb-3"
                                  label="Titlu"
                                  prepend-icon="title">
                    </v-text-field>

                    <v-textarea :counter="5000"
                                :rules="[rules.description.length]"
                                class="mb-3"
                                label="Descriere"
                                prepend-icon="description">
                    </v-textarea>

                    <!-- Location -->
                    <div class="mb-3">
                        <v-chip close v-model="locationChip" @input="resetLocation" class="subheading">
                            <v-avatar>
                                <v-icon>location_on</v-icon>
                            </v-avatar>
                            {{location}}
                        </v-chip>
                        <v-btn @click="locationDialog = true" class="text-none font-weight-regular subheading" flat
                               v-if="!locationChip">
                            <v-icon left>location_on</v-icon>
                            Locație
                        </v-btn>
                    </div>
                    <v-dialog max-width="850" v-model="locationDialog">
                        <v-card>
                            <v-toolbar color="blue darken-3">
                                <v-toolbar-title>
                                    <v-card-title class="subheading">Locație</v-card-title>
                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-title>
                                    <v-card-title class="subheading" v-model="district">{{district}}
                                    </v-card-title>
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-layout class="ma-2 location-container" row>
                                    <v-flex class="scroll-y" xs0>
                                        <app-romanian-map @selectedDistrict="districtWasSelected"/>
                                    </v-flex>
                                    <v-divider vertical></v-divider>
                                    <v-flex class="scroll-y" xs3>
                                        <v-list class="ml-2 mr-2" dense>
                                            <v-list-tile v-for="city in cities" :key="city.name"
                                                         @click="setLocationChip(city.name)">
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

                    <!-- Category -->
                    <v-layout align-center justify-center row class="mb-3" style="height: 30px;">
                        <v-flex xs6 sm6 md6 lg6 xl6>
                            <v-btn @click="dialog = true" class="text-none font-weight-regular subheading" flat
                                   v-if="!categoryChip">
                                <v-icon left>view_module</v-icon>
                                Categorie
                            </v-btn>
                            <v-chip close v-model="categoryChip" @input="resetCategory" class="subheading">
                                <v-avatar>
                                    <v-icon>view_module</v-icon>
                                </v-avatar>
                                {{category}}
                            </v-chip>
                        </v-flex>
                        <v-flex xs6 sm6 md6 lg6 xl6>
                            <v-select v-if="categoryChip && !typeChip"
                                      flat
                                      :items="types"
                                      item-text="name"
                                      item-value="last"
                                      menu-props="offsetY"
                                      prepend-icon="view_quilt"
                                      placeholder="Tip"
                                      @change="typeChip = true"
                                      v-model="type"
                            ></v-select>
                            <v-chip close v-if="categoryChip" @input="resetType" v-model="typeChip" class="subheading">
                                <v-avatar>
                                    <v-icon>view_quilt</v-icon>
                                </v-avatar>
                                {{type}}
                            </v-chip>
                        </v-flex>
                    </v-layout>
                    <v-dialog max-width="500" v-model="dialog">
                        <v-card>
                            <v-toolbar color="blue darken-3">
                                <v-toolbar-title>
                                    <v-card-title class="subheading">Categorie</v-card-title>
                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-title>
                                    <v-card-title class="subheading" v-model="categoryTitle">{{categoryTitle}}
                                    </v-card-title>
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-layout class="ma-2 category-container" row>
                                    <v-flex class="scroll-y" xs6>
                                        <v-list class="ml-2 mr-2" dense>
                                            <v-list-tile :key="category.id" @click="loadSubcategories(category)"
                                                         v-for="category in categories">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        {{category.name}}
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-flex>
                                    <v-divider vertical></v-divider>
                                    <v-flex class="scroll-y" xs6>
                                        <v-list class="ml-2 mr-2" dense>
                                            <v-list-tile :key="subcategory.id" @click="loadTypes(subcategory)"
                                                         v-for="subcategory in subcategories">
                                                <v-list-tile-title>
                                                    {{subcategory.name}}
                                                </v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-dialog>

                    <!--Pret-->
                    <v-layout row align-center justify-space-around class="mb-3">
                        <v-flex xs6 sm6 md6 lg6 xl6>
                            <v-text-field
                                    :disabled="priceCurrency === 2"
                                    type="number"
                                    label="Preț"
                                    :suffix="setPricePrefix"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs5 sm5 md5 lg5 xl5>
                            <v-btn-toggle v-model="priceCurrency" class="transparent">
                                <v-btn :value="0" flat>
                                    Ron
                                </v-btn>
                                <v-btn :value="1" flat>
                                    Euro
                                </v-btn>
                                <v-btn :value="2" flat>
                                    Schimb
                                </v-btn>
                            </v-btn-toggle>
                        </v-flex>
                    </v-layout>

                    <!--images-->
                    <label class="subheading">
                        <v-icon>photo</v-icon>
                        Imagini
                    </label>
                    <v-layout align-center justify-center class="pa-2 mb-3 ml-1">
                        <v-flex class="mr-1">
                            <v-layout align-center column>
                                <input @change="addPic" accept="image/*" ref="inputUpload" type="file"
                                       v-show="false">
                                <label v-show="images.length < 8">{{images.length}} / 8</label>
                                <v-progress-circular
                                        :rotate="360"
                                        :size="setSize"
                                        :value="(images.length / 8) * 100"
                                        :width="10"
                                        color="teal"
                                >
                                    <v-tooltip bottom v-if="images.length < 8">
                                        <template v-slot:activator="{ on }">
                                            <v-btn @click="$refs.inputUpload.click()" color="primary" fab
                                                   small
                                                   v-on="on">
                                                <v-icon :size="setSize / 4">
                                                    add_a_photo
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Adauga fotografie</span>
                                    </v-tooltip>
                                    <span v-else>{{images.length}} / 8</span>
                                </v-progress-circular>
                            </v-layout>
                        </v-flex>
                        <v-flex lg11 md12 sm12 xl12 xs12>
                            <v-layout row wrap>
                                <v-flex :key="image.url" lg3 md3 sm4 v-for="(image, index) in images" xl3 xs6>
                                    <v-hover>
                                        <v-card :class="`elevation-${hover ? 12 : 2}`" class="pa-1 ma-1"
                                                slot-scope="{ hover }"
                                                width="90%">
                                            <v-img :src="image.url" height="80">
                                                <v-expand-transition>
                                                    <div class="d-flex transition-fast-in-fast-out v-card--reveal"
                                                         v-if="hover">
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn icon>
                                                                <v-icon @click.native="deleteImg(index)"
                                                                        color="red">
                                                                    clear
                                                                </v-icon>
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </div>
                                                </v-expand-transition>
                                            </v-img>
                                        </v-card>
                                    </v-hover>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                </v-form>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import RomanianMap from './RomanianMap';

    export default {
        data: () => ({
            locationDialog: false,
            dialog: false,
            progressSize: 0,
            photoSize: 0,
            valid: false,
            title: '',
            description: '',
            rules: {
                title: {
                    required: v => !!v || 'Titlul anuntului este obligatoriu.',
                    length: v => (v && v.length < 61) || 'Titlul este prea lung.'
                },
                description: {
                    length: v => (v && v.length < 5000) || 'Descrierea este prea lunga.'
                }
            },


            images: [],
            locationChip: false,
            district: '',
            cities: [],
            categoryTitle: '',
            category: 'Categorie',
            location: '',
            type: 'Tip',
            categoryChip: false,
            typeChip: false,
            pricePrefix: '',
            priceCurrency: 0
        }),
        components: {
            appRomanianMap: RomanianMap
        },
        methods: {
            clearForm() {
                this.title = '';
                this.description = '';

            },
            addPic(e) {

                const image = e.target.files[0];
                const url = URL.createObjectURL(image);

                const newImg = {
                    image,
                    url
                };

                this.images.push(newImg);
            },
            deleteImg(index) {
                this.images.splice(index, 1);
            },
            loadSubcategories(category) {
                this.categoryTitle = category.name;
                this.$store.dispatch('loadSubcategories', category.id);
            },
            loadTypes(subcategory) {
                this.category = subcategory.name;
                this.categoryChip = true;
                this.$store.dispatch('loadTypes', subcategory.id);
                this.dialog = false;
            },
            resetType() {
                this.type = 'Tip';
            },
            resetCategory() {
                this.resetType();
                this.category = 'Categorie';
                this.typeChip = false;
            },
            districtWasSelected(district) {
                this.district = district.name;
                this.cities = district.cities;
            },
            setLocationChip(city) {
                this.locationChip = true;
                this.location = city + ', județ ' + this.district;
                this.locationDialog = false;
            },
            resetLocation() {

            }
        },
        created() {
            this.$store.dispatch('loadCategories');
        },
        destroyed() {
            this.clearForm();
        },
        computed: {
            setSize() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs':
                        return 70;
                    case 'sm':
                        return 70;
                    case 'md':
                        return 70;
                    case 'lg':
                        return 80;
                    case 'xl':
                        return 70;
                }
            },
            imageHeight() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs':
                        return 'xs';
                    case 'sm':
                        return 'sm';
                    case 'md':
                        return 'md';
                    case 'lg':
                        return 'lg';
                    case 'xl':
                        return 'xl';
                }
            },
            categories() {
                return this.$store.getters.categories;
            },
            subcategories() {
                return this.$store.getters.subcategories;
            },
            types() {
                return this.$store.getters.types;
            },
            setPricePrefix() {
                switch (this.priceCurrency) {
                    case 0 :
                        return 'Lei';
                    case 1 :
                        return '€';
                    case 2 :
                        return 'Schimb';
                }
            }
        }
    };
</script>

<style scoped>
    .category-container {
        height: 300px;
    }

    .location-container {
        height: 400px;
    }

</style>
