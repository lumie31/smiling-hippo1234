<template>
  <v-container fill-height fluid class="pagenotfound #fdf9f4">
    <v-row align="center" justify="center">
      <v-col align="center">
        <h1 class="text-center">Oops! Look like you are lost</h1>
        <div class="text-center">
          <b>
            Let's go
            <a @click="$router.go(-1)">Back</a>
          </b>
          <div>or</div>
          <b>
            Go
            <router-link to="/">Home</router-link>
          </b>
        </div>
        <img src="@/assets/404bg.gif" alt="Legalbox 404" class="eee" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      category: "404"
    };
  }
};
</script>

<style scoped>
.pagenotfound {
  background: #fbfbfb;
}
.pagenotfound img.eee {
  width: 40%;
  /* min-width: 10%; */
}

a {
  color: #333;
}
</style>
