<template>
    <v-app app>
        <app-header/>
        <v-container>
            <v-content>
                <app-login-modal/>
                <app-register-modal/>
                <router-view></router-view>
            </v-content>
        </v-container>
    </v-app>
</template>

<script>
    import Header from './components/header/Header';
    import LoginModal from './components/modal/LoginModal';
    import RegisterModal from './components/modal/RegisterModal';

    export default {
        components: {
            appHeader: Header,
            appLoginModal: LoginModal,
            appRegisterModal: RegisterModal
        },
        created() {
            this.$store.dispatch('tryAutoLogin');
        }
    };
</script>

<style scoped>

</style>
