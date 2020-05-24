<template>
  <div class="dashboard receiptInvoice page back-page">
    <back-nav></back-nav>
    <div class="bodyWrapper">
      <v-container class="">
        <v-row>
          <v-col cols="12" sm="12" class="legalbox-wrapper d-flex align-center">
            <img
              src="@/assets/general-icon.png"
              class="legalbox-icons"
              width="40"
            />
            <h2 class="display-1 ml-4">{{ parent }}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" class="legalbox-wrapper">
            <h2 class="headline" style="margin-left: 60px;">{{ category }}</h2>
            <v-text-field
              label="Document Title"
              v-model="formOutput.title"
              :rules="[rules.required]"
              autofocus
              required
              class="mt-4"
              outlined
              hint="Add or Change the title of this document"
              prepend-icon="insert_drive_file"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid class="docParent pb-12">
        <v-container>
          <v-form id="myForm" @click.prevent="">
            <v-row>
              <v-col cols="12" sm="6">
                <!-- {{ formOutput.formDupper }} -->
                <div class="mb-4">Short Description of Project/Job/Sale</div>
                <v-textarea
                  outlined
                  background-color="white"
                  v-model="formOutput.projectDescription"
                ></v-textarea>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="6">
                <div class="mb-4">Customer Details</div>
                <v-text-field
                  outlined
                  :rules="[rules.required]"
                  background-color="white"
                  label="Name"
                  v-model="formOutput.customerDetails.customerName"
                ></v-text-field>
                <v-text-field
                  outlined
                  :rules="[rules.required]"
                  background-color="white"
                  label="Email Address"
                  v-model="formOutput.customerDetails.customerEmail"
                ></v-text-field>
              </v-col>
              {{ storedUserDetails }}

              <v-col cols="12" sm="6">
                <div class="mb-4">Your Details</div>
                <v-text-field
                  outlined
                  background-color="white"
                  label="Name"
                  :value="
                    storedUserDetails.firstName +
                      ' ' +
                      storedUserDetails.lastName
                  "
                  disabled
                ></v-text-field>
                <v-text-field
                  outlined
                  background-color="white"
                  label="Email Address"
                  :value="storedUserDetails.email"
                  disabled
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>

              <v-col cols="12" sm="6">
                <div class="mb-4">invoice Number</div>
                <v-text-field
                  outlined
                  background-color="white"
                  label="Name"
                  placeholder="Auto Generated"
                  disabled
                ></v-text-field>

                <div class="mb-4">Invoice Date</div>
                <v-menu
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :label="formOutput.invoiceDate"
                      :value="formOutput.invoiceDate"
                      hint="YYYY/MM/DD format"
                      persistent-hint
                      prepend-icon="event"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="formOutput.invoiceDate"
                    no-title
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>

                <div class="mb-4 mt-12">Payment Due</div>
                <v-menu
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :label="formOutput.paymentDue"
                      :value="formOutput.paymentDue"
                      hint="YYYY/MM/DD format"
                      persistent-hint
                      prepend-icon="event"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="formOutput.paymentDue"
                    no-title
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <hr class="my-12" />
            <pre class="testFloat">{{ formOutput }}</pre>

            <v-row
              class="invoiceFigures"
              v-for="(inputRows, index) in formOutput.priceBreakdown"
              :key="index"
            >
              <v-col cols="2" sm="2">
                <p>Product/Service</p>
                <v-text-field
                  v-model="inputRows.productService"
                  autocomplete="off"
                  class="mt-4"
                  solo
                  flat
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="1" sm="1">
                <p>Qty/Hours</p>
                <v-text-field
                  v-model="inputRows.quantityHour"
                  autocomplete="off"
                  class="mt-4"
                  solo
                  flat
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="2" sm="2">
                <p>Price/Rate</p>
                <v-text-field
                  v-model="inputRows.priceRate.priceRate"
                  autocomplete="off"
                  class="mt-4 mb-2"
                  hide-details
                  solo
                  flat
                  outlined
                ></v-text-field>
                <div class="d-flex align-start justify-center">
                  <label class="overline">
                    <input
                      type="radio"
                      :name="'priceRate' + (index + 1)"
                      value="price"
                      v-model="inputRows.priceRate.priceRateSelection"
                    />
                    Price
                  </label>

                  <span class="mx-2"></span>

                  <label class="overline">
                    <input
                      type="radio"
                      :name="'priceRate' + (index + 1)"
                      value="rate"
                      v-model="inputRows.priceRate.priceRateSelection"
                    />
                    Rate
                  </label>
                </div>
              </v-col>
              <v-col cols="2" sm="2">
                <p>Discount</p>
                <v-text-field
                  v-model="inputRows.discount.discount"
                  autocomplete="off"
                  class="mt-4 mb-2"
                  hide-details
                  solo
                  flat
                  outlined
                ></v-text-field>

                <div class="d-flex align-start justify-center">
                  <label class="overline">
                    <input
                      type="radio"
                      :name="'discount' + (index + 1)"
                      value="percent"
                      v-model="inputRows.discount.discountSelection"
                    />
                    Percent
                  </label>

                  <label class="overline">
                    <input
                      type="radio"
                      :name="'discount' + (index + 1)"
                      value="flatAmount"
                      v-model="inputRows.discount.discountSelection"
                    />
                    Flat Amount
                  </label>
                </div>
              </v-col>
              <v-col cols="1" sm="1">
                <p>Tax</p>
                <v-text-field
                  v-model="inputRows.tax.tax"
                  autocomplete="off"
                  class="mt-4 mb-2"
                  hide-details
                  solo
                  flat
                  outlined
                ></v-text-field>
                <div class="d-flex align-start justify-center flex-column">
                  <label class="overline">
                    <input
                      type="radio"
                      :name="'tax' + (index + 1)"
                      value="vat"
                      v-model="inputRows.tax.taxSelection"
                    />
                    VAT
                  </label>

                  <span class="mx-2"></span>

                  <label class="overline">
                    <input
                      type="radio"
                      :name="'tax' + (index + 1)"
                      value="others"
                      v-model="inputRows.tax.taxSelection"
                    />
                    Others
                  </label>
                </div>
              </v-col>
              <v-col cols="2" sm="2">
                <p>Amount</p>
                <v-text-field
                  v-model="inputRows.amount.amount"
                  autocomplete="off"
                  class="mt-4 mb-2"
                  hide-details
                  solo
                  flat
                  outlined
                ></v-text-field>
                <div class="d-flex align-start justify-center">
                  <label class="overline">
                    <input
                      type="radio"
                      :name="'amount' + (index + 1)"
                      value="naira"
                      v-model="inputRows.amount.amountSelection"
                    />
                    Naira
                  </label>

                  <span class="mx-2"></span>

                  <label class="overline">
                    <input
                      type="radio"
                      :name="'amount' + (index + 1)"
                      value="dollar"
                      v-model="inputRows.amount.amountSelection"
                    />
                    Dollar
                  </label>
                </div>
              </v-col>
              <v-col cols="2" sm="2">
                <p v-if="index < 1" class="mb-6">Duplicate</p>
                <p v-if="index >= 1" :class="{ 'mb-12': index >= 1 }"></p>
                <v-btn
                  color="accent"
                  @click="duplicateInputs()"
                  v-if="index < 1"
                >
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
                <span v-if="index < 1" class="mx-2"></span>
                <v-btn color="accent" @click="removeduplicateInputs(index)">
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <!-- ================================ -->

            <hr />
            <v-row>
              <v-col cols="12" sm="4" class="d-flex display-1 mb-12">
                <div class="mr-7">Total:</div>
                <div><span>&#8358;</span> TOTAL</div>
              </v-col>
            </v-row>
            <hr />

            <v-row>
              <v-col cols="12" sm="12" class="d-flex justify-center">
                <v-btn
                  large
                  class="accent submit-document"
                  @click="submitDocument('continueEdit')"
                >
                  Save and Continue
                </v-btn>
                <v-btn
                  large
                  class="accent submit-document"
                  style="top: 50%;"
                  @click="submitDocument('redirectMe')"
                >
                  Save and Send
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-snackbar
            :color="docSavedSnackbar.color"
            top
            right
            v-model="docSavedSnackbar.active"
            :multi-line="docSavedSnackbar.multiLine"
            :timeout="docSavedSnackbar.timeout"
          >
            {{ docSavedSnackbar.text }}
            <v-btn
              color="secondary"
              text
              @click="docSavedSnackbar.active = false"
            >
              <b>x</b>
            </v-btn>
          </v-snackbar>
        </v-container>
      </v-container>

      <!-- Dashboard footer -->
      <v-container>
        <products-footer></products-footer>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import Back_Navbar from "@/components/back-nav";
