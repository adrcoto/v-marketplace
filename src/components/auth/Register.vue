<template>
    <v-dialog persistent v-model="showRegister" max-width="400px">
        <v-card>
            <v-card-title>
                <h2>Creare cont</h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="name"
                                  prepend-icon="account_circle"
                                  label="Nume"
                                  placeholder="Nume si prenume"
                                  :rules="[rules.name.required, rules.name.length]"
                                  :counter="25"
                                  hint="Numele de familie și un prenume"
                    ></v-text-field>
                    <v-text-field v-model="email"
                                  prepend-icon="mail"
                                  label="E-mail"
                                  placeholder="Adresa de e-mail"
                                  :rules="[rules.email.required, rules.email.valid]"
                    ></v-text-field>
                    <v-text-field
                            v-model="password"
                            prepend-icon="lock_open"
                            label="Parola"
                            placeholder="Parola"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                            :rules="[rules.password.required, rules.password.min]"
                            :hint="'Cel putin ' + this.passwordLength + ' caractere'"
                            @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <v-text-field
                            v-if="password.length >= passwordLength"
                            v-model="confirmPassword"
                            prepend-icon="lock_open"
                            label="Confirmare parola"
                            placeholder="Confirmare parola"
                            :type="showRePassword ? 'text' : 'password'"
                            :append-icon="showRePassword ? 'visibility' : 'visibility_off'"
                            @click:append="showRePassword = !showRePassword"
                            :rules="[comparePasswords]"
                    ></v-text-field>

                </v-form>
                <v-card-text>
                    <v-layout align-center justify-space-around row fill-height>
                        <v-btn class="text-none font-weight-regular subheading" color="warning" @click="close">
                            Renunta
                        </v-btn>
                        <v-btn class="text-none font-weight-regular subheading" :disabled="!valid" color="success"
                               @click="register">
                            Urmatorul pas
                        </v-btn>
                    </v-layout>
                </v-card-text>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data: () => ({
            passwordLength: 6,
            valid: false,
            showPassword: false,
            showRePassword: false,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            rules: {
                name: {
                    required: v => !!v || 'Numele este obligatoriu.',
                    length: v => (v && v.length < 26) || 'Numele este prea mare',
                },
                email: {
                    required: v => !!v || 'Adresa de email este obligatorie.',
                    valid: v => /.+@.+/.test(v) || 'Introduceți o adresă de e-mail validă.',
                },
                password: {
                    required: value => !!value || 'Parola este obligatorie.',
                    min: v => v.length >= 6 || 'Cel putin 6 caractere.',
                },
            },
        }),

        methods: {
            register() {
                if (this.$refs.form.validate()) {
                    const authData = {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                    };
                    this.$store.dispatch('register', authData);
                }
            },
            close() {
                this.$store.dispatch('closeRegister');
                this.clearForm();
            },
            clearForm() {
                this.name = '';
                this.email = '';
                this.password = '';
                this.confirmPassword = '';
                this.$refs.form.resetValidation();
            },
        },
        computed: {
            showRegister() {
                return this.$store.getters.showRegister;
            },
            error() {
                return this.$store.getters.error;
            },
            comparePasswords() {
                return this.confirmPassword !== this.password ? 'Password don\'t match' : true;
            },
        },
        destroyed() {
            this.clearForm();
        },
    };
</script>

<style scoped>

</style>
