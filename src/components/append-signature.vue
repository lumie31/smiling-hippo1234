<template>
  <v-row class="contractParties">
    <!-- <div class="text-center my-12" style="width: 100%;">
      <b>SIGNATURE COMPONENT GOES HERE</b>
    </div> -->
    <!-- <pre class="testFloat">{{ partySignatories }}</pre> -->

    <v-col cols="6" class="firstPartySign">
      <div class="formSectionTitle">Signatures (First Party)</div>
      <div class="d-flex justify-center">
        <v-radio-group v-model="partySignatories.firstParty.mode" row>
          <v-radio label="Company" color="accent" value="company"></v-radio>
          <span class="mx-4"></span>
          <v-radio label="Person" color="accent" value="person"></v-radio>
        </v-radio-group>
      </div>
      <v-text-field
        v-if="partySignatories.firstParty.mode == 'company'"
        height="155"
        label="Your Name"
        autocomplete="off"
        background-color="white"
        v-model="partySignatories.firstParty.name"
        class="partyName mt-4 text-center"
        flat
        solo
      ></v-text-field>
      <v-container class="contractSignatory text-center">
        <div class="uploadItemParent">
          <image-uploader
            id="setUserSignature"
            :preview="false"
            :maxSize="0.2"
            :className="[
              'fileinput',
              { 'fileinput--loaded': userSignatureHasImage }
            ]"
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
                  :style="[
                    userSignatureHasImage
                      ? {
                          backgroundImage: 'url(' + userSignature + ')'
                        }
                      : {
                          backgroundImage: 'url(' + storedUserSignature + ')'
                        }
                  ]"
                ></div>
              </figure>
            </label>
          </image-uploader>
          <v-btn
            text
            class="transparent resetSignatureSelection"
            @click="resetSignatureSelection"
            v-if="userSignatureHasImage"
          >
            <v-icon>refresh</v-icon>
          </v-btn>
        </div>
        <!-- <v-btn class="mt-12 accent" @click="appendToFormData">
          <span>Update Signature</span>
        </v-btn> -->
        <span class="mx-4"></span>
        <v-btn
          class="mt-12 success"
          @click="updateDefaultSignature"
          v-if="userSignatureHasImage"
          :loading="uploadSignatureLoader"
        >
          <span>Set As Default</span>
        </v-btn>
      </v-container>
    </v-col>

    <v-col cols="6" class="secondPartySign">
      <div class="formSectionTitle">Signatures (Second Party)</div>
      <div class="d-flex justify-center">
        <v-radio-group disabled v-model="partySignatories.secondParty.mode" row>
          <v-radio label="Company" color="accent" value="company"></v-radio>
          <span class="mx-4"></span>
          <v-radio label="Person" color="accent" value="person"></v-radio>
        </v-radio-group>
      </div>
      <v-text-field
        disabled
        v-if="partySignatories.secondParty.mode == 'company'"
        height="155"
        label="Your Name"
        autocomplete="off"
        background-color="white"
        v-model="partySignatories.secondParty.name"
        class="partyName mt-4"
        flat
        solo
      ></v-text-field>

      <v-container class="contractSignatory text-center">
        <div class="uploadItemParent" v-if="secondPartySignatureACTIVE">
          <image-uploader
            disabled
            id="secondPartySignature"
            :preview="false"
            :maxSize="0.2"
            :className="[
              'fileinput',
              { 'fileinput--loaded': secondPartySignatureHasImage }
            ]"
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
        <div
          class="uploadItem userSignatureHolder"
          v-if="!secondPartySignatureACTIVE"
        ></div>
        <v-btn
          class="mt-12 accent"
          @click="uploadSecondPartySignature"
          :disabled="!secondPartySignatureACTIVE"
        >
          <span>Upload Signature</span>
        </v-btn>
      </v-container>
    </v-col>
    <v-snackbar
      class="snackbar"
      :color="updatedSnackbar.color"
      top
      right
      v-model="updatedSnackbar.active"
      :multi-line="updatedSnackbar.multiLine"
      :timeout="updatedSnackbar.timeout"
    >
      {{ updatedSnackbar.text }}
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      cloudName: process.env.VUE_APP_cloudinary_cloudName,
      cloudSigPath: process.env.VUE_APP_cloudinary_sigPath,
      userSignature: null,
      secondPartySignature: null,
      documentSignature: null,
      userSignatureHasImage: null,
      uploadSignatureLoader: false,
      userSignatureDATA: {},
      secondPartySignatureACTIVE: false,
      secondPartySignatureHasImage: null,
      partySignatories: {
        firstParty: {
          mode: "company",
          name: "",
          signature: ""
        },
        secondParty: {
          mode: "company",
          name: "",
          signature: ""
        }
      },
      updatedSnackbar: {
        active: false,
        text: "",
        multiLine: true,
        color: null,
        timeout: this.$store.state.snackBarDuration
      }
    };
  },
  methods: {
    appendToFormData() {
      this.$emit("signatoriesDATA", this.partySignatories);
    },
    resetSignatureSelection() {
      this.userSignatureHasImage = false;
      this.userSignature = null;
      this.partySignatories.firstParty.signature = this.$store.state.storedUserSignature;

      // Remove emission from appended form
      this.appendToFormData();
    },
    // User Signature
    setUserSignature: function(output) {
      this.userSignatureHasImage = true;
      this.userSignature = output.dataUrl;
      this.partySignatories.firstParty.signature = output.dataUrl;

      // Emit Append function to Parent after each selection
      this.appendToFormData();

      // this.image = output;
      console.log("data", output.dataUrl);
      console.log("Info", output.info);
      console.log("Exif", output.exif);
    },
    updateDefaultSignature() {
      this.uploadSignatureLoader = true;

      if (this.userSignature == null) {
        this.uploadSignatureLoader = false;
        return alert("Break");
      }
      console.log("Continue");

      axios
        .post("https://api.cloudinary.com/v1_1/" + this.cloudName + "/upload", {
          tags: "user signature",
          file: this.userSignature,
          upload_preset: this.cloudSigPath
        })
        .then(response => {
          this.userSignatureDATA.url = response.data.secure_url;
          this.userSignatureDATA.createdAt = response.data.created_at;
          this.userSignatureDATA.id = response.data.public_id;

          console.log(response.data);
          console.log(response.data.secure_url);
          console.log(response.status);
          console.log(response.headers);

          // Upload RESPONSE to server
          this.sendUserSignatureToServer();
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);

          this.updatedSnackbar.active = true;
          this.updatedSnackbar.text = "Oops! An error occured";
          this.updatedSnackbar.color = "error";

          this.uploadSignatureLoader = false;
        });
    },
    sendUserSignatureToServer() {
      console.log("userSignatureDATA", this.userSignatureDATA);
      axios
        .put(
          "/api/v1/user/update",
          { signature: this.userSignatureDATA },
          {
            headers: {
              Authorization: this.$store.state.token,
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          console.log("User Signature successfully sent to server!");
          console.log({ response });

          this.updatedSnackbar.active = true;
          this.updatedSnackbar.text = "Default Signature updated";
          this.updatedSnackbar.color = "success";

          this.uploadSignatureLoader = false;
        })
        .catch(error => {
          console.log({ error });
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.status);

          this.updatedSnackbar.active = true;
          this.updatedSnackbar.text = "Oops! An error occured";
          this.updatedSnackbar.color = "error";

          this.updateProfileLoader = false;
        });
    },

    // Second Party Signature
    uploadSecondPartySignature() {
      console.log("CTA for Second Party");
    }
  },
  created() {
    this.$store.dispatch("getUserDetails").then(() => {
      // setTimeout(() => {
      //   this.userDetailsReady = false;
      // }, 500);
    });
  },
  watch: {
    userSignatureHasImage(val) {
      if (val) {
        return val;
      }
    },
    storedUserSignature(val) {
      if (val.length > 2) {
        this.partySignatories.firstParty.signature = this.storedUserSignature;
      }
    }
  },
  computed: {
    ...mapState([
      "storedUserDetails",
      "userDetailsReady",
      "storedUserSignature"
    ])
  },
  mounted() {
    // Emit Append function to Parent on mount
    this.appendToFormData();
  }
};
</script>

<style>
.contractParties .partyName {
  width: 100%;
  text-align: center;
  font-size: 30px;
  line-height: 5;
}

.contractParties .partyName label {
  text-align: center !important;
  width: 100%;
}
.contractParties .partyName input {
  text-align: center !important;
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

.container.contractSignatory {
  padding: 0;
}

.uploadItemParent {
  position: relative;
}

.resetSignatureSelection {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
