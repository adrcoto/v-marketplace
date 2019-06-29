<template>
    <v-container>
        <v-layout row justify-center>
            <v-flex xs10 sm10 md10 lg7 xl5>
                <v-card>
                    <v-card-text>
                        <v-alert :value="verify" color="success" icon="check_circle" outline>
                            <h2>Contul dumneavoastră a fost verificat cu succes!</h2>
                            <p>In 5 secunde veti fi redirectionat.</p>
                        </v-alert>
                        <v-layout v-if="!verify" column justify-center class="text-xs-center">
                            <h1>Contul dumneavoastra a fost creat cu succes.</h1>
                            <v-flex class="justify-center">
                                <img alt="asdas" src="../../assets/email-verification.png">
                            </v-flex>
                            <v-flex>
                                <h2>Verificați-vă adresa de e-mail!</h2>
                                <br/>
                                <h3> Pentru a vă putea autentifica, trebuie să
                                    urmați instrucțiunile trimise la adresa de e-mail furnizată.</h3>
                                <br/>
                                <v-layout row justify-center>
                                    <v-flex xs9 sm7 md5 lg4 xl4>
                                        <p
                                                :class="{'link-color-dark': dark, 'link-color-white': !dark}">Nu ați
                                            primit
                                            e-mail-ul?
                                            <span @click="resendEmail" class="link">Retrimitere</span>
                                        </p>
                                    </v-flex>
                                    <v-flex xs1 sm1 md1 lg1 xl1>
                                        <v-progress-circular v-if="loading"
                                                             size="31"
                                                             width="3"
                                                             color="success"
                                                             indeterminate>
                                        </v-progress-circular>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {getMessage} from "../../util/util";

    export default {
        data() {
            return {};
        },
        methods: {
            resendEmail() {
                if (localStorage.getItem('verification'))
                    this.$store.dispatch('sendVerificationEmail');
            }
        },
        computed: {
            verify() {
                return this.$store.getters.verify;
            },
            dark() {
                return this.$store.getters.darkTheme;
            },
            loading() {
                return this.$store.getters.loading;
            }
        },
        created() {
            const authData = {
                code: this.$route.params.code,
            };

            if (authData.code.length >= 120) {
                this.$store.dispatch('verify', authData).then(response => {
                    if (response && response.data && response.data.responseType === 'success') {
                        this.$store.state.verify = true;
                        localStorage.removeItem('verification');
                        setTimeout(() => {
                            this.$router.push('/');
                        }, 5000);
                    } else {
                        this.$store.commit('setSnack', {
                            message: getMessage(response.data.errorMessage),
                            color: this.$store.getters.colors.error,
                        });
                    }
                });
            }
        },
    };
</script>

<style scoped>

    .link {
        text-decoration: underline;
        cursor: pointer;
        font: 15px "Open Sans", sans-serif, tahoma;
        line-height: 25px;
    }

    .link-color-dark {
        color: rgba(255, 255, 255, 0.7);
    }

    .link-color-white {
        color: #636b6d;
    }

</style>
