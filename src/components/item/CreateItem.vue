<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout justify-center>
        <v-flex lg7 md9 sm9 xl5 xs10>
            <v-card class="pa-5">
                <v-card-title>
                    <h2>Adaugare anunt nou</h2>
                </v-card-title>
                <v-form lazy-validation ref="form" v-model="valid">
                    <!-- Title -->
                    <v-layout class="mb-3">
                        <v-flex>
                            <v-text-field :counter="60"
                                          :rules="[rules.title.required, rules.title.length]"
                                          label="Titlu"
                                          prepend-icon="title"
                                          v-model="title"
                            >
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <!-- Description -->
                    <v-layout class="mb-3">
                        <v-flex>
                            <v-textarea :counter="5000"
                                        :rules="[rules.description.length]"
                                        label="Descriere"
                                        prepend-icon="description"
                                        v-model="description"
                            >
                            </v-textarea>
                        </v-flex>
                    </v-layout>

                    <!--Pret-->
                    <v-layout row align-center justify-space-between class="mb-3">
                        <v-flex xs5 sm5 md5 lg5 xl5>
                            <v-text-field
                                    :disabled="currency.value === 2"
                                    :rules="[rules.price.required]"
                                    type="number"
                                    prepend-icon="money"
                                    label="Preț"
                                    :suffix="setPricePrefix"
                                    min="0"
                                    v-model="price"
                                    onkeypress="return event.charCode >= 48"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs5 sm5 md5 lg5 xl5>
                            <v-btn-toggle mandatory v-model="currency.value" class="transparent">
                                <v-btn v-for="currencyType in currency.types" :key="currencyType.value"
                                       :value="currencyType.value"
                                       flat>
                                    {{currencyType.name}}
                                </v-btn>
                            </v-btn-toggle>
                        </v-flex>
                    </v-layout>

                    <!-- Location -->
                    <div class="mb-3 space">
                        <v-chip close :rules="[rules.title.require]" v-model="location.chip" @input="resetLocation"
                                class="subheading">
                            <v-avatar>
                                <v-icon>location_on</v-icon>
                            </v-avatar>
                            {{location.name}}
                        </v-chip>
                        <v-btn @click="location.dialog = true" class="text-none font-weight-regular subheading"
                               flat
                               v-if="!location.chip">
                            <v-icon left>location_on</v-icon>
                            Locație
                        </v-btn>
                    </div>
                    <v-dialog max-width="850" v-model="location.dialog">
                        <v-card>
                            <v-toolbar dark color="blue darken-3">
                                <v-toolbar-title>
                                    <v-card-title class="subheading">Locație</v-card-title>
                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-title>
                                    <v-card-title class="subheading" v-model="location.district">
                                        {{location.district}}
                                    </v-card-title>
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-layout class="location-container" row>
                                    <v-flex class="scroll-y" xs9>
                                        <app-romanian-map @selectedDistrict="districtWasSelected"/>
                                    </v-flex>
                                    <v-divider vertical></v-divider>
                                    <v-flex class="scroll-y" xs3>
                                        <v-list class="ml-3" dense>
                                            <v-list-tile v-for="city in location.cities" :key="city.name"
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
                    <v-layout align-center justify-space-between row class="mb-4 space">
                        <v-flex xs5 sm5 md5 lg5 xl5>
                            <v-btn @click="category.dialog = true"
                                   class="text-none font-weight-regular subheading" flat
                                   v-if="!subcategory.chip">
                                <v-icon left>view_module</v-icon>
                                Categorie
                            </v-btn>
                            <v-chip close v-model="subcategory.chip" @input="resetCategory" class="subheading">
                                <v-avatar>
                                    <v-icon>view_module</v-icon>
                                </v-avatar>
                                {{subcategory.name}}
                            </v-chip>
                        </v-flex>
                        <v-flex xs5 sm5 md5 lg5 xl5>
                            <v-select v-if="subcategory.chip && !chip.value"
                                      flat
                                      :items="types"
                                      item-text="name"
                                      item-value="id"
                                      menu-props="offsetY"
                                      prepend-icon="view_quilt"
                                      placeholder="Tip"
                                      return-object
                                      @change="typeSelected"
                                      v-model="type"
                            ></v-select>
                            <v-chip close v-model="chip.value"
                                    class="subheading">
                                <v-avatar>
                                    <v-icon>view_quilt</v-icon>
                                </v-avatar>
                                {{type.name}}
                            </v-chip>
                        </v-flex>
                    </v-layout>
                    <v-dialog max-width="500" v-model="category.dialog">
                        <v-card>
                            <v-toolbar dark color="blue darken-3">
                                <v-toolbar-title>
                                    <v-card-title class="subheading">Categorie</v-card-title>
                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-title>
                                    <v-card-title class="subheading" v-model="category.name">
                                        {{category.name}}
                                    </v-card-title>
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-layout class="category-container" row>
                                    <v-flex class="scroll-y" xs6>
                                        <v-list class="mr-3" dense>
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
                                        <v-list class="ml-3" dense>
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

                    <!--images-->
                    <label class="subheading">
                        <v-icon>photo</v-icon>
                        Fotografii
                    </label>
                    <v-layout align-center justify-center class="pa-2 mb-3 ml-1">
                        <v-flex class="mr-1 mt-2">
                            <v-layout align-center column>
                                <input @change="addPic" accept="image/*" ref="inputUpload"
                                       type="file"
                                       v-show="false">
                                <label v-show="images.data.length < images.number">
                                    {{images.data.length}} / {{images.number}}
                                </label>
                                <v-progress-circular
                                        :rotate="360"
                                        :size="setSize"
                                        :value="(images.data.length / images.number) * 100"
                                        :width="10"
                                        color="teal"
                                >
                                    <v-tooltip bottom v-if="images.data.length < images.number">
                                        <template v-slot:activator="{ on }">
                                            <v-btn @click="$refs.inputUpload.click()" color="primary" fab
                                                   small
                                                   v-on="on">
                                                <v-icon :size="setSize / 3">
                                                    add_a_photo
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Adauga fotografie</span>
                                    </v-tooltip>
                                    <span v-else>{{images.data.length}} / {{images.number}}</span>
                                </v-progress-circular>
                            </v-layout>
                        </v-flex>
                        <v-flex lg11 md12 sm12 xl12 xs12>
                            <v-layout row wrap>
                                <v-flex :key="image.url" lg3 md3 sm4 v-for="(image, index) in images.data" xl3 xs6>
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


                    <v-divider class="mb-3"></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="showDetails = !showDetails">
                            Filtre opționale
                            <v-icon>{{ showDetails ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <!--Details-->
                    <v-scale-transition>
                        <v-card-text v-show="showDetails">
                            <v-layout class="mb-3" column>
                                <v-layout justify-space-between>
                                    <v-flex xs5 sm5 md5 lg5>
                                        <v-text-field label="Producator" v-model="manufacturer">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs5 sm5 md5 lg5>
                                        <v-text-field label="Model" v-model="model">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout justify-space-between>
                                    <v-flex xs5 sm5 md5 lg5>
                                        <v-text-field label="Anul lansării" v-model="manufacturerYear">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs5 sm5 md5 lg5>
                                        <v-select
                                                label="Stare"
                                                menu-props="offsetY"
                                                :items="used.status"
                                                item-text="name"
                                                item-value="value"
                                                v-model="used.value"
                                        >
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                            </v-layout>
                        </v-card-text>
                    </v-scale-transition>
                </v-form>

                <v-btn @click="addNewItem" class="subheading text-none" color="success" :disabled="!valid">
                    <v-icon left>add_to_queue</v-icon>
                    Adaugă anunț
                </v-btn>

            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import RomanianMap from './RomanianMap';

    export default {
        data: () => ({
            valid: false,
            showDetails: false,

            chip: {
                value: false,
            },

            rules: {
                title: {
                    required: v => !!v || 'Titlul anuntului este obligatoriu.',
                    length: v => (v && v.length < 61) || 'Titlul este prea lung.',
                },
                description: {
                    length: v => (v.length < 5000) || 'Descrierea este prea lunga.',
                },
                price: {
                    required: v => !!v || 'Pretul este obligatoriu.',
                },
                location: {
                    required: v => !!v || 'Locaia este obligatorie.',
                },
            },

            title: '',
            description: '',
            price: null,
            currency: {
                value: 0,
                types: [
                    {name: 'Lei', value: 0},
                    {name: 'Euro', value: 1},
                    {name: 'Schimb', value: 2},
                ],
            },
            location: {
                name: '',
                district: '',
                city: '',
                cities: '',
                chip: false,
                dialog: false,
            },
            category: {
                name: 'Categorie',
                id: null,
                dialog: false,
            },
            subcategory: {
                name: '',
                id: null,
                chip: false,
            },
            type: {
                name: 'Tip',
                id: null,
                chip: false,
            },
            images: {
                data: [],
                number: 8,
            },
            manufacturer: '',
            model: '',
            manufacturerYear: '',
            used: {
                value: 0,
                status: [
                    {name: 'Nou', value: 0},
                    {name: 'Utilizat', value: 1},
                ],
            },

            message: '',
        }),
        components: {
            appRomanianMap: RomanianMap,
        },
        methods: {
            clearForm() {

            },
            addPic(e) {
                const image = e.target.files[0];
                const url = URL.createObjectURL(image);

                const newImg = {
                    image,
                    url,
                };

                this.images.data.push(newImg);

                this.$refs.inputUpload.value = null;
            },
            deleteImg(index) {
                this.images.data.splice(index, 1);
            },
            loadSubcategories(category) {
                this.category.name = category.name;
                this.category.id = category.id;
                this.$store.dispatch('loadSubcategories', category.id);
            },
            loadTypes(subcategory) {
                this.subcategory.name = subcategory.name;
                this.subcategory.id = subcategory.id;
                this.subcategory.chip = true;
                this.$store.dispatch('loadTypes', subcategory.id);
                this.category.dialog = false;
            },
            typeSelected() {
                this.chip.value = true;
            },
            resetType() {
                this.chip.value = false;
            },
            resetCategory() {
                this.resetType();
                // this.category = 'Categorie';
                this.type.chip = false;
            },

            /**
             * Location
             * @param district
             */
            districtWasSelected(district) {
                this.location.district = district.name;
                this.location.cities = district.cities;
            },
            setLocationChip(city) {
                this.location.chip = true;
                this.location.city = city;
                this.location.name = city + ', județ ' + this.location.district;
                this.location.dialog = false;
            },
            resetLocation() {

            },
            addNewItem() {

                const item = {
                    title: this.title,
                    description: this.description,
                    price: this.price,
                    currency: this.currency.value,
                    location: this.location.city + ', ' + this.location.district,
                    category: this.category.id,
                    sub_category: this.subcategory.id,
                    type: this.type.id,
                    manufacturer: this.manufacturer,
                    model: this.model,
                    manufacturer_year: this.manufacturerYear,
                    used: this.used.value,
                };

                let form = new FormData;

                for (let key in item)
                    form.append(key, item[key]);


                this.images.data.forEach((img) => {
                    form.append('images[]', img.image);
                });

                if (this.$refs.form.validate())
                    this.$store.dispatch('addItem', form);
            },
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
                switch (this.currency.value) {
                    case 0 :
                        return 'Lei';
                    case 1 :
                        return '€';
                    case 2 :
                        return 'Schimb';
                }
            },
        },
    };
</script>

<style scoped>
    .category-container {
        height: 300px;
    }

    .location-container {
        height: 400px;
    }

    .space {
        height: 50px;
    }

</style>
