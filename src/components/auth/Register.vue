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
                                        <v-text-field name="name"
                                                      label="Nume"
                                                      id="nume"
                                                      v-model="name"
                                                      type="text"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field name="email"
                                                      label="Mail"
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
                                                      id="password"
                                                      v-model="password"
                                                      type="password"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field name="confirmPassword"
                                                      label="Confirmare Parola"
                                                      id="confirmPassword"
                                                      v-model="confirmPassword"
                                                      type="password"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn class="text-uppercase" @click="onRegister">Creare cont</v-btn>
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
            onRegister() {
                const authData = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch('register', authData);
            }
        }
    };
</script>

<style scoped>

</style>
