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
                <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="email"
                                  prepend-icon="mail"
                                  label="Email"
                                  placeholder="Adresa de email"
                                  type="email"
                                  :rules="emailRules"
                                  required
                    ></v-text-field>
                    <v-text-field v-model="password"
                                  prepend-icon="lock_open"
                                  label="Parola"
                                  placeholder="Parola"
                                  type="password"
                                  :rukes="passwordRules"
                                  required
                    ></v-text-field>
                    <v-layout row>
                        <v-flex xs12>
                            <v-btn class="mx-0 mt-3" color="error" @click="close">Renunta</v-btn>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn class="mx-0 mt-3" color="primary" :disabled="!valid" @click="validate">
                                Autentificare
                            </v-btn>
                        </v-flex>
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
                valid: true,
                email: '',
                emailRules: [
                    v => !!v || 'Adresa de email este obligatorie.',
                    v => /.+@.+/.test(v) || 'Introduceti o adresa de e-mail valida.'
                ],
                password: '',
                passwordRules: [
                    v => !!v || 'Parola este obligatorie.',
                    v => (v && v.length < 6) || 'Parola trebuie sa contina cel putin 6 caractere.'
                ]
            }
                ;
        },
        methods: {
            onLogin() {
                const authData = {
                    email: this.email,
                    password: this.password
                };
                console.log(this.validate());
                // this.$store.dispatch('login', authData);
            },
            close() {
                this.$store.dispatch('closeLogin');
                //  this.$store.dispatch('clearError');
                this.email = '';
                this.password = '';
            },
            onDismissed() {
                this.$store.dispatch('clearError');
            },
            validate() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                }
            }
        },
        computed: {
            show() {
                return this.$store.getters.showLogin;
            },
            error() {
                return this.$store.getters.error;
            }
        }
    }
    ;
</script>

<style scoped>

</style>

