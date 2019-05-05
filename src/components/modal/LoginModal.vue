<template>
    <v-dialog persistent v-model="show" max-width="400px">
        <v-card>
            <v-card-title>
                <h2>Login</h2>
            </v-card-title>

            <v-card-text>
                <v-form class="px-3">
                    <v-text-field v-model="email"
                                  prepend-icon="mail"
                                  label="Email"
                                  placeholder="Adresa de email"
                                  type="email"
                    ></v-text-field>
                    <v-text-field v-model="password"
                                  prepend-icon="lock_open"
                                  label="Parola"
                                  placeholder="Parola"
                                  type="password"
                    ></v-text-field>
                    <v-layout row>
                        <v-flex xs12>
                            <v-btn class="mx-0 mt-3" color="error" @click="close">Renunta</v-btn>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn class="mx-0 mt-3" color="primary" @click="onLogin">Autentificare</v-btn>
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
                email: '',
                password: ''
            };
        },
        methods: {
            onLogin() {
                const authData = {
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch('login', authData);
                if (this.$store.getters.user)
                    this.close();
            },
            close() {
                this.$store.dispatch('closeLogin');
            }
        },
        computed: {
            show() {
                return this.$store.getters.showLogin;
            }
        }
    };
</script>

<style scoped>

</style>
