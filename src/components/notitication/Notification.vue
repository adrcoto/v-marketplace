<template>
    <v-snackbar v-model="show" :color="color" bottom right :timeout="timeout">
        {{message}}
        <v-btn flat @click.native="show = false">
            <v-icon>remove</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                message: '',
                color: '',
                timeout: 3000,
            };
        },
        created: function () {
            this.$store.watch(state => state.notification.snack, () => {

                const msg = this.$store.state.notification.snack;
                if (msg !== '') {
                    this.show = false;
                    setTimeout(() => {
                        this.show = true;
                    }, 200);
                    this.message = this.$store.state.notification.snack;
                    this.color = this.$store.state.notification.color;
                    this.$store.commit('setSnack', {message: '', color: ''});
                }
            });
        },
    };
</script>