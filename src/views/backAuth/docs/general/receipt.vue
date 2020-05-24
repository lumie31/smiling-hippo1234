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
          <v-col cols="12" sm="12" class="legalbox-wrapper">
            
            <h2 class="headline" style="margin-left: 60px;">{{ category }}</h2>
              
            
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
                background-color="white"
                label="Name"
                v-model="formOutput.customerName"
              ></v-text-field>
              <v-text-field
                outlined
                background-color="white"
                label="Email Address"
                v-model="formOutput.customerEmail"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="mb-4">Your Details</div>
              <v-text-field
                outlined
                background-color="white"
                label="Name"
                placeholder="user.fullname"
                disabled
              ></v-text-field>
              <v-text-field
                outlined
                background-color="white"
                label="Email Address"
                placeholder="user.email"
                disabled
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="12" sm="6">
              <div class="mb-4">Receipt Number</div>
              <v-text-field
                outlined
                background-color="white"
                label="Name"
                placeholder="Auto Generated"
                disabled
              ></v-text-field>

              <v-menu
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :label="formOutput.date"
                    :value="formOutput.date"
                    hint="YYYY/MM/DD format"
                    persistent-hint
                    prepend-icon="event"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formOutput.date"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <hr class="my-12" />

          <!-- Receipt Figures -->
          {{ test }}
          <v-row class="receiptFigures">
            <v-col
              cols="12"
              :sm="form.colSize"
              v-for="(form, index) in formSection"
              :key="index"
            >
              <div class="mb-4 receiptFigures-title">{{ form.title }}</div>
              <input
                type="text"
                value="You!"
                :id="form.textId"
                :name="form.textId"
                :ref="form.textId"
              />
              <!-- Radios -->
              <div v-if="form.radioId1 || form.radioId2">
                <div class="d-flex align-center ml-5">
                  <input
                    type="radio"
                    :name="form.textId"
                    :value="form.radioId1"
                    :ref="form.radioId1"
                    checked
                    :id="form.radioId1"
                  />
                  <label :for="form.radioId1" class="overline ml-2 mr-1 mt-2">
                    {{ form.radioId1 }}
                  </label>
                </div>
                <div class="d-flex align-center ml-5">
                  <input
                    type="radio"
                    :name="form.textId"
                    :value="form.radioId2"
                    :ref="form.radioId2"
                    :id="form.radioId2"
                  />
                  <label :for="form.radioId2" class="overline ml-2 mr-3 mt-2">
                    {{ form.radioId2 }}
                  </label>
                </div>
              </div>
            </v-col>

            <v-col cols="12" sm="2">
              <div class="mb-4">Duplicate/Remove</div>
              <v-btn color="accent" @click="duplicateInputs()">
                <b>+</b>
              </v-btn>
              <span class="mx-2"></span>
              <v-btn color="accent" @click="removeDuplicateInputs(index)">
                <b>-</b>
              </v-btn>
            </v-col>
          </v-row>

          <!-- DUPLICATED Receipt Figures -->

          <v-row
            v-for="(form1, parentIndex) in formSectionNew"
            :key="parentIndex"
            class="receiptFigures"
          >
            <!-- {{ formSectionNew }} -->
            <v-col
              cols="12"
              :sm="form.colSize"
              v-for="(form, index) in form1"
              :key="index"
            >
              <!-- {{ form }} -->
              <div class="mb-4 receiptFigures-title">{{ form.title }}</div>
              <input
                v-if="form.title"
                class="receiptFigures-inputs"
                :id="form.textId"
                :name="form.textId"
                :value="form.value"
                :ref="form.textId"
              />
              <v-btn
                v-if="form.type"
                color="accent"
                @click="removeDuplicateInputs(parentIndex)"
              >
                <b>-</b>
              </v-btn>
              <!-- Radios -->
              <div v-if="form.radioId1 || form.radioId2">
                <div class="d-flex align-center ml-5">
                  <input
                    type="radio"
                    :name="form.textId"
                    :value="form.radioId1"
                    :ref="form.radioId1"
                    :id="form.radioId1"
                  />
                  <label :for="form.radioId1" class="overline ml-2 mr-1 mt-2">
                    {{ form.radioId1 }}
                  </label>
                </div>
                <div class="d-flex align-center ml-5">
                  <input
                    type="radio"
                    :name="form.textId"
                    :value="form.radioId2"
                    :ref="form.radioId2"
                    :id="form.radioId2"
                  />
                  <label :for="form.radioId2" class="overline ml-2 mr-3 mt-2">
                    {{ form.radioId2 }}
                  </label>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn large color="secondary">Get Total</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4" class="d-flex">
              <div class="mr-7">Sub-Total:</div>
              <div>
                <span>&#8358;</span> SUBTOTAL
              </div>
            </v-col>
            <v-col cols="12" sm="4" class="d-flex">
              <div class="mr-7">Tax:</div>
              <div>
                <span>&#8358;</span> Total Tax
              </div>
            </v-col>
            <v-col cols="12" sm="4" class="d-flex">
              <div class="mr-7">Discount:</div>
              <div>
                <span>&#8358;</span> Total Discount
              </div>
            </v-col>
          </v-row>
          <hr />
          <v-row>
            <v-col cols="12" sm="4" class="d-flex display-1 mb-12">
              <div class="mr-7">Total:</div>
              <div>
                <span>&#8358;</span> TOTAL
              </div>
            </v-col>
          </v-row>
          <hr />

          <v-row>
            <v-col cols="12" sm="5">
              <h3 class="mb-4">Tax Information</h3>
              <v-textarea solo></v-textarea>
              <v-btn class="accent submit-document" id="submitForm" @click="submit">
                Save Document
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
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

