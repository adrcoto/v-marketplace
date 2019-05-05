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

                <v-btn flat v-if="auth">
                    <v-avatar size="45px" tile>
                        <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
                    </v-avatar>
                    {{user}}
                </v-btn>
                <v-btn flat v-if="!auth" @click.stop="openLoginModal">
                    <v-icon left>lock_open</v-icon>
                    Autentificare
                </v-btn>

                <v-btn flat v-if="!auth" @click.stop="openRegisterModal">
                    <v-icon left>face</v-icon>
                    Creare cont
                </v-btn>

                <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
                    <v-icon left>{{item.icon}}</v-icon>
                    {{item.title}}
                </v-btn>

                <v-btn flat v-if="auth" @click="logout">
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
            drawer: false
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
            }
        },
        computed: {
            menuItems() {
                let menuItems = [
                    {icon: 'add_to_queue', title: 'Adaugare anunt', link: '/anunt/nou'}
                ];
                if (this.auth) {
                    menuItems = [
                        {icon: 'add_to_queue', title: 'Adaugare anunt', link: '/anunt/nou'}
                    ];
                }
                return menuItems;
            },
            auth() {
                return this.$store.getters.isAuthenticated;
            },
            user() {
                return this.$store.getters.user;
            }
        }
    };
</script>

<style scoped>

</style>
