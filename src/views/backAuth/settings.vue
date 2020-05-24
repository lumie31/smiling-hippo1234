<template>
  <div class="back-page legalboxes page">
    <back-nav></back-nav>
    <div class="bodyWrapper">
      <v-container class>
        <div class="d-flex">
          <img src="../../assets/user-hero-box.png" />
          <h2 class="display-3 mt-4">Settings</h2>
        </div>

        <div>
          <div class="settings-tab-parent">
            <v-tabs fixed-tabs class="settings-tab py-5" height="90">
              <v-tab
                class="display-1 white--text text-capitalize text-center justify-start first-title settings-tab-title"
                >Profile</v-tab
              >
              <v-tab
                class="display-1 white--text text-capitalize text-center justify-start settings-tab-title"
                >Account</v-tab
              >
              <v-tab
                class="display-1 white--text text-capitalize text-left justify-start last-title settings-tab-title"
                >Card</v-tab
              >
              <v-tab-item class="transparent legalbox-body-text">
                <v-card flat class="transparent">
                  <v-card-text class="transparent px-12 py-8">
                    <v-form
                      ref="updateProfilePass"
                      @submit.prevent="updateUserProfile"
                    >
                      <v-row class="d-flex align-center">
                        <v-col cols="12" sm="4">
                          <!-- {{ storedUserDetails }} -->
                          <p class="headline">Profile Picture</p>
                          <p class="caption">
                            The avatar on your profile.
                            <br />Keep it as professional as possible
                          </p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex align-center">
                          <input
                            type="file"
                            accept="image/*"
                            name="profilePicture"
                            style="display: none;"
                            ref="profilePicker"
                            @change="onProfilePicturePicked"
                          />
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <div
                                v-on="on"
                                title="Chnage Image"
                                :style="{
                                  backgroundImage:
                                    'url(' + previewProfileImage + ')'
                                }"
                                id="previewProfilePicture"
                                @click="onProfilePicturePick"
                              >
                                <span
                                  v-if="!previewProfileImage"
                                  id="no-avatar"
                                ></span>
                              </div>
                            </template>
                            <span>Profile Picture</span>
                          </v-tooltip>
                          <v-btn
                            class="ml-12 accent"
                            @click="uploadProfilePicture"
                          >
                            <span>Update Profile Picture</span>
                          </v-btn>
                        </v-col>
                      </v-row>

                      <!-- Company Logo -->

                      <v-row class="d-flex align-center">
                        <v-col cols="12" sm="4">
                          <p class="headline">Company Logo</p>
                          <p class="caption">
                            Update your company logo here
                            <br />
                            <b>File Specification:</b> Transparent PNG file
                            <br />
                            <b>Max. File Size:</b> 100KB
                          </p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex align-center">
                          <input
                            type="file"
                            accept="image/*"
                            name="profilePicture"
                            style="display: none;"
                            ref="companyLogoPicker"
                            @change="onCompanyLogoPicked"
                          />
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <div
                                v-on="on"
                                title="Chnage Image"
                                :style="{
                                  backgroundImage:
                                    'url(' + previewCompanyLogo + ')'
                                }"
                                id="previewCompanyLogo"
                                @click="onCompanyLogoPick"
                              >
                                <span
                                  v-if="!previewCompanyLogo"
                                  id="no-avatar"
                                ></span>
                              </div>
                            </template>
                            <span>Company Logo</span>
                          </v-tooltip>
                          <v-btn
                            class="ml-12 accent"
                            @click="uploadCompanyLogo"
                          >
                            <span>Update Company Logo</span>
                          </v-btn>
                        </v-col>
                      </v-row>

                      <!-- Bio -->
                      <hr class="my-12" />
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Full Name</p>
                          <p class="caption">
                            Your official name across
                            <br />official documents
                          </p>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <v-row>
                            <v-col cols="12" sm="6">
                              <v-text-field
                                v-model="profileData.firstName"
                                outlined
                                :rules="[rules.alphabet]"
                                label="First Name"
                                :placeholder="storedUserDetails.firstName"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field
                                v-model="profileData.lastName"
                                outlined
                                :rules="[rules.alphabet]"
                                label="Last Name"
                                :placeholder="storedUserDetails.lastName"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-col cols="12" sm="6"></v-col>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Email Address</p>
                          <p class="caption">
                            For receiving account and
                            <br />Payment updates
                          </p>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <v-text-field
                            outlined
                            label="Email"
                            :value="storedUserDetails.email"
                            disabled
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Phone Number</p>
                          <p class="caption">
                            For notifications via your personal
                            <br />Phone number
                          </p>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <v-text-field
                            v-model="profileData.phone"
                            :rules="[rules.phoneNumber]"
                            outlined
                            label="Phone Number"
                            :placeholder="storedUserDetails.phone"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Date of Birth</p>
                          <p class="caption">For birthday wishes and gifts</p>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            max-width="290"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                autocomplete="off"
                                :value="profileData.dob"
                                prepend-icon="date_range"
                                :placeholder="storedUserDetails.dob"
                                clearable
                                label="Date of Birth"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="profileData.dob"
                              :rules="[
                                rules.required,
                                rules.min11,
                                rules.phoneNumber
                              ]"
                              @change="menu1 = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Gender</p>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <div class="d-flex align-center">
                            <input
                              type="radio"
                              name="gender"
                              value="Male"
                              v-model="profileData.gender"
                            />
                            <span class="ml-2 mr-12">Male</span>
                            <input
                              type="radio"
                              name="gender"
                              value="Female"
                              v-model="profileData.gender"
                            />
                            <span class="ml-2 mr-12">Female</span>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="12">
                          <v-btn
                            x-large
                            class="mt-12 accent"
                            @click="updateUserProfile"
                            :loading="updateProfileLoader"
                            :disabled="updateProfileLoader"
                          >
                            Update Profile
                          </v-btn>
                          <v-snackbar
                            :color="updatedSnackbar.color"
                            top
                            right
                            v-model="updatedSnackbar.active"
                            :multi-line="updatedSnackbar.multiLine"
                            :timeout="updatedSnackbar.timeout"
                          >
                            {{ updatedSnackbar.text }}
                            <v-btn
                              color="secondary"
                              text
                              @click="updatedSnackbar.active = false"
                            >
                              <b>x</b>
                            </v-btn>
                          </v-snackbar>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item class="transparent legalbox-body-text">
                <v-card flat class="transparent">
                  <v-card-text class="transparent px-12 py-8">
                    <!-- Plan Up -->
                    <v-form>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Change Subscription Plan</p>
                          <p class="caption">
                            Upgrade or downgrade your subscription here
                          </p>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <span v-for="plan in plans" :key="plan.name">
                            <input
                              type="radio"
                              name="plans"
                              value="plan.name"
                            />
                            <span class="ml-2 mr-12">{{ plan.name }}</span>
                          </span>
                          <br />
                          <v-btn class="mt-4 accent">Update Subscription</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                    <!-- Change Password -->
                    <v-form>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Password</p>
                          <p class="caption">
                            Update the password to your account here
                          </p>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <v-text-field
                            class="login-input"
                            outlined
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            label="Old Password"
                            @click:append="show1 = !show1"
                          ></v-text-field>
                          <v-text-field
                            class="login-input"
                            outlined
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            label="New Password"
                            @click:append="show2 = !show2"
                          ></v-text-field>
                          <v-text-field
                            class="login-input"
                            outlined
                            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show3 ? 'text' : 'password'"
                            label="Confirm Old Password"
                            @click:append="show3 = !show3"
                          ></v-text-field>
                          <v-btn class="accent">Update Password</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                    <v-form>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Upload/Change Signature</p>
                          <p class="caption">
                            Update your signature here
                            <br />
                            <b>File Specification:</b> Transparent PNG file
                            <br />
                            <b>Max. File Size:</b> 100KB
                            <br />
                            <b>Ink Color:</b> Black
                          </p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex align-center">
                          <input
                            type="file"
                            accept="image/*"
                            name="profilePicture"
                            style="display: none;"
                            ref="signaturePicker"
                            @change="onSignaturePicked"
                          />
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <div
                                v-on="on"
                                title="Chnage Image"
                                :style="{
                                  backgroundImage:
                                    'url(' + previewUserSignature + ')'
                                }"
                                id="previewUserSignature"
                                @click="onSignaturePick"
                              >
                                <span
                                  v-if="!previewUserSignature"
                                  id="no-signature"
                                  >No Signature <br />
                                  Click to append</span
                                >
                              </div>
                            </template>
                            <span>Your Signature</span>
                          </v-tooltip>
                          <v-btn
                            class="ml-12 accent"
                            @click="uploadUserSignature"
                          >
                            <span>Update Company Logo</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- Card Tab -->
              <v-tab-item class="transparent legalbox-body-text">
                <v-card flat class="transparent">
                  <v-card-text class="transparent px-12 py-8">
                    <v-form>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Change Subscription Plan</p>
                          <p class="caption">
                            Upgrade or downgrade your subscription here
                          </p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex">
                          <span class="d-flex align-center">
                            <input
                              type="radio"
                              name="cardType"
                              value="verve"
                              class="mr-4"
                            />
                            <img
                              src="../../assets/Verve_Image.png"
                              width="100"
                            />
                          </span>
                          <span class="d-flex align-center">
                            <input
                              type="radio"
                              name="cardType"
                              value="verve"
                              class="mr-4"
                            />
                            <img src="../../assets/visa.png" width="60" />
                          </span>
                          <span class="d-flex align-center">
                            <input
                              type="radio"
                              name="cardType"
                              value="verve"
                              class="mr-4"
                            />
                            <img
                              src="../../assets/mastercard.jpg"
                              width="100"
                            />
                          </span>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Card Number</p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex">
                          <v-text-field
                            outlined
                            label="Card Number"
                            value="Card Number"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Expiry Date</p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex">
                          <v-text-field
                            outlined
                            label="Expiry Date"
                            value="Expiry Date"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">CVV Number</p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex">
                          <v-text-field
                            outlined
                            label="CVV"
                            value="CVV"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <v-btn class="accent">Add Card</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </div>
        </div>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import Back_Navbar from "@/components/back-nav";
