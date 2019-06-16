<template>
    <v-layout row justify-center>
        <v-flex xl10>
            <section>
                <app-search class="mb-3 mt-3"/>
                <app-items/>
            </section>
        </v-flex>
    </v-layout>
</template>

<script>
    import Search from '../components/search/Search';
    import Items from '../components/item/Items';

    export default {
        components: {
            appItems: Items,
            appSearch: Search,
        },
        methods: {},
        computed: {},
    };
</script>
