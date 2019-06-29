<template>
    <v-dialog persistent v-model="showRegister" max-width="400px">
        <v-card>
            <v-card-title>
                <v-layout>
                    <v-flex>
                        <h2>Creare cont</h2>
                    </v-flex>
                </v-layout>
            </v-card-title>
            <v-card-text>
                <transition name="fade">
                    <v-progress-linear
                            v-if="loading"
                            height="4"
                            class="loading"
                            color="success"
                            indeterminate>
                    </v-progress-linear>
                </transition>
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
                            v-model="confirmPassword"
                            prepend-icon="lock_open"
                            label="Confirmare parola"
                            placeholder="Confirmare parola"
                            :type="showRePassword ? 'text' : 'password'"
                            :append-icon="showRePassword ? 'visibility' : 'visibility_off'"
                            @click:append="showRePassword = !showRePassword"
                            @keyup.enter="register"
                            :rules="[comparePasswords]"
                    ></v-text-field>
                    <v-layout class="ml-4" justfify-center>
                            <span @click="openLogin" class="font-weight-light.font-italic caption custom"
                                  :class="{'forgot-password': dark, 'forgot-password-white': !dark }">Am deja un cont</span>
                    </v-layout>
                </v-form>
                <v-layout mt-4 align-center justify-space-around row fill-height>
                    <v-btn class="text-none font-weight-regular subheading" color="warning" @click="close">
                        Renunta
                    </v-btn>
                    <v-btn class="text-none font-weight-regular subheading" :disabled="!valid" color="success"
                           @click="register">
                        Urmatorul pas
                    </v-btn>
                </v-layout>
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
            openLogin() {
                this.$store.dispatch('closeRegister');
                this.$store.dispatch('showLogin');
            }
        },
        computed: {
            showRegister() {
                return this.$store.getters.showRegister;
            },
            comparePasswords() {
                return this.confirmPassword !== this.password ? 'Password don\'t match' : true;
            },
            dark() {
                return this.$store.getters.darkTheme;
            },
            loading() {
                return this.$store.getters.loading;
            }
        },
    };
</script>

<style scoped>
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: 1s;
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

    .loading {
        position: absolute;
        top: 65px;
        width: 92%;
        left: 15px;
        margin: 0 auto;
    }
</style>
