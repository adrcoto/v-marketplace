<template>
    <section>
        <app-search class="mb-3 mt-3"/>
        <app-items/>
    </section>
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
        computed: {

        }
    };
</script>
