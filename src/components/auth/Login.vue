<template>
    <v-dialog persistent v-model="show" max-width="400px">
        <v-card>
            <v-card-title>
                <h2>Login</h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="email"
                                  prepend-icon="mail"
                                  label="E-mail"
                                  placeholder="Adresa de e-mail"
                                  :rules="[rules.email.required, rules.email.valid]"
                                  class="mb-3"
                    ></v-text-field>
                    <v-text-field
                            v-model="password"
                            prepend-icon="lock_open"
                            label="Parola"
                            placeholder="Parola"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                            :rules="[rules.password.required, rules.password.min]"
                            hint="Cel putin 6 caractere"
                            @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <v-layout class="ml-4" justfify-center>
                        <v-flex xl6>
                            <span @click="showForgotModal" class="font-weight-light.font-italic caption custom"
                                  :class="{'forgot-password': dark, 'forgot-password-white': !dark }">Mi-am uitat parola</span>
                        </v-flex>
                        <v-flex xl6>
                            <span @click="openRegisterModal" class="font-weight-light.font-italic caption custom ml-4">Nu ai cont ?<span
                                    :class="{'forgot-password': dark, 'forgot-password-white': !dark }"> Fă-ți unul</span></span>
                        </v-flex>
                    </v-layout>
                    <v-layout align-center justify-space-around row fill-height class="mt-4">
                        <v-btn class="text-none font-weight-regular subheading" color="warning" @click="close">
                            Renunță
                        </v-btn>
                        <v-btn class="text-none font-weight-regular subheading" :disabled="!valid" color="success"
                               @click="login">
                            Autentificare
                        </v-btn>
                    </v-layout>
                </v-form>
            </v-card-text>
        </v-card>
        <v-dialog persistent v-model="getForgot" max-width="600">
            <app-forgot-password/>
        </v-dialog>
    </v-dialog>
</template>

<script>
    import ForgotPassword from './ForgotPassword'

    export default {
        data() {
            return {
                valid: false,
                showPassword: false,
                email: '',
                showForgot: false,
                password: '',
                rules: {
                    email: {
                        required: v => !!v || 'Adresa de email este obligatorie.',
                        valid: v => /.+@.+/.test(v) || 'Introduceti o adresa de e-mail valida.',
                    },
                    password: {
                        required: value => !!value || 'Parola este obligatorie.',
                        min: v => v.length >= 6 || 'Cel putin 6 caractere.',
                    },
                },
            };
        },
        methods: {
            login() {
                if (this.$refs.form.validate()) {
                    const authData = {
                        email: this.email,
                        password: this.password,
                    };
                    this.$store.dispatch('login', authData);
                }
            },
            close() {
                this.$store.dispatch('closeLogin');
                //  this.$store.dispatch('clearError');
                this.clearForm();
            },
            clearForm() {
                this.email = '';
                this.password = '';
            },
            openRegisterModal() {
                this.$store.dispatch('showRegister');
                this.close();
            },
            showForgotModal() {
                this.$store.dispatch('closeLogin');
                this.$store.dispatch('showForgot')
            }
        },
        computed: {
            show() {
                return this.$store.getters.showLogin;
            },
            getForgot(){
                return this.$store.getters.showForgot;
            },
            dark() {
                return this.$store.getters.darkTheme;
            }
        },
        destroyed() {
            this.clearForm();
        },
        components: {
            appForgotPassword: ForgotPassword
        }
    };
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    .forgot-password:hover {
        cursor: pointer;
        color: white;
        text-decoration: underline;
    }

    .forgot-password-white:hover {
        cursor: pointer;
        color: black;
        text-decoration: underline;
    }

    .custom {
        color: #9E9E9E;
        margin-left: 9px;
    }
</style>

