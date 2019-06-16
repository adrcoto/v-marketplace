<template>
    <v-layout justify-center>
        <v-flex xs6 sm6 md6 lg6 xl6>
            <v-card color="blue-grey darken-2" class="white--text">
                <v-layout justify-center>
                    <v-card-title class="mr-3">
                        <input @change="addPic" accept="image/*" ref="inputUpload"
                               type="file"
                               v-show="false"
                        >

                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <v-avatar style="cursor: pointer" @click="$refs.inputUpload.click()" size="75px"
                                          v-on="on">
                                    <img :src="avatar.url !== '' ? avatar.url : require('../../assets/no-avatar.png')"
                                         alt="Avatar">
                                </v-avatar>
                            </template>
                            <span>Alege o fotografie de profil</span>
                        </v-tooltip>
                        <v-text-field dark class="ml-3"
                                      v-model="name.value"
                                      :readonly="name.active"
                        >
                            <v-tooltip slot="append" right>
                                <v-icon @click="updateUser(name)" slot="activator">{{name.active ? 'edit' :
                                    'done'}}
                                </v-icon>
                                <span>Modifică</span>
                            </v-tooltip>
                        </v-text-field>
                    </v-card-title>
                </v-layout>
            </v-card>
            <v-card>
                <v-card-text>
                    <v-card-text>


                        <v-text-field
                                v-model="user.email"
                                prepend-icon="email"
                                readonly
                        >

                        </v-text-field>


                        <v-text-field
                                v-model="phone.value"
                                prepend-icon="phone"
                                label="Număr de telefon"
                                :readonly="phone.active"
                        >
                            <v-tooltip slot="append" right>
                                <v-icon @click="phone.active = !phone.active" slot="activator">edit</v-icon>
                                <span>Modifică</span>
                            </v-tooltip>
                        </v-text-field>

                        <v-text-field
                                v-model="location.value"
                                prepend-icon="location_on"
                                label="Locație"
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
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn @click="updateUser" class="success font-weight-regular text-none subheading">
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
            user: null,
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
            updateUser(field) {
                if (field.active) {
                    field.active = false;
                    return;
                } else
                    field.active = true;

                const user = {
                    name: this.name.value,
                    phone: this.phone.value,
                    location: this.location.name,
                };

                let form = new FormData;

                for (let key in user)
                    form.append(key, user[key]);

                this.$store.dispatch('updateUser', user);
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
                        return first;

                return null;
            },
            addPic(e) {
                this.avatar.file = e.target.files[0];
                this.avatar.url = URL.createObjectURL(e.target.files[0]);


                this.$refs.inputUpload.value = null;
            },
        },
        created() {
            const user = this.$store.getters.user;
            this.user = user;

            this.name.value = user.name;
            this.phone.value = user.phone;
            this.location.value = user.location;
        },
        components: {
            appRomanianMap: RomanianMap,
        },
    };
</script>

<style scoped>
    .location-container {
        height: 400px;
    }
</style>