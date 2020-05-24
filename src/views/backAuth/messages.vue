<template>
  <div class="back-page messages page">
    <back-nav></back-nav>
    <div class="bodyWrapper">
      <v-container class>
        <div class="d-flex">
          <img src="@/assets/inbox-icon.png" />
          <h2 class="display-3 mt-4">Inbox</h2>
        </div>

        <div>
          <table class="tableUI shadow-me">
            <thead>
              <tr>
                <th v-for="column in messagesColumns" :key="column">
                  {{ column }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in messages" :key="row.index">
                <td>{{ row.summary }}</td>
                <td>{{ row.date }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import Back_Navbar from "@/components/back-nav";
import General_Footer from "@/components/footer";

export default {
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer
  },
  computed: {
    messagesColumns() {
      return this.$store.state.messagesColumns;
    },
    messages() {
      return this.$store.state.messages;
    }
  },
  mounted() {
    console.log(this.messages);
  }
};
</script>
