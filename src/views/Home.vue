<template>
    <v-layout row justify-center>
        <v-flex xs10 sm7 md10 lg10 xl8>
            <section>
                <v-img :src="require('../assets/wot.jpg')" height="275px"></v-img>
                <app-search/>
                <v-divider class="mb-5"/>
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

<style scoped>
    .slide-enter {
        opacity: 0;
    }

    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
        transition: opacity .5s;
    }

    .slide-leave {

    }

    .slide-leave-active {
        animation: slide-out 1s ease-out forwards;
        transition: opacity .5s;
        opacity: 0;
        position: absolute;
    }

    .slide-move {
        transition: transform 1s;
    }

    @keyframes slide_in {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(20px);
        }
    }
</style>
