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
                                        <v-text-field
                                                label="Cod"
                                                placeholder="Verificare cod"
                                                prepend-icon="lock_open"
                                                v-model="code"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>


                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn @click="onVerify">Verifica cont</v-btn>
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
                code: ''
            };
        },
        methods: {
            onVerify() {
                const authData = {
                    code: this.code
                };
                console.log('Verify:' + authData.code);
                this.$store.dispatch('verify', authData);
            }
        }
    };
</script>

<style scoped>

</style>
