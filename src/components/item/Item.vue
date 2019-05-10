<template>
    <v-flex xs12 sm6 md4 lg3 xl2>
        <v-layout justify-center>
            <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 20 : 2}`" width="92%"
                        height="95%"
                        class="item-card mb-4">
                    <v-img src="https://pre00.deviantart.net/40f3/th/pre/f/2018/031/e/e/academy_katarina_by_z_duke-dc1ryyk.jpg" height="185">
                        <v-expand-transition>
                            <div v-if="hover"
                                 class="d-flex transition-fast-in-fast-out v-card--reveal">
                                <v-card-actions>
                                    <v-btn icon @click="like = !like"
                                           :class="{'hover-btn-pressed': like, 'hover-btn': !like}"
                                           class="hover-btn">
                                        <v-icon>favorite</v-icon>
                                    </v-btn>
                                    <v-btn icon class="hover-btn">
                                        <v-icon>bookmark</v-icon>
                                    </v-btn>
                                    <v-btn icon class="hover-btn">
                                        <v-icon>share</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </div>
                        </v-expand-transition>
                    </v-img>

                    <v-card-title primary-title class="item-card-title subheading font-weight-bold">
                        Titlu
                    </v-card-title>
                    <v-chip class="price" color="primary" app>
                       Pret
                    </v-chip>
                    <v-card-actions class="item-card-action">
                        <div v-if="hover"
                             class="d-flex transition-fast-in-fast-out">
                            <span>
                                <v-icon class="grey--text">location_on</v-icon>
                                Location
                            </span>
                        </div>
                        <div v-else>
                            <span>
                                <v-icon class="gray--text">query_builder</v-icon>
                                Date
                            </span>
                        </div>
                        <v-spacer/>
                        <v-btn icon @click="show = !show" class="arrow-icon">
                            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-layout>
    </v-flex>
</template>

<script>
    export default {
        data: () => ({
            like: false,
            show: false,
        }),
    };
</script>

<style scoped>


</style>
