<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout justify-center mt-5>
        <v-flex xs12 sm8 md8 lg7 xl7>
            <v-card :img="require('../../assets/settings-background.png')" class="white--text">
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

                        <v-icon class="ml-1">vpn_key</v-icon>
                        <label @click="showDetails = true" class="ml-2 password">Schimbă parola</label>
                        <v-dialog max-width="600px" v-model="showDetails">
                            <app-change-password @closeDialog="showDetails = false"/>
                        </v-dialog>
                    </v-card-text>


                    <v-card-actions class="justify-center mt-2">
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
    import ChangePassword from '../../components/auth/ChangePassword';

    export default {
        data: () => ({
            valid: false,
            showDetails: false,



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


            // user: null,
            name: {
                value: null,
                active: true,
            },

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


                if (Object.entries(user).length !== 0 && user.constructor === Object) {
                    this.$store.dispatch('updateUser', user);
                }

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
        },
        computed: {
            user() {
                return this.$store.getters.user;
            },

        },
        created() {
            const user = this.$store.getters.user;
            // this.user = user;

            this.name.value = user.name;
            this.phone.value = user.phone;
            this.location.value = user.location;
            if (user.avatar !== '')
                this.avatar.url = process.env.VUE_APP_AVATAR_URL + user.avatar;
        },
        components: {
            appRomanianMap: RomanianMap,
            appChangePassword: ChangePassword,
        },

    };
</script>

<style scoped>
    .password {
        font-size: 17px;
        line-height: 17px;

    }

    .password:hover {
        cursor: pointer;
    }

    .location-container {
        height: 400px;
    }

</style>