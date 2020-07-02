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
            <!-- <p class="text-center mt-10" v-if="storedUserDetails.email"> -->
            <!-- <p class="text-center mt-10">
              Loading.....
              <v-text-field
                style="width: 40%; margin: 0 auto;"
                color="success"
                loading
                disabled
              ></v-text-field>
            </p>-->
            <!-- <v-tabs
              fixed-tabs
              class="settings-tab py-5"
              height="90"
              v-if="!storedUserDetails.email"
            >-->
            <v-tabs fixed-tabs class="settings-tab py-5" height="90">
              <v-tab
                class="display-1 white--text text-capitalize text-center justify-start first-title settings-tab-title"
              >Profile</v-tab>
              <v-tab
                class="display-1 white--text text-capitalize text-center justify-start settings-tab-title"
              >Account</v-tab>
              <v-tab
                class="display-1 white--text text-capitalize text-left justify-start last-title settings-tab-title"
              >Card</v-tab>

              
              <!-- Profile -->
              <v-tab-item class="transparent legalbox-body-text">
                <v-card flat class="transparent">
                  <v-card-text class="transparent px-12 py-8">
                    <v-form ref="updateProfilePass" @submit.prevent="updateUserProfile">
                      <v-row class="d-flex align-center">
                        <v-col cols="12" sm="4">
                          <!-- <pre class="testFloat">{{ storedUserDetails }}</pre> -->
                          <p class="headline">Profile Picture</p>
                          <p class="caption">
                            The avatar on your profile.
                            <br />Keep it as professional as possible
                          </p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex align-center">
                          <div class="uploadItemParent">
                            <image-uploader
                              id="profilePicture"
                              :preview="false"
                              :maxSize="0.2"
                              :className="[
                                'fileinput',
                                { 'fileinput--loaded': profilePictureHasImage }
                              ]"
                              capture="environment"
                              :debug="1"
                              doNotResize="gif"
                              :autoRotate="true"
                              outputFormat="verbose"
                              @input="setProfileImage"
                            >
                              <label for="profilePicture" slot="upload-label">
                                <figure>
                                  <div
                                    class="uploadItem profileImageHolder"
                                    :style="[profilePictureHasImage ? {
                                      backgroundImage:
                                        'url(' + profilePicture  + ')'
                                    } : {
                                      backgroundImage:
                                        'url(' + storedUserProfilePicture + ')'
                                    }]"
                                  ></div>
                                </figure>
                              </label>
                            </image-uploader>
                          </div>
                          <v-btn
                            :loading="updateProfileLoader"
                            :disabled="profilePicture == null"
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
                          <div class="uploadItemParent">
                            <image-uploader
                              id="companyLogo"
                              :preview="false"
                              :maxSize="0.2"
                              :className="[
                                'fileinput',
                                { 'fileinput--loaded': companyHasImage }
                              ]"
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
                                    class="uploadItem companyLogoHolder"
                                    :style="[companyHasImage ? {
                                      backgroundImage:
                                        'url(' + companyLogo  + ')'
                                    } : {
                                      backgroundImage:
                                        'url(' + storedcompanyLogo + ')'
                                    }]"
                                  ></div>
                                </figure>
                              </label>
                            </image-uploader>
                          </div>
                          <v-btn
                            :loading="companyLogoLoading"
                            :disabled="companyLogo == null"
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
                          <v-menu :close-on-content-click="false" max-width="290">
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
                          >Update Profile</v-btn>
                          
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- Account -->
              <v-tab-item class="transparent legalbox-body-text">
                <v-card flat class="transparent">
                  <v-card-text class="transparent px-12 py-8">
                    <!-- Plan Up -->
                    <v-form>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Change Subscription Plan</p>
                          <p class="caption">Upgrade or downgrade your subscription here</p>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <span v-for="plan in plans" :key="plan.name">
                            <input type="radio" name="plans" value="plan.name" />
                            <span class="ml-2 mr-12">{{ plan.name }}</span>
                          </span>
                          <br />
                          <v-btn class="mt-4 accent">Update Subscription</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>

                    <!-- Change Password -->
                    <v-form class="mt-12">
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Password</p>
                          <p class="caption">Update the password to your account here</p>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <v-form action="#" ref="updatePasswordForm" @submit.prevent="updatePassword">
                            <v-text-field
                              v-model="oldPassword"
                              class="login-input"
                              :rules="[rules.required]"
                              outlined
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show1 ? 'text' : 'password'"
                              label="Old Password"
                              @click:append="show1 = !show1"
                            ></v-text-field>
                            <v-text-field
                              v-model="password"
                              class="login-input"
                              :rules="[rules.required, rules.password]"
                              outlined
                              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show2 ? 'text' : 'password'"
                              label="New Password"
                              @click:append="show2 = !show2"
                            ></v-text-field>
                            <v-text-field
                              v-model="confirmPassword"
                              class="login-input"
                              outlined
                              :rules="[rules.required, rules.passwordMatch]"
                              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show3 ? 'text' : 'password'"
                              label="Confirm Old Password"
                              @click:append="show3 = !show3"
                            ></v-text-field>

                            <v-btn
                            class="accent"
                            @click="updatePassword"
                            :loading="updatePasswordLoader"
                            :disabled="DisableUpdatePassword"
                          >Update Password</v-btn>
                          </v-form>

                          
                        </v-col>
                      </v-row>
                    </v-form>
                    <v-form class="mt-12">
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
                        <v-col cols="12" sm="8" class="">
                          <div class="uploadItemParent">
                            <image-uploader
                              id="userSignature"
                              :preview="false"
                              :maxSize="0.2"
                              :className="[
                                'fileinput',
                                { 'fileinput--loaded': companyHasImage }
                              ]"
                              capture="environment"
                              :debug="1"
                              doNotResize="gif"
                              :autoRotate="true"
                              outputFormat="verbose"
                              @input="setUserSignature"
                            >
                              <label for="userSignature" slot="upload-label">
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
                          <v-btn class="mt-4 accent" @click="uploadUserSignature" :loading="uploadSignatureLoader" :disabled="userSignature == null">
                            <span>Update Signature</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- Card Tab -->
              <v-tab-item class="transparent legalbox-body-text">
                <v-tabs class="paymentChildren">
                  <v-tab class="text-capitalize">Bank Accounts</v-tab>
                  <v-tab class="text-capitalize">Cards</v-tab>
                  <v-tab-item>a</v-tab-item>
                  <v-tab-item>b</v-tab-item>
                </v-tabs>
                <v-card flat class="transparent">
                  <v-card-text class="transparent px-12 py-8">
                    <v-form>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Change Subscription Plan</p>
                          <p class="caption">Upgrade or downgrade your subscription here</p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex">
                          <span class="d-flex align-center">
                            <input type="radio" name="cardType" value="verve" class="mr-4" />
                            <img src="../../assets/Verve_Image.png" width="100" />
                          </span>
                          <span class="d-flex align-center">
                            <input type="radio" name="cardType" value="verve" class="mr-4" />
                            <img src="../../assets/visa.png" width="60" />
                          </span>
                          <span class="d-flex align-center">
                            <input type="radio" name="cardType" value="verve" class="mr-4" />
                            <img src="../../assets/mastercard.jpg" width="100" />
                          </span>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Card Number</p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex">
                          <v-text-field outlined label="Card Number" value="Card Number"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">Expiry Date</p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex">
                          <v-text-field outlined label="Expiry Date" value="Expiry Date"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="justify-start">
                        <v-col cols="12" sm="4">
                          <p class="headline">CVV Number</p>
                        </v-col>
                        <v-col cols="12" sm="8" class="d-flex">
                          <v-text-field outlined label="CVV" value="CVV"></v-text-field>
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

