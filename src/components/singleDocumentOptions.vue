<template>
  <div class="dashboard page docMore back-page">
    <back-nav></back-nav>
    <!-- <pre class="testFloat">{{ storedUserDetails.documents }}</pre> -->

    <div class="bodyWrapper">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" class="legalbox-wrapper d-flex align-center">
            <img src="@/assets/my-doc-icon.png" width="50" />
            <h2 class="display-3 mt-4 pl-4 text-capitalize">
              {{ documentData.title }}
            </h2>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid class="wideGrey py-12">
        <v-container v-if="dataReady">
          <v-row v-if="!subOfGeneralActive">
            <v-col cols="9" class="gutterChildColumn">
              <div class="gutterChild">
                <div class="ml-12 mb-10 pl-12 text-uppercase">
                  Status: {{ documentData.status }}
                </div>
                <div class="docMoreDocData">
                  <div class="docMoreHero">
                    <p class="display-1 mb-n2">{{ documentData.category }}</p>
                    <p class="mt-0">
                      between
                      <b>{{ documentData.docContent.parties.firstParty }}</b>
                      and
                      <b>{{
                        documentData.docContent.parties.secondParty + "."
                      }}</b>
                    </p>
                  </div>
                  <div class="docMoreBody">
                    <p>This contract was executed on {{ documentData.date }}</p>
                    <p class="headline mb-0">Background</p>
                    <p>
                      {{ documentData.docContent.background }}
                    </p>
                    <v-row>
                      <v-col cols="12" class="mb-n12">
                        <p class="headline">Parties</p>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          label="First Party"
                          disabled
                          :value="documentData.docContent.parties.firstParty"
                          class="mt-4"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <span style="mar"></span>
                      <v-col cols="6">
                        <v-text-field
                          label="Second Party"
                          disabled
                          :value="documentData.docContent.parties.secondParty"
                          class="mt-4"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <p class="headline">Duration</p>
                        <p>
                          {{ documentData.docContent.duration.durationNumber }}
                          {{
                            documentData.docContent.duration.contractDuration
                          }}
                        </p>
                      </v-col>
                      <v-col cols="6">
                        <p class="headline">Payment</p>
                        <p class="mb-0">
                          {{ documentData.docContent.payment.due }}
                        </p>
                        <p>Due: 12th October</p>
                        <p class="mb-0">
                          {{ documentData.docContent.payment.nextDue }}
                        </p>
                        <p>Due: 24th October</p>
                      </v-col>
                    </v-row>
                    <div class="paraClausesWrapper">
                      <div class="mb-12">
                        <p class="headline mb-0">Purpose</p>
                        <p>
                          {{ documentData.docContent.purpose }}
                        </p>
                      </div>
                      <div class="mb-12">
                        <p class="headline mb-0">Confidential Information</p>
                        <p>
                          {{ documentData.docContent.confidentialInformation }}
                        </p>
                      </div>
                      <div class="clauses mb-12">
                        <p class="headline mb-0">Non-Disclosures</p>
                        <p
                          class="text-justify"
                          v-for="(paragraph, index) in documentData.docContent
                            .paragraph"
                          :key="index"
                        >
                          {{ paragraph.paragraph }}
                        </p>
                      </div>
                      <div class="paragraphs mb-12">
                        <p class="headline mb-0">Clauses</p>
                        <div
                          v-for="(clause, index) in documentData.docContent
                            .clause"
                          :key="index"
                        >
                          <span class="title">{{ clause.title }}</span>
                          <p class="text-justify">
                            {{ clause.details }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bottomBG"></div>
                </div>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="gutterChild">
                <div class="d-flex align-start justify-center mb-n1">
                  <p>Mark as Paid:</p>
                  <v-checkbox
                    class="text-center noSpaceCheckbox"
                    color="accent"
                    value="paragraph"
                  ></v-checkbox>
                </div>
                <div class="docMoreDocData">
                  <div class="metaActions">
                    <div
                      class="metaChild"
                      v-if="documentData.docContent.payment.due.length > 0"
                    >
                      <p class="headline">Payment Option</p>
                      <p class="headline">
                        {{ documentData.docContent.payment.due }} YCEE
                      </p>
                      <div class="d-flex align-center">
                        <input
                          type="radio"
                          name="paymentOption"
                          value="Digital"
                          label="Non"
                        />
                        <span class="ml-2 mr-12">Digital</span>
                      </div>
                      <div class="d-flex align-center">
                        <input
                          type="radio"
                          name="paymentOption"
                          value="Bank Transfer"
                        />
                        <span class="ml-2 mr-12">Bank Transfer</span>
                      </div>
                      <div class="d-flex align-center">
                        <input
                          type="radio"
                          name="paymentOption"
                          value="Bank Transfer"
                        />
                        <span class="ml-2 mr-12">Any of the above</span>
                      </div>
                    </div>

                    <div
                      v-if="documentData.status === 'draft'"
                      class="metaChild"
                    >
                      <p class="caption">
                        Share with parties to append their read through and
                        signatures
                      </p>
                      <v-btn x-large outlined color="#1CA092">Share</v-btn>
                    </div>
                    <div
                      v-if="documentData.status === 'draft'"
                      class="metaChild"
                    >
                      <p class="caption">
                        Make corrections and changes to this document
                      </p>
                      <v-btn x-large outlined color="#1CA092">Edit</v-btn>
                    </div>

                    <div
                      class="metaChild"
                      v-if="documentData.status === 'overdue'"
                    >
                      <p class="caption">
                        Send again to the second party to serve as a reminder or
                        as a request
                      </p>
                      <v-btn x-large outlined color="#1CA092">Resend</v-btn>
                    </div>
                    <div class="metaChild">
                      <p class="caption">
                        Create new contract or any other document
                      </p>
                      <v-btn to="/dashboard" x-large outlined color="#1CA092">
                        Create New
                      </v-btn>
                    </div>
                    <div
                      v-if="!(documentData.status === 'draft')"
                      class="metaChild"
                    >
                      <p class="caption">
                        Save on your device for offline purposes
                      </p>
                      <v-btn x-large outlined color="#1CA092">Download</v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Invoice and Receipt below -->

          <v-row v-if="subOfGeneralActive">
            <v-col cols="9" class="gutterChildColumn">
              <div class="gutterChild">
                <div class="ml-12 mb-10 pl-12 text-uppercase">
                  Status: {{ documentData.status }}
                </div>
                <div class="docMoreDocData subOfGeneral">
                  <div class="d-flex subOfGeneralTop">
                    <div>
                      <!-- <img src="@/assets/my-doc-icon.png" alt="" /> -->
                      <h1>LOGO</h1>
                    </div>
                    <v-spacer></v-spacer>
                    <div class="user">
                      <p>
                        {{
                          storedUserDetails.firstName +
                            " " +
                            storedUserDetails.lastName
                        }}
                      </p>
                      <p>{{ storedUserDetails.email }}</p>
                    </div>
                  </div>
                  <div class="docMoreHero subOfGeneral">
                    <p class="display-2 mb-2">{{ documentData.category }}</p>
                    <div class="d-flex">
                      <div>
                        <p class="headline">Bill to:</p>
                        <div class="title">
                          {{
                            documentData.docContent.customerDetails.customerName
                          }}
                        </div>
                        <div class="title">
                          {{
                            documentData.docContent.customerDetails
                              .customerEmail
                          }}
                        </div>
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        <p class="my-0">
                          <span class="headline">Invoice No:</span>
                          <span class="title"> {{ documentData._id }}</span>
                        </p>
                        <p class="my-0">
                          <span class="headline">Date of Issue:</span>
                          <span class="title">
                            {{ documentData.docContent.invoiceDate }}</span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="docMoreBody">
                    <table class="subOfGeneralTable">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Unit Cost</th>
                          <th>Qty/Hr</th>
                          <th>Discount</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row, index) in documentData.docContent
                            .priceBreakdown"
                          :key="index"
                        >
                          <td>{{ row.productService }}</td>
                          <td>{{ row.priceRate.priceRate }}</td>
                          <td>{{ row.quantityHour }}</td>
                          <td>{{ row.discount.discount }}</td>
                          <td>{{ row.amount.amount }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="my-5" style="width: 40%; margin: 0px 0 0 auto;">
                      <div class="d-flex">
                        <p class="headline text-right">Sub-Total</p>
                        <!-- <span class="mx-5"></span> -->
                        <v-spacer></v-spacer>
                        <p>XXXXX</p>
                      </div>
                      <div class="d-flex">
                        <p class="headline">Tax</p>
                        <!-- <span class="mx-5" style="width: 10%;"></span> -->
                        <v-spacer></v-spacer>
                        <p>YYYYY</p>
                      </div>
                      <div class="d-flex">
                        <p class="headline">Total</p>
                        <!-- <span class="mx-5 text-right"></span> -->
                        <v-spacer></v-spacer>
                        <p>ZZZZZZ</p>
                      </div>
                    </div>
                    <hr class="mb-5" />
                    <div class="d-flex">
                      <div>
                        <h4>Account Details</h4>
                        <div>Kompilab Inc</div>
                        <div>First City Monument Bank</div>
                        <div>0101234509</div>
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        <p class="my-0">
                          <span class="headline">Amount Due:</span>
                          <span class="title"> {{ documentData._id }}</span>
                        </p>
                        <p class="my-0">
                          <span class="headline">Payment Due:</span>
                          <span class="title"> {{ documentData._id }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="bottomBG"></div>
                </div>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="gutterChild">
                <div class="d-flex align-start justify-center mb-n1">
                  <p>Mark as Paid:</p>
                  <v-checkbox
                    class="text-center noSpaceCheckbox"
                    color="accent"
                    value="paragraph"
                  ></v-checkbox>
                </div>
                <div class="docMoreDocData">
                  <div class="metaActions">
                    <div class="metaChild">
                      <p class="headline">Payment Option</p>
                      <div class="d-flex align-center">
                        <input
                          type="radio"
                          name="paymentOption"
                          value="Digital"
                          label="Non"
                        />
                        <span class="ml-2 mr-12">Digital</span>
                      </div>
                      <div class="d-flex align-center">
                        <input
                          type="radio"
                          name="paymentOption"
                          value="Bank Transfer"
                        />
                        <span class="ml-2 mr-12">Bank Transfer</span>
                      </div>
                      <div class="d-flex align-center">
                        <input
                          type="radio"
                          name="paymentOption"
                          value="Bank Transfer"
                        />
                        <span class="ml-2 mr-12">Any of the above</span>
                      </div>
                    </div>

                    <div class="metaChild">
                      <p class="caption">
                        Send again to the second party to serve as a reminder or
                        as a request
                      </p>
                      <v-btn x-large outlined color="#1CA092">Resend</v-btn>
                    </div>
                    <div class="metaChild">
                      <p class="caption">
                        Make corrections and changes to this document
                      </p>
                      <v-btn x-large outlined color="#1CA092">Edit</v-btn>
                    </div>
                    <div
                      v-if="documentData.status === 'draft'"
                      class="metaChild"
                    >
                      <p class="caption">
                        Share with parties to append their read through and
                        signatures
                      </p>
                      <v-btn x-large outlined color="#1CA092">Share</v-btn>
                    </div>
                    <div class="metaChild">
                      <p class="caption">
                        Create new contract or any other document
                      </p>
                      <v-btn to="/dashboard" x-large outlined color="#1CA092">
                        Create New
                      </v-btn>
                    </div>
                    <div
                      v-if="documentData.status === 'draft'"
                      class="metaChild"
                    >
                      <p class="caption">
                        Save on your device for offline purposes
                      </p>
                      <v-btn x-large outlined color="#1CA092">Download</v-btn>
                    </div>
                  </div>
                </div>
              </div>
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
// import Append_Signature from "@/components/append-signature";

import { mapState } from "vuex";

import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      documentData: {},
      dataReady: false,
      subOfGeneralActive: false
    };
  },
  created() {
    axios
      .get("/api/v1/doc/" + this.id, {
        headers: { Authorization: this.$store.state.token }
      })
      .then(response => {
        this.documentData = response.data.docs;
        this.dataReady = true;

        let subOfCategoryGeneral = this.documentData.subOfCategory;
        if (
          // If its typeof Invoice or receipt
          subOfCategoryGeneral == "invoice" ||
          subOfCategoryGeneral == "receipt"
        ) {
          this.subOfGeneralActive = true;
          console.log(subOfCategoryGeneral);
        }
        console.log(response.data.docs);
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
      });
  },
  watch: {},
  methods: {},
  mounted() {
    console.log(this.storedUserDetails);
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer,
    "products-footer": Products_Footer
    // "v-runtime-template": VRuntimeTemplate
    // "append-signature": Append_Signature
  },
  computed: {
    ...mapState(["storedUserDetails"])
  }
};
</script>

