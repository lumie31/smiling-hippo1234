import Vue from "vue";

<template>
  <div class="TermsOfService page" id="vue-faq">
    <nav-one></nav-one>

    <div class="hero d-flex flex-column justify-center align-center">
      <div id="decoy"></div>
      <h2 class="display-3 secondary--text">Frequently Unasked Questions</h2>
      <v-text-field
        class="mt-7"
        style="width: 70%; margin: 0 auto;"
        solo
        outlined
        flat
        append-icon="search"
        v-model="searchFAQ"
      ></v-text-field>
    </div>

    <div class="bodyWrapper">
      <v-container>
        <v-expansion-panels>
          <v-expansion-panel v-for="faq in filteredFAQResult" :key="faq.index">
            <v-expansion-panel-header class="faq-question">
              {{ faq.question }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-answers">
              {{ faq.answer }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import Navbar from "@/components/Nav-Gen";
import General_Footer from "@/components/footer";

export default {
  data() {
    return {
      message: "Hello Vue.js!",
      searchFAQ: "",
      faqs: [
        {
          question: "What is Legalbox?",
          answer:
            "Legalbox is a legal technology services company providing simple legal solutions and collections for everyday transactions and business."
        },

        {
          question: "What are Legalboxes?",
          answer:
            "They are boxes of simple legal solutions and collections for everyday transactions categorized according to industries. If you are a Basic subscriber, you are entitled to two Legalboxes, and as a Premium subscriber, four Legalboxes. The content of each Legalbox has been tailored to suit the legal needs of the particular industry they are named after."
        },

        {
          question: "How Do Digital Payments Work?",
          answer:
            "After creating a document that requires payment from the other party, you can choose to receive the payment digitally via Legalbox. To do that you have to set up your Merchant profile on your dashboard. Provide the information required, verify your details via your email and you are good to go."
        },

        {
          question:
            "Is there a Transaction fee for payments received on Legalbox?",
          answer:
            "Yes, a very small one. Legalbox does not charge any fee for this. All our payments are processed by Paystack. They charge 1.5% + N100 capped at N2,000 for local transactions. This means you’ll never get charged more than N2,000 per local transaction. For international transactions, you will be charged 3.9% + N100. International cards are charged and settled in Naira by default. Transactions fees do not apply to non-digital payments which we are not responsible for."
        },
        {
          question: "Are my Information and Payment Details Safe?",
          answer:
            "Tout à fait. Absolutely. We use Paystack as our payments processor. They are PCI-DSS-certified and are trusted by over 30,000 Nigerian businesses."
        },

        {
          question: "How Long Will it Take for Me to Receive my Money?",
          answer:
            "For local transactions, Paystack will settle funds into your account on the next working day the transaction is completed (T+1). International transactions take 7 working days after the transaction is completed (T+7) to settle funds into your account."
        },

        {
          question: "Does Legalbox Charge for Digital Payments?",
          answer:
            "No. This is our gift to you. Once you are subscribed to our plans, you are good to go."
        },

        {
          question:
            "Can I Access my Contracts After My Subscription has Expired?",
          answer:
            "Sure! Your contracts are stored safely on our website for as long as you need them to be. However, you cannot download them."
        },

        {
          question: "Are Legalbox’s Contracts Legally Binding?",
          answer:
            "Yes. Online signature has been recognised by Nigerian law, precedence and courts. Every document you sign on our platform is legally binding. We have simplified the language of our contracts so that they are easy to read. They are as binding as contracts written in complex language."
        },

        {
          question: "Is Legalbox a Law Firm?",
          answer:
            "No, we are not. We are your friends, helping you attend to the legal needs you can satisfy yourself, at a cost you can always afford. If you need a lawyer, we are happy to give you a referral and a discount for free."
        },

        {
          question: "Can I Save My Documents and Continue Later?",
          answer:
            "Oui. You can. You can access your incomplete documents in the ‘Drafts’ section."
        }
      ],
      faqQuestions: [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 6"
      ]
    };
  },
  computed: {
    filteredFAQResult() {
      return this.faqs.filter(item => {
        // return item.title
        //   .toLowerCase()
        //   .match(this.searchDocument.toLowerCase());
        if (
          item.question.toLowerCase().indexOf(this.searchFAQ.toLowerCase()) !==
            -1 ||
          item.answer.toLowerCase().indexOf(this.searchFAQ.toLowerCase()) !== -1
        ) {
          return item;
        }
      });
    }
  },
  components: {
    "nav-one": Navbar,
    "general-footer": General_Footer
  }
};
</script>
