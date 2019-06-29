<template>
    <v-stepper v-model="e1">
        <v-stepper-header>
            <v-stepper-step color="success" :complete="e1 > 1" step="1">Generare cod
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step color="success" :complete="e1 > 2" step="2">Confirmare
                cod
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step color="success" :complete="e1 > 3" step="3">Actualizare
                parolă
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step color="success" :complete="e1 > 4" step="4">Rezultat
            </v-stepper-step>
            <transition name="fade">
                <v-progress-linear
                        v-if="loading"
                        class="loading"
                        height="5"
                        color="success"
                        indeterminate>
                </v-progress-linear>
            </transition>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card-text>
                    <v-layout justify-center>
                        <v-flex xs9 sm9 md9 lg9 xl9>
                            <v-form ref="emailForm" v-model="emailConfirm"
                                    lazy-validation class="mb-4">
                                <v-text-field
                                        label="Introduceți adresa de e-mail"
                                        prepend-inner-icon="email"
                                        type="email"
                                        flat
                                        v-model="email"
                                        solo-inverted
                                        :rules="[rules.email.required, rules.email.valid]"
                                >
                                </v-text-field>
                                <v-checkbox
                                        v-model="hasCode"
                                        label="Am deja un cod"
                                        color="success"
                                        hide-details>
                                </v-checkbox>
                            </v-form>

                            <v-btn color="primary"
                                   class="font-weight-regular text-none subheading"
                                   :disabled="!emailConfirm"
                                   @click="step1">Confimare e-mail
                            </v-btn>
                            <v-btn flat class="font-weight-regular text-none subheading"
                                   @click="abort">
                                Anulare
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card-text>
                    <v-layout justify-center>
                        <v-flex xs9 sm9 md9 lg9 xl9>
                            <v-form ref="codeForm" v-model="codeConfirm"
                                    lazy-validation class="mb-5">
                                <v-text-field
                                        label="Introduceți codul"
                                        prepend-inner-icon="vpn_key"
                                        flat
                                        v-model="code"
                                        solo-inverted
                                        :rules="[rules.code.required]"
                                >
                                </v-text-field>
                                <v-label>Nu ați primit codul? <span
                                        @click="generateCode"
                                        :class="{'generate-code': dark, 'generate-code-white': !dark }">Generați altul</span>
                                </v-label>
                            </v-form>

                            <v-btn color="primary"
                                   class="font-weight-regular text-none subheading"
                                   :disabled="!codeConfirm"
                                   @click="step2">Confirmare cod
                            </v-btn>
                            <v-btn flat class="font-weight-regular text-none subheading"
                                   @click="e1 = 1">
                                Înapoi
                            </v-btn>
                            <v-btn flat class="font-weight-regular text-none subheading"
                                   @click="abort">
                                Anulare
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-stepper-content>

            <v-stepper-content step="3">
                <v-card-text>
                    <v-layout row justify-center>
                        <v-flex xs9 sm9 md9 lg9 xl9>
                            <v-form ref="passwordForm" v-model="passwordButton"
                                    lazy-validation>
                                <v-text-field
                                        v-model="password"
                                        label="Parolă nouă"
                                        prepend-inner-icon="lock"
                                        flat
                                        solo-inverted
                                        :rules="[rules.password.required, rules.password.min]"
                                        :type="showPassword ? 'text' : 'password'"
                                        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                        hint="Cel putin 6 caractere"
                                        @click:append="showPassword = !showPassword"
                                >
                                </v-text-field>

                                <v-text-field
                                        v-model="confirmPassword"
                                        prepend-inner-icon="lock"
                                        label="Confirmare parolă"
                                        flat
                                        solo-inverted
                                        :type="showRePassword ? 'text' : 'password'"
                                        :append-icon="showRePassword ? 'visibility' : 'visibility_off'"
                                        @click:append="showRePassword = !showRePassword"
                                        :rules="[comparePasswords]"
                                >
                                </v-text-field>
                            </v-form>
                            <v-btn color="primary"
                                   class="font-weight-regular text-none subheading"
                                   @click="step3" :disabled="!passwordButton">
                                Resetează parola
                            </v-btn>

                            <v-btn flat class="font-weight-regular text-none subheading"
                                   @click="e1 = 2">Înapoi
                            </v-btn>

                            <v-btn flat class="font-weight-regular text-none subheading"
                                   @click="abort">
                                Anulare
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-stepper-content>

            <v-stepper-content step="4">
                <v-card class="mb-4">
                    <v-card-text>
                        {{result}}
                    </v-card-text>
                </v-card>
                <v-btn color="primary"
                       class="font-weight-regular text-none subheading"
                       @click="abort">Închide
                </v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
    import {getMessage} from "../../util/util";

    export default {
        data: () => ({
            email: '',
            e1: 0,
            showPassword: false,
            showRePassword: false,
            result: '',
            hasCode: false,
            code: null,

            emailConfirm: false,
            codeConfirm: false,
            passwordButton: false,

            stepIButton: 'Generează cod',

            password: '',
            confirmPassword: '',

            rules: {
                email: {
                    required: v => !!v || 'Adresa de email este obligatorie.',
                    valid: v => /.+@.+/.test(v) || 'Introduceți o adresă de e-mail validă.',
                },
                password: {
                    required: value => !!value || 'Parola este obligatorie.',
                    min: v => v.length >= 6 || 'Cel putin 6 caractere.',
                },
                code: {
                    required: value => !!value || 'Codul este obligatoriu.'
                }
            },
        }),
        methods: {
            generateCode() {
                if (!this.$refs.emailForm.validate())
                    return;

                this.$store.commit('setLoading', true);
                this.$store.dispatch('generateCode', {
                    email: this.email,
                    change: ''
                }).then(response => {
                    if (response && response.data && response.data.responseType === 'success') {
                        this.$store.commit('setSnack', {
                            message: 'Codul a fost trimis',
                            color: this.$store.getters.colors.info,
                        });
                        this.e1 = 2;
                        this.$store.commit('setLoading', false);
                    } else {
                        this.$store.commit('setSnack', {
                            message: getMessage(response.data.errorMessage),
                            color: this.$store.getters.colors.error,
                        });
                        this.$store.commit('setLoading', false);
                    }
                });
            },
            step1() {
                if (!this.$refs.emailForm.validate())
                    return;
                if (this.hasCode)
                    this.e1 = 2;
                else
                    this.generateCode();

            },
            step2() {
                if (!this.$refs.codeForm.validate())
                    return;

                this.e1 = 3;
            },
            step3() {
                if (!this.$refs.passwordForm.validate())
                    return;

                if (!this.comparePasswords)
                    return;

                this.$store.dispatch('changePassword', {
                    email: this.email,
                    code: this.code,
                    password: this.password
                }).then(response => {
                    if (response && response.data && response.data.responseType === 'success') {
                        this.result = 'Parola a fost resetată cu success';
                        this.e1 = 4;
                    } else {
                        this.$store.commit('setSnack', {
                            message: getMessage(response.data.errorMessage),
                            color: this.$store.getters.colors.error,
                        });
                        if (response.data.errorMessage === 'email' ||
                            response.data.errorMessage === 'email.email' ||
                            response.data.errorMessage === 'email.exists')
                            this.e1 = 1;
                        else
                            this.e1 = 2;
                    }
                });
            },
            abort() {
                this.email = '';
                this.code = null;
                this.password = '';
                this.confirmPassword = '';
                this.hasCode = false;
                this.e1 = 1;

                this.$refs.emailForm.resetValidation();
                this.$refs.codeForm.resetValidation();
                // this.$refs.passwordForm.resetValidation();
                this.$store.dispatch('closeForgot');
                this.$store.dispatch('showLogin');
            },

        },
        computed: {
            comparePasswords() {
                return this.confirmPassword !== this.password ? 'Password don\'t match' : true;
            },
            dark() {
                return this.$store.getters.darkTheme;
            },
            loading() {
                return this.$store.getters.loading;
            },
        },
        watch: {
            // whenever question changes, this function will run
            hasCode: function (newCode) {
                if (newCode)
                    this.stepIButton = 'Omite pas';
                else
                    this.stepIButton = 'Generează cod';
            }
        }
    }
</script>

<style scoped>
    .generate-code:hover {
        cursor: pointer;
        color: rgba(255, 255, 255, 0.9);
        text-decoration: underline;
    }

    .generate-code-white:hover {
        cursor: pointer;
        color: black;
        text-decoration: underline;
    }

    .v-input--selection-controls {
        margin-top: 0;
        padding-top: 0;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: 1s;
    }

    .loading {
        position: absolute;
        top: 53px;
    }
</style>