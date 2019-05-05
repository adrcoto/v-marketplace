<template>
    <v-layout>
        <v-btn @click="sendRequest">Send Requst</v-btn>
        <app-items></app-items>
    </v-layout>
</template>

<script>
    import items from '../components/item/Items';
    import axios from '../axios-auth';


    export default {
        components: {
            appItems: items
        },
        methods: {
            async sendRequest() {
                axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters.token;
                const title = 'vue';
                const description = 'vue desc';
                const price = 23;
                const currency = 0;
                const category = 1;
                const type = 11;
                const sub_category = 3;
                const location = 'Bals';
                const used = 1;

                const response = await axios.post(`/user`, {
                    title, description, price, currency, category, sub_category, location, used, type
                });

                console.log(response);
            }
        }
    };
</script>
