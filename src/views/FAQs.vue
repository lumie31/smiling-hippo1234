import Vue from "vue";

<template>
  <div class="TermsOfService page" id="vue-faq">
    <nav-one></nav-one>

    <div class="hero d-flex flex-column justify-center align-center">
      <div id="decoy"></div>
      <h2 class="display-3 secondary--text">Frequently Unasked Questions</h2>
    </div>
    <v-conttainer>
      <v-text-field solo outlined flat append-icon="search"></v-text-field>
    </v-conttainer>

    <div class="bodyWrapper">
      <v-container>
      <v-expansion-panels>
        <v-expansion-panel v-for="faq in faqs" :key="faq.index">
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
      faqs: [
        {
          question: "What is Legalbox?",
          answer:
            "Muktar is a legal technology services company providing simple legal solutions and collections for everyday transactions and business."
        },

        {
          question: "What are Legalboxes?",
          answer:
            "Legalbox is a legal technology services company providing simple legal solutions and collections for everyday transactions and business."
        },

        {
          question: "How Do Digital Payments Work?",
          answer:
            "Legalbox is a legal technology services company providing simple legal solutions and collections for everyday transactions and business."
        },

        {
          question:
            "Is there a Transaction fee for payments received on Legalbox?",
          answer:
            "Legalbox is a legal technology services company providing simple legal solutions and collections for everyday transactions and business."
        },
        {
          question: "Are my Information and Payment Details Safe?",
          answer:
            "Legalbox is a legal technology services company providing simple legal solutions and collections for everyday transactions and business."
        },

        {
          question: "How Long Will it Take for Me to Receive my Money?",
          answer:
            "Legalbox is a legal technology services company providing simple legal solutions and collections for everyday transactions and business."
        },

        {
          question: "Does Legalbox Charge for Digital Payments?",
          answer:
            "Legalbox is a legal technology services company providing simple legal solutions and collections for everyday transactions and business."
        },

        {
          question:
            "Can I Access my Contracts After My Subscription has Expired?",
          answer:
            "Legalbox is a legal technology services company providing simple legal solutions and collections for everyday transactions and business."
        },

        {
          question: "Are Legalbox’s Contracts Legally Binding?",
          answer:
            "Legalbox is a legal technology services company providing simple legal solutions and collections for everyday transactions and business."
        },

        {
          question: "Is Legalbox a Law Firm?",
          answer:
            "No, we are not. We are your friends, helping you attend to the legal needs you can satisfy yourself, at a cost you can always afford. If you need a lawyer, we are happy to give you a referral and a discount for free."
        },

        {
          question: "Can I Save My Documents and Continue Later?",
          answer:
            "Legalbox is a legal technology services company providing simple legal solutions and collections for everyday transactions and business."
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
  components: {
    "nav-one": Navbar,
    "general-footer": General_Footer
  }
};
</script>
