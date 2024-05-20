<template>
  <div id="app">
    <auth-form v-if="!isAuthenticated"></auth-form>
    <app-layout v-else></app-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppLayout from './components/AppLayout.vue';
import AuthForm from './components/AuthForm.vue';

export default {
  name: 'App',
  components: {
    AuthForm,
    AppLayout,
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>

