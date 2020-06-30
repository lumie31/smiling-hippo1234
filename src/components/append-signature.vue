<template>
  <v-row class="contractParties">
    <div class="text-center my-12" style="width: 100%;">
      <b>SIGNATURE COMPONENT GOES HERE</b>
    </div>
    <v-col cols="6" class="">
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
            id="setUserSignature"
            :preview="false"
            :maxSize="0.2"
            :className="['fileinput', { 'fileinput--loaded': userSignatureHasImage }]"
            capture="environment"
            :debug="1"
            doNotResize="gif"
            :autoRotate="true"
            outputFormat="verbose"
            @input="setUserSignature"
          >
            <label for="setUserSignature" slot="upload-label">
              <figure>
                <div
                  class="uploadItem userSignatureHolder"
                  :style="{
                    backgroundImage: 'url(' + userSignature + ')'
                  }"
                ></div>
              </figure>
            </label>
          </image-uploader>
        </div>
        <v-btn class="mt-12 accent" @click="uploadUserSignature">
          <span>Update Signature</span>
        </v-btn>
        <div class="testFloat">{{ getUserSignature}}</div>
        <img :src="getUserSignature.url" alt="">
      </v-container>
    </v-col>

    <v-col cols="6" class="">
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
            id="secondPartySignature"
            :preview="false"
            :maxSize="0.2"
            :className="['fileinput', { 'fileinput--loaded': secondPartySignatureHasImage }]"
            capture="environment"
            :debug="1"
            doNotResize="gif"
            :autoRotate="true"
            outputFormat="verbose"
            @input="setSecondPartySignature"
          >
            <label for="secondPartySignature" slot="upload-label">
              <figure>
                <div
                  class="uploadItem userSignatureHolder"
                  :style="{
                    backgroundImage: 'url(' + secondPartySignature + ')'
                  }"
                ></div>
              </figure>
            </label>
          </image-uploader>
        </div>
        <v-btn class="mt-12 accent" @click="uploadSecondPartySignature">
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
    return {
      userSignature: null,
      secondPartySignature: null,
      defaultSignature: null,
      userSignatureHasImage: null,
      secondPartySignatureHasImage: null
    };
  },
  methods: {
    // User Signature
    setUserSignature: function(output) {
      this.UserSignatureHasImage = true;
      this.userSignature = output.dataUrl;
      this.image = output;
      console.log("data", output.dataUrl);
      console.log("Info", output.info);
      console.log("Exif", output.exif);
    },
    uploadUserSignature() {
      let formData = new FormData();
      this.companyLogo = this.$refs.signaturePicker.files[0];

      if (this.companyLogo) {
        // for (let file in this.profilePicture) {
        //   formData.append("profilePicture", file);
        // }
        formData.append("userSignature", this.userSignature);

        // this.$store.dispatch("uploadProfilePicture", {});

        console.log(formData.getAll("profilePicture"));
        console.log(this.companyLogo);
        console.log(this.previewCompanyLogo);
      } else {
        console.log("there are no files.");
      }
    },
    // Second Party User Signature
    setSecondPartySignature: function(output) {
      this.secondPartySignatureHasImage = true;
      this.secondPartySignature = output.dataUrl;
      this.image = output;
      console.log("data", output.dataUrl);
      console.log("Info", output.info);
      console.log("Exif", output.exif);
    },
    uploadSecondPartySignature() {
    }
  },
  created() {
    this.$store.dispatch("getUserDetails").then(() => {
      // setTimeout(() => {
      //   this.userDetailsReady = false;
      // }, 500);
    });
  },
  computed: {
    ...mapState(["storedUserDetails", "userDetailsReady"]),
    getUserSignature() {
      return this.storedUserDetails.profilePicture
    }
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