import $ from "jquery"; //import jQuery
import { mapState } from "vuex";

export default {
  data() {
    return {
      profilePictureHasImage: false,
      companyHasImage: false,
      userSignatureHasImage: false,
      // currentProfilePicture: this.storedUserDetails.profilePicture.url,
      currentUserSignature: null,
      currentUserSignature2:
        "https://res.cloudinary.com/djw3g8meb/image/upload/v1593362478/l1iuhsgon30pphxujtlh.jpg",
      image: null,
      clearable: false,
      cloudName: process.env.VUE_APP_cloudinary_cloudName,
      cloudSigPath: process.env.VUE_APP_cloudinary_sigPath,
      companyLogoLoading: false,
      updateProfileLoader: false,
      uploadSignatureLoader: false,
      previewCompanyLogo: null,
      previewUserSignature: null,
      isSrofilePictureSet: false,
      isProfilePictureSetDATA:
        "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png",
      fetchProfilePictureFromServer:
        "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png",
      newSelectedProfilePicture: null,
      profilePicture: null,
      profilePictureDATA: {},
      userSignatureDATA: {},
      profilePictureCloudinaryData: null,
      companyLogo: null,
      userSignature: null,
      companyLogoDATA: {},
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
      // image: "",
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
        passwordMatch: value =>
          value === this.password || "Password must match",
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
      },
      oldPassword: "",
      password: "",
      confirmPassword: "",
      updatePasswordLoader: false,
      DisableUpdatePassword: false
    };
  },
  methods: {
    // Profile image
    setProfileImage: function(output) {
      this.profilePictureHasImage = true;
      this.profilePicture = output.dataUrl;
      this.image = output;
      console.log("data", output.dataUrl);
      console.log("Info", output.info);
      console.log("Exif", output.exif);
    },
    uploadProfilePicture() {
      this.updateProfileLoader = true;

      if (this.profilePicture == null) {
        this.updateProfileLoader = false;
        return alert("Break");
      }
      console.log("Continue");

      axios
        .post("https://api.cloudinary.com/v1_1/" + this.cloudName + "/upload", {
          tags: "user avatar",
          file: this.profilePicture,
          upload_preset: this.cloudSigPath
        })
        .then(response => {
          this.profilePictureDATA.url = response.data.secure_url;
          this.profilePictureDATA.createdAt = response.data.created_at;
          this.profilePictureDATA.id = response.data.public_id;
          console.log(response.data);
          console.log(response.data.secure_url);
          console.log(response.status);
          console.log(response.headers);

          // Upload RESPONSE to server
          this.sendProfilePictureToServer();
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
          this.updateProfileLoader = false;
        });
    },
    sendProfilePictureToServer() {
      console.log("profilePictureDATA", this.profilePictureDATA);
      axios
        .put(
          "/api/v1/user/update",
          { profilePicture: this.profilePictureDATA },
          {
            headers: {
              Authorization: this.$store.state.token,
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          console.log("Profile Picture successfully sent to server!");
          console.log({ response });
          
          this.updatedSnackbar.active = true;
          this.updatedSnackbar.text = "Profile Picture successfully updated";
          this.updatedSnackbar.color = "success";

          this.updateProfileLoader = false;
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

    // COMPANY LOGO UPLOAD
    setCompanyLogo: function(output) {
      this.companyHasImage = true;
      this.companyLogo = output.dataUrl;
      this.image = output;
      console.log("data", output.dataUrl);
      console.log("Info", output.info);
      console.log("Exif", output.exif);
    },
    uploadCompanyLogo() {
      this.companyLogoLoading = true;
      if (this.companyLogo == null) {
        this.companyLogoLoading = false;
        return alert("Break");
      }
      console.log("Continue");

      axios
        .post("https://api.cloudinary.com/v1_1/" + this.cloudName + "/upload", {
          tags: "company logo",
          file: this.companyLogo,
          upload_preset: this.cloudSigPath
        })
        .then(response => {
          this.companyLogoDATA.url = response.data.secure_url;
          this.companyLogoDATA.createdAt = response.data.created_at;
          this.companyLogoDATA.id = response.data.public_id;
          console.log(response.data);
          console.log(response.data.secure_url);
          console.log(response.status);
          console.log(response.headers);

          // Upload RESPONSE to server
          this.sendCompanyLogoToServer();
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
          this.companyLogoLoading = false;
        });
    },
    sendCompanyLogoToServer() {
      console.log("profilePictureDATA", this.profilePictureDATA);
      axios
        .put(
          "/api/v1/user/update",
          { companyLogo: this.companyLogoDATA },
          {
            headers: {
              Authorization: this.$store.state.token,
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          console.log("Company Logo successfully sent to server!");
          console.log({ response });

          this.updatedSnackbar.active = true;
          this.updatedSnackbar.text = "Company Logo successfully updated";
          this.updatedSnackbar.color = "success";

          this.companyLogoLoading = false;
        })
        .catch(error => {
          console.log({ error });
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.status);

          this.updatedSnackbar.active = true;
          this.updatedSnackbar.text = "Oops! An error occured";
          this.updatedSnackbar.color = "error";

          this.companyLogoLoading = false;
        });
    },

    // User Signature
    setUserSignature: function(output) {
      this.userSignatureHasImage = true;
      this.userSignature = output.dataUrl;
      // this.swapSignatures();
      this.image = output;
      console.log("data", output.dataUrl);
      console.log("Info", output.info);
      console.log("Exif", output.exif);
    },
    uploadUserSignature() {
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

          this.updatedSnackbar.active = true;
          this.updatedSnackbar.text = "Signature successfully updated";
          this.updatedSnackbar.color = "success";
          
          this.uploadSignatureLoader = false;
           return response;

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
    },
    showStoredUserDetails() {
      let newObj = JSON.parse(JSON.stringify(this.storedUserDetails));
      console.log(newObj);
      console.log(this.storedUserDetails);
    },
    updatePassword() {
      if (this.$refs.updatePasswordForm.validate()) {
        this.updatePasswordLoader = true;
        this.DisableUpdatePassword = true;

        axios
        .post(
          "/api/v1/changepassword",
          {
            oldPassword: this.oldPassword,
            password: this.password,
            confirmPassword: this.confirmPassword
          },
          { headers: { Authorization: this.$store.state.token } }
        )
          .then(response => {
            this.updatedSnackbar.active = true;
            this.updatedSnackbar.text = response.data.message;
            this.updatedSnackbar.color = "success";

            this.updatePasswordLoader = false;
            this.DisableUpdatePassword = false;

            console.log(response);
            console.log(response.data);
            console.log(response.status);
          })
          .catch(error => {
            this.updatedSnackbar.active = true;
            this.updatedSnackbar.text = "error.response.data.message";
            this.updatedSnackbar.color = "error";

            this.updatePasswordLoader = false;
            this.DisableUpdatePassword = false;

            console.log(error);
            console.log(error.response);
            console.log(error.response.data);
            console.log(error.response.status);
          });
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
    ...mapState([
      "storedUserDetails",
      "profileUpdated",
      "successMessage",
      "storedUserSignature",
      "storedUserProfilePicture",
      "storedcompanyLogo"
    ]),
    // currentProfilePicture() {
    //   let currentProfilePicture = this.storedUserDetails.profilePicture.url;
    //   console.log(currentProfilePicture);
    //   return currentProfilePicture;
    // }
    getUserSignature() {
      let url = this.storedUserSignature;
      return url;
    },
    fullName: {
      // getter
      get: function() {
        let url = this.storedUserSignature;
        return url;
      },
      // setter
      set: function(newImage) {
        var newUpload = newImage;
        return newUpload;
      }
    }
  },
  watch: {
    newSelectedProfilePicture(val) {
      if (val.length > 1) {
        $(".changeImageDecoyWrapper");
        $(".changeImageDecoyWrapper").hide();

        this.isProfilePictureSetDATA = this.newSelectedProfilePicture;
      }
    },
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
    this.$store.dispatch("getUserDetails").then(() => {
      // alert(this.storedUserDetails);
    });
  },
  mounted() {
    // this.currentUserSignature = this.storedUserDetails.signature.url
    // console.log(this.currentUserSignature)
    console.log(this.storedUserDetails);
    // this.currentUserSignature = this.storedUserSignature;

    // this.showStoredUserDetails();
    // console.log(this.currentProfilePicture);
    // if (
    //   this.currentProfilePicture === undefined ||
    //   this.currentProfilePicture.length <= 1
    // ) {
    //   console.log("profilePicture is null");
    // } else {
    //   console.log(this.currentProfilePicture);
    // }
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer
    // VImageInput
  }
};
</script>

<style scoped>
.avatar {
  border-radius: 100px;
}

.serverAvatar {
  /* position: relative; */
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  transition: ease-in-out;
}

/* ============= */
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
#previewCompanyLogo {
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
#avatar {
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: rgba(205, 203, 203, 0.6);
  background-image: url(../../assets/user.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#no-signature {
  text-align: center;
  display: block;
  height: 100%;
  width: 100%;
}
</style>
