<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm5 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field name="email"
                                                      label="Mail"
                                                      placeholder="Adresa de email"
                                                      id="email"
                                                      v-model="email"
                                                      type="email"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field name="password"
                                                      label="Parola"
                                                      placeholder="Parola"
                                                      id="password"
                                                      v-model="password"
                                                      type="password"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn class="text-uppercase" @click="onLogin">Autentificare</v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            };
        },
        methods: {
            onLogin() {
                const authData = {
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch('login', authData);
            }
        }
    };
</script>

<style scoped>

</style>
