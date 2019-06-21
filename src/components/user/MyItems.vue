<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout column justify-center>
        <div class="text-md-center" v-if="userItems.length < 1">
            Nu există anuțuri
        </div>
        <v-layout row v-else>
            <v-spacer></v-spacer>
            <div style="width: 50px">
                <v-select
                        label="Anunțuri"
                        menu-props="offsetY"
                        :items="perPageOptions"
                        item-text="name"
                        dense
                        :value="perPage"
                        @change="setPerPageFilter"
                >
                </v-select>
            </div>
        </v-layout>
        <v-flex v-if="userItems.length > 0" :key="item.item_id" v-for="item in userItems">
            <v-hover>
                <v-card @click.stop="viewItem(item)" style="cursor: pointer"
                        :class="`elevation-${hover ? 10 : 2}`" class="item-card mb-4"
                        slot-scope="{ hover }">
                    <v-layout row>
                        <v-flex xs3 sm3 lg3 x13>
                            <v-img :src="item.images.length > 0 ? API_URL + item.images[0].filename : require('../../assets/no-available-image.png')"
                                   height="155">
                            </v-img>
                        </v-flex>
                        <v-flex xs6 sm6 md6 lg6 xl7>
                            <v-layout>
                                <v-flex>
                                    <div class="ml-3 mt-3">
                                        <div class="item-card-title title">
                                            {{item.title}}
                                        </div>
                                        <div class="mt-4">
                                            <v-icon>location_on</v-icon>
                                            {{item.city}}, {{item.district}}
                                        </div>
                                        <div class="mt-1">
                                            <v-icon>query_builder</v-icon>
                                            {{item.created_at}}
                                        </div>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex x3 sm3 md3 lg3 xl2>
                            <v-card-text class="text-md-right mt-1">
                                <v-chip dark color="primary" class="subheading">
                                    {{item.price}}
                                    <span class="ml-2" v-if="item.currency === 0">lei</span>
                                    <span class="ml-2" v-else>€</span>
                                </v-chip>
                            </v-card-text>
                            <div class="text-md-right mr-2 mt-4">

                                <v-tooltip left>
                                    <template v-slot:activator="{ on }">
                                        <v-btn @click.stop="deleteItem(item.item_id)" icon color="error" v-on="on">
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Șterge anunțul</span>
                                </v-tooltip>
                                <v-tooltip right>
                                    <template v-slot:activator="{ on }">
                                        <v-btn @click.stop="editItem(item)" icon color="info" v-on="on">
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Modifică anunțul</span>
                                </v-tooltip>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-hover>
        </v-flex>
        <v-spacer/>
        <div class="text-xs-center" v-if="userItems.length > 0">
            <v-pagination
                    :value="page"
                    :length="Math.ceil(itemsMaxLength / perPage)"
                    circle
                    :total-visible="pagesVisible"
                    @input="changePage"
            ></v-pagination>
        </div>
    </v-layout>
</template>

<script>

    export default {
        data: () => ({
            API_URL: 'http://dev.shop/storage/',
            itemsLength: null,
            pagesVisible: 10,
            perPageOptions: [
                10, 15, 20, 30
            ],
        }),
        methods: {
            viewItem(item) {
                this.$router.push({path: '/anunt/' + item.slug, query: {id: item.item_id}});
            },
            deleteItem(id) {
                if (confirm('Ești sigur că vrei să ștergi anunțul selectat ?')) {
                    if (this.userItems.length === 1)
                        if (this.page > 1)
                            this.$store.commit('setOwnerItemsPage', this.page - 1);

                    this.$store.dispatch('deleteItem', id);
                }
            },
            editItem(item) {
                this.$router.push({path: '/anunt/modificare/' + item.slug, query: {id: item.item_id}});
            },
            changePage(page) {
                this.$store.commit('setOwnerItemsPage', page);
                this.$store.dispatch('loadOwnerItems')
            },
            setPerPageFilter(perPage) {
                this.$store.commit('setOwnerItemsPage', 1);
                this.$store.commit('setOwnerItemsPerPage', perPage);
                this.$store.dispatch('loadOwnerItems')
            },
        },
        computed: {
            user() {
                return this.$store.getters.user;
            },

            userItems() {
                return this.$store.getters.ownerItems;
            },
            itemsMaxLength() {
                return this.$store.getters.ownerItemsCount;
            },
            perPage() {
                return this.$store.getters.ownerItemsPerPage;
            },
            page() {
                return this.$store.getters.ownerItemsPage;
            },
        },
    };
</script>

<style scoped>
    .item-card-title {
        height: 50px;
        overflow: hidden;
    }
</style>