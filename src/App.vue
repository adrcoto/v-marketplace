<template>
    <v-app :dark="dark">

        <app-header/>
        <app-notification/>
        <app-login-modal/>
        <app-register-modal/>
        <v-container>
            <v-content>
                <router-view></router-view>
            </v-content>
        </v-container>
    </v-app>
</template>

<script>
    import Header from './components/header/Header';
    import Login from './components/auth/Login';
    import Registe from './components/auth/Register';

    export default {
        components: {
            appHeader: Header,
            appLoginModal: Login,
            appRegisterModal: Registe,
        },
        computed: {
            dark() {
                return this.$store.getters.darkTheme;
            }
        }
    };
</script>

<style scoped>

</style>
