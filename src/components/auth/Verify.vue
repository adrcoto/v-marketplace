<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm5 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-alert :value="verify" color="success" icon="check_circle" outline>
                            <h3>Contul dumneavoastra a fost verificat cu succes!</h3>
                            <p>In 5 secunde veti fi redirectionat.</p>
                        </v-alert>
                        <div v-if="!verify">
                            <h3>Contul dumneavoastra a fost creat cu succes.</h3>
                            <br/>
                            <p> Pentru a va putea autentifica, trebuie sa
                                urmati instructiunile trimise la adresa de email furnizata.</p>
                        </div>
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

</style>
