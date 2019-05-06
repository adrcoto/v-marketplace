<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm5 offset-sm3>
                <v-card>
                    <v-card-text>
                        <p>Cont verificat</p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        created() {
            const authData = {
                code: this.$route.params.code
            };
            this.$store.dispatch('verify', authData);
            setTimeout(() => {
                this.$router.push('/');
            }, 1000)
        }
    };
</script>

<style scoped>

</style>