import General_Footer from "@/components/footer";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
// import VImageInput from "vuetify-image-input";
import axios from "axios";

import { mapState } from "vuex";

export default {
  data() {
    return {
      updateProfileLoader: false,
      previewProfileImage: null,
      previewCompanyLogo: null,
      previewUserSignature: null,
      profilePicture: null,
      companyLogo: null,
      userSignature: null,
      profileData: {
        firstName: "",
        lastName: "",
        phone: "",
        dob: "",
        gender: ""
      },
      updatedSnackbar: {
        active: false,
        text: this.successMessage,
        multiLine: true,
        color: null,
        timeout: this.$store.state.snackBarDuration
      },
      menu1: false,
      show1: false,
      show2: false,
      show3: false,
      image: "",
      rules: {
        required: value => !!value || "Required.",
        imgValidation: value =>
          !value ||
          value.size <= 100000 ||
          "Avatar size should not be more than 100kb!",
        min2: value => value.length >= 2 || "Min 2 characters",
        min11: value => value.length >= 11 || "Min 11 digits",
        alphabet: value =>
          !value || /^[a-zA-Z]+$/.test(value) || "Only alpabets are allowed",
        number: value =>
          !value || /^[0-9]*$/.test(value) || "Only numbers are allowed",
        password: value => {
          const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
          return (
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        },
        phoneNumber: value =>
          !value ||
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(value) ||
          "Enter a valid phone number"
      }
    };
  },
  methods: {
    onProfilePicturePick() {
      this.$refs.profilePicker.click();
    },
    onProfilePicturePicked(event) {
      if (event) {
        let previewer = event.target.files;
        if (!previewer.length) return;
        this.imagePreviewer(previewer[0]);
      }
    },
    imagePreviewer(previewer) {
      // eslint-disable-next-line no-unused-vars
      let image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.previewProfileImage = e.target.result;
      };
      reader.readAsDataURL(previewer);
    },
    uploadProfilePicture() {
      let formData = new FormData();
      this.profilePicture = this.$refs.profilePicker.files[0];

      if (this.profilePicture) {
        // for (let file in this.profilePicture) {
        //   formData.append("profilePicture", file);
        // }
        formData.append("profilePicture", this.profilePicture);

        // this.$store.dispatch("uploadProfilePicture", {});

        console.log(formData.getAll("profilePicture"));
        console.log(this.profilePicture);
        console.log(this.previewProfileImage);
        axios
          .put("/api/v1/user/update", formData, {
            headers: {
              Authorization: this.$store.state.token,
              "Content-Type": "multipart/form-data"
            }
          })
          .then(response => {
            console.log("Success!");
            console.log({ response });
          })
          .catch(error => {
            console.log({ error });
            console.log(error.response);
            console.log(error.response.data);
            console.log(error.response.status);
          });
      } else {
        console.log("there are no files.");
      }
    },
    // COMPANY LOGO UPLOAD
    onCompanyLogoPick() {
      this.$refs.companyLogoPicker.click();
    },
    onCompanyLogoPicked(event) {
      if (event) {
        let previewer = event.target.files;
        if (!previewer.length) return;
        this.companyLogoPreviewer(previewer[0]);
      }
    },
    companyLogoPreviewer(previewer) {
      // eslint-disable-next-line no-unused-vars
      let image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.previewCompanyLogo = e.target.result;
      };
      reader.readAsDataURL(previewer);
    },
    uploadCompanyLogo() {
      let formData = new FormData();
      this.companyLogo = this.$refs.companyLogoPicker.files[0];

      if (this.companyLogo) {
        // for (let file in this.profilePicture) {
        //   formData.append("profilePicture", file);
        // }
        formData.append("companyLogo", this.companyLogo);

        // this.$store.dispatch("uploadProfilePicture", {});

        console.log(formData.getAll("profilePicture"));
        console.log(this.companyLogo);
        console.log(this.previewCompanyLogo);
        // axios
        //   .put("/api/v1/user/update", formData, {
        //     headers: {
        //       Authorization: this.$store.state.token,
        //       "Content-Type": "multipart/form-data"
        //     }
        //   })
        //   .then(response => {
        //     console.log("Success!");
        //     console.log({ response });
        //   })
        //   .catch(error => {
        //     console.log({ error });
        //     console.log(error.response);
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //   });
      } else {
        console.log("there are no files.");
      }
    },
    // User Signature
    onSignaturePick() {
      this.$refs.signaturePicker.click();
    },
    onSignaturePicked(event) {
      if (event) {
        let previewer = event.target.files;
        if (!previewer.length) return;
        this.signaturePreviewer(previewer[0]);
      }
    },
    signaturePreviewer(previewer) {
      // eslint-disable-next-line no-unused-vars
      let image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.previewUserSignature = e.target.result;
      };
      reader.readAsDataURL(previewer);
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
    updateUserProfile() {
      if (this.$refs.updateProfilePass.validate()) {
        this.updateProfileLoader = true;
        for (var key in this.profileData) {
          if (this.profileData[key] != "") {
            this.$store.dispatch("updateUserProfile", {
              [key]: this.profileData[key]
            });
          }
        }
      }
    },
    updateUserProfileNULL() {
      if (this.$refs.updateProfilePass.validate()) {
        this.updateProfileLoader = true;
        for (var key in this.profileData) {
          if (this.profileData[key] != "") {
            // console.log(key + ": " + this.profileData[key]);
            this.$store.dispatch("updateUserProfile", {
              [key]: this.profileData[key]
            });
          } else if (this.profileData[key] == "") {
            this.$store.dispatch("discardEmptyEntries", {
              [key]: this.profileData[key]
            });
          }
        }
      }
    }
  },
  computed: {
    plans() {
      return this.$store.state.plans;
    },
    formattedDate() {
      // var parseISO = require("date-fns/parseISO");
      // console.log(this.dob + " test");
      // this.dob.toString();
      return this.dob
        ? format(parseISO(this.dob + "T00:00:00"), "do, MMMM, yyyy")
        : "";
    },
    ...mapState(
      ["storedUserDetails", "profileUpdated", "successMessage"],
      ["token"]
    )
  },
  watch: {
    successMessage(updateStatus) {
      // If profile update have a minimum of 1 valid successful submission
      if (updateStatus === "success") {
        this.updatedSnackbar.active = this.profileUpdated;
        this.updatedSnackbar.text = "Profile successfully updated!";
        this.updatedSnackbar.color = "success";
        this.$store.dispatch("removeSnackbar");
        this.updatedSnackbar.active = this.profileUpdated;
        this.updateProfileLoader = false;
      }
      // else if (updateStatus === "error") {
      //   this.updatedSnackbar.active = this.profileUpdated;
      //   this.updatedSnackbar.text = "Oops! An error occured";
      //   this.updatedSnackbar.color = "error";
      //   this.$store.dispatch("removeSnackbar");
      //   this.updatedSnackbar.active = this.profileUpdated;
      //   this.updateProfileLoader = false;
      // }
    },
    // errorMessage(successMessage) {
    //   // If profile update have a minimum of 1 valid successful submission
    //   if (successMessage == "error") {
    //     console.log(successMessage);
    //     this.updatedSnackbar.active = this.profileUpdated;
    //     this.updatedSnackbar.text = "Oops! An error occured";
    //     this.updatedSnackbar.color = "error";
    //     this.$store.dispatch("removeSnackbar");
    //     this.updatedSnackbar.active = this.profileUpdated;
    //   }
    // },
    // emptyMessage(successMessage) {
    //   // If profile update have a minimum of 1 valid successful submission
    //   if (successMessage == "emptySubmission") {
    //     console.log(successMessage);
    //     this.updatedSnackbar.active = this.profileUpdated;
    //     this.updatedSnackbar.text = "Oops! No new update";
    //     this.updatedSnackbar.color = "cyan darken-2";
    //     this.$store.dispatch("removeSnackbar");
    //     this.updatedSnackbar.active = this.profileUpdated;
    //   }
    // },
    showSuccessMessaegValue() {
      console.log(this.successMessage);
    }
  },
  created() {
    this.$store.dispatch("getUserDetails").then(() => {});
  },
  mounted() {
    // console.log(this.successMessage);
    // let newObj = JSON.parse(JSON.stringify(this.storedUserDetails));
    // console.log(newObj);
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer
    // VImageInput
  }
};
</script>

<style scoped>
:required {
  background: red;
}
#previewProfilePicture,
#previewCompanyLogo {
  position: relative;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}
#previewCompanyLogo{
  background-size: contain;
}
#previewUserSignature {
  position: relative;
  /* height: 150px; */
  padding-top: 50px;
  padding-bottom: 50px;
  width: 750px;
  border-radius: 9px;
  background-position: center;
  background-size: cover;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  background-size: contain;
}
#no-avatar {
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: rgba(205, 203, 203, 0.6);
  background-image: url(../../assets/user.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70%;
}
#no-signature {
  text-align: center;
  display: block;
  height: 100%;
  width: 100%;
}
</style>
