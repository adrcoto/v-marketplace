<template>
    <v-dialog persistent v-model="showRegister" max-width="400px">
        <v-card>
            <v-card-title>
                <h2>Creare cont</h2>
            </v-card-title>
            <!--            <v-card-text class="px-3" v-if="error">-->
            <!--                <app-alert @dismissed="onDismissed" :text="error" r></app-alert>-->
            <!--            </v-card-text>-->
            <v-card-text>
                <!--                <v-form class="px-3" ref="form" v-model="valid" lazy-validation>-->
                <!--                    <v-text-field v-model="name"-->
                <!--                                  prepend-icon="account_circle"-->
                <!--                                  label="Nume"-->
                <!--                                  placeholder="Nume si prenume"-->
                <!--                    ></v-text-field>-->
                <!--                    <v-text-field v-model="email"-->
                <!--                                  prepend-icon="mail"-->
                <!--                                  label="Email"-->
                <!--                                  placeholder="Adresa de email"-->
                <!--                                  type="email"-->
                <!--                    ></v-text-field>-->
                <!--                    <v-text-field v-model="password"-->
                <!--                                  prepend-icon="lock_open"-->
                <!--                                  label="Parola"-->
                <!--                                  placeholder="Parola"-->
                <!--                                  type="password"-->
                <!--                    ></v-text-field>-->
                <!--                    <v-layout row>-->
                <!--                        <v-flex xs12>-->
                <!--                            <v-btn class="mx-0 mt-3" color="error" @click="close">Renunta</v-btn>-->
                <!--                        </v-flex>-->
                <!--                        <v-flex xs12>-->
                <!--                            <v-btn class="mx-0 mt-3 text-none" :disabled="!valid"-->
                <!--                                   color="success"-->
                <!--                                   @click="validate">Urmatorul pas-->
                <!--                            </v-btn>-->
                <!--                        </v-flex>-->
                <!--                    </v-layout>-->
                <!--                </v-form>-->
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="name" :rules="nameRules" prepend-icon="account_circle" label="Nume"
                                  placeholder="Nume si prenume" required></v-text-field>
                    <v-text-field v-model="email" :rules="emailRules" prepend-icon="mail" label="E-mail"
                                  placeholder="Adresa de e-mail" required></v-text-field>
                    <v-text-field v-model="password" :rule="passwordRules" prepend-icon="lock_open" label="Parola"
                                  placeholder="Parola" type="password"></v-text-field>
                    <v-btn :disabled="!valid" color="success" @click="validate">
                        Validate
                    </v-btn>

                    <v-btn color="error" @click="reset">
                        Reset Form
                    </v-btn>

                    <v-btn color="warning" @click="resetValidation">
                        Reset Validation
                    </v-btn>
                </v-form>

            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import VerifyModal from './VerifyModal';

    export default {
        // data() {
        //     return {
        //         valid: true,
        //         name: '',
        //         nameRules: [
        //             v => !!v || 'Numele este obligatoriu.',
        //             v => (v && v.length <= 20) || 'Introduceti doar numele si un prenume.'
        //         ],
        //         email: '',
        //         password: ''
        //     };
        // },
        // methods: {
        //     onRegister() {
        //         const authData = {
        //             name: this.name,
        //             email: this.email,
        //             password: this.password
        //         };
        //         this.$store.dispatch('register', authData);
        //     },
        //     close() {
        //         this.$store.dispatch('closeRegister');
        //         this.$store.dispatch('clearError');
        //         this.name = '';
        //         this.email = '';
        //         this.password = '';
        //     },
        //     onDismissed() {
        //         this.$store.dispatch('clearError');
        //     },
        //     validate() {
        //         if (this.$refs.form.validate()) {
        //             this.snackbar = true
        //         }
        //     }
        // },
        // computed: {
        //     showRegister() {
        //         return this.$store.getters.showRegister;
        //     },
        //     error() {
        //         return this.$store.getters.error;
        //     }
        // },
        // components: {
        //     appVerifyModal: VerifyModal
        // }
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 20) || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            passwordRules: [
                v => (v && v.length <= 20) || 'asdasdasdsadaracters'
            ]
        }),

        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true;
                }
            },
            reset() {
                this.$refs.form.reset();
            },
            resetValidation() {
                this.$refs.form.resetValidation();
            },
            close() {
                this.$store.dispatch('closeRegister');
                this.name = '';
                this.email = '';
                this.password = '';
            }
        },
        components: {
            appVerifyModal: VerifyModal
        },
        computed: {
            showRegister() {
                return this.$store.getters.showRegister;
            },
            error() {
                return this.$store.getters.error;
            }
        }

    };
</script>

<style scoped>

</style>
