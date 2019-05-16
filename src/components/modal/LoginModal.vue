<template>
    <v-dialog persistent v-model="show" max-width="400px">
        <v-card>
            <v-card-title>
                <h2>Login</h2>
            </v-card-title>
            <v-card-text class="px-3" v-if="error">
                <app-alert @dismissed="onDismissed" :text="error" r></app-alert>
            </v-card-text>
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
                            class="mb-3"
                    ></v-text-field>

                    <v-layout align-center justify-space-around row fill-height>
                        <v-btn class="text-none font-weight-regular subheading" color="warning" @click="close">
                            Renunta
                        </v-btn>
                        <v-btn class="text-none font-weight-regular subheading" :disabled="!valid" color="success"
                               @click="login">
                            Autentificare
                        </v-btn>
                    </v-layout>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                valid: false,
                showPassword: false,
                email: '',
                password: '',
                rules: {
                    name: {
                        required: v => !!v || 'Numele este obligatoriu.',
                        length: v => (v && v.length < 25) || 'Introduceti doar numele si un prenume.',
                    },
                    email: {
                        required: v => !!v || 'Adresa de email este obligatorie.',
                        valid: v => /.+@.+/.test(v) || 'Introduceti o adresa de e-mail valida.',
                    },
                    password: {
                        required: value => !!value || 'Parola este obligatorie.',
                        min: v => v.length >= 3 || 'Cel putin 6 caractere.',
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
                    console.log('Request: Login');
                    console.log('Username: ' + authData.email);
                    console.log('Password: ' + authData.password);
                    this.$store.dispatch('login', authData);
                }
            },
            close() {
                this.$store.dispatch('closeLogin');
                //  this.$store.dispatch('clearError');
                this.clearForm();
            },
            onDismissed() {
                this.$store.dispatch('clearError');
            },
            validate() {
                console.log(this.$refs.form.validate());
            },
            clearForm() {
                this.email = '';
                this.password = '';
                this.$refs.form.resetValidation();
            },
        },
        computed: {
            show() {
                return this.$store.getters.showLogin;
            },
            error() {
                return this.$store.getters.error;
            },
        },
        destroyed() {
            this.clearForm();
        },
    };
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>