<style scoped>
.subOfGeneralTop {
  border-radius: 20px 20px 0px 0px;
  background: #ffffff;
  padding: 100px;
  padding-top: 40px;
  padding-bottom: 20px;
  overflow: auto;
}
.tempBorder {
  border: 2px solid;
}
.gutterChild {
  padding-bottom: 100px;
}
.gutterChild .bottomBG {
  position: relative;
  background-image: url(../assets/bottomBG-docMore.png);
  background-size: contain;
  background-repeat: repeat-x;
  height: 50px;
  background-color: #ffffff;
}
.gutterChild .bottomBG:after {
  content: "";
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 30px;
  border-radius: 0px 0px 20px 20px;
  background-color: #ffffff;
}
.metaActions {
  background: #ffffff;
  border-radius: 20px;
  padding: 30px 40px;
}
.metaChild:not(:first-child) {
  padding-top: 40px;
}
.metaChild:not(:last-child) {
  padding-bottom: 40px;
  border-bottom: 1px solid;
}
.docMoreHero,
.docMoreBody {
  padding: 20px 100px;
}
.docMoreHero {
  color: #ffffff;
  padding-top: 100px;
  padding-bottom: 40px;
  background-image: url(../assets/hero-bg-docMore.png);
  background-size: 80%;
  background-repeat: repeat;
  background-color: #19647e;
  border-radius: 20px 20px 0px 0px;
  overflow: auto;
}

.docMoreHero.subOfGeneral {
  border-radius: 0px;
}
.docMoreBody {
  background-color: #ffffff;
}

/* Remove uselss default spaces around Checkbox */
.noSpaceCheckbox {
  margin: 0;
  margin-bottom: 20px;
}
.subOfGeneralTable {
  width: 100%;
  border-collapse: collapse;
}
.subOfGeneralTable thead {
  border-bottom: 1px solid grey;
}
.subOfGeneralTable th {
  padding: 10px 20px;
}
.subOfGeneralTable tbody tr:nth-child(even) td {
  background: rgba(227, 226, 226, 0.338);
}
.subOfGeneralTable tbody td {
  padding: 40px;
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>
