<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="app">
        <!--  Drawer    -->
        <v-navigation-drawer v-model="drawer" clipped fixed app temporary>
            <v-list>
                <v-list-tile avatar flat v-if="auth" to="/profil">
                    <v-list-tile-avatar>
                        <v-img :src="user.avatar === '' ? require('../../assets/logo.png') : AVATAR_API_URL + user.avatar"
                               alt="Vuetify"></v-img>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{user.name}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile flat v-if="!auth" @click.stop="openLoginModal">
                    <v-list-tile-action>
                        <v-icon>lock_open</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Autentificare</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile flat v-if="!auth" @click.stop="openRegisterModal">
                    <v-list-tile-action>
                        <v-icon>face</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Creare cont</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

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

            </v-list>
        </v-navigation-drawer>

        <!--   Toolbar     -->
        <v-toolbar  prominent fixed app dark clipped-left :color="dark ? 'dark' : 'blue darken-3'">
            <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer">V-Marketplace</router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn v-if="auth" to="/profil" class="text-none font-weight-regular subheading" flat
                       slot="activator">
                    <v-avatar size="45px">
                        <v-img :src="user.avatar === '' ? require('../../assets/logo.png') : AVATAR_API_URL + user.avatar"
                               alt="Vuetify"></v-img>
                    </v-avatar>
                    <span class="ml-2">{{user.name}}</span>
                </v-btn>


                <v-btn class="text-none font-weight-regular subheading" flat v-if="!auth"
                       @click.stop="openLoginModal">
                    <v-icon left>lock_open</v-icon>
                    Autentificare
                </v-btn>

                <v-btn class="text-none font-weight-regular subheading" flat v-if="!auth"
                       @click.stop="openRegisterModal">
                    <v-icon left>face</v-icon>
                    Creare cont
                </v-btn>

                <v-btn class="text-none font-weight-regular subheading" flat v-for="item in menuItems"
                       :key="item.title"
                       :to="item.link">
                    <v-icon left>{{item.icon}}</v-icon>
                    {{item.title}}
                </v-btn>

                <v-btn class="text-none font-weight-regular subheading" flat v-if="auth" @click="logout">
                    <v-icon left>exit_to_app</v-icon>
                    Deconectare
                </v-btn>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon @click="toggleDark" v-on="on">
                            <v-icon :color="dark ? 'orange': 'white'">brightness_2</v-icon>
                        </v-btn>
                    </template>
                    <span>Schimbă tema</span>
                </v-tooltip>

            </v-toolbar-items>

            <v-toolbar-items class="hidden-md-and-up">
                <v-btn icon v-if="auth" to="/profil" flat
                       slot="activator">
                    <v-avatar size="45px">
                        <v-img :src="user.avatar === '' ? require('../../assets/logo.png') : AVATAR_API_URL + user.avatar"
                               alt="Vuetify"></v-img>
                    </v-avatar>
                </v-btn>


                <v-btn icon flat v-if="!auth"
                       @click.stop="openLoginModal">
                    <v-icon>lock_open</v-icon>
                </v-btn>

                <v-btn flat icon v-if="!auth"
                       @click.stop="openRegisterModal">
                    <v-icon>face</v-icon>
                </v-btn>

                <v-btn icon flat v-for="item in menuItems"
                       :key="item.title"
                       :to="item.link">
                    <v-icon>{{item.icon}}</v-icon>
                </v-btn>

                <v-btn icon flat v-if="auth" @click="logout">
                    <v-icon>exit_to_app</v-icon>
                </v-btn>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon @click="toggleDark" v-on="on">
                            <v-icon :color="dark ? 'orange': 'white'">brightness_2</v-icon>
                        </v-btn>
                    </template>
                    <span>Schimbă tema</span>
                </v-tooltip>

            </v-toolbar-items>

        </v-toolbar>
    </div>
</template>

<script>


    export default {
        data: () => ({
            AVATAR_API_URL: process.env.VUE_APP_AVATAR_URL,
            noAvatar: '../../assets/logo.png',
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
            toggleDark() {
                this.$store.dispatch('toggleDark');
            }
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
                return this.$store.getters.user;
            },
            dark() {
                return this.$store.getters.darkTheme;
            }
        },
    };
</script>

<style scoped>

</style>
