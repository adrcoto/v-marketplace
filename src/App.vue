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
        <app-top/>
        <app-footer/>
    </v-app>
</template>

<script>
    import Header from './components/header/Header';
    import Login from './components/auth/Login';
    import Register from './components/auth/Register';
    import Footer from './components/footer/Footer'
    import Top from './components/up/buttonToTop'

    export default {
        components: {
            appHeader: Header,
            appLoginModal: Login,
            appRegisterModal: Register,
            appFooter: Footer,
            appTop: Top
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
