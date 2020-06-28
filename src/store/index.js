import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { uuid } from "vue-uuid";

Vue.use(Vuex, axios);
axios.defaults.baseURL = "https://legalbox-api.herokuapp.com";

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null,
    setUUID: "LB_Paystack_" + uuid.v4(),
    loginErrorMessage: "",
    signUpSuccessStatus: "",
    profileUpdated: false,
    userDetailsReady: "",
    successMessage: "",
    documentSavedMessage: "",
    invalidSubmission: {
      active: false,
      text: "Invalid Entry. Please Crosscheck",
      color: "red",
      timeout: 3000,
      multiLine: true
    },
    docSubmittedSuccessfuly: {
      active: true,
      text: "Document Successfully Saved",
      color: "success",
      timeout: 3000,
      multiLine: true
    },
    snackBarDuration: 4000,
    isDocumentSaved: null,
    getUserDetailsStatusCode: null,
    isSignedIn: null,
    redirecttoEditID: "nully",
    storedUserDetails: [],
    userDocuments: [{ a: 1 }],
    plans: [
      { name: "Basic", price: 850, duration: "12", LGAmount: "Two legalboxes" },
      {
        name: "Premium",
        price: 1700,
        duration: "12",
        LGAmount: "Four legalboxes"
      }
    ],
    durationType: ["Monthly", "Annually"],
    legalboxes: [
      {
        name: "General",
        icon: require("../assets/general-icon.png"),
        info:
          "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        lastOpened: "",
        route: "/docs/general"
      },
      {
        name: "Education, Training & Consultancy",
        icon: require("../assets/edu-train-con-icon.png"),
        info:
          "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        lastOpened: "",
        route: "/docs/education-training-consulting"
      },
      {
        name: "E-commerce, Wholesale & Retail",
        icon: require("../assets/ecommerce.png"),
        info:
          "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        lastOpened: "",
        route: "/docs/ecommerce-retail-wholesale"
      },
      {
        name: "Entertainment & Media",
        icon: require("../assets/entertainment.png"),
        info:
          "4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        lastOpened: "",
        route: "/docs/entertainment-and-media"
      },
      {
        name: "Events",
        icon: require("../assets/events.png"),
        info:
          "4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        lastOpened: "",
        route: "/docs/events"
      },
      {
        name: "Fashion & Beauty",
        icon: require("../assets/fashion-and-beauty-icon.png"),
        info:
          "5 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        lastOpened: "",
        route: "/docs/fashion-and-beauty"
      },
      {
        name: "IT & Design",
        icon: require("../assets/it-and-design-icon.png"),
        info:
          "6 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        lastOpened: "",
        route: "/docs/it-and-design"
      },
      {
        name: "Leisure, Food & Drinks",
        icon: require("../assets/leisure.png"),
        info:
          "7 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        lastOpened: "",
        route: "/docs/leisure-food-drinks"
      }
    ],
    generalLegalboxParent: [
      {
        childName: "Documents",
        info: "",
        lastOpened: "",
        route: "",
        subMenu: [
          {
            menu: "Business Documents",
            subMenuChild: [
              { subMenuChildMenu: "Invoice", route: "/docs/general/invoice" },
              { subMenuChildMenu: "Receipts", route: "/docs/general/receipt" }
            ],
            route: ""
          },
          {
            menu: "Contracts",
            subMenuChild: [
              {
                subMenuChildMenu: "Non-Disclosure Contract",
                route: "/docs/general/non-disclosure"
              },
              {
                subMenuChildMenu: "Non-Compete Contract",
                route: "/docs/general/non-compete"
              },
              {
                subMenuChildMenu: "Non-Circumvention Contract",
                route: "/docs/general/non-circumvention"
              },
              {
                subMenuChildMenu: "Contract of Sale",
                route: "/docs/general/contract-of-sale"
              },
              {
                subMenuChildMenu: "Memorandum of Understanding",
                route: "/docs/general/memorandum-of-understanding"
              },
              {
                subMenuChildMenu: "Loan Contract",
                route: "/docs/general/loan-contract"
              }
            ],
            route: ""
          },
          { menu: "Upload Document", route: "/docs/general/upload" }
        ]
      },
      {
        childName: "Advisory",
        info: "",
        lastOpened: "",
        route: "/docs/general/advisory"
      },
      {
        childName: "Compliance",
        info: "",
        lastOpened: "",
        route: "/docs/general/compliance"
      }
    ],
    educationTrainingConsultingLegalboxParent: [
      {
        childName: "Partnership Contract",
        info: "",
        lastOpened: "",
        route: "education-training-consulting/founders-contract"
      },
      {
        childName: "Founder’s Contract",
        info: "",
        lastOpened: "",
        route: "education-training-consulting/founders-contract"
      },
      {
        childName: "Finance Contract",
        info: "",
        lastOpened: "",
        route: "education-training-consulting/finance-contract"
      },
      {
        childName: "Staff Contract",
        info: "",
        lastOpened: "",
        route: "education-training-consulting/staff-contract"
      },
      {
        childName: "Equipment Leasing Contract",
        info: "",
        lastOpened: "",
        route: "education-training-consulting/equipment-leasing"
      },
      {
        childName: "Contract For Service",
        info: "",
        lastOpened: "",
        route: "education-training-consulting/contract-for-service"
      },
      {
        childName: "Training Contract",
        info: "",
        lastOpened: "",
        route: "education-training-consulting/training-contract"
      },
      {
        childName: "Sponsorship Contract",
        info: "",
        lastOpened: "",
        route: "education-training-consulting/sponsorship-contract"
      }
    ],
    ecommerceRetailWholesaleLegalboxParent: [
      {
        childName: "Partnership Contract",
        info: "",
        lastOpened: "",
        route: "ecommerce-retail-wholesale/founders-contract"
      },
      {
        childName: "Founder’s Contract",
        info: "",
        lastOpened: "",
        route: "ecommerce-retail-wholesale/founders-contract"
      },
      {
        childName: "Finance Contract",
        info: "",
        lastOpened: "",
        route: "ecommerce-retail-wholesale/finance-contract"
      },
      {
        childName: "Staff Contract",
        info: "",
        lastOpened: "",
        route: "ecommerce-retail-wholesale/staff-contract"
      },
      {
        childName: "Hire Purchase Contract",
        info: "",
        lastOpened: "",
        route: "ecommerce-retail-wholesale/hire-purchase"
      },
      {
        childName: "Contract For Service",
        info: "",
        lastOpened: "",
        route: "ecommerce-retail-wholesale/contract-for-service"
      },
      {
        childName: "Affiliate Contract",
        info: "",
        lastOpened: "",
        route: "ecommerce-retail-wholesale/affiliate-contract"
      },
      {
        childName: "Training Contract",
        info: "",
        lastOpened: "",
        route: "ecommerce-retail-wholesale/training-contract"
      }
    ],
    entertainmentAndMediaLegalboxParent: [
      {
        childName: "Partnership Contract",
        info: "",
        lastOpened: "",
        route: "entertainment-and-media/founders-contract"
      },
      {
        childName: "Founder’s Contract",
        info: "",
        lastOpened: "",
        route: "entertainment-and-media/founders-contract"
      },
      {
        childName: "Finance Contract",
        info: "",
        lastOpened: "",
        route: "entertainment-and-media/finance-contract"
      },
      {
        childName: "Staff Contract",
        info: "",
        lastOpened: "",
        route: "entertainment-and-media/staff-contract"
      },
      {
        childName: "Equipment Leasing Contract",
        info: "",
        lastOpened: "",
        route: "entertainment-and-media/equipment-leasing"
      },
      {
        childName: "Contract For Service",
        info: "",
        lastOpened: "",
        route: "entertainment-and-media/contract-for-service"
      },
      {
        childName: "Training Contract",
        info: "",
        lastOpened: "",
        route: "entertainment-and-media/training-contract"
      }
    ],
    EventsLegalboxParent: [
      {
        childName: "Partnership Contract",
        info: "",
        lastOpened: "",
        route: "events/founders-contract"
      },
      {
        childName: "Founder’s Contract",
        info: "",
        lastOpened: "",
        route: "events/founders-contract"
      },
      {
        childName: "Finance Contract",
        info: "",
        lastOpened: "",
        route: "events/finance-contract"
      },
      {
        childName: "Staff Contract",
        info: "",
        lastOpened: "",
        route: "events/staff-contract"
      },
      {
        childName: "Equipment Leasing Contract",
        info: "",
        lastOpened: "",
        route: "events/equipment-leasing"
      },
      {
        childName: "Contract For Service",
        info: "",
        lastOpened: "",
        route: "events/contract-for-service"
      },
      {
        childName: "Training Contract",
        info: "",
        lastOpened: "",
        route: "events/training-contract"
      },
      {
        childName: "Sponsorship Contract",
        info: "",
        lastOpened: "",
        route: "events/sponsorship-contract"
      }
    ],
    fashionAndBeautyLegalboxParent: [
      {
        childName: "Partnership Contract",
        info: "",
        lastOpened: "",
        route: "fashion-and-beauty/partnership-contract"
      },
      {
        childName: "Founder’s Contract",
        info: "",
        lastOpened: "",
        route: "fashion-and-beauty/founders-contract"
      },
      {
        childName: "Finance Contract",
        info: "",
        lastOpened: "",
        route: "fashion-and-beauty/finance-contract"
      },
      {
        childName: "Staff Contract",
        info: "",
        lastOpened: "",
        route: "fashion-and-beauty/staff-contract"
      },
      {
        childName: "Equipment Leasing Contract",
        info: "",
        lastOpened: "",
        route: "fashion-and-beauty/software-license"
      },
      {
        childName: "Contract For Service",
        info: "",
        lastOpened: "",
        route: "fashion-and-beauty/contract-for-service"
      },
      {
        childName: "Training Contract",
        info: "",
        lastOpened: "",
        route: "fashion-and-beauty/training-contract"
      }
    ],
    ITandDesignLegalboxParent: [
      {
        childName: "Partnership Contract",
        info: "",
        lastOpened: "",
        route: "it-and-design/founders-contract"
      },
      {
        childName: "Founder’s Contract",
        info: "",
        lastOpened: "",
        route: "it-and-design/founders-contract"
      },
      {
        childName: "Finance Contract",
        info: "",
        lastOpened: "",
        route: "it-and-design/finance-contract"
      },
      {
        childName: "Staff Contract",
        info: "",
        lastOpened: "",
        route: "it-and-design/staff-contract"
      },
      {
        childName: "Equipment Leasing Contract",
        info: "",
        lastOpened: "",
        route: "it-and-design/equipment-leasing"
      },
      {
        childName: "Contract For Service",
        info: "",
        lastOpened: "",
        route: "it-and-design/contract-for-service"
      },
      {
        childName: "Training Contract",
        info: "",
        lastOpened: "",
        route: "it-and-design/training-contract"
      }
    ],
    leisureFoodDrinksLegalboxParent: [
      {
        childName: "Partnership Contract",
        info: "",
        lastOpened: "",
        route: "leisure-food-drinks/partnership-contract"
      },
      {
        childName: "Founder’s Contract",
        info: "",
        lastOpened: "",
        route: "leisure-food-drinks/founders-contract"
      },
      {
        childName: "Finance Contract",
        info: "",
        lastOpened: "",
        route: "leisure-food-drinks/finance-contract"
      },
      {
        childName: "Staff Contract",
        info: "",
        lastOpened: "",
        route: "leisure-food-drinks/staff-contract"
      },
      {
        childName: "Equipment Leasing Contract",
        info: "",
        lastOpened: "",
        route: "leisure-food-drinks/equipment-leasing"
      },
      {
        childName: "Contract For Service",
        info: "",
        lastOpened: "",
        route: "leisure-food-drinks/contract-for-service"
      },
      {
        childName: "Training Contract",
        info: "",
        lastOpened: "",
        route: "leisure-food-drinks/training-contract"
      }
    ],
    messagesColumns: ["Message Summary", "Date", "Status"],
    messageDate: "",
    messages: [
      {
        summary: "This is Mesage ONE just in a long version",
        date: "state.messageDate",
        status: "unread"
      },
      {
        summary: "This is Mesage TWO just in a long version",
        date: "1-1-2020",
        status: "read"
      },
      {
        summary: "This is Mesage THREE just in a long version",
        date: "1-1-2020",
        status: "unread"
      },
      {
        summary: "This is Mesage FOUR just in a long version",
        date: "1-1-2020",
        status: "read"
      },
      {
        summary: "This is Mesage FIVE just in a long version",
        date: "1-1-2020",
        status: "unread"
      },
      {
        summary: "This is Mesage <code>SIX</code> just in a long version",
        date: "1-1-2020",
        status: "read"
      }
    ],
    profile: [
      {
        firstName: "Damilola",
        lastName: "Yakub",
        email: "damilolayakub@hotmail.com",
        phoneNumber: "08161776008",
        dob: "29-July-1983",
        gender: "male",
        profilePicture: "",
        companyPicture: "",
        currentPlan: "premium"
      }
    ],
    // DOCUMENT HEADERS
    generalHeaders: [
      {
        name: "nondisclosure",
        background:
          "The Parties intend to disclose some Confidential Information with each other.",
        headline:
          "Confidential Information shall mean any website, document, information and know-how in whatever form relating to the Parties, even if it is not formally defined as confidential."
      },
      {
        name: "noncompete",
        background:
          "The Parties have agreed to enter into a Business Relationship that would be mutually beneficial to them.",
        headline:
          "Confidential Information shall mean any website, document, information and know-how in whatever form relating to the Parties, even if it is not formally defined as confidential."
      },
      {
        name: "noncircumvention",
        background:
          "The First Party has a business opportunity it intends to share with the Second Party and assist the Second Party in taking advantage off. This Opportunity and all other opportunities related to or derived from this opportunity shall be referred to as ‘Opportunity’ in this contract.",
        headline:
          "Confidential Information shall mean any website, document, information and know-how in whatever form relating to the Parties, even if it is not formally defined as confidential."
      },
      {
        name: "contractofsale",
        background:
          "The Seller wishes to sell the Goods to the Buyer, and the Buyer has agreed to buy the Goods from the Seller according to the terms of this contract.",
        headline:
          "Confidential Information shall mean any website, document, information and know-how in whatever form relating to the Parties, even if it is not formally defined as confidential."
      },
      {
        name: "memorandumofunderstanding",
        background:
          "The Parties intend to work together on the Purpose of this memorandum of understanding.",
        headline:
          "Confidential Information shall mean any website, document, information and know-how in whatever form relating to the Parties, even if it is not formally defined as confidential."
      },
      {
        name: "loancontract",
        background:
          "The Borrower needs funds and the Lender has agreed to give the Borrower a loan according the terms of this contract.",
        headline:
          "Confidential Information shall mean any website, document, information and know-how in whatever form relating to the Parties, even if it is not formally defined as confidential."
      }
    ],
    fashionAndBeautyHeaders: [
      // Fashion and Beauty
      {
        name: "partnershipcontract",
        background: "The Parties want to form and operate a Partnership.",
        headline: ""
      },
      {
        name: "founderscontract",
        background:
          "The parties want to collaborate on and together develop a Project.",
        headline: ""
      },
      {
        name: "financecontract",
        background:
          "The Business Owner is in need of finance and the Financier has agreed to finance the Business Owner’s business according to the terms of this contract.",
        headline: ""
      },
      {
        name: "staffcontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "equipmentleasing",
        background:
          "The Lessee needs the Lessor’s Equipment and the Lessor has agreed to rent the Equipment to the Lessee.",
        headline: ""
      },
      {
        name: "contractforservice",
        background:
          "The Client wants to hire the Service Provider to provide the Services provided in this contract according to the terms of this contract.",
        headline: ""
      },
      {
        name: "trainingcontract",
        background:
          "The Trainee would like to learn the Skills provided in this contract and the Trainer is willing to train the Trainee according to the terms of this contract.",
        headline: ""
      }
    ],
    ITandDesignHeaders: [
      {
        name: "partnershipcontract",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "founderscontract",
        background:
          "The parties want to collaborate on and together develop a Project.",
        headline: ""
      },
      {
        name: "financecontract",
        background:
          "The Business Owner is in need of finance and the Financier has agreed to finance the Business Owner’s business according to the terms of this contract.",
        headline: ""
      },
      {
        name: "staffcontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "softwarelicense",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "contractforservice",
        background:
          "The Client wants to hire the Service Provider to provide the Services provided in this contract according to the terms of this contract.",
        headline: ""
      },
      {
        name: "trainingcontract",
        background:
          "The Trainee would like to learn the Skills provided in this contract and the Trainer is willing to train the Trainee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "sponsorshipcontract",
        background:
          "The Promoter is looking for a Sponsor for his or her Project. The Sponsor is willing to sponsor the Project according to the terms in this Contract.",
        headline: ""
      },
      {
        name: "affiliatecontract",
        background:
          "The Principal wants to offer its Services to customers referred to it by the Affiliate and the Affiliate is willing to refer customers to the Principal.",
        headline: ""
      },
      {
        name: "licensecontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      }
    ],
    entertainmentAndMediaHeaders: [
      {
        name: "partnershipcontract",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "founderscontract",
        background:
          "The parties want to collaborate on and together develop a Project.",
        headline: ""
      },
      {
        name: "financecontract",
        background:
          "The Business Owner is in need of finance and the Financier has agreed to finance the Business Owner’s business according to the terms of this contract.",
        headline: ""
      },
      {
        name: "staffcontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "softwarelicense",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "contractforservice",
        background:
          "The Client wants to hire the Service Provider to provide the Services provided in this contract according to the terms of this contract.",
        headline: ""
      },
      {
        name: "trainingcontract",
        background:
          "The Trainee would like to learn the Skills provided in this contract and the Trainer is willing to train the Trainee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "sponsorshipcontract",
        background:
          "The Promoter is looking for a Sponsor for his or her Project. The Sponsor is willing to sponsor the Project according to the terms in this Contract.",
        headline: ""
      },
      {
        name: "affiliatecontract",
        background:
          "The Principal wants to offer its Services to customers referred to it by the Affiliate and the Affiliate is willing to refer customers to the Principal.",
        headline: ""
      },
      {
        name: "licensecontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      }
    ],
    ecommerceRetailWholesaleHeaders: [
      {
        name: "partnershipcontract",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "founderscontract",
        background:
          "The parties want to collaborate on and together develop a Project.",
        headline: ""
      },
      {
        name: "financecontract",
        background:
          "The Business Owner is in need of finance and the Financier has agreed to finance the Business Owner’s business according to the terms of this contract.",
        headline: ""
      },
      {
        name: "staffcontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "softwarelicense",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "contractforservice",
        background:
          "The Client wants to hire the Service Provider to provide the Services provided in this contract according to the terms of this contract.",
        headline: ""
      },
      {
        name: "trainingcontract",
        background:
          "The Trainee would like to learn the Skills provided in this contract and the Trainer is willing to train the Trainee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "affiliatecontract",
        background:
          "The Principal wants to offer its Services to customers referred to it by the Affiliate and the Affiliate is willing to refer customers to the Principal.",
        headline: ""
      },
      {
        name: "hirepurchasecontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      }
    ],
    EventsHeaders: [
      {
        name: "partnershipcontract",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "founderscontract",
        background:
          "The parties want to collaborate on and together develop a Project.",
        headline: ""
      },
      {
        name: "financecontract",
        background:
          "The Business Owner is in need of finance and the Financier has agreed to finance the Business Owner’s business according to the terms of this contract.",
        headline: ""
      },
      {
        name: "staffcontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "softwarelicense",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "contractforservice",
        background:
          "The Client wants to hire the Service Provider to provide the Services provided in this contract according to the terms of this contract.",
        headline: ""
      },
      {
        name: "trainingcontract",
        background:
          "The Trainee would like to learn the Skills provided in this contract and the Trainer is willing to train the Trainee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "sponsorshipcontract",
        background:
          "The Promoter is looking for a Sponsor for his or her Project. The Sponsor is willing to sponsor the Project according to the terms in this Contract.",
        headline: ""
      },
      {
        name: "affiliatecontract",
        background:
          "The Principal wants to offer its Services to customers referred to it by the Affiliate and the Affiliate is willing to refer customers to the Principal.",
        headline: ""
      },
      {
        name: "licensecontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      }
    ],
    educationTrainingConsultingHeaders: [
      {
        name: "partnershipcontract",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "founderscontract",
        background:
          "The parties want to collaborate on and together develop a Project.",
        headline: ""
      },
      {
        name: "financecontract",
        background:
          "The Business Owner is in need of finance and the Financier has agreed to finance the Business Owner’s business according to the terms of this contract.",
        headline: ""
      },
      {
        name: "staffcontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "softwarelicense",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "contractforservice",
        background:
          "The Client wants to hire the Service Provider to provide the Services provided in this contract according to the terms of this contract.",
        headline: ""
      },
      {
        name: "trainingcontract",
        background:
          "The Trainee would like to learn the Skills provided in this contract and the Trainer is willing to train the Trainee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "sponsorshipcontract",
        background:
          "The Promoter is looking for a Sponsor for his or her Project. The Sponsor is willing to sponsor the Project according to the terms in this Contract.",
        headline: ""
      },
      {
        name: "affiliatecontract",
        background:
          "The Principal wants to offer its Services to customers referred to it by the Affiliate and the Affiliate is willing to refer customers to the Principal.",
        headline: ""
      },
      {
        name: "licensecontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      }
    ],
    leisureFoodDrinksHeaders: [
      {
        name: "partnershipcontract",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "founderscontract",
        background:
          "The parties want to collaborate on and together develop a Project.",
        headline: ""
      },
      {
        name: "financecontract",
        background:
          "The Business Owner is in need of finance and the Financier has agreed to finance the Business Owner’s business according to the terms of this contract.",
        headline: ""
      },
      {
        name: "staffcontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "softwarelicense",
        background:
          "This contract covers the access and use of the source code for the Software provided by the Software Provider.",
        headline: ""
      },
      {
        name: "contractforservice",
        background:
          "The Client wants to hire the Service Provider to provide the Services provided in this contract according to the terms of this contract.",
        headline: ""
      },
      {
        name: "trainingcontract",
        background:
          "The Trainee would like to learn the Skills provided in this contract and the Trainer is willing to train the Trainee according to the terms of this contract.",
        headline: ""
      },
      {
        name: "sponsorshipcontract",
        background:
          "The Promoter is looking for a Sponsor for his or her Project. The Sponsor is willing to sponsor the Project according to the terms in this Contract.",
        headline: ""
      },
      {
        name: "affiliatecontract",
        background:
          "The Principal wants to offer its Services to customers referred to it by the Affiliate and the Affiliate is willing to refer customers to the Principal.",
        headline: ""
      },
      {
        name: "licensecontract",
        background:
          "The Employer intends to retain the services of the Employee according to the terms of this contract.",
        headline: ""
      }
    ],
    //General Legalbox
    general: {
      nonDisclosureParagraphs: [
        {
          paragraph:
            "This contract shall include and bind each Party’s Successor-in-title, Heirs, Administrators and Assigns.",
          info: "Info joke 1",
          comment: ""
        },
        {
          paragraph:
            "The Parties shall not disclose, and shall make reasonable efforts to keep and protect the confidentiality of, the Confidential Information of each Party or of third parties to whom they owe a duty of confidentiality and non-disclosure.",
          info: "Info joke 2",
          comment: ""
        },
        {
          paragraph:
            "The Parties shall return to the provider of any Confidential Information such Confidential Information in their possession after this contract elapses.",
          info: "Info joke 3",
          comment: ""
        },
        {
          paragraph:
            "The Parties shall execute a non-disclosure contract with the same terms in this contract with any person to whom they might disclose any Confidential Information to.",
          info: "Info joke 4",
          comment: ""
        }
      ],
      nonDisclosureClauseList: [
        {
          title: "Scope of Contract",
          detail:
            "This contract shall include and bind each Party’s Successor-in-title, Heirs, Administrators and Assigns.",
          info: "Info joke 4",
          comment: "dsds"
        },
        {
          title: "Authority",
          detail:
            "Each Party represents and warrants that it has full rights, powers and authority to enter into this contract without violating any obligation to any entity or person.",
          info: "Info joke 4",
          comment: "sdsd"
        },
        {
          title: "Intellectual Property",
          detail:
            "All intellectual property materials developed or produced under this contract for either Party shall be the sole property of that Party. A Party shall not use or permit a third party to use the other Party’s intellectual property without that other Party’s prior written consent.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Non-Circumvention",
          detail:
            "The Parties shall not contact in anyway, at anytime and for any purpose, a third party concerning the Confidential Information, or any person related to the Confidential Information, without the prior written consent of the other Party to this contract. A Party shall not use any property revealed through the efforts of the other Party, without the prior written consent of that other Party.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Remedy",
          detail:
            "A breach of this contract will cause financial and other loss to either Party. Each Party shall be compensated by any party in breach of this contract for all expenses incurred or loss and damages suffered as a result of a breach of this contract.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Indemnity",
          detail:
            "Each Party shall be compensated by the other Party for all suits, damages, liabilities and expenses from any act or omission connected to this contract and committed by the other Party.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Unavoidable Circumstances",
          detail:
            "No Party shall be liable for any failure to fulfil or perform any term of this contract, if such failure is due to circumstances beyond such Party’s control.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Waiver",
          detail:
            "Failure to exercise any right in this contract shall not be interpreted as a waiver. The right or remedies in this contract are cumulative and not exclusive of any right or remedies provided by law.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Non-Assignment",
          detail:
            "No party shall assign any of its obligations or duties under this contract without the prior written consent of the other Party.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Entire Agreement",
          detail:
            "This is the entire agreement between the Parties and it supersedes all other agreements. It cannot be amended without the written consent of both Parties.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Counterparts",
          detail:
            "This contract may be executed in several counterparts, all of which constitutes a single agreement by the Parties.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Severability",
          detail:
            "If any portion of this contract is held by any court or law to be invalid or unenforceable, that part shall be cut off. It shall not make any other part of this contract invalid or unenforceable.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Applicable Law",
          detail:
            "This contract shall be governed and interpreted by the laws of the Federal Republic of Nigeria.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Dispute Resolution",
          detail:
            "The Parties shall make reasonable efforts to settle all disputes amicably. Reasonable efforts must have been made to settle all disputes by negotiation or agreement before Parties can seek any other means to settle their dispute.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Arbitration",
          detail:
            "If the Parties are unable to settle any dispute by negotiation or mutual agreement, such dispute shall be referred to Arbitration and governed by the Arbitration and Conciliation Act. The findings of the Arbitrator(s) shall be binding.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Electronic Notices",
          detail:
            "All notices or communication to be given under this assignment shall be sent by electronic email to the email addresses provided in this contract.",
          info: "Info joke 4",
          comment: ""
        },
        {
          title: "Termination of Confidentiality",
          detail:
            "The Parties’ obligations under this contract shall be terminated with regards to any information which:" +
            "\n" +
            "i. Are or become public knowledge through no act or omission of the other Party;" +
            "\n" +
            "ii. Are or become publicly disclosed by the Proprietor;" +
            "\n" +
            "iii. Are disclosed according to the laws of the Federal Republic of Nigeria;" +
            "\n" +
            "iv. The Proprietor of such information has permitted by written consent to be publicly disclosed.",
          info: "Info joke 4",
          comment: ""
        }
      ],
      nonCompeteParagraphs: [
        {
          paragraph:
            "For the entire duration of this contract, the Second Party shall not serve or work in any capacity for an entity competing with the First Party or engage in any business reasonably considered to be in competition with the First Party.",
          info: "",
          comment: ""
        }
      ],
      nonCompeteClauseList: [
        {
          title: "Scope of Contract",
          detail:
            "This contract shall include and bind each Party’s Successor-in-title, Heirs, Administrators and Assigns."
        },
        {
          title: "Authority",
          detail:
            "Each Party represents and warrants that it has full rights, powers and authority to enter into this contract without violating any obligation to any entity or person."
        },
        {
          title: "Confidentiality",
          detail:
            "A Party shall not disclose, and shall make reasonable efforts to keep and protect the confidentiality of, any information, materials and property of the other Party or of third parties to whom they owe a duty of confidentiality and non-disclosure."
        },
        {
          title: "Intellectual Property",
          detail:
            "All intellectual property materials developed or produced under this contract for either Party shall be the sole property of that Party. A Party shall not use or permit a third party to use the other Party’s intellectual property without that other Party’s prior written consent."
        },
        {
          title: "Remedy",
          detail:
            "A breach of this contract will cause financial and other loss to either Party. Each Party shall be compensated by any party in breach of this contract for all expenses incurred or loss and damages suffered as a result of a breach of this contract."
        },
        {
          title: "Indemnity",
          detail:
            "Each Party shall be compensated by the other Party for all suits, damages, liabilities and expenses from any act or omission connected to this contract and committed by the other Party."
        },
        {
          title: "Unavoidable Circumstances",
          detail:
            "No Party shall be liable for any failure to fulfil or perform any term of this contract, if such failure is due to circumstances beyond such Party’s control."
        },
        {
          title: "Waiver",
          detail:
            "Failure to exercise any right in this contract shall not be interpreted as a waiver. The right or remedies in this contract are cumulative and not exclusive of any right or remedies provided by law."
        },
        {
          title: "Non-Assignment",
          detail:
            "No Party shall assign any of its obligations or duties under this contract without the prior written consent of the other Party."
        },
        {
          title: "Entire Assignment",
          detail:
            "This is the entire agreement between the Parties and it supersedes all other agreements. It cannot be amended without the written consent of both Parties."
        },
        {
          title: "Counterparts",
          detail:
            "This contract may be executed in several counterparts, all of which constitutes a single agreement by the Parties."
        },
        {
          title: "Severability",
          detail:
            "If any portion of this contract is held by any court or law to be invalid or unenforceable, that part shall be cut off. It shall not make any other part of this contract invalid or unenforceable."
        },
        {
          title: "Applicable Law",
          detail:
            "This contract shall be governed and interpreted by the laws of the Federal Republic of Nigeria."
        },
        {
          title: "Dispute Resolution",
          detail:
            "The Parties shall make reasonable efforts to settle all disputes amicably. Reasonable efforts must have been made to settle all disputes by negotiation or agreement before Parties can seek any other means to settle their dispute."
        },
        {
          title: "Arbitration",
          detail:
            "If the Parties are unable to settle any dispute by negotiation or mutual agreement, such dispute shall be referred to Arbitration and governed by the Arbitration and Conciliation Act. The findings of the Arbitrator(s) shall be binding."
        },
        {
          title: "Electronic Notices",
          detail:
            "All notices or communication to be given under this assignment shall be sent by electronic email to the email addresses provided in this contract."
        },
        {
          title: "Electronic Notices",
          detail:
            "This contract can be terminated in the following ways:" +
            "\n" +
            "i. By mutual agreement between both parties;" +
            "\n" +
            "ii. By an aggrieved party if the other party breaches this contract; or" +
            "\n" +
            "iii. After the duration of this contract elapses. "
        }
      ],
      nonCircumventionParagraphs: [
        "The Second Party shall not contact in anyway, at anytime and for any purpose, a third party concerning the Opportunity, or any person related to the Opportunity, without the prior written consent of the First Party.",
        "The Second Party shall not use any property revealed through the efforts of the First Party, without the prior written consent of the First Party.",
        "The Second Party shall not participate in any transaction of any kind related to the Opportunity without the prior written consent of the First Party.",
        "The Second Party shall not collect any fees related to the Opportunity without the prior written consent of the First Party."
      ],
      contractOfSaleParagraphs: [
        "The Seller shall sell the Goods to the Buyer (as described in this contract) under this contract for the Price stated in this contract."
      ],
      loanContractParagraphs: [
        "The Lender agrees to loan the Borrower the amount stated in this contract to be repaid as stated in this contract."
      ],
      loanContractClauseList: [
        {
          title: "Scope of Contract",
          detail:
            "This contract shall include and bind each Party’s Successor-in-title, Heirs, Administrators and Assigns."
        },
        {
          title: "Authority",
          detail:
            "Each Party represents and warrants that it has full rights, powers and authority to enter into this contract without violating any obligation to any entity or person."
        },
        {
          title: "Event of Default",
          detail:
            "If any of the following events happen, the Lender may demand from the Borrower in writing the immediate payment of the Principal and Interest:" +
            "\n" +
            "i.	If the Business Owner has not paid the Principal and/or Interest 15 days after the due date;" +
            "\n" +
            "ii.	If any representation made by the Business Owner was materially false when made; or" +
            "\n" +
            "iii.	If the Business Owner materially breaches this contract."
        },
        {
          title: "Confidentiality",
          detail:
            "The Parties shall not disclose, and shall make reasonable efforts to keep and protect the confidentiality of, all information, materials and property of each other or of third parties to whom they owe a duty of confidentiality and non-disclosure."
        },
        {
          title: "Remedy",
          detail:
            "A breach of this contract will cause financial and other loss to either Party. Each Party shall be compensated by any party in breach of this contract for all expenses incurred or loss and damages suffered as a result of a breach of this contract."
        },
        {
          title: "Unavoidable Circumstances",
          detail:
            "No Party shall be liable for any failure to fulfil or perform any term of this contract, if such failure is due to circumstances beyond such Party’s control."
        },
        {
          title: "Waiver",
          detail:
            "Failure to exercise any right in this contract shall not be interpreted as a waiver. The right or remedies in this contract are cumulative and not exclusive of any right or remedies provided by law."
        },
        {
          title: "Non-Assignment",
          detail:
            "No party shall assign any of its obligations or duties under this contract without the prior written consent of the other party."
        },
        {
          title: "Entire Agreement",
          detail:
            "This is the entire agreement between the Parties and it supersedes all other agreements. It cannot be amended without the written consent of both Parties."
        },
        {
          title: "Entire Agreement",
          detail:
            "This is the entire agreement between the Parties and it supersedes all other agreements. It cannot be amended without the written consent of both Parties."
        },
        {
          title: "Counterparts",
          detail:
            "This contract may be executed in several counterparts, all of which constitutes a single contract by the Parties."
        },
        {
          title: "Severability",
          detail:
            "If any portion of this contract is held by any court or law to be invalid or unenforceable, that part shall be cut off. It shall not affect the validity or enforceability of any other part of this contract."
        },
        {
          title: "Applicable Law",
          detail:
            "This contract shall be governed and interpreted by the laws of the Federal Republic of Nigeria."
        },
        {
          title: "Dispute Resolution",
          detail:
            "The Parties shall make reasonable efforts to settle all disputes amicably. Reasonable efforts must have been made to settle all disputes by negotiation or mutual contract before Parties can seek any other means to settle their dispute."
        },
        {
          title: "Arbitration",
          detail:
            "If the Parties are unable to settle any dispute by negotiation or mutual agreement, such dispute shall be referred to Arbitration and governed by the Arbitration and Conciliation Act. The findings of the Arbitrator(s) shall be binding."
        },
        {
          title: "Electronic Notices",
          detail:
            "All notices or communication to be given under this contract shall be sent by electronic email to the email addresses provided in this contract."
        },
        {
          title: "Termination",
          detail:
            "This contract can be terminated in the following ways:" +
            "\n" +
            "i.	By mutual agreement between both parties;" +
            "\n" +
            "ii.	By an aggrieved party if the other party breaches this contract; or" +
            "\n" +
            "iii.	After the duration of this contract elapses."
        }
      ]
    },
    //Fashion and Beauty Legalbox
    fashionAndBeauty: {
      partnershipContractParagraphs: [
        "The partnership shall offer fashion designing and garment production services.",
        "The partnership shall offer hair styling services.",
        "The partnership shall offer beauty and make-up products and services."
      ],
      foundersContractParagraphs: [""],
      financeContractParagraphs: [
        "The Financier agrees to finance the Business Owner’s business for a Return on Investment as stated in this contract."
      ],
      staffContractParagraphs: [""],
      equipmentLeasingContractParagraphs: [
        "The Lessor shall rent the Equipment to the Lessee according to the terms of this contract."
      ],
      contractForServiceParagraphs: ["Paragraph Test"],
      trainingContractParagraphs: [""]
    },
    // IT and Design Legalbox
    ITandDesign: {
      partnershipContractParagraphs: [
        "The partnership shall offer fashion designing and garment production services.",
        "The partnership shall offer hair styling services.",
        "The partnership shall offer beauty and make-up products and services."
      ],
      foundersContractParagraphs: [""],
      financeContractParagraphs: [
        "The Financier agrees to finance the Business Owner’s business for a Return on Investment as stated in this contract."
      ],
      StaffContractParagraphs: [""],
      softwareLicenseContractParagraphs: [
        "The Software Provider grants to the Licensee a non-exclusive, non-transferable license to use the Software for the specific purpose and according to the terms of this contract."
      ],
      contractForServiceParagraphs: ["Paragraph Test"],
      trainingContractParagraphs: [""],
      sponsorshipContractParagraphs: [
        "The Sponsor agrees to sponsor the Project to the tune of the amount stated in this contract."
      ],
      affiliateContractParagraphs: [""],
      licenseContractParagraphs: [
        "The Licensor grants to the Licensee a non-exclusive, non-transferable License to use the Asset for the specific purpose and according to the terms of this contract."
      ]
    },
    // Entertainment and Media Legalbox
    entertainmentAndMedia: {
      partnershipContractParagraphs: [
        "The partnership shall offer fashion designing and garment production services.",
        "The partnership shall offer hair styling services.",
        "The partnership shall offer beauty and make-up products and services."
      ],
      foundersContractParagraphs: [""],
      financeContractParagraphs: [
        "The Financier agrees to finance the Business Owner’s business for a Return on Investment as stated in this contract."
      ],
      StaffContractParagraphs: [""],
      softwareLicenseContractParagraphs: [
        "The Software Provider grants to the Licensee a non-exclusive, non-transferable license to use the Software for the specific purpose and according to the terms of this contract."
      ],
      contractForServiceParagraphs: ["Paragraph Test"],
      trainingContractParagraphs: [""],
      sponsorshipContractParagraphs: [
        "The Sponsor agrees to sponsor the Project to the tune of the amount stated in this contract."
      ],
      affiliateContractParagraphs: [""],
      licenseContractParagraphs: [
        "The Licensor grants to the Licensee a non-exclusive, non-transferable License to use the Asset for the specific purpose and according to the terms of this contract."
      ]
    },
    // Ecommerce, Retail, Wholesale
    ecommerceRetailWholesale: {
      partnershipContractParagraphs: [
        "The partnership shall offer fashion designing and garment production services.",
        "The partnership shall offer hair styling services.",
        "The partnership shall offer beauty and make-up products and services."
      ],
      foundersContractParagraphs: [""],
      financeContractParagraphs: [
        "The Financier agrees to finance the Business Owner’s business for a Return on Investment as stated in this contract."
      ],
      StaffContractParagraphs: [""],
      softwareLicenseContractParagraphs: [
        "The Software Provider grants to the Licensee a non-exclusive, non-transferable license to use the Software for the specific purpose and according to the terms of this contract."
      ],
      contractForServiceParagraphs: ["Paragraph Test"],
      trainingContractParagraphs: [""],
      sponsorshipContractParagraphs: [
        "The Sponsor agrees to sponsor the Project to the tune of the amount stated in this contract."
      ],
      affiliateContractParagraphs: [""],
      licenseContractParagraphs: [
        "The Licensor grants to the Licensee a non-exclusive, non-transferable License to use the Asset for the specific purpose and according to the terms of this contract."
      ]
    },
    // Events
    Events: {
      partnershipContractParagraphs: [
        "The partnership shall offer fashion designing and garment production services.",
        "The partnership shall offer hair styling services.",
        "The partnership shall offer beauty and make-up products and services."
      ],
      foundersContractParagraphs: [""],
      financeContractParagraphs: [
        "The Financier agrees to finance the Business Owner’s business for a Return on Investment as stated in this contract."
      ],
      StaffContractParagraphs: [""],
      softwareLicenseContractParagraphs: [
        "The Software Provider grants to the Licensee a non-exclusive, non-transferable license to use the Software for the specific purpose and according to the terms of this contract."
      ],
      contractForServiceParagraphs: ["Paragraph Test"],
      trainingContractParagraphs: [""],
      sponsorshipContractParagraphs: [
        "The Sponsor agrees to sponsor the Project to the tune of the amount stated in this contract."
      ],
      affiliateContractParagraphs: [""],
      licenseContractParagraphs: [
        "The Licensor grants to the Licensee a non-exclusive, non-transferable License to use the Asset for the specific purpose and according to the terms of this contract."
      ]
    },
    // Education, Training & Consulting
    educationTrainingConsulting: {
      partnershipContractParagraphs: [
        "The partnership shall offer fashion designing and garment production services.",
        "The partnership shall offer hair styling services.",
        "The partnership shall offer beauty and make-up products and services."
      ],
      foundersContractParagraphs: [""],
      financeContractParagraphs: [
        "The Financier agrees to finance the Business Owner’s business for a Return on Investment as stated in this contract."
      ],
      StaffContractParagraphs: [""],
      softwareLicenseContractParagraphs: [
        "The Software Provider grants to the Licensee a non-exclusive, non-transferable license to use the Software for the specific purpose and according to the terms of this contract."
      ],
      contractForServiceParagraphs: ["Paragraph Test"],
      trainingContractParagraphs: [""],
      sponsorshipContractParagraphs: [
        "The Sponsor agrees to sponsor the Project to the tune of the amount stated in this contract."
      ],
      affiliateContractParagraphs: [""],
      licenseContractParagraphs: [
        "The Licensor grants to the Licensee a non-exclusive, non-transferable License to use the Asset for the specific purpose and according to the terms of this contract."
      ]
    },
    leisureFoodDrinks: {
      partnershipContractParagraphs: [
        "The partnership shall offer fashion designing and garment production services.",
        "The partnership shall offer hair styling services.",
        "The partnership shall offer beauty and make-up products and services."
      ],
      foundersContractParagraphs: [""],
      financeContractParagraphs: [
        "The Financier agrees to finance the Business Owner’s business for a Return on Investment as stated in this contract."
      ],
      StaffContractParagraphs: [""],
      softwareLicenseContractParagraphs: [
        "The Software Provider grants to the Licensee a non-exclusive, non-transferable license to use the Software for the specific purpose and according to the terms of this contract."
      ],
      contractForServiceParagraphs: ["Paragraph Test"],
      trainingContractParagraphs: [""],
      sponsorshipContractParagraphs: [
        "The Sponsor agrees to sponsor the Project to the tune of the amount stated in this contract."
      ],
      affiliateContractParagraphs: [""],
      licenseContractParagraphs: [
        "The Licensor grants to the Licensee a non-exclusive, non-transferable License to use the Asset for the specific purpose and according to the terms of this contract."
      ]
    }
  },
  getters: {
    signedIn(state) {
      return state.token !== null;
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    isSignedIn(state, isSignedIn) {
      state.isSignedIn = isSignedIn;
    },
    detroyToken(state) {
      state.token = null;
    },
    retrieveUserDetails(state, data) {
      state.storedUserDetails = data;
    },
    retrieveAllUserDocuments(state, documents) {
      state.userDocuments = documents;
    },
    updateProfile(state) {
      state.profileUpdated = true;
      state.successMessage = "success";
    },
    profileUpdatefailed(state, errorMessage) {
      state.profileUpdated = true;
      state.successMessage = errorMessage;
    },
    setEditID(state, editID) {
      state.redirecttoEditID = editID;
    },
    documentSavedStatusMessage(state, savedDocumentMessage) {
      state.documentSavedMessage = savedDocumentMessage;
    },
    setIsDocumentSaved(state, status) {
      state.isDocumentSaved = status;
      console.log(status);
    },
    removeSnackbar(state) {
      state.profileUpdated = true;
      state.successMessage = "error";
    }
  },
  actions: {
    // Sign Out
    destroyToken(context) {
      if (context.getters.signedIn) {
        return new Promise(resolve => {
          localStorage.removeItem("access_token");
          delete axios.defaults.headers.common["Authorization"];
          context.commit("detroyToken");
          resolve();
          // console.log(response);
        });
      }
    },
    // User Sign In
    retrieveLoginCredentials(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "/api/v1/auth",
            {
              email: credentials.email,
              password: credentials.password
            },
            { headers: { "Content-Type": "application/json" } }
          )
          .then(response => {
            const token = response.data.token;
            const isSignedIn = true;
            localStorage.setItem("access_token", token);
            context.commit("retrieveToken", token);
            context.commit("isSignedIn", isSignedIn);
            resolve(response);
            console.log(response);
          })
          .catch(error => {
            localStorage.removeItem("access_token");

            const isSignedIn = false;
            context.commit("isSignedIn", isSignedIn);

            if (error.response.data.message) {
              console.log("Error oooo");
              const errorMessage = error.response.data.message;
              console.log("errorMessage", errorMessage);

              this.state.loginErrorMessage = errorMessage;

              console.log("loginErrorMessage", this.state.loginErrorMessage);
            } else if (error.response && !error.response.data.message) {
              this.state.loginErrorMessage = "Oops! Something went wrong";
            }

            console.log(error);
            console.log(error.response);
            console.log(error.response.data.message);
            console.log(error.response.data);
            console.log(error.response.status);
            reject(error);
          });
      });
    },
    //User Sign Up
    processSignUp(context, credentials) {
      axios
        .post(
          "/api/v1/newauth",
          {
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            password: credentials.password,
            confirmPassword: credentials.confirmPassword
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(response => {
          this.state.signUpSuccessStatus = true;
          // alert(this.state.signUpSuccessStatus);
          console.log(response);
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        })
        .catch(error => {
          this.state.signUpSuccessStatus = false;
          // alert(this.state.signUpSuccessStatus);

          this.state.signUpMesssage = error.response.data.message;
          this.state.signUpMesssage;

          console.log(error);
          console.log(error.response);
          console.log(error.response.data.message);
          console.log(error.response.data);
          console.log(error.response.status);
        });
    },
    dummy() {
      console.log("Dummy Me");
    },
    // Fetch user details
    getUserDetails({ commit }) {
      // Set status of USER DETAILS to PENDING at the beginnning of each fetch (Page refresh)
      // If status is pending, Page Loader should run
      this.state.userDetailsReady = "pending";
      axios
        .get("/api/v1/user/userdash", {
          headers: { Authorization: this.state.token }
        })
        .then(response => {
          // if (response.data) {}
          commit("retrieveUserDetails", response.data.data);
          console.log(this.state.token);


          // Set state of USER DETAILS  to True
          this.state.userDetailsReady = true;

          // console.log(response.data);
          // console.log(response.status);
          // console.log(response.headers);
          // return response.data.data;
        })
        .catch(error => {
          // Set state of USER DETAILS  to False
          // Fallback error screen should activate
          this.state.userDetailsReady = false;

          console.log(error);
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.status);
        });
    },
    // User Update Profile,

    updateUserProfile(context, credentials) {
      console.log(credentials);
      const userProfile = new FormData();
      for (var key in credentials) {
        console.log(credentials);
        userProfile.append(key, credentials[key]);

        for (var entry of userProfile.entries()) {
          console.log(entry[0] + ", " + entry[1]);
        }
        // console.log(userProfile.entries());
        const successMessage = "success";
        context.commit("updateProfile", successMessage);
      }
    },
    discardEmptyEntries(context, credentials) {
      for (var key in credentials) {
        if (credentials[key] == "") {
          const errorMessage = "emptySubmission";
          context.commit("profileUpdatefailed", errorMessage);
          // console.log(errorMessage);
          // console.log("Hello");
        }
      }
      // console.log(credentials);
    },
    // uploadProfilePicture(context, credentials) {

    // },
    removeSnackbar(context) {
      context.commit("removeSnackbar");
    },

    // DOCUMENT SUBMISSION
    submitDocument(context, docData) {
      axios
        .post("/api/v1/doc/", docData, {
          headers: { Authorization: this.state.token }
        })
        .then(response => {
          console.log(response);
          console.log(response.data);
          console.log(response.data.document);
          console.log("ID", response.data.document._id);
          console.log(response.status);

          const editID = response.data.document._id;
          context.commit("setEditID", editID);
          console.log("ID Set");

          let savedDocumentMessage = {};
          savedDocumentMessage.message = "Document Successfully Saved.";
          savedDocumentMessage.color = "success";
          // let savedStatus = true;
          context.commit("documentSavedStatusMessage", savedDocumentMessage);
          // context.commit("isDocumentSaved", savedStatus);
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.status);

          let savedDocumentMessage = {};
          savedDocumentMessage.message =
            "Oops! Something went wrong. Document might not be saved";
          savedDocumentMessage.color = "error";

          const savedStatus = false;
          context.commit("documentSavedStatusMessage", savedDocumentMessage);
          context.commit("setIsDocumentSaved", savedStatus);
        });
    },
    // GET LIST OF USER DOCUMENT
    getAlluserDocuments({ commit }) {
      axios
        .get("/api/v1/doc/userdocs", {
          headers: { Authorization: this.state.token }
        })
        .then(response => {
          // if (response.data) {}
          commit("retrieveAllUserDocuments", response.data.documents);
          // console.log(response.data);
          // console.log(response.status);
          // console.log(response.headers);
          return response.data.data;
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.status);
        });
    }
  },
  modules: {}
});
