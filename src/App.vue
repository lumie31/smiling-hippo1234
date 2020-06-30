<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style src="@/assets/css/custom.css"></style>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
  mounted() {
    // console.log = function() {};
    // console.log("Populating dropdown with cities"); // prints nothing
  }
};
</script>
