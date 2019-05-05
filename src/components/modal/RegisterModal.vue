<template>
    <v-dialog persistent v-model="showRegister" max-width="400px">
        <v-card>
            <v-card-title>
                <h2>Creare cont</h2>
            </v-card-title>

            <v-card-text>
                <v-form class="px-3">
                    <v-text-field v-model="name"
                                  prepend-icon="account_circle"
                                  label="Nume"
                                  placeholder="Nume si prenume"
                    ></v-text-field>
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
                            <v-btn class="mx-0 mt-3" color="primary" @click="onRegister">Urmatorul pas</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
                <app-verify-modal/>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import VerifyModal from './VerifyModal';

    export default {
        data() {
            return {
                name: '',
                email: '',
                password: ''
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
            },
            close() {
                this.$store.dispatch('closeRegister');
            }
        },
        computed: {
            showRegister() {
                return this.$store.getters.showRegister;
            }
        },
        components: {
            appVerifyModal: VerifyModal
        }

    };
</script>

<style scoped>

</style>