import General_Footer from "@/components/footer";
import Products_Footer from "@/components/products-general-footer";
// import VRuntimeTemplate from "v-runtime-template";

import { mapState } from "vuex";

export default {
  data() {
    return {
      category: "Invoice",
      parent: "General",
      status: null,
      subOfCategoryGeneral: "invoice",
      tagName: "invoice",
      andContinueValidator: null, // if andContinue is = to this
      rules: {
        required: value => !!value || "Required."
      },
      formOutput: {
        title: "",
        projectDescription: "",
        customerDetails: {
          customerName: "",
          customerEmail: ""
        },
        invoiceDate: "",
        paymentDue: "",
        priceBreakdown: [
          {
            productService: "",
            quantityHour: "",
            priceRate: {
              priceRate: "",
              priceRateSelection: ""
            },
            discount: {
              discount: "",
              discountSelection: ""
            },
            tax: {
              tax: "",
              taxSelection: ""
            },
            amount: {
              amount: "",
              amountSelection: ""
            }
          }
        ]
      },
      docSavedSnackbar: {
        active: false,
        text: "Something went wrong [-Last Fallback-]",
        multiLine: true,
        color: null,
        timeout: this.$store.state.snackBarDuration
      }
    };
  },
  mounted() {
    console.log(this.redirecttoEditID);
    console.log(this.storedUserDetails);
  },
  methods: {
    duplicateInputs() {
      this.formOutput.priceBreakdown.push({
        productService: "",
        quantityHour: "",
        priceRate: {
          priceRate: "",
          price: "",
          rate: ""
        },
        discount: {
          discount: "",
          percent: "",
          flatRate: ""
        },
        tax: {
          tax: "",
          vat: "",
          others: ""
        },
        amount: {
          amount: "",
          naira: "",
          dollar: ""
        }
      });
    },
    removeduplicateInputs(index) {
      if (this.formOutput.priceBreakdown.length > 1) {
        this.formOutput.priceBreakdown.splice(index, 1);
      }
    },
    // SUBMIT FORM
    submitDocument(andContinue) {
      if (this.formOutput.title.length < 1) {
        return alert("Title Can not be Empty");
      }
      // Define Form
      const docData = {};
      // const docData = {};
      let newFormData = JSON.parse(JSON.stringify(this.formOutput));

      // Append compilation to form
      newFormData.projectDescription = this.formOutput.projectDescription;
      newFormData.customerDetails = this.formOutput.customerDetails;
      newFormData.invoiceDate = this.formOutput.invoiceDate;
      newFormData.paymentDue = this.formOutput.paymentDue;

      console.log("Before Submission", newFormData);
      // Append Document Content
      docData.docContent = newFormData;

      // Append other document metadatas
      // docData.docSummary = this.formOutput.title + " : " + this.category;
      docData.status = "draft";
      docData.title = this.formOutput.title;
      docData.legalboxParent = this.parent;
      docData.category = this.category;
      docData.subOfCategoryGeneral = this.subOfCategoryGeneral;
      console.log(docData);
      // this.andContinueValidator = andContinue;

      this.$store.dispatch("submitDocument", docData).then(() => {
        this.andContinueValidator = andContinue;
        console.log(andContinue);
        console.log(this.redirecttoEditID);

        console.log("andContinue Activated");
        console.log(this.$store.state.redirecttoEditID);
        
      });
      // End of logics, submission done
    }
  },
  watch: {
    redirecttoEditID(val) {
      if (typeof val == "number") {
        console.log("Here");

        this.docSavedSnackbar.active = true;
        this.docSavedSnackbar.text = this.documentSavedMessage.message;
        this.docSavedSnackbar.color = this.documentSavedMessage.color;

        console.log("Re-Route");
        if (this.andContinueValidator === "redirectMe") {
          setTimeout(() => {
            this.$router.push("/docs/more/" + val);
            // console.log("To MORE Page");
          }, this.$store.state.snackBarDuration);
        } else if (this.andContinueValidator === "continueEdit") {
          setTimeout(() => {
            this.$router.push("/docs/edit/" + val);
            // console.log("To EDIT Page");
          }, this.$store.state.snackBarDuration);
        }
        // this.andContinueValidator = val;

        // this.$router.push("/docs/edit/" + val);
      } else {
        this.docSavedSnackbar.active = true;
        this.docSavedSnackbar.text =
          "Oops! Something went wrong. Document might not be saved";
        this.docSavedSnackbar.color = "error";
      }
    },
    isDocumentSaved(val) {
      if (val == true) {
        console.log("Here");

        this.docSavedSnackbar.active = true;
        this.docSavedSnackbar.text = this.documentSavedMessage;
        this.docSavedSnackbar.color = "success";

        console.log("Re-Route");
        if (this.andContinueValidator === "redirectMe") {
          setTimeout(() => {
            // this.$router.push("/docs/more/" + val);
            console.log("To MORE Page");
          }, this.$store.state.snackBarDuration);
        } else if (this.andContinueValidator === "continueEdit") {
          setTimeout(() => {
            // this.$router.push("/docs/edit/" + val);
            console.log("To EDIT Page");
          }, this.$store.state.snackBarDuration);
        }
        // this.andContinueValidator = val;

        // this.$router.push("/docs/edit/" + val);
      } else {
        this.docSavedSnackbar.active = true;
        this.docSavedSnackbar.text =
          "Oops! Something went wrong. Document might not be saved";
        this.docSavedSnackbar.color = "error";
      }
    }
  },
  computed: {
    ...mapState([
      "storedUserDetails",
      "redirecttoEditID",
      "documentSavedMessage",
      "isDocumentSaved"
    ])
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer,
    "products-footer": Products_Footer
    // "v-runtime-template": VRuntimeTemplate
  }
};
</script>
