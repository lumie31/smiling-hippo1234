<template>
  <v-row class="contractParties">
    <div class="text-center my-12" style="width: 100%;">
      <b>SIGNATURE COMPONENT GOES HERE</b>
    </div>
    <v-col cols="6" class="">
      <div class="formSectionTitle">Signatures (First Party)</div>
      <div class="d-flex justify-center">
        <div class="d-flex align-center mr-6">
          <input type="radio" name="firstPartyCompany" value="Person" id="firstPartyCompany" />
          <label for="form.radioId1" class="ml-2">Company</label>
        </div>
        <div class="d-flex align-center">
          <input type="radio" name="firstPartyPerson" value="Person" id="firstPartyPerson" />
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
                  :style="[userSignatureHasImage ? {
                      backgroundImage:
                        'url(' + userSignature  + ')'
                    } : {
                      backgroundImage:
                        'url(' + storedUserSignature + ')'
                    }]"
                ></div>
              </figure>
            </label>
          </image-uploader>
        </div>
        <v-btn class="mt-12 accent" @click="emitDocumentSignature()" :loading="uploadSignatureLoader">
          <span>Update Signature</span>
        </v-btn>
        <span class="mx-4"></span>
        <v-btn class="mt-12 success" @click="updateDefaultSignature" v-if="userSignatureHasImage" :loading="uploadSignatureLoader">
          <span>Set As Default</span>
        </v-btn>
      </v-container>
    </v-col>

    <v-col cols="6" class="">
      <div class="formSectionTitle">Signatures (Second Party)</div>
      <div class="d-flex justify-center">
        <div class="d-flex align-center mr-6">
          <input type="radio" name="secondPartyCompany" value="Person" id="secondPartyCompany" />
          <label for="form.radioId1" class="ml-2">Company</label>
        </div>
        <div class="d-flex align-center">
          <input type="radio" name="secondPartyPerson" value="Person" id="secondPartyPerson" />
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
        <div class="uploadItemParent" v-if="secondPartySignatureACTIVE">
          <image-uploader
          disabled
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
        <div class="uploadItem userSignatureHolder" v-if="!secondPartySignatureACTIVE"></div>
        <v-btn class="mt-12 accent" @click="uploadSecondPartySignature" :disabled="!secondPartySignatureACTIVE">
          <span>Update Signature</span>
        </v-btn>
      </v-container>
    </v-col> 
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios"

export default {
  data() {
    return {
      userSignature: null,
      secondPartySignature: null,
      documentSignature: null,
      userSignatureHasImage: null,
      uploadSignatureLoader: false,
      userSignatureDATA: {},
      secondPartySignatureACTIVE: false,
      secondPartySignatureHasImage: null
    };
  },
  methods: {
    // User Signature
    setUserSignature: function(output) {
      this.userSignatureHasImage = true;
      this.userSignature = output.dataUrl;
      // this.image = output;
      console.log("data", output.dataUrl);
      console.log("Info", output.info);
      console.log("Exif", output.exif);
    },
    emitDocumentSignature() {
      this.documentSignature = this.userSignature;
      console.log(this.documentSignature);

      this.$emit("emitDocumentSignature")
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

          this.uploadSignatureLoader = false;
        })
        .catch(error => {
          console.log({ error });
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.status);
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
  computed: {
    ...mapState(["storedUserDetails", "userDetailsReady", "storedUserSignature"]),
    
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
.container.contractSignatory {
  padding: 0;
}
</style>
