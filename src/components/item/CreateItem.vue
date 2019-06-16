<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout justify-center>
        <v-flex lg8 md10 sm10 xl6 xs11>
            <v-card class="pa-5">
                <v-card-title>
                    <h2 v-if="edit">Actualizare anunț</h2>
                    <h2 v-if="!edit">Adaugare anunț nou</h2>
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
                                        class="text-md-justify"
                            >
                            </v-textarea>
                        </v-flex>
                    </v-layout>

                    <!--Price-->
                    <v-layout row justify-space-between class="mb-4" wrap>
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
                    <div class="space mb-3">
                        <v-chip close v-model="location.chip"
                                class="subheading"
                                @input="clearLocation"
                        >
                            <v-avatar>
                                <v-icon>location_on</v-icon>
                            </v-avatar>
                            {{location.name}}
                        </v-chip>

                        <v-btn @click="location.dialog = true"
                               class="text-none font-weight-regular subheading"
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
                            <v-chip :close="!edit" v-model="subcategory.chip" @input="resetCategory" class="subheading">
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
                            <v-chip :close="!edit" v-model="chip.value"
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
                    <!--images-->
                    <v-label class="subheading">
                        <v-icon>photo</v-icon>
                        Fotografii
                    </v-label>

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
                                        <v-card @click.stop="selectPreview(index)"
                                                :class="`elevation-${hover ? 12 : 2}`"
                                                class="pa-1 ma-1"
                                                slot-scope="{ hover }"
                                                width="90%"
                                                :color="image.preview ? 'success': ''"
                                        >
                                            <v-img :src="image.url" height="80">
                                                <v-expand-transition>
                                                    <div class="d-flex transition-fast-in-fast-out v-card--reveal"
                                                         v-if="hover">
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-tooltip top>
                                                                <template v-slot:activator="{ on }">
                                                                    <v-btn icon>
                                                                        <v-icon @click.native="deleteImg(index)"
                                                                                color="red" v-on="on">
                                                                            clear
                                                                        </v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <span>Șterge fotografia</span>
                                                            </v-tooltip>
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

                    <!-- Contact Data-->
                    <v-divider class="mb-3"></v-divider>


                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="showContactData = !showContactData">
                            Date de contact
                            <v-icon>{{ showContactData ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-scale-transition>
                        <v-card-text v-if="showContactData">
                            <v-layout class="mb-3" column>
                                <v-layout class="mb-4" align-center justify-space-between row wrap>
                                    <!-- Name  -->
                                    <v-flex xs12 sm5 md4 lg3>
                                        <v-chip>
                                            <v-icon left>face</v-icon>
                                            {{user.name}}
                                        </v-chip>
                                    </v-flex>

                                    <!-- Email  -->
                                    <v-flex xs12 sm5 md4 lg3>
                                        <v-chip>
                                            <v-icon left>email</v-icon>
                                            {{user.email}}
                                        </v-chip>
                                    </v-flex>
                                    <!-- Phone  -->
                                    <v-flex xs12 sm5 md4 lg3>
                                        <v-chip>
                                            <v-icon left>phone</v-icon>
                                            {{user.phone}}
                                        </v-chip>
                                    </v-flex>
                                </v-layout>
                            </v-layout>
                        </v-card-text>
                    </v-scale-transition>
                </v-form>
                <v-btn @click="addOrDelete" class="subheading text-none" color="success"
                       :disabled="!valid || $v.$error">
                    <v-icon left>add_to_queue</v-icon>
                    <span v-if="edit">Actualizează anunț</span>
                    <span v-if="!edit">Adaugă anunț</span>
                </v-btn>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import RomanianMap from './RomanianMap';
    import {required} from 'vuelidate/lib/validators';

    export default {
        props: {
            edit: {
                type: Boolean,
                default: false
            },
        },
        data: () => ({
            itemCopy: null,
            API_URL: 'http://dev.shop/storage/',
            valid: false,
            showDetails: true,
            showContactData: true,

            chip: {
                value: false,
            },

            rules: {
                title: {
                    required: v => !!v || 'Titlul anuntului este obligatoriu.',
                    length: v => (v && v.length < 61) || 'Titlul este prea lung.',
                },
                description: {
                    required: v => !!v || 'Descrierea anuntului este obligatorie.',
                    length: v => (v.length < 5000) || 'Descrierea este prea lunga.',
                },
                price: {
                    required: v => !!v || 'Pretul este obligatoriu.',
                },
            },

            user: null,

            title: '',
            description: '',
            price: {
                value: null,
                negotiable: false,
                change: false,
            },
            currency: {
                value: 0,
                types: [
                    {name: 'Lei', value: 0},
                    {name: 'Euro', value: 1},
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
                name: '',
                id: null,
                dialog: false,
                categories: [],
            },
            subcategory: {
                name: '',
                id: null,
                chip: false,
                subcategories: [],
            },
            type: {
                name: '',
                id: null,
                chip: false,
                isCar: false,
                types: [],
            },
            images: {
                data: [],
                toDelete: [],
                number: 8,
                current: 0,
                last: 0,
            },
            manufacturer: '',
            model: '',
            manufacturerYear: null,
            used: {
                value: 1,
                status: [
                    {name: 'Nou', value: 0},
                    {name: 'Utilizat', value: 1},
                ],
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
                    {name: 'Automată (dublu ambreaj'},
                ],

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
                    {name: 'SUV'},
                ],
            },
            fuelType: {
                value: '',
                options: [
                    {name: 'Benzină'},
                    {name: 'Diesel'},
                    {name: 'GPL'},
                    {name: 'Hibrid'},
                    {name: 'Electric'},
                ],
            },
            mileage: null,

            drive: {
                value: '',
                car: [
                    {name: 'Fată'},
                    {name: 'Spate'},
                    {name: 'Integrală'},
                ],
                bikes: [
                    {name: 'Cardan'},
                    {name: 'Curea'},
                    {name: 'Lanț'},
                ],
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
                    {name: 'Euro VI'},
                ],
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
                    {name: 'Altă culoare'},
                ],
            },
            origin: '',
            VIN: '',

            pollutionTax: false,
            damaged: false,
            registered: false,
            firstOwner: false,
            rightHandDrive: false,

            message: '',
        }),
        components: {
            appRomanianMap: RomanianMap,
        },
        methods: {
            loadUser() {
                this.user = this.$store.getters.user;
            },
            clearForm() {
                this.$v.$reset();
            },
            addPic(e) {
                const images = Array.from(e.target.files);

                images.forEach((i) => {
                    const newImg = {
                        image: i,
                        url: URL.createObjectURL(i),
                        preview: false,
                    };

                    if (this.images.data.length < this.images.number)
                        this.images.data.push(newImg);

                    if (!this.images.data[this.images.current].preview)
                        this.images.data[0].preview = true;
                });

                if (this.images.data.length >= this.images.number) {
                    this.$store.commit('setSnack', {
                        message: 'Ați atins limita de fotografii posibile',
                        color: this.$store.getters.colors.info,
                    });
                    return;
                }

                this.$refs.inputUpload.value = null;
            },
            selectPreview(index) {
                if (index === this.images.current)
                    return;

                this.images.last = this.images.current;
                this.images.current = index;

                this.images.data[this.images.last].preview = false;
                this.images.data[this.images.current].preview = true;
            },
            addPicFromServer(images) {
                images.forEach((img) => {
                    const wt = {
                        id: img.id,
                        url: this.API_URL + img.filename,
                    };

                    this.images.data.push(wt);
                });
            },
            deleteImg(index) {
                if (this.edit) {
                    const img = {
                        id: this.images.data[index].id,
                        filename: this.images.data[index].url.substring(this.API_URL.length, this.images.data[index].url.length)
                    };

                    this.images.toDelete.push(img);
                }


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
            addOrDelete() {
                this.$v.$touch();
                if (!this.$refs.form.validate())
                    return;

                if (this.category.id === null || this.subcategory.id === null || this.location.name === '')
                    return;

                if (this.edit)
                    this.editItem();
                else
                    this.addNewItem();
            },

            addNewItem() {
                const item = {
                    title: this.title,
                    description: this.description,
                    price: this.price.value,
                    currency: this.currency.value,
                    negotiable: this.boolToInt(this.price.negotiable),
                    change: this.boolToInt(this.price.change),
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

                    pollution_tax: this.boolToInt(this.pollutionTax),
                    damaged: this.boolToInt(this.damaged),
                    registered: this.boolToInt(this.registered),
                    first_owner: this.boolToInt(this.firstOwner),
                    right_hand_drive: this.boolToInt(this.rightHandDrive),
                };

                let form = new FormData;

                for (let key in item)
                    form.append(key, item[key]);


                this.images.data.forEach((img) => {
                    form.append('images[]', img.image);
                });

                this.$store.dispatch('addItem', form);
            },

            editItem() {

                const updatedItem = {
                    category: this.category.id,
                    sub_category: this.subcategory.id,
                    type: this.type.id,

                    title: this.compareValues(this.title, this.itemCopy.title),
                    description: this.compareValues(this.description, this.itemCopy.description),
                    price: this.compareValues(this.price.value, this.itemCopy.price),
                    negotiable: this.boolToInt(this.compareValues(this.price.negotiable, this.itemCopy.negotiable)),
                    change: this.boolToInt(this.compareValues(this.price.change, this.itemCopy.change)),
                    currency: this.compareValues(this.currency.value, this.itemCopy.currency),

                    location: this.compareValues(this.location.city + ', ' + this.location.district, this.itemCopy.location),

                    manufacturer: this.compareValues(this.manufacturer, this.itemCopy.manufacturer),
                    model: this.compareValues(this.model, this.itemCopy.model),
                    manufacturer_year: this.compareValues(this.manufacturerYear, this.itemCopy.manufacturer_year),
                    used: this.compareValues(this.used.value, this.itemCopy.used),

                    engine: this.compareValues(this.engine, this.itemCopy.engine),
                    power: this.compareValues(this.power, this.itemCopy.power),
                    gearbox: this.compareValues(this.gearbox.value, this.itemCopy.gearbox),
                    body: this.compareValues(this.body.value, this.itemCopy.body),
                    fuel_type: this.compareValues(this.fuelType.value, this.itemCopy.fuel_type),
                    mileage: this.compareValues(this.mileage, this.itemCopy.mileage),

                    drive: this.compareValues(this.drive.value, this.itemCopy.drive),
                    emission_class: this.compareValues(this.emissionClass.value, this.itemCopy.emission_class),
                    color: this.compareValues(this.color.value, this.itemCopy.color),
                    origin: this.compareValues(this.origin, this.itemCopy.origin),
                    VIN: this.compareValues(this.VIN, this.itemCopy.VIN),

                    pollution_tax: this.boolToInt(this.compareValues(this.pollutionTax, this.itemCopy.pollution_tax)),
                    damaged: this.boolToInt(this.compareValues(this.damaged, this.itemCopy.damaged)),
                    registered: this.boolToInt(this.compareValues(this.registered, this.itemCopy.registered)),
                    first_owner: this.boolToInt(this.compareValues(this.first_owner, this.itemCopy.first_owner)),
                    right_hand_drive: this.boolToInt(this.compareValues(this.right_hand_drive, this.itemCopy.right_hand_drive)),
                };



                let form = new FormData;

                for (let key in updatedItem)
                    if (updatedItem[key] !== null && updatedItem[key] !== undefined) {
                        form.append(key, updatedItem[key]);
                    }

                let images = this.images.data.filter(img => img.id === undefined);


                images.forEach((img) => {
                    form.append('images[]', img.image);
                });

                this.images.toDelete.forEach((image) => {
                    form.append('imageFilenames[]', image.filename,),
                        form.append('imageIds[]', image.id,)
                });

                form.append('_method', 'patch');


                this.$store.dispatch('updateItem', {
                    id: this.$route.query.id,
                    form
                });

                this.images.toDelete = [];

            },

            boolToInt(data) {
                return data ? 1 : 0;
            },

            compareValues(first, second) {
                if (first != second)
                    if (first !== ', ')
                        return first;

                return null;
            },

            buildEditItem() {

            },

        },
        created() {
            this.$store.dispatch('loadCategories');
            this.loadUser();

            if (this.user.location) {
                this.location.name = this.user.location;
                this.location.chip = true;
            }

            if (this.edit) {
                this.$store.dispatch('loadItem', this.$route.query.id).then(response => {
                    if (response && response.data && response.data.responseType === 'success') {

                        this.itemCopy = response.data.data.item;

                        this.title = response.data.data.item.title;
                        this.description = response.data.data.item.description;
                        this.price.value = response.data.data.item.price;
                        this.price.negotiable = response.data.data.item.negotiable;
                        this.price.change = response.data.data.item.change;
                        this.currency.value = response.data.data.item.currency;

                        this.location.name = response.data.data.item.location;
                        this.location.chip = true;

                        this.category.id = response.data.data.item.category;

                        this.subcategory.id = response.data.data.item.sub_category;
                        this.subcategory.name = response.data.data.item.sub_category_name;
                        this.subcategory.chip = true;

                        this.type.id = response.data.data.item.item_type;
                        this.type.name = response.data.data.item.item_type_name;
                        this.chip.value = true;

                        this.addPicFromServer(response.data.data.item.images);
                        this.manufacturer = response.data.data.item.manufacturer;
                        this.model = response.data.data.item.model;
                        this.manufacturerYear = response.data.data.item.manufacturer_year.toString();
                        this.used.value = response.data.data.item.used;
                        this.engine = response.data.data.item.engine;
                        this.power = response.data.data.item.power;

                        this.gearbox.value = response.data.data.item.gearbox;

                        this.body.value = response.data.data.item.body;
                        this.fuelType.value = response.data.data.item.fuel_type;
                        this.mileage = response.data.data.item.mileage;
                        this.drive.value = response.data.data.item.drive;
                        this.emissionClass.value = response.data.data.item.emission_class;
                        this.color.value = response.data.data.item.color;
                        this.origin = response.data.data.item.origin;
                        this.VIN = response.data.data.item.VIN;

                        this.pollutionTax = response.data.data.item.pollution_tax;
                        this.damaged = response.data.data.item.damaged;
                        this.registered = response.data.data.item.registered;
                        this.firstOwner = response.data.data.item.first_owner;
                        this.rightHandDrive = response.data.data.item.right_hand_drive;
                    } else {

                    }
                });
            }
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
                        value: i.toString(),
                    };
                    options.push(year);
                }

                options.push('Mai vechi de ' + stop);
                return options;
            },


        },
        validations: {
            location: {
                name: {
                    required,
                },
            },
            subcategory: {
                name: {
                    required,
                },
            },
            type: {
                name: {
                    required,
                },
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

    .location-category {
        margin-left: 28px;
    }

    .icon-error {
        color: red;
    }

    .preview {
        border: 2px solid green;
    }


</style>
