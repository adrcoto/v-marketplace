<template>
    <v-form class="px-3">
        <v-text-field v-model="code"
                      prepend-icon="lock_open"
                      label="Cod"
                      placeholder="Cheie"
        ></v-text-field>

        <v-layout row>
            <v-flex xs12>
                <v-btn class="mx-0 mt-3" color="error" @click="">Renunta</v-btn>
            </v-flex>
            <v-flex xs12>
                <v-btn class="mx-0 mt-3" color="primary" @click="">Verificare</v-btn>
            </v-flex>
        </v-layout>
    </v-form>
</template>

<script>
    export default {
        data() {
            return{
                code : ''
            }
        }
    };
</script>

<style scoped>

</style>
