<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm5 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-alert :value="verify" color="success" icon="check_circle" outline>
                            <h2>Contul dumneavoastră a fost verificat cu succes!</h2>
                            <p>In 5 secunde veti fi redirectionat.</p>
                        </v-alert>
                        <v-layout v-if="!verify" column justify-center class="text-md-center">
                            <v-flex>
                                <h1>Contul dumneavoastra a fost creat cu succes.</h1>
                            </v-flex>
                            <v-flex>
                                <img alt="asdas" src="../../assets/email-verification.png">
                            </v-flex>
                            <h2>Verificați-vă adresa de e-mail!</h2>
                            <br/>
                            <h3> Pentru a vă putea autentifica, trebuie să
                                urmați instrucțiunile trimise la adresa de e-mail furnizată.</h3>
                            <p class="link" :class="{'link-color-dark': dark, 'link-color-white': !dark}">Nu ați primit e-mail-ul ?</p>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        data() {
            return {};
        },
        computed: {
            verify() {
                return this.$store.getters.verify;
            },
            dark() {
                return this.$store.getters.darkTheme;
            }
        },
        created() {
            const authData = {
                code: this.$route.params.code,
            };

            if (authData.code.length === 128) {
                this.$store.dispatch('verify', authData);
                setTimeout(() => {
                    this.$router.push('/');
                }, 5000);
            }
        },
    };
</script>

<style scoped>

    .link {
        text-decoration: underline;
        cursor: pointer;
        font: 15px "Open Sans", sans-serif, tahoma;
        margin-top: 69px;
    }

    .link-color-dark {
        color: rgba(255, 255, 255, 0.7);
    }
    .link-color-white {
        color: #636b6d;
    }


</style>
