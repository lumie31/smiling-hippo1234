<template>
  <div class="dashboard editDocument createEditDocument page back-page">
    <back-nav></back-nav>
    <div class="bodyWrapper">
      <v-container v-if="!dataReady">
        <v-row>
          <v-col cols="12" sm="12" class="legalbox-wrapper d-flex align-center">
            <img
              src="@/assets/general-icon.png"
              class="legalbox-icons"
              width="40"
            />
            <h2 class="display-1 ml-4">{{ documentData.legalboxParent }}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            style="padding-left: 60px;"
            class="legalbox-wrapper"
          >
            <h2 class="headline">{{ documentData.category }}</h2>
            <v-text-field
              label="Document Title"
              class="mt-4"
              v-model="documentData.title"
              ref="newTitle"
              outlined
              hint="Add or Change the title of this document"
              prepend-icon="insert_drive_file"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <!-- <pre class="testFloat">
        {{ documentData }}
      </pre> -->
      <v-container fluid class="docParent pb-12">
        <p class="text-center mt-10" v-if="dataReady">
          Loading.....
          <v-text-field
            style="width: 40%; margin: 0 auto;"
            color="success"
            loading
            disabled
          ></v-text-field>
        </p>

        <v-container v-if="!dataReady">
          {{ documentData }}
          <div v-if="!subOfGeneralActive">
            <v-container>
              <v-row style="width: 50%; margin: 0 auto;">
                <v-col sm="12">
                  <div class="formSectionTitle">EXECUTED</div>
                  <div class="text-center">
                    This contract was made and executed on
                  </div>
                  <v-menu
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="newExecutedDate"
                        ref="executedDate"
                        hint="YYYY/MM/DD"
                        persistent-hint
                        prepend-icon="event"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="formOutput.executedDate"
                      @change="changeValue"
                      ref="executedDatePicked"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div class="formSectionTitle">BACKGROUND</div>
                  <div class="formSectionSubtitle">
                    <p>
                      {{ documentData.docContent.background }}
                    </p>
                  </div>
                </v-col>
              </v-row>
              <v-row style="width: 80%; margin: 0 auto;">
                <v-col cols="12">
                  <div class="formSectionTitle">PARTIES</div>
                </v-col>
                <v-col cols="6">
                  <v-textarea
                    min-height="110"
                    outlined
                    background-color="white"
                    v-model="documentData.docContent.parties.firstParty"
                    ref="firstParty"
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-textarea
                    min-height="110"
                    outlined
                    background-color="white"
                    v-model="documentData.docContent.parties.secondParty"
                    ref="secondParty"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row style="width: 80%; margin: 0 auto;">
                <v-col cols="6">
                  <div class="formSectionTitle">Duration</div>
                  <div
                    class="d-flex align-center justify-center"
                    style="width: 50%; margin: 0 auto;"
                  >
                    <v-select
                      style="width: 5%; margin: 0 auto; border-radius: 10px"
                      class="white pt-2 pl-4 mr-4"
                      v-model="documentData.docContent.duration.durationNumber"
                      ref="durationNumber"
                      :items="number"
                      item-text="name"
                      autocomplete
                      offset-y
                    ></v-select>
                    <v-select
                      style="width: 10%; margin: 0 auto; border-radius: 10px;"
                      class="white pl-2"
                      :value="contractDuration[1]"
                      :items="contractDuration"
                      v-model="
                        documentData.docContent.duration.contractDuration
                      "
                      ref="contractDuration"
                      item-text="name"
                      autocomplete
                      offset-y
                    ></v-select>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="formSectionTitle">Purpose</div>
                  <v-textarea
                    min-height="110"
                    outlined
                    background-color="white"
                    v-model="documentData.docContent.purpose"
                    ref="purpose"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row style="width: 40%; margin: 0 auto;">
                <v-col cols="12" sm="12">
                  <div class="formSectionTitle">
                    Payment Details
                    <span class="text-capitalize">(Optional)</span>
                  </div>
                  <div class="formSectionSubtitle transparent">
                    <p class="text-center">Payment Due</p>
                  </div>
                  <v-text-field
                    solo
                    flat
                    v-model="documentData.docContent.payment.due"
                    ref="due"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row
                style="width: 80%; margin: 0 auto;"
                v-for="(due, index) in duplicatedDuesHOLDER"
                :key="index"
              >
                <v-col cols="12" sm="4">
                  <div class="formSectionSubtitle transparent">
                    <p class="text-left">Next Payment Due</p>
                  </div>
                  <div style="width: 80%;">
                    <v-text-field
                      solo
                      flat
                      ref="nextDue"
                      v-model="due.nextDue"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="5">
                  <div class="formSectionSubtitle transparent">
                    <p class="text-left">Next Payment Due by:</p>
                  </div>
                  <v-menu
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :label="due.nextDueBy"
                        :value="due.nextDueBy"
                        autocomplete="off"
                        hint="YYYY/MM/DD"
                        persistent-hint
                        prepend-icon="event"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="nextDueBy"
                      v-model="due.nextDueBy"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="3" class="d-flex align-center justify-end">
                  <span class="addRemoveButtons" @click="addDues">
                    +
                  </span>
                  <span class="mx-2"></span>
                  <span class="addRemoveButtons" @click="removeDues(index)">
                    -
                  </span>
                </v-col>
              </v-row>
            </v-container>
            <v-container fluid paraClauseHolder>
              <v-row>
                <v-col cols="12">
                  <div class="formSectionTitle">CONFIDENTIAL INFORMATION</div>
                  <div class="docParagraph paragraphList">
                    <p>
                      {{ documentData.docContent.confidentialInformation }}
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <v-container fluid paraClauseHolder>
              <v-row>
                <v-col cols="12">
                  <div class="formSectionTitle">Non-Disclosure</div>
                  <br />
                  <div
                    class="docParagraph d-flex align-center"
                    v-for="(item, index) in paragraphList"
                    :key="index"
                  >
                    <v-checkbox
                      class="text-center paraCheck"
                      color="accent"
                      :value="item"
                      v-model="selectedParagraphs"
                      hide-details
                    ></v-checkbox>
                    <div class="paragraphList">
                      <p>{{ item.paragraph }}</p>
                      <span class="addCTA">
                        <v-icon size="30">info</v-icon>
                        <span class="mx-2"></span>
                        <v-icon size="30">comment</v-icon>
                        <span class="mx-2"></span>
                      </span>
                    </div>
                  </div>
                  <p class="addRemoveButtons">
                    <span @click="addNewParagraph()">+</span>
                  </p>
                  <template>
                    <div class="text-center">
                      <v-dialog v-model="ownParagraph" width="500">
                        <template v-slot:activator="{ on }">
                          <v-btn
                            class="mx-2"
                            fab
                            dark
                            color="secondary"
                            v-on="on"
                          >
                            <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="headline secondary white--text">
                            Add Paragraph
                          </v-card-title>

                          <v-card-text>
                            <v-textarea
                              class="mt-8"
                              auto-grow=""
                              label="Custom Paragraph"
                              hint="Add your own custom paragraph"
                              min-height="110"
                              outlined
                              ref=""
                            ></v-textarea>
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="ownParagraph = false"
                            >
                              I accept
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
                  </template>
                </v-col>
              </v-row>
            </v-container>
            <v-container fluid paraClauseHolder>
              <v-row>
                <v-col cols="12" sm="12">
                  <div class="formSectionTitle">CLAUSES</div>
                  <div
                    class="docParagraph d-flex align-center"
                    v-for="(clause, index) in clauseList"
                    :key="index"
                  >
                    <p>
                      <v-checkbox
                        class="clauseParagraphListing paraCheck"
                        color="accent"
                        v-model="selectedClauses"
                        :value="clause"
                        hide-details
                      ></v-checkbox>
                    </p>
                    <div class="paragraphList">
                      <p>{{ clause.title }}</p>
                      <p>{{ clause.details }}</p>
                      <span class="addCTA">
                        <v-icon size="30">info</v-icon>
                        <span class="mx-2"></span>
                        <v-icon size="30">comment</v-icon>
                        <span class="mx-2"></span>
                      </span>
                    </div>
                  </div>
                  <p class="addRemoveButtons">
                    <span @click="addNewClause()">+</span>
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div v-if="!subOfGeneralActive">
            <v-container fluid class="docParent pb-12">
              <v-container>
                <v-form id="myForm" @click.prevent>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <!-- {{ formOutput.formDupper }} -->
                      <div class="mb-4">
                        Short Description of Project/Job/Sale
                      </div>
                      <v-textarea
                        outlined
                        background-color="white"
                        v-model="documentData.docContent.projectDescription"
                        ref="projectDescription"
                      ></v-textarea>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="6">
                      <div class="mb-4">Customer Details</div>
                      <v-text-field
                        outlined
                        background-color="white"
                        label="Name"
                        v-model="
                          documentData.docContent.customerDetails.customerName
                        "
                      ></v-text-field>
                      <v-text-field
                        outlined
                        background-color="white"
                        label="Email Address"
                        v-model="
                          documentData.docContent.customerDetails.customerEmail
                        "
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
                        :value="documentData._id"
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
                            :value="documentData.docContent.invoiceDate"
                            autocomplete="off"
                            hint="YYYY/MM/DD format"
                            persistent-hint
                            prepend-icon="event"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="documentData.docContent.invoiceDate"
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
                            :value="documentData.docContent.paymentDue"
                            hint="YYYY/MM/DD format"
                            persistent-hint
                            prepend-icon="event"
                            autocomplete="off"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="documentData.docContent.paymentDue"
                          no-title
                          @input="menu1 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>

                  <hr class="my-12" />
                  <v-row
                    class="invoiceReceiptFigures"
                    v-for="(inputRows, index) in priceBreakdown"
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
                      <div
                        class="d-flex align-start justify-center flex-column"
                      >
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
                      <v-btn
                        color="accent"
                        @click="removeduplicateInputs(index)"
                      >
                        <v-icon dark>mdi-minus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>

                  <!-- ================================ -->
                  <div v-if="isSubOfCategoryGeneral">
                    HELLO {{ isSubOfCategoryGeneral }}
                  </div>
                  <div v-if="checked">HELLO2 {{ isSubOfCategoryGeneral }}</div>

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
              </v-container>
            </v-container>
          </div>
          <append-signature></append-signature>
          <v-row>
            <v-col cols="12" sm="12" class="d-flex justify-center">
              <v-btn large class="accent submit-document" @click="saveDocument">
                Save and Continue
              </v-btn>
              <v-btn
                large
                class="accent submit-document"
                style="top: 50%;"
                @click="saveDocument"
              >
                Save and Send
              </v-btn>
            </v-col>
          </v-row>
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
import Append_Signature from "@/components/append-signature";

