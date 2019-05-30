<template>
    <div id="app">
        <!--  Drawer    -->
        <v-navigation-drawer v-model="drawer" clipped fixed app temporary>
            <v-list dense>
                <v-list-tile @click="" v-for="item in menuItems" :key="item.title" :to="item.link">
                    <v-list-tile-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{item.title}}</v-list-tile-title>
                    </v-list-tile-content>

                </v-list-tile>

                <v-list-tile @click="logout" v-if="auth">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Deconectare</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile flat v-if="!auth" @click.stop="openLoginModal">
                    <v-list-tile-action>
                        <v-icon>lock</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Autentificare</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <!--   Toolbar     -->
        <v-toolbar prominent fixed app dark clipped-left color="blue darken-3">
            <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>

            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer">V-Marketplace</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down" id="hook">

                <!--    <v-menu v-if="auth" offset-y>
                        <v-btn class="text-none font-weight-regular subheading" flat slot="activator">
                            <v-avatar size="45px" tile>
                                <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
                            </v-avatar>
                            {{user}}
                            <v-icon>expand_more</v-icon>
                        </v-btn>
                        <v-list>
                            <v-list-tile
                                    v-for="(item, index) in items"
                                    :key="index"
                                    @click=""
                                    :to="item.to"
                            >
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>-->

                <v-btn  v-if="auth" to="/profil/anunturi" class="text-none font-weight-regular subheading" flat slot="activator">
                    <v-avatar size="45px" tile>
                        <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
                    </v-avatar>
                    {{user}}
                </v-btn>

                <v-btn class="text-none font-weight-regular subheading" flat v-if="!auth" @click.stop="openLoginModal">
                    <v-icon left>lock_open</v-icon>
                    Autentificare
                </v-btn>

                <v-btn class="text-none font-weight-regular subheading" flat v-if="!auth"
                       @click.stop="openRegisterModal">
                    <v-icon left>face</v-icon>
                    Creare cont
                </v-btn>

                <v-btn class="text-none font-weight-regular subheading" flat v-for="item in menuItems" :key="item.title"
                       :to="item.link">
                    <v-icon left>{{item.icon}}</v-icon>
                    {{item.title}}
                </v-btn>

                <v-btn class="text-none font-weight-regular subheading" flat v-if="auth" @click="logout">
                    <v-icon left>exit_to_app</v-icon>
                    Deconectare
                </v-btn>

                <v-btn icon @click="">
                    <v-icon>brightness_2</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>


    export default {
        data: () => ({
            drawer: false,
            dialog: false,
            items: [
                // {title: 'Anunturile mele', to: 'profil/anunturi'},
                // {title: 'Mesaje', to: 'profil/mesaje'},
                // {title: 'Favorite', to: 'profil/favorite'},
                // {title: 'Setari cont', to: 'profil/setari'},
            ],
        }),
        methods: {
            openLoginModal() {
                this.$store.dispatch('showLogin');
            },
            openRegisterModal() {
                this.$store.dispatch('showRegister');
            },
            logout() {
                this.$store.dispatch('logout');
            },
        },
        computed: {
            menuItems() {
                return [
                    {icon: 'add_to_queue', title: 'Adăugare anunț', link: '/anunt/nou'},
                ];
            },
            auth() {
                return this.$store.getters.isAuthenticated;
            },
            user() {
                return this.$store.getters.user.name;
            },
        },
    };
</script>

<style scoped>

</style>
