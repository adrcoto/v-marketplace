<template>
    <v-layout column justify-center>
        <div v-if="userItems.length <= 0">
            Nu există anuțuri
        </div>
        <v-flex v-if="userItems.length > 0" :key="item.item_id" v-for="item in userItems">
            <v-card-text>
                <v-hover>
                    <v-card @click.stop="viewItem(item)" style="cursor: pointer"
                            :class="`elevation-${hover ? 10 : 2}`" class="item-card"
                            slot-scope="{ hover }">
                        <v-layout row>
                            <v-flex xs3 sm3 lg3 x13>
                                <v-img :src="item.images.length > 0 ? API_URL + item.images[0].filename : require('../../assets/no-available-image.png')"
                                       height="125">
                                </v-img>
                            </v-flex>
                            <v-flex xs6 sm6 md6 lg6 xl6>
                                <v-layout>
                                    <v-flex>
                                        <div class="ml-3 mt-3">
                                            <div class="item-card-title title">
                                                {{item.title}}
                                            </div>
                                            <div>
                                                <v-icon>location_on</v-icon>
                                                {{item.location}}
                                            </div>
                                            <div>
                                                <v-icon>query_builder</v-icon>
                                                {{item.created_at}}
                                            </div>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs3 sm3 md3 lg3 xl3>
                                <v-card-text class="text-md-right">
                                    <v-chip dark color="primary" class="subheading">
                                        {{item.price}}
                                        <span class="ml-2" v-if="item.currency === 0">lei</span>
                                        <span class="ml-2" v-else>€</span>
                                    </v-chip>
                                </v-card-text>
                                <div class="text-md-right mr-2">

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
                                            <v-btn @click.stop="editItem(item)"  icon color="info" v-on="on">
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
            </v-card-text>
        </v-flex>
    </v-layout>
</template>

<script>

    export default {
        data: () => ({
            API_URL: 'http://dev.shop/storage/',
            itemsLength: null,
        }),
        methods: {
            viewItem(item) {
                this.$router.push({path: '/anunt/' + item.slug, query: {id: item.item_id}});
            },
            deleteItem(id) {
                if(confirm('Ești sigur că vrei să ștergi anunțul selectat ?')) {
                    this.$store.dispatch('deleteItem', id);
                }
            },
            editItem(item){

            },
        },
        computed: {
            user() {
                return this.$store.getters.user;
            },

            userItems() {
                return this.$store.getters.items.filter(item => item.owner === this.user.id);
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