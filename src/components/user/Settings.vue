<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout justify-center>
        <v-flex xs12 sm12 md12 lg12 xl10>
            <v-card img="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" class="white--text">
                <v-layout justify-center>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-card-title class="mr-3">
                            <v-layout column>
                                <v-layout row>
                                    <input @change="addPic" accept="image/*" ref="inputUpload"
                                           type="file"
                                           v-show="false"
                                    >
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <v-hover>
                                                <v-avatar style="cursor: pointer" @click="$refs.inputUpload.click()"
                                                          size="75px"
                                                          :class="`elevation-${hover ? 12 : 2}`"
                                                          slot-scope="{ hover }"
                                                          v-on="on">
                                                    <v-img :src="avatar.url === '' ? require('../../assets/no-avatar.png') : avatar.url"
                                                           alt="Avatar">
                                                    </v-img>
                                                </v-avatar>
                                            </v-hover>
                                        </template>
                                        <span>Alege o fotografie de profil</span>
                                    </v-tooltip>
                                    <v-text-field dark class="ml-3"
                                                  v-model="name.value"
                                                  :rules="[rules.name.required, rules.name.length]"
                                                  :counter="25"
                                                  :readonly="name.active"
                                    >
                                        <v-tooltip slot="append" right>
                                            <v-icon @click="editField(name)" slot="activator">{{name.active ? 'edit' :
                                                'done'}}
                                            </v-icon>
                                            <span>Modifică</span>
                                        </v-tooltip>
                                    </v-text-field>
                                </v-layout>
                                <v-text-field
                                        v-model="user.email"
                                        prepend-icon="email"
                                        readonly
                                        dark
                                >
                                </v-text-field>
                            </v-layout>
                        </v-card-title>
                    </v-form>
                </v-layout>
            </v-card>
            <v-card>
                <v-card-text>
                    <v-card-text>

                        <v-text-field
                                v-model="phone.value"
                                mask="#### ### ###"
                                prepend-icon="phone"
                                min="0"
                                onkeypress="return event.charCode >= 48"
                                label="Număr de telefon"
                                :readonly="phone.active"
                        >
                            <v-tooltip slot="append" right>
                                <v-icon @click="editField(phone)" slot="activator">{{phone.active ? 'edit' :
                                    'done'}}
                                </v-icon>
                                <span>Modifică</span>
                            </v-tooltip>
                        </v-text-field>

                        <v-text-field
                                v-model="location.value"
                                prepend-icon="location_on"
                                label="Locație"
                                readonly
                                class="mb-2"
                        >
                            <v-tooltip slot="append" right>
                                <v-icon @click="location.dialog = true" slot="activator">edit</v-icon>
                                <span>Modifică</span>
                            </v-tooltip>
                        </v-text-field>
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
                        <v-expansion-panel v-model="showDetails">
                            <v-expansion-panel-content>
                                <template v-slot:header>
                                    <div>Schimbă parola</div>
                                </template>
                                <v-divider/>
                                <v-card>
                                    <v-card-text>
                                        <v-stepper v-model="e1">
                                            <v-stepper-header>
                                                <v-stepper-step color="success" :complete="e1 > 1" step="1">Generare cod
                                                </v-stepper-step>

                                                <v-divider></v-divider>

                                                <v-stepper-step color="success" :complete="e1 > 2" step="2">Confirmare
                                                    cod
                                                </v-stepper-step>

                                                <v-divider></v-divider>

                                                <v-stepper-step color="success" :complete="e1 > 3" step="3">Actualizare
                                                    parolă
                                                </v-stepper-step>
                                                <v-divider></v-divider>
                                                <v-stepper-step color="success" :complete="e1 > 4" step="4">Rezultat
                                                </v-stepper-step>
                                            </v-stepper-header>
                                            <v-stepper-items>
                                                <v-stepper-content step="1">
                                                    <v-card>
                                                        <p class="pa-3">
                                                            În continuare pentru a schimba parola, va fi necesar un cod,
                                                            pe care îl veți primi pe adresa
                                                            de e-mail.
                                                        </p>
                                                    </v-card>
                                                    <v-checkbox
                                                            v-model="hasCode"
                                                            label="Am deja un cod"
                                                            color="success"
                                                            hide-details
                                                            class="mb-4">
                                                    </v-checkbox>
                                                    <v-btn color="primary"
                                                           class="font-weight-regular text-none subheading"
                                                           @click="step1">{{stepIButton}}
                                                    </v-btn>
                                                    <v-btn flat class="font-weight-regular text-none subheading"
                                                           @click="abort">
                                                        Anulare
                                                    </v-btn>
                                                </v-stepper-content>

                                                <v-stepper-content step="2">
                                                    <v-card-text class="mb-3">
                                                        <v-layout justify-center class="mb-2">
                                                            <v-flex xl6>
                                                                <v-form ref="codeForm" v-model="codeConfirm"
                                                                        lazy-validation>
                                                                    <v-text-field
                                                                            label="Introduceți codul"
                                                                            prepend-inner-icon="vpn_key"
                                                                            flat
                                                                            v-model="code"
                                                                            solo-inverted
                                                                            :rules="[rules.code.required]"
                                                                    >
                                                                    </v-text-field>
                                                                    <v-label>Nu ați primit codul? <span
                                                                            @click="generateCode"
                                                                            :class="{'generate-code': dark, 'generate-code-white': !dark }">Generați altul</span>
                                                                    </v-label>
                                                                </v-form>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-card-text>

                                                    <v-btn color="primary"
                                                           class="font-weight-regular text-none subheading"
                                                           :disabled="!codeConfirm"
                                                           @click="step2">Confirmare cod
                                                    </v-btn>
                                                    <v-btn flat class="font-weight-regular text-none subheading"
                                                           @click="abort">
                                                        Anulare
                                                    </v-btn>
                                                </v-stepper-content>

                                                <v-stepper-content step="3">
                                                    <v-card-text class="mb-3">
                                                        <v-layout row justify-center>
                                                            <v-flex xl6>
                                                                <v-form ref="passwordForm" v-model="passwordButton"
                                                                        lazy-validation>
                                                                    <v-text-field
                                                                            v-model="password"
                                                                            label="Parolă nouă"
                                                                            prepend-inner-icon="lock"
                                                                            flat
                                                                            solo-inverted
                                                                            :rules="[rules.password.required, rules.password.min]"
                                                                            :type="showPassword ? 'text' : 'password'"
                                                                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                                                            hint="Cel putin 6 caractere"
                                                                            @click:append="showPassword = !showPassword"
                                                                    >
                                                                    </v-text-field>

                                                                    <v-text-field
                                                                            v-model="confirmPassword"
                                                                            prepend-inner-icon="lock"
                                                                            label="Confirmare parolă"
                                                                            flat
                                                                            solo-inverted
                                                                            :type="showRePassword ? 'text' : 'password'"
                                                                            :append-icon="showRePassword ? 'visibility' : 'visibility_off'"
                                                                            @click:append="showRePassword = !showRePassword"
                                                                            :rules="[comparePasswords]"
                                                                    >
                                                                    </v-text-field>
                                                                </v-form>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-card-text>

                                                    <v-btn color="primary"
                                                           class="font-weight-regular text-none subheading"
                                                           @click="step3" :disabled="!passwordButton">
                                                        Actualizează parola
                                                    </v-btn>

                                                    <v-btn flat class="font-weight-regular text-none subheading"
                                                           @click="e1 = 2">Înapoi
                                                    </v-btn>
                                                </v-stepper-content>

                                                <v-stepper-content step="4">
                                                    <v-card class="mb-4">
                                                        <v-card-text>
                                                            {{result}}
                                                        </v-card-text>
                                                    </v-card>
                                                    <v-btn color="primary"
                                                           class="font-weight-regular text-none subheading"
                                                           @click="abort">Închide
                                                    </v-btn>
                                                </v-stepper-content>
                                            </v-stepper-items>
                                        </v-stepper>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn @click="updateUser" :disabled="!valid"
                               class="success font-weight-regular text-none subheading">
                            Actualizează
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import RomanianMap from '../item/RomanianMap';

    export default {
        data: () => ({
            valid: false,
            showDetails: 1,
            e1: 0,
            showPassword: false,
            showRePassword: false,
            result: '',
            hasCode: false,
            code: null,
            codeConfirm: false,
            passwordButton: false,
            stepIButton: 'Generează cod',

            rules: {
                name: {
                    required: v => !!v || 'Numele este obligatoriu.',
                    length: v => (v && v.length < 26) || 'Numele este prea mare',
                },
                password: {
                    required: value => !!value || 'Parola este obligatorie.',
                    min: v => v.length >= 6 || 'Cel putin 6 caractere.',
                },

                code: {
                    required: value => !!value || 'Codul este obligatoriu.'
                }
            },


            user: null,
            name: {
                value: null,
                active: true,
            },
            password: '',
            confirmPassword: '',
            phone: {
                value: null,
                active: true,
            },
            location: {
                value: null,
                active: true,
                district: '',
                city: '',
                cities: '',
                chip: false,
                dialog: false,
            },
            avatar: {
                file: null,
                url: '',
            },
        }),
        methods: {
            editField(field) {
                field.active = !field.active;
            },
            updateUser() {

                let user = {};

                if (this.compareValues(this.name.value, this.user.name))
                    user['name'] = this.name.value;

                if (this.compareValues(this.phone.value, this.user.phone))
                    user['phone'] = this.phone.value;

                if (this.compareValues(this.location.value, this.user.location))
                    user['location'] = this.location.value;

                if (Object.entries(user).length !== 0 && user.constructor === Object)
                    this.$store.dispatch('updateUser', user);

                let avatar = new FormData();
                avatar.append('avatar', this.avatar.file);

                if (this.avatar.file !== null)
                    this.$store.dispatch('updateAvatar', avatar);
            },
            setLocation(name) {
                this.location.value = name + ', ' + this.location.district;
                this.location.dialog = false;
            },
            districtWasSelected(district) {
                this.location.district = district.name;
                this.location.cities = district.cities;
            },
            compareValues(first, second) {
                if (first !== second)
                    if (first !== ', ')
                        return true;


                return false
            },
            addPic(e) {
                this.avatar.file = e.target.files[0];
                this.avatar.url = URL.createObjectURL(e.target.files[0]);


                this.$refs.inputUpload.value = null;
            },

            generateCode() {
                this.$store.dispatch('generateCode', {
                    email: this.$store.getters.user.email,
                    change: 1,
                }).then(response => {
                    if (response && response.data && response.data.responseType === 'success') {
                        this.$store.commit('setSnack', {
                            message: 'Codul a fost trimis',
                            color: this.$store.getters.colors.info,
                        });
                    } else {
                        this.$store.commit('setSnack', {
                            message: 'Codul nu a putut fi trimis',
                            color: this.$store.getters.colors.error,
                        });
                    }
                });
            },

            step1() {
                if (!this.hasCode)
                    this.generateCode();
                this.e1 = 2;
            },
            step2() {
                if (!this.$refs.codeForm.validate())
                    return;

                this.e1 = 3;
            },
            step3() {

                if (!this.$refs.passwordForm.validate())
                    return;

                if (!this.comparePasswords)
                    return;

                this.$store.dispatch('changePassword', {
                    email: this.$store.getters.user.email,
                    code: this.code,
                    password: this.password
                }).then(response => {
                    if (response && response.data && response.data.responseType === 'success') {
                        // commit('setSnack', {
                        //     message: 'Parola a fost actualizată',
                        //     color: state.colors.info,
                        // });
                        this.result = 'Parola a fost actualizată cu success';
                        this.e1 = 4;
                    } else {
                        this.$store.commit('setSnack', {
                            message: response.data.errorMessage,
                            color: this.$store.getters.colors.error,
                        });
                        this.e1 = 2;
                    }
                });
            },
            abort() {
                this.code = null;
                this.password = '';
                this.confirmPassword = '';
                this.hasCode = false;
                this.showDetails = 1;
                this.e1 = 1;
            },
        },
        computed: {
            comparePasswords() {
                return this.confirmPassword !== this.password ? 'Password don\'t match' : true;
            },
            dark() {
                return this.$store.getters.darkTheme;
            }
        },
        created() {
            const user = this.$store.getters.user;
            this.user = user;

            this.name.value = user.name;
            this.phone.value = user.phone;
            this.location.value = user.location;
            if (user.avatar !== '')
                this.avatar.url = process.env.VUE_APP_AVATAR_URL + user.avatar;
        },
        components: {
            appRomanianMap: RomanianMap,
        },
        watch: {
            // whenever question changes, this function will run
            hasCode: function (newCode) {
                if (newCode)
                    this.stepIButton = 'Omite pas';
                else
                    this.stepIButton = 'Generează cod';
            }
        }
    };
</script>

<style scoped>
    .location-container {
        height: 400px;
    }

    .generate-code:hover {
        cursor: pointer;
        color: white;
    }

    .generate-code-white:hover {
        cursor: pointer;
        color: black;
    }
</style>