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
  // created() {
  //   console.log(this.$router);
  // },
  mounted() {
    // process.env.NODE_ENV === "production" ? null : (console.log = () => {});
    // console.log("Populating dropdown with cities"); // prints nothing
  }
};
</script>