export default {
  data() {
    return {
      category: "Receipt",
      test: this.formSection,
      counter: 2,
      date: "",
      formOutput: {
        projectDescription: "",
        customerName: "",
        customerEmail: "",
        date: "",
        formDupper: [this.receiptValues]
      },
      formSection: [
        { title: "Product/Service", textId: "productService", colSize: 2 },
        { title: "Quantity/Hours", textId: "quantityHour", colSize: 1 },
        {
          title: "Price/Rate",
          textId: "priceRate1",
          radioId1: "price1",
          radioId2: "rate1",
          colSize: 2
        },
        {
          title: "Discount",
          textId: "discount1",
          radioId1: "percent1",
          radioId2: "flat-Amount1",
          colSize: 2
        },
        {
          title: "Tax",
          textId: "tax1",
          radioId1: "vat1",
          radioId2: "others1",
          colSize: 1
        },
        {
          title: "Amount",
          textId: "amount1",
          radioId1: "naira1",
          radioId2: "dollar1",
          colSize: 2
        }
      ],
      formSectionNew: []
    };
  },
  mounted() {},
  methods: {
    duplicateInputs() {
      //
      this.formSectionNew.push([
        {
          title: "Product/Service",
          // type: "text",
          textId: `productService${this.counter}`,
          colSize: 2
        },
        {
          title: "Quantity/Hours",
          textId: `quantityHour${this.counter}`,
          colSize: 1
        },
        {
          title: "Price/Rate",
          // type: "text",
          textId: `priceRate${this.counter}`,
          radioId1: `price${this.counter}`,
          radioId2: `rate${this.counter}`,
          colSize: 2
        },
        {
          title: "Discount",
          // type: "text",
          textId: `discount${this.counter}`,
          radioId1: `percent${this.counter}`,
          radioId2: `flat-Amount${this.counter}`,
          colSize: 2
        },
        {
          title: "Tax",
          // type: "text",
          textId: `tax${this.counter}`,
          radioId1: `vat${this.counter}`,
          radioId2: `others${this.counter}`,
          colSize: 1
        },
        {
          title: "Amount",
          // type: "text",
          textId: `amount${this.counter}`,
          radioId1: `naira${this.counter}`,
          radioId2: `dollar${this.counter}`,
          colSize: 2
        },
        {
          title: "",
          type: "button",
          textId: "",
          value: "",
          click: "",
          colSize: 2
        }
      ]);
      this.counter++;
      console.log("Counter is:" + this.counter);
      console.log(this.formSectionNew);
    },
    removeDuplicateInputs(index) {
      // if(this.formSectionNew.length !=0)
      // this.$delete(this.formSectionNew, index);
      this.formSectionNew.splice(index, 1);
      //
      console.log(this.formSectionNew.index);
    },
    // SUBMIT FORM
    submit() {
      var receiptValues = [];
      for (var key in this.$refs) {
        receiptValues.push(this.$refs[key][0].value);
        // receiptValues[0].value;
        // console.log(receiptValues);
      }

      // while (receiptValues.length) {
      //   console.log(receiptValues.splice(0, 10));
      // }

      console.log(receiptValues);
      console.log(this.formOutput);
      console.log(this.$refs);
      // console.log(Object.keys(this.$refs));
    }
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer,
    "products-footer": Products_Footer
    // "v-runtime-template": VRuntimeTemplate
  }
};
</script>
