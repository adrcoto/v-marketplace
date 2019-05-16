<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout justify-center>
        <v-flex xs10 sm9 md9 lg7 xl5>
            <v-card class="pa-5">
                <v-card-title>
                    <h2>Adaugare anunt nou</h2>
                </v-card-title>
                <v-form ref="form" v-model="valid" lazy-validation>

                    <v-text-field class="mb-3"
                                  label="Titlu"
                                  prepend-icon="title"
                                  :counter="60"
                                  :rules="[rules.title.required, rules.title.length]">
                    </v-text-field>

                    <v-textarea class="mb-3"
                                label="Descriere"
                                prepend-icon="description"
                                :counter="5000"
                                :rules="[rules.description.length]">
                    </v-textarea>
                    <v-select
                            menu-props="offsetY"
                            class="mb-3"
                            label="Categorie"
                            item-text="name"
                            item-value="last"
                            prepend-icon="view_module"
                            :items="categories"
                    ></v-select>

                    <label>{{imageHeight}}</label>
                    <!--                    <input type="file" accept="image/*" @change="addPic">-->

                    <v-card class="pa-2">
                        <v-layout align-center justify-center>
                            <v-flex>
                                <v-layout column align-center>
                                    <input v-show="false" ref="inputUpload" type="file" accept="image/*"
                                           @change="addPic">
                                    <label v-show="images.length < 8">{{images.length}} / 8</label>
                                    <v-progress-circular
                                            :rotate="360"
                                            :size="setSize"
                                            :width="15"
                                            :value="(images.length / 8) * 100"
                                            color="teal"
                                    >
                                        <v-tooltip bottom v-if="images.length < 8">
                                            <template v-slot:activator="{ on }">
                                                <v-btn icon color="primary"
                                                       @click="$refs.inputUpload.click()"
                                                       v-on="on">
                                                    <v-icon :size="setSize / 4">
                                                        add_a_photo
                                                    </v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Adauga fotografie</span>
                                        </v-tooltip>
                                        <span v-else>{{images.length}} / 8</span>
                                    </v-progress-circular>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 sm12 md12 lg12 xl12>
                                <v-layout row wrap>
                                    <v-flex xs12 sm5 md3 lg3 xl3 v-for="(image, index) in images" :key="image.url">
                                        <v-hover>
                                            <v-card class="pa-1 ma-1" width="90%" :class="`elevation-${hover ? 12 : 2}`"
                                                    slot-scope="{ hover }">
                                                <v-img height="80" :src="image.url">
                                                    <v-expand-transition>
                                                        <div class="d-flex transition-fast-in-fast-out v-card--reveal"
                                                             v-if="hover">
                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn icon>
                                                                    <v-icon color="red"
                                                                            @click.native="deleteImg(index)">
                                                                        clear
                                                                    </v-icon>
                                                                </v-btn>
                                                            </v-card-actions>
                                                        </div>
                                                    </v-expand-transition>
                                                </v-img>
                                            </v-card>
                                        </v-hover>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-form>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

    export default {
        data: () => ({
            progressSize: 100,
            photoSize: 25,
            valid: false,
            title: '',
            description: '',
            rules: {
                title: {
                    required: v => !!v || 'Titlul anuntului este obligatoriu.',
                    length: v => (v && v.length < 61) || 'Titlul este prea lung.',
                },
                description: {
                    length: v => (v && v.length < 5000) || 'Descrierea este prea lunga.',
                },
            },

            categories: [
                {name: 'Electronice-Electrocasnice', value: 1},
                {name: 'Auto-Moto-Nautica', value: 2},
            ],

            images: [],
        }),
        components: {},
        methods: {
            clearForm() {
                this.title = '';
                this.description = '';
                this.$refs.form.resetValidation();
            },
            addPic(e) {

                const image = e.target.files[0];
                const url = URL.createObjectURL(image);

                const newImg = {
                    image,
                    url,
                };

                this.images.push(newImg);
            },
            deleteImg(index) {
                this.images.splice(index, 1);
            },
        },
        destroyed() {
            this.clearForm();
        },
        computed: {
            setSize() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs':
                        return 60;
                    case 'sm':
                        return 60;
                    case 'md':
                        return 70;
                    case 'lg':
                        return 100;
                    case 'xl':
                        return 100;
                }
            },
            imageHeight() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs':
                        return 'xs';
                    case 'sm':
                        return 'sm';
                    case 'md':
                        return 'md';
                    case 'lg':
                        return 'lg';
                    case 'xl':
                        return 'xl';
                }
            },
        },
    };
</script>

<style scoped>

</style>
