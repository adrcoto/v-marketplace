<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout justify-center>
        <v-flex lg8 md10 sm10 xl6 xs11>
            <v-card class="pa-5">
                <v-card-title>
                    <h2>Adaugare anunt nou</h2>
                </v-card-title>
                <v-form ref="form"
                        v-model="valid"
                        lazy-validation>
                    <!-- Title -->
                    <v-layout class="mb-4">
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
                    <v-layout class="mb-4">
                        <v-flex>
                            <v-textarea :counter="5000"
                                        :rules="[rules.description.length, rules.description.required]"
                                        label="Descriere"
                                        prepend-icon="description"
                                        v-model="description"
                            >
                            </v-textarea>
                        </v-flex>
                    </v-layout>

                    <!--Price-->
                    <v-layout row justify-space-between class="mb-3" wrap>
                        <v-flex xs5 sm5 md5 lg4 xl4>
                            <v-text-field
                                    :rules="[rules.price.required]"
                                    type="number"
                                    prepend-icon="money"
                                    label="Preț"
                                    :suffix="setPricePrefix"
                                    min="0"
                                    v-model="price.value"
                                    onkeypress="return event.charCode >= 48"
                            ></v-text-field>
                        </v-flex>
                        <!-- Negotiable -->
                        <v-flex xs5 sm5 md5 lg1 xl1>
                            <v-select
                                    menu-props="offsetY"
                                    :items="currency.types"
                                    item-text="name"
                                    item-value="value"
                                    v-model="currency.value"
                            >
                            </v-select>
                        </v-flex>

                        <v-flex xs5 sm5 md5 lg2 xl2>
                            <v-checkbox
                                    v-model="price.negotiable"
                                    label="Negociabil"
                                    color="success"
                                    hide-details
                            ></v-checkbox>
                        </v-flex>

                        <v-flex xs5 sm5 md5 lg3 xl3>
                            <v-checkbox
                                    v-model="price.change"
                                    label="Accept schimburi"
                                    color="success"
                                    hide-details
                            ></v-checkbox>
                        </v-flex>
                    </v-layout>

                    <!-- Location -->
                    <div class="mb-3 space">
                        <v-chip close v-model="location.chip"
                                class="subheading"
                                @input="clearLocation"
                        >
                            <v-avatar>
                                <v-icon>location_on</v-icon>
                            </v-avatar>
                            {{location.name}}
                        </v-chip>

                        <v-btn @click="location.dialog = true" class="text-none font-weight-regular subheading"
                               flat
                               v-if="!location.chip"
                               required
                               @blur="$v.location.name.$touch()"
                        >
                            <v-icon left :color="locationColor">location_on</v-icon>
                            Locație
                        </v-btn>
                        <div class="v-messages__message v-messages error--text location-category"
                        >{{locationErrors}}
                        </div>
                    </div>
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
                                        <app-romanian-map @selectedDistrict="districtWasSelected"/>
                                    </v-flex>
                                    <v-divider vertical/>
                                    <!-- Cities list -> Title -->
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
                            <!-- Chip -->
                            <v-chip close v-model="subcategory.chip" @input="resetCategory" class="subheading">
                                <v-avatar>
                                    <v-icon>view_module</v-icon>
                                </v-avatar>
                                {{subcategory.name}}
                            </v-chip>
                            <!-- Button -->
                            <v-btn @click="retryGetCategories"
                                   class="text-none font-weight-regular subheading" flat
                                   v-if="!subcategory.chip"
                                   @blur="$v.subcategory.name.$touch()"
                                   required
                            >
                                <v-icon left :color="categoryColor">view_module</v-icon>
                                Categorie
                            </v-btn>
                            <!-- Error Message -->
                            <div v-if="!subcategory.chip"
                                 class="v-messages__message v-messages error--text location-category"
                            >{{categoryErrors}}
                            </div>
                        </v-flex>
                        <!-- Type -->
                        <v-flex xs5 sm5 md5 lg5 xl5>
                            <!-- Chip -->
                            <v-chip close v-model="chip.value"
                                    @input="resetType"
                                    class="subheading">
                                <v-avatar>
                                    <v-icon>view_quilt</v-icon>
                                </v-avatar>
                                {{type.name}}
                            </v-chip>
                            <!-- Select -->
                            <v-select v-if="subcategory.chip && !chip.value && !type.isCar"
                                      flat
                                      :items="types"
                                      item-text="name"
                                      item-value="id"
                                      menu-props="offsetY"
                                      prepend-icon="view_quilt"
                                      placeholder="Tip"
                                      return-object
                                      @change="typeSelected(); $v.type.name.$touch();"
                                      v-model="type"
                                      required
                                      @blur="$v.type.name.$touch()"
                                      :error-messages="typeErrors"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-dialog max-width="550" v-model="category.dialog">
                        <v-card>
                            <!-- Toolbar -->
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
                            <!-- Category - Subcategory List Container-->
                            <v-card-text>
                                <v-layout class="category-container" row>
                                    <!-- Category List -->
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
                                    <!-- Subcategory List-->
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
                    <!-- Debug -->
                    <!-- <v-layout align-center justify-space-between row class="mb-4 space">
                         <v-flex xs4 sm4 md4 lg4 xl4>
                             <p class="text-md-center">{{category.id}}</p>
                         </v-flex>
                         <v-flex xs4 sm4 md4 lg4 xl4>
                             <p class="text-md-center">{{subcategory.id}}</p>
                         </v-flex>
                         <v-flex xs4 sm4 md4 lg4 xl4>
                             <p class="text-md-center">{{type.id}}</p>
                         </v-flex>
                     </v-layout>-->

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
                                       v-show="false"
                                       multiple
                                >
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
                                        <span>Adaugă fotografie</span>
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
                        <v-card-text v-if="showDetails">
                            <v-layout class="mb-3" column>
                                <!--Basic-->
                                <v-layout justify-space-between row wrap>
                                    <!--Manufacturer-->
                                    <v-flex xs12 sm5 md5 lg5>
                                        <v-text-field label="Producator"
                                                      v-model="manufacturer"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                    <!--Model-->
                                    <v-flex xs12 sm5 md5 lg5>
                                        <v-text-field label="Model"
                                                      v-model="model"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                    <!--Manufacturer Year-->
                                    <v-flex xs12 sm5 md5 lg5>
                                        <v-select
                                                label="An fabricație"
                                                menu-props="offsetY"
                                                :items="setManufacturerYear"
                                                item-text="value"
                                                v-model="manufacturerYear"
                                                dense
                                        >
                                        </v-select>
                                    </v-flex>
                                    <!--Status-->
                                    <v-flex xs12 sm5 md5 lg5>
                                        <v-select
                                                label="Stare"
                                                menu-props="offsetY"
                                                :items="used.status"
                                                item-text="name"
                                                item-value="value"
                                                v-model="used.value"
                                                dense
                                        >
                                        </v-select>
                                    </v-flex>
                                </v-layout>

                                <!--Auto-->
                                <div v-if="type.id === 32 || type.id === 33 || type.id === 34 || type.id === 35">
                                    <v-layout justify-space-between row wrap>
                                        <!--Engine-->
                                        <v-flex xs12 sm5 md5 lg5>
                                            <v-text-field label="Capacitate Cilindrică"
                                                          v-model="engine"
                                                          type="number"
                                                          min="0"
                                                          onkeypress="return event.charCode >= 48"
                                            >
                                            </v-text-field>
                                        </v-flex>
                                        <!--Power-->
                                        <v-flex xs12 sm5 md5 lg5>
                                            <v-text-field label="Putere"
                                                          v-model="power"
                                                          suffix="cp"
                                                          type="number"
                                                          min="0"
                                                          onkeypress="return event.charCode >= 48"
                                            >
                                            </v-text-field>
                                        </v-flex>

                                        <!--Gearbox-->
                                        <v-flex xs12 sm5 md5 lg5 v-if="type.id === 32">
                                            <v-select
                                                    label="Cutie de viteze"
                                                    menu-props="offsetY"
                                                    :items="gearbox.options"
                                                    item-text="name"
                                                    v-model="gearbox.value"
                                                    dense
                                            >
                                            </v-select>
                                        </v-flex>
                                        <!--Caroserie-->
                                        <v-flex xs12 sm5 md5 lg5 v-if="type.id === 32">
                                            <v-select
                                                    label="Caroserie"
                                                    menu-props="offsetY"
                                                    :items="body.options"
                                                    item-text="name"
                                                    v-model="body.value"
                                                    dense
                                            >
                                            </v-select>
                                        </v-flex>

                                        <!--Fuel Type-->
                                        <v-flex xs12 sm5 lg5 v-if="type.id === 32">
                                            <v-select
                                                    label="Combustibil"
                                                    menu-props="offsetY"
                                                    :items="fuelType.options"
                                                    item-text="name"
                                                    v-model="fuelType.value"
                                                    dense
                                            >
                                            </v-select>
                                        </v-flex>
                                        <!--Mileage-->
                                        <v-flex xs12 sm5 md5 lg5>
                                            <v-text-field label="Rulaj"
                                                          v-model="mileage"
                                                          type="number"
                                                          min="0"
                                                          onkeypress="return event.charCode >= 48"
                                                          suffix="km"
                                            >
                                            </v-text-field>
                                        </v-flex>

                                        <!--Drive-->
                                        <v-flex xs12 sm5 md5 lg5>
                                            <v-select
                                                    label="Transmisie"
                                                    menu-props="offsetY"
                                                    :items="setTransmissionOptions"
                                                    item-text="name"
                                                    v-model="drive.value"
                                                    dense
                                            >
                                            </v-select>
                                        </v-flex>
                                        <!--Emission Class-->
                                        <v-flex xs12 sm5 md5 lg5 v-if="type.id === 32">
                                            <v-select
                                                    label="Normă de poluare"
                                                    menu-props="offsetY"
                                                    :items="emissionClass.classes"
                                                    item-text="name"
                                                    v-model="emissionClass.value"
                                                    dense
                                            >
                                            </v-select>
                                        </v-flex>

                                        <!--Color-->
                                        <v-flex xs12 sm5 md5 lg5>
                                            <v-select
                                                    label="Culoare"
                                                    menu-props="offsetY"
                                                    :items="color.options"
                                                    item-text="name"
                                                    v-model="color.value"
                                                    dense
                                            >
                                            </v-select>
                                        </v-flex>
                                        <!--Origin-->
                                        <v-flex xs12 sm5 md5 lg5>
                                            <v-text-field label="Țară de origine" v-model="origin">
                                            </v-text-field>
                                        </v-flex>

                                        <!--VIN-->
                                        <v-flex xs12 sm5 md5 lg5>
                                            <v-text-field label="VIN" v-model="VIN">
                                            </v-text-field>
                                        </v-flex>

                                    </v-layout>
                                    <v-layout justify-space-between row wrap>

                                        <!--Pollution Tax-->
                                        <v-flex xs5 sm5 md5 lg5 v-if="type.id === 32">
                                            <v-checkbox
                                                    v-model="pollutionTax"
                                                    label="Timbru de mediu plătit"
                                                    color="success"
                                                    hide-details
                                            ></v-checkbox>
                                        </v-flex>
                                        <!--Damage-->
                                        <v-flex xs5 sm5 md5 lg5>
                                            <v-checkbox
                                                    v-model="damaged"
                                                    label="Avariat"
                                                    color="success"
                                                    hide-details
                                            ></v-checkbox>
                                        </v-flex>

                                        <!--Registered-->
                                        <v-flex xs5 sm5 md5 lg5>
                                            <v-checkbox
                                                    v-model="registered"
                                                    label="Înmatriculat"
                                                    color="success"
                                                    hide-details
                                            ></v-checkbox>
                                        </v-flex>
                                        <!--First Owner-->
                                        <v-flex xs5 sm5 md5 lg5>
                                            <v-checkbox
                                                    v-model="firstOwner"
                                                    label="Primul proprietar"
                                                    color="success"
                                                    hide-details
                                            ></v-checkbox>
                                        </v-flex>

                                        <!--Right hand drive-->
                                        <v-flex xs5 sm5 md5 lg5 v-if="type.id === 32">
                                            <v-checkbox
                                                    v-model="rightHandDrive"
                                                    label="Volan pe dreapta"
                                                    color="success"
                                                    hide-details
                                            ></v-checkbox>
                                        </v-flex>
                                    </v-layout>
                                </div>
                            </v-layout>
                        </v-card-text>
                    </v-scale-transition>
                </v-form>
                <v-btn @click="addNewItem" class="subheading text-none" color="success" :disabled="!valid || $v.$error">
                    <v-icon left>add_to_queue</v-icon>
                    Adaugă anunț
                </v-btn>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import RomanianMap from './RomanianMap';
    import {required} from 'vuelidate/lib/validators';

    export default {
        data: () => ({
            valid: false,
            showDetails: true,

            chip: {
                value: false
            },

            rules: {
                title: {
                    required: v => !!v || 'Titlul anuntului este obligatoriu.',
                    length: v => (v && v.length < 61) || 'Titlul este prea lung.'
                },
                description: {
                    required: v => !!v || 'Descrierea anuntului este obligatorie.',
                    length: v => (v.length < 5000) || 'Descrierea este prea lunga.'
                },
                price: {
                    required: v => !!v || 'Pretul este obligatoriu.'
                }
            },

            title: '',
            description: '',
            price: {
                value: null,
                negotiable: false,
                change: false
            },
            currency: {
                value: 0,
                types: [
                    {name: 'Lei', value: 0},
                    {name: 'Euro', value: 1}
                ]
            },
            location: {
                name: '',
                district: '',
                city: '',
                cities: '',
                chip: false,
                dialog: false
            },
            category: {
                name: '',
                id: null,
                dialog: false,
                categories: []
            },
            subcategory: {
                name: '',
                id: null,
                chip: false,
                subcategories: []
            },
            type: {
                name: '',
                id: null,
                chip: false,
                isCar: false,
                types: []
            },
            images: {
                data: [],
                number: 8
            },
            manufacturer: '',
            model: '',
            manufacturerYear: null,
            used: {
                value: 1,
                status: [
                    {name: 'Nou', value: 0},
                    {name: 'Utilizat', value: 1}
                ]
            },

            engine: null,
            power: null,
            gearbox: {
                value: '',
                options: [
                    {name: 'Manuală'},
                    {name: 'Semi-automată'},
                    {name: 'Automată'},
                    {name: 'Automată (CVT)'},
                    {name: 'Automată (dublu ambreaj'}
                ]

            },
            body: {
                value: '',
                options: [
                    {name: 'Berlină'},
                    {name: 'Break'},
                    {name: 'Cabrio'},
                    {name: 'Coupe'},
                    {name: 'Hatchback'},
                    {name: 'Limuzină'},
                    {name: 'Microbuz Cat B'},
                    {name: 'Monovolum'},
                    {name: 'Pick-up'},
                    {name: 'Off-road'},
                    {name: 'SUV'}
                ]
            },
            fuelType: {
                value: '',
                options: [
                    {name: 'Benzină'},
                    {name: 'Diesel'},
                    {name: 'GPL'},
                    {name: 'Hibrid'},
                    {name: 'Electric'}
                ]
            },
            mileage: null,

            drive: {
                value: '',
                car: [
                    {name: 'Fată'},
                    {name: 'Spate'},
                    {name: 'Integrală'}
                ],
                bikes: [
                    {name: 'Cardan'},
                    {name: 'Curea'},
                    {name: 'Lanț'}
                ]
            },
            emissionClass: {
                value: '',
                classes: [
                    {name: 'Non euro'},
                    {name: 'Euro I'},
                    {name: 'Euro II'},
                    {name: 'Euro III'},
                    {name: 'Euro IV'},
                    {name: 'Euro V'},
                    {name: 'Euro VI'}
                ]
            },
            color: {
                value: '',
                options: [
                    {name: 'Alb'},
                    {name: 'Albastru'},
                    {name: 'Argintiu'},
                    {name: 'Galben / Auriu'},
                    {name: 'Gri'},
                    {name: 'Negru'},
                    {name: 'Rosu'},
                    {name: 'Verde'},
                    {name: 'Altă culoare'}
                ]
            },
            origin: '',
            VIN: '',

            pollutionTax: false,
            damaged: false,
            registered: false,
            firstOwner: false,
            rightHandDrive: false,

            message: ''
        }),
        components: {
            appRomanianMap: RomanianMap
        },
        methods: {
            clearForm() {
                this.$v.$reset();
            },
            addPic(e) {

                // if (this.images.data.length >= this.images.number) {
                //     this.$store.commit('setSnack', {
                //         message: 'Ați atins limita de fotografii posibile',
                //         color: this.$store.getters.colors.error
                //     });
                //     return;
                // }
                // const image = e.target.files[0];
                // const url = URL.createObjectURL(image);
                //
                //
                // const newImg = {
                //     image,
                //     url
                // };
                //
                // this.images.data.push(newImg);
                //
                // this.$refs.inputUpload.value = null;


                const images = Array.from(e.target.files);
                console.log(images);

                images.forEach((i) => {
                    const newImg = {
                        image: i,
                        url: URL.createObjectURL(i)
                    };

                    if (this.images.data.length < this.images.number)
                        this.images.data.push(newImg);
                });

                if (this.images.data.length >= this.images.number) {
                    this.$store.commit('setSnack', {
                        message: 'Ați atins limita de fotografii posibile',
                        color: this.$store.getters.colors.info
                    });
                    return;
                }

                this.$refs.inputUpload.value = null;
            },
            deleteImg(index) {
                this.images.data.splice(index, 1);
            },
            retryGetCategories() {
                if (this.categories.length === 0)
                    this.$store.dispatch('loadCategories');
                this.category.dialog = true;
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
                if (subcategory.id === 8) {
                    this.type.id = 32;
                    this.type.name = 'Autoturism';
                    this.type.isCar = true;
                    this.category.dialog = false;
                    return;
                }
                this.$store.dispatch('loadTypes', subcategory.id);
                this.category.dialog = false;
            },
            typeSelected() {
                this.chip.value = true;
            },
            resetType() {
                this.chip.value = false;
                this.type.name = '';
                this.type.id = null;
                this.$store.dispatch('loadTypes', this.subcategory.id);
            },
            resetCategory() {
                this.resetType();
                this.subcategory.name = '';
                this.category.name = '';
                this.subcategory.id = null;
                this.category.id = null;
                this.type.isCar = false;
                this.type.chip = false;
                this.$store.commit('setSubcategories', {});
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
            clearLocation() {
                this.location.district = '';
                this.location.city = '';
                this.location.name = '';
                this.location.cities = [];
            },
            addNewItem() {
                this.$v.$touch();
                if (!this.$refs.form.validate())
                    return;

                const item = {
                    title: this.title,
                    description: this.description,
                    price: this.price.value,
                    currency: this.currency.value,
                    location: this.location.city + ', ' + this.location.district,
                    category: this.category.id,
                    sub_category: this.subcategory.id,
                    type: this.type.id,
                    manufacturer: this.manufacturer,
                    model: this.model,
                    manufacturer_year: this.manufacturerYear,
                    used: this.used.value,

                    engine: this.engine,
                    power: this.power,
                    gearbox: this.gearbox.value,
                    body: this.body.value,
                    fuel_type: this.fuelType.value,
                    mileage: this.mileage,

                    drive: this.drive.value,
                    emission_class: this.emissionClass.value,
                    color: this.color.value,
                    origin: this.origin,
                    VIN: this.VIN,

                    pollution_tax: this.pollution_tax,
                    damaged: this.damaged,
                    registered: this.registered,
                    first_owner: this.firstOwner,
                    right_hand_drive: this.rightHandDrive
                };

                let form = new FormData;

                for (let key in item)
                    form.append(key, item[key]);


                this.images.data.forEach((img) => {
                    form.append('images[]', img.image);
                });


                console.log(item);

                // this.$store.dispatch('addItem', form);
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
                switch (this.currency.value) {
                    case 0 :
                        return 'Lei';
                    case 1 :
                        return '€';
                    case 2 :
                        return 'Schimb';
                }
            },
            locationErrors() {
                let error = '';
                if (!this.$v.location.name.$dirty)
                    return error;
                if (!this.$v.location.name.required)
                    error = 'Locația este obligatorie.';

                return error;
            },
            categoryErrors() {
                let error = '';
                if (!this.$v.subcategory.name.$dirty)
                    return error;
                if (!this.$v.subcategory.name.required)
                    error = 'Categoria este obligatorie.';

                return error;
            },
            typeErrors() {
                const errors = [];
                if (!this.$v.type.name.$dirty) return errors;
                !this.$v.type.name.required && errors.push('Alegeti un tip.');
                return errors;
            },
            locationColor() {
                if (this.$v.location.name.$dirty)
                    return 'red';
            },
            categoryColor() {
                if (this.$v.subcategory.name.$dirty)
                    return 'red';
            },
            setTransmissionOptions() {
                return this.type.id === 32 ? this.drive.car : this.drive.bikes;
            },
            setManufacturerYear() {

                let options = [];
                const now = new Date();
                const start = now.getFullYear();
                const stop = 1990;

                for (let i = start; i >= stop; i--) {
                    const year = {
                        value: i.toString()
                    };
                    options.push(year);
                }

                options.push('Mai vechi de ' + stop);
                return options;
            }
        },
        validations: {
            location: {
                name: {
                    required
                }
            },
            subcategory: {
                name: {
                    required
                }
            },
            type: {
                name: {
                    required
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

    .space {
        height: 50px;
    }

    .location-category {
        margin-left: 28px;
    }

    .icon-error {
        color: red;
    }


</style>
