<template>
  <v-row class="contractParties">
    <div class="text-center my-12" style="width: 100%;">
      <b>SIGNATURE COMPONENT GOES HERE</b>
    </div>
    <v-col cols="6" class="d-flex flex-column align-center">
      <div class="formSectionTitle">Signatures (First Party)</div>
      <div class="d-flex justify-center">
        <div class="d-flex align-center mr-6">
          <input type="radio" name="company" value="Person" id="company" />
          <label for="form.radioId1" class="ml-2">Company</label>
        </div>
        <div class="d-flex align-center">
          <input type="radio" name="company" value="Person" id="company" />
          <label for="form.radioId1" class="ml-2">Person</label>
        </div>
      </div>
      <v-text-field
        height="155"
        disabled
        background-color="white"
        :value="storedUserDetails.firstName + ' ' + storedUserDetails.lastName"
        class="name mt-4"
        flat
        solo
      ></v-text-field>
      <v-container class="contractSignatory text-center">
        <div class="uploadItemParent">
          <image-uploader
            id="companyLogo"
            :preview="false"
            :maxSize="0.2"
            :className="['fileinput', { 'fileinput--loaded': companyHasImage }]"
            capture="environment"
            :debug="1"
            doNotResize="gif"
            :autoRotate="true"
            outputFormat="verbose"
            @input="setCompanyLogo"
          >
            <label for="companyLogo" slot="upload-label">
              <figure>
                <div
                  class="uploadItem userSignatureHolder"
                  :style="{
                    backgroundImage: 'url(' + companyLogo + ')'
                  }"
                ></div>
              </figure>
            </label>
          </image-uploader>
        </div>
        <v-btn class="mt-12 accent" @click="uploadUserSignature">
          <span>Update Signature</span>
        </v-btn>
      </v-container>
    </v-col>

    <v-col cols="6" class="d-flex flex-column align-center">
      <div class="formSectionTitle">Signatures (Second Party)</div>
      <div class="d-flex justify-center">
        <div class="d-flex align-center mr-6">
          <input type="radio" name="company" value="Person" id="company" />
          <label for="form.radioId1" class="ml-2">Company</label>
        </div>
        <div class="d-flex align-center">
          <input type="radio" name="company" value="Person" id="company" />
          <label for="form.radioId1" class="ml-2">Person</label>
        </div>
      </div>
      <v-text-field
        height="155"
        disabled
        background-color="white"
        value="Borrower"
        class="name mt-4"
        flat
        solo
      ></v-text-field>
      <v-container class="contractSignatory text-center">
        <div class="uploadItemParent">
          <image-uploader
            id="companyLogo"
            :preview="false"
            :maxSize="0.2"
            :className="['fileinput', { 'fileinput--loaded': companyHasImage }]"
            capture="environment"
            :debug="1"
            doNotResize="gif"
            :autoRotate="true"
            outputFormat="verbose"
            @input="setCompanyLogo"
          >
            <label for="companyLogo" slot="upload-label">
              <figure>
                <div
                  class="uploadItem userSignatureHolder"
                  :style="{
                    backgroundImage: 'url(' + companyLogo + ')'
                  }"
                ></div>
              </figure>
            </label>
          </image-uploader>
        </div>
        <v-btn class="mt-12 accent" @click="uploadUserSignature">
          <span>Update Signature</span>
        </v-btn>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getUserDetails").then(() => {
      // setTimeout(() => {
      //   this.userDetailsReady = false;
      // }, 500);
    });
  },
  computed: {
    legalboxes() {
      return this.$store.state.legalboxes;
    },
    ...mapState(["storedUserDetails", "userDetailsReady"])
  }
};
</script>

<style>
.contractParties .name {
  width: 100%;
  text-align: center;
  font-size: 60px;
  line-height: 5;
}

.contractParties .name input {
  text-align: center;
  padding: 50px 0 70px 0;
}

.contractSignatory .uploadItem {
  background-color: #fff;
  padding-bottom: 50px;
  width: 100%;
  border-radius: 9px;
  background-position: center;
  background-size: contain;
  box-shadow: none;
  cursor: pointer;
}
</style>
