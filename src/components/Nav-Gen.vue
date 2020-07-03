<template>
  <nav>
    <v-toolbar height="200" class="nav-tool" elevation="3 ">
      <router-link to="/"
        ><img width="220" alt="Legalbox logo" src="../assets/logo.svg"
      /></router-link>
      <v-spacer></v-spacer>
      <v-btn class="mr-12" small large color="accent">
        <router-link v-if="!isSignedIn" to="/login" class="white--text">
          <span class="title">Login/Sign Up</span>
        </router-link>
        <router-link v-if="isSignedIn" to="/dashboard" class="white--text">
          <span class="title">Access Dashboard</span>
        </router-link>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  computed: {
    isSignedIn() {
      return this.$store.getters.signedIn;
    }
  }
};
</script>
