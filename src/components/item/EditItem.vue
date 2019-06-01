<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
        <app-create-item edit/>
</template>

<script>
    import CreateItem from './CreateItem';

    export default {
        data: () => ({}),
        components: {
            appCreateItem: CreateItem
        }
    };
</script>

<style scoped>
    .category-container {
        height: 300px;
    }

    .location-container {
        height: 400px;
    }

    .space {
        height: 50px;
    }

    .location-category {
        margin-left: 28px;
    }

    .icon-error {
        color: red;
    }


</style>
