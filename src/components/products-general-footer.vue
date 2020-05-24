<template>
  <v-row>
    <v-col cols="12" sm="6">
      <router-link to="/payment-history">
        <v-card class="legalbox-tabs d-flex flex-column justify-center">
          <v-card-title>
            <img
              src="@/assets/payment-history-icon.png"
              class="legalbox-icons"
              width="40"
            />
          </v-card-title>
          <v-card-text class="headline">Payment History</v-card-text>
        </v-card>
      </router-link>
    </v-col>
    <v-col cols="12" sm="6">
      <router-link to="/my-documents">
        <v-card class="legalbox-tabs d-flex flex-column justify-center">
          <v-card-title>
            <img
              src="@/assets/my-doc-icon.png"
              class="legalbox-icons"
              width="40"
            />
          </v-card-title>
          <v-card-text class="headline">My Documents</v-card-text>
        </v-card>
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>