import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      checked: true,
      id: this.$route.params.id,
      documentData: {},
      subOfCategoryGeneral: null,
      isSubOfCategoryGeneral: true,
      priceBreakdown: [],
      newExecutedDate: null,
      dataReady: true,
      status: null,
      subOfGeneralActive: true,
      ownParagraph: "",
      selectedParagraphs: [],
      selectedClauses: [],
      duplicatedDuesHOLDER: [],
      paragraphList: null,
      clauseList: [],
      formOutput: {
        title: "",
        isSigned: false,
        executedDate: "",
        parties: {
          firstParty: "",
          secondParty: ""
        },
        duration: {
          durationNumber: "",
          contractDuration: ""
        },
        purpose: "",
        payment: {
          due: "",
          duplicatedDues: [
            {
              nextDue: "",
              nextDueBy: ""
            }
          ]
        }
      },
      invoiceReceiptFormOutput: {
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
      contractDuration: ["day(s)", "week(s)", "year(s)"],
      number: this.defineNumber()
    };
  },

  methods: {
    changeValue() {
      this.newExecutedDate = this.formOutput.executedDate;
    },
    saveDocument() {
      // Define Form
      const docData = {};
      let newFormData = JSON.parse(JSON.stringify(this.formOutput));
      let newInvoiceReceiptFormOutput = JSON.parse(
        JSON.stringify(this.invoiceReceiptFormOutput)
      );
      let subOfCategoryGeneral = this.subOfCategoryGeneral;

      if (
        // If its typeof Invoice
        subOfCategoryGeneral == "invoice" ||
        subOfCategoryGeneral == "receipt"
      ) {
        console.log(newInvoiceReceiptFormOutput);
        newInvoiceReceiptFormOutput = this.documentData;

        // Append Document Content
        docData.docContent = newInvoiceReceiptFormOutput;
      } else if (
        // If its NOT typeof Invoice
        subOfCategoryGeneral != "invoice" ||
        subOfCategoryGeneral != "receipt"
      ) {
        // Append compilation to form
        newFormData.title = this.$refs["newTitle"].value;
        newFormData.executedDate = this.newExecutedDate;
        newFormData.background = this.documentData.docContent.background;
        newFormData.parties.firstParty = this.$refs["firstParty"].value;
        newFormData.parties.secondParty = this.$refs["secondParty"].value;
        newFormData.duration.durationNumber = this.$refs[
          "durationNumber"
        ].value;
        newFormData.duration.contractDuration = this.$refs[
          "contractDuration"
        ].value;
        newFormData.purpose = this.$refs["purpose"].value;
        newFormData.due = this.$refs["due"].value;
        newFormData.payment.duplicatedDues = this.duplicatedDuesHOLDER;
        newFormData.isSigned = false;
        newFormData.paragraph = this.selectedParagraphs;
        newFormData.clause = this.selectedClauses;

        // Append Document Content
        docData.docContent = newFormData;
      }

      // console.log("Before Submission", newFormData);
      // console.log(newFormData);
      console.log(newInvoiceReceiptFormOutput);

      // Append Status of Document
      docData.status = "draft";

      console.log(docData);

      // Append other document metadatas
      console.log("======================");

      // axios
      //   .put("/api/v1/doc/" + this.id, docData, {
      //     headers: { Authorization: this.$store.state.token }
      //   })
      //   .then(response => {
      //     console.log(response.data.docs);
      //     console.log(response.data);
      //     console.log(response.status);
      //     console.log(response.headers);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     console.log(error.response);
      //     console.log(error.response.data);
      //     console.log(error.response.status);
      //   });
      // End of logics, submission happens now

      // TEMP
      // let docDataTEMP = { subOfCategoryGeneral: "invoice" };
      // axios
      //   .put("/api/v1/doc/" + this.id, docDataTEMP, {
      //     headers: { Authorization: this.$store.state.token }
      //   })
      //   .then(response => {
      //     console.log(response.data.docs);
      //     console.log(response.data);
      //     console.log(response.status);
      //     console.log(response.headers);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     console.log(error.response);
      //     console.log(error.response.data);
      //     console.log(error.response.status);
      //   });
    },
    duplicateInputs() {
      this.priceBreakdown.push({
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
      if (this.priceBreakdown.length > 1) {
        this.priceBreakdown.splice(index, 1);
      }
    },
    addDues() {
      this.duplicatedDuesHOLDER.push({
        nextDue: "",
        nextDueBy: ""
      });
      console.log("Dup Dues", this.duplicatedDuesHOLDER.length);
      console.log("Dup Dues", this.duplicatedDuesHOLDER);
    },
    removeDues(index) {
      this.duplicatedDuesHOLDER.splice(index, 1);

      console.log("Dup Dues", this.duplicatedDuesHOLDER.length);
      console.log("Dup Dues", this.duplicatedDuesHOLDER);
    },
    defineNumber: function() {
      var number = [...Array(31).keys()];
      number.shift();
      return number;
    },
    addNewParagraph() {
      let addOwnParagraph = prompt("Add your own paragraph");
      console.log(addOwnParagraph);
      if (addOwnParagraph.length > 0) {
        this.paragraphList.push({
          paragraph: addOwnParagraph,
          info: "",
          comment: ""
        });
        console.log(this.paragraphList);
      }
    },
    // removeParagraph(index) {
    //   // if(this.paragraphList.length !=0)
    //   // this.$delete(this.paragraphList, index);
    //   this.paragraphList.splice(index, 1);
    //   console.log(this.paragraphList);
    // },
    addNewClause() {
      let addOwnClauseTitle = prompt("Add your Clause Title");
      if (addOwnClauseTitle) {
        let addOwnClauseDetails = prompt("Add your Clause Details");
        if (addOwnClauseDetails) {
          this.clauseList.push({
            title: addOwnClauseTitle,
            details: addOwnClauseDetails,
            info: "",
            comment: ""
          });
        } else if (!addOwnClauseDetails) {
          alert("Title Can not be empty");
        }

        console.log(this.clauseList);
      } else if (!addOwnClauseTitle) {
        alert("Details Can not be empty");
      }
    }
    // removeClause(index) {
    //   // if(this.paragraphList.length !=0)
    //   // this.$delete(this.paragraphList, index);
    //   this.clauseList.splice(index, 1);
    //   console.log("i am" + this.clauseList.index);
    // }
  },
  created() {
    axios
      .get("/api/v1/doc/" + this.id, {
        headers: { Authorization: this.$store.state.token }
      })
      .then(response => {
        this.documentData = response.data.docs;
        console.log(this.documentData);

        let subOfCategoryGeneral = this.documentData.subOfCategory;
        this.subOfCategoryGeneral = subOfCategoryGeneral;
        this.dataReady = false;

        if (
          // If its typeof Invoice
          subOfCategoryGeneral == "invoice" ||
          subOfCategoryGeneral == "receipt"
        ) {
          // this.subOfGeneralActive = true;
          console.log(subOfCategoryGeneral);

          this.isSubOfCategoryGeneral = false;
          this.priceBreakdown = this.documentData.docContent.priceBreakdown;
        } else if (
          // If its NOT typeof Invoice
          subOfCategoryGeneral != "invoice" ||
          subOfCategoryGeneral != "receipt"
        ) {
          this.newExecutedDate = this.documentData.docContent.executedDate;
          this.paragraphList = this.documentData.docContent.paragraph;
          this.selectedParagraphs = this.paragraphList;
          this.clauseList = this.documentData.docContent.clause;
          this.selectedClauses = this.clauseList;
          this.duplicatedDuesHOLDER = this.documentData.docContent.payment.duplicatedDues;
          console.log("duplicatedDuesHOLDER", this.duplicatedDuesHOLDER);
        }

        console.log("documentData", this.documentData);
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.headers);
      })
      .catch(error => {
        // if (error.response.status == 400) {
        //   this.$router.push("/my-documents");
        // }
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
      });
  },
  mounted() {
    this.paragraphList = this.$store.state.general.nonDisclosureParagraphs;
    this.clauseList = this.$store.state.general.nonDisclosureClauseList;
    // console.log(this.fetchOwnBackgroundDetails);
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer,
    "products-footer": Products_Footer,
    // "v-runtime-template": VRuntimeTemplate
    "append-signature": Append_Signature
  },
  watch: {},
  computed: {
    ...mapState(["storedUserDetails"])
  }
};
</script>
