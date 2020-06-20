import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import pageNotFound from "../views/404.vue";
import test from "../views/test";
import GettingStarted from "../views/GettingStarted.vue";
import Contact from "../views/Contact.vue";
import TermsOfService from "../views/TermsOfService";
import PrivacyPolicy from "../views/PrivacyPolicy";
import FAQs from "../views/FAQs";
import Subscription from "../views/Subscription";
import Login from "../views/auth/login";
import SignUp from "../views/auth/signup";
import Activate from "../views/auth/activate";
import Dashboard from "../views/backAuth/dashboard";
import Messages from "../views/backAuth/messages";
import MyDocuments from "../views/backAuth/MyDocuments";
import SingleDocumentOptions from "../components/singleDocumentOptions";
// import SingleDocumentEDIT from "../components/editDoc";
import Legalboxes from "../views/backAuth/legalboxes";
import Settings from "../views/backAuth/settings";
// General
import General from "../views/backAuth/docs/general/general";
import Receipts from "../views/backAuth/docs/general/receipt";
import NonDisclosure from "../views/backAuth/docs/general/nondisclosure";
import NonCompete from "../views/backAuth/docs/general/noncompete";
import NonCircumvention from "../views/backAuth/docs/general/noncircumvention";
import ContractOfSale from "../views/backAuth/docs/general/contractofsale";
import MemorandumOfUnderstanding from "../views/backAuth/docs/general/memorandumofunderstanding";
import LoanContract from "../views/backAuth/docs/general/loancontract";
import Invoices from "../views/backAuth/docs/general/invoice";
import Upload from "../views/backAuth/docs/general/upload";
// Fashion and Beauty
import fashionAndBeauty from "../views/backAuth/docs/fashionAndBeauty/fashionandbeauty";
import fashionAndBeauty_partnershipContract from "../views/backAuth/docs/fashionAndBeauty/partnershipcontract";
import fashionAndBeauty_foundersContract from "../views/backAuth/docs/fashionAndBeauty/founderscontract";
import fashionAndBeauty_financeContract from "../views/backAuth/docs/fashionAndBeauty/financecontract";
import fashionAndBeauty_staffContract from "../views/backAuth/docs/fashionAndBeauty/staffcontract";
import fashionAndBeauty_equipmentLeasing from "../views/backAuth/docs/fashionAndBeauty/equipmentleasing";
import fashionAndBeauty_contractForService from "../views/backAuth/docs/fashionAndBeauty/contractforservice";
import fashionAndBeauty_trainingContract from "../views/backAuth/docs/fashionAndBeauty/trainingcontract";
// IT and Design
import ITandDesign from "../views/backAuth/docs/ITandDesign/itanddesign";
import ITandDesign_partnershipContract from "../views/backAuth/docs/ITandDesign/partnershipcontract";
import ITandDesign_foundersContract from "../views/backAuth/docs/ITandDesign/founderscontract";
import ITandDesign_financeContract from "../views/backAuth/docs/ITandDesign/financecontract";
import ITandDesign_staffContract from "../views/backAuth/docs/ITandDesign/staffcontract";
import ITandDesign_softwareLicensing from "../views/backAuth/docs/ITandDesign/softwarelicense";
import ITandDesign_contractForService from "../views/backAuth/docs/ITandDesign/contractforservice";
import ITandDesign_trainingContract from "../views/backAuth/docs/ITandDesign/trainingcontract";
import ITandDesign_sponsorshipContract from "../views/backAuth/docs/ITandDesign/sponsorshipcontract";
import ITandDesign_affiliateContract from "../views/backAuth/docs/ITandDesign/affiliatecontract";
import ITandDesign_licenseContract from "../views/backAuth/docs/ITandDesign/licensecontract";
// Entertainment and Media
import entertainmentAndMedia from "../views/backAuth/docs/entertainmentAndMedia/entertainmentandmedia";
import entertainmentAndMedia_partnershipContract from "../views/backAuth/docs/entertainmentAndMedia/partnershipcontract";
import entertainmentAndMedia_foundersContract from "../views/backAuth/docs/entertainmentAndMedia/founderscontract";
import entertainmentAndMedia_financeContract from "../views/backAuth/docs/entertainmentAndMedia/financecontract";
import entertainmentAndMedia_staffContract from "../views/backAuth/docs/entertainmentAndMedia/staffcontract";
import entertainmentAndMedia_softwareLicensing from "../views/backAuth/docs/entertainmentAndMedia/softwarelicense";
import entertainmentAndMedia_contractForService from "../views/backAuth/docs/entertainmentAndMedia/contractforservice";
import entertainmentAndMedia_trainingContract from "../views/backAuth/docs/entertainmentAndMedia/trainingcontract";
import entertainmentAndMedia_equipmentLeasing from "../views/backAuth/docs/entertainmentAndMedia/equipmentleasing";
import entertainmentAndMedia_affiliateContract from "../views/backAuth/docs/entertainmentAndMedia/affiliatecontract";
import entertainmentAndMedia_licenseContract from "../views/backAuth/docs/entertainmentAndMedia/licensecontract";
// E-commerce, Retail & Wholesale
import ecommerceRetailWholesale from "../views/backAuth/docs/ecommerceRetailWholesale/ecommerceretailwholesale";
import ecommerceRetailWholesale_partnershipContract from "../views/backAuth/docs/ecommerceRetailWholesale/partnershipcontract";
import ecommerceRetailWholesale_foundersContract from "../views/backAuth/docs/ecommerceRetailWholesale/founderscontract";
import ecommerceRetailWholesale_financeContract from "../views/backAuth/docs/ecommerceRetailWholesale/financecontract";
import ecommerceRetailWholesale_staffContract from "../views/backAuth/docs/ecommerceRetailWholesale/staffcontract";
import ecommerceRetailWholesale_hirepurchase from "../views/backAuth/docs/ecommerceRetailWholesale/hirepurchase";
import ecommerceRetailWholesale_contractForService from "../views/backAuth/docs/ecommerceRetailWholesale/contractforservice";
import ecommerceRetailWholesale_trainingContract from "../views/backAuth/docs/ecommerceRetailWholesale/trainingcontract";
import ecommerceRetailWholesale_affiliateContract from "../views/backAuth/docs/ecommerceRetailWholesale/affiliatecontract";
// Events
import Events from "../views/backAuth/docs/Events/events";
import Events_partnershipContract from "../views/backAuth/docs/Events/partnershipcontract";
import Events_foundersContract from "../views/backAuth/docs/Events/founderscontract";
import Events_financeContract from "../views/backAuth/docs/Events/financecontract";
import Events_staffContract from "../views/backAuth/docs/Events/staffcontract";
import Events_sponsorshipContract from "../views/backAuth/docs/Events/sponsorshipcontract";
import Events_contractForService from "../views/backAuth/docs/Events/contractforservice";
import Events_trainingContract from "../views/backAuth/docs/Events/trainingcontract";
import Events_equipmentLeasing from "../views/backAuth/docs/Events/equipmentleasing";
import Events_affiliateContract from "../views/backAuth/docs/Events/affiliatecontract";
// Education, Training & Consulting
import educationTrainingConsulting from "../views/backAuth/docs/educationTrainingConsulting/educationtrainingconsulting";
import educationTrainingConsulting_partnershipContract from "../views/backAuth/docs/educationTrainingConsulting/partnershipcontract";
import educationTrainingConsulting_foundersContract from "../views/backAuth/docs/educationTrainingConsulting/founderscontract";
import educationTrainingConsulting_financeContract from "../views/backAuth/docs/educationTrainingConsulting/financecontract";
import educationTrainingConsulting_staffContract from "../views/backAuth/docs/educationTrainingConsulting/staffcontract";
import educationTrainingConsulting_contractForService from "../views/backAuth/docs/educationTrainingConsulting/contractforservice";
import educationTrainingConsulting_trainingContract from "../views/backAuth/docs/educationTrainingConsulting/trainingcontract";
import educationTrainingConsulting_affiliateContract from "../views/backAuth/docs/educationTrainingConsulting/affiliatecontract";
// Leisure, Food & Drinks
import leisureFoodDrinks from "../views/backAuth/docs/leisureFoodDrinks/leisurefooddrinks";
import leisureFoodDrinks_partnershipContract from "../views/backAuth/docs/leisureFoodDrinks/partnershipcontract";
import leisureFoodDrinks_foundersContract from "../views/backAuth/docs/leisureFoodDrinks/founderscontract";
import leisureFoodDrinks_financeContract from "../views/backAuth/docs/leisureFoodDrinks/financecontract";
import leisureFoodDrinks_staffContract from "../views/backAuth/docs/leisureFoodDrinks/staffcontract";
import leisureFoodDrinks_contractForService from "../views/backAuth/docs/leisureFoodDrinks/contractforservice";
import leisureFoodDrinks_trainingContract from "../views/backAuth/docs/leisureFoodDrinks/trainingcontract";
import leisureFoodDrinks_equipmentLeasing from "../views/backAuth/docs/leisureFoodDrinks/equipmentleasing";
import leisureFoodDrinks_licenseContract from "../views/backAuth/docs/leisureFoodDrinks/licensecontract";

// -----------EDITS------------
import editSingleDoc from "../views/backAuth/edits/editDoc";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "*",
    name: "pagenotfound",
    component: pageNotFound
  },
  {
    path: "/test",
    name: "test",
    component: test
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/getting-started",
    name: "Getting Started",
    component: GettingStarted
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact
  },
  {
    path: "/terms-of-service",
    name: "TermsOfService",
    component: TermsOfService
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy
  },
  {
    path: "/faqs",
    name: "FAQs",
    component: FAQs
  },
  {
    path: "/subscription",
    name: "Subscription",
    component: Subscription,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresVisitor: true
    }
  },
  // {
  //   path: "/logout",
  //   name: "logout",
  //   component: Logout,
  //   meta: {
  //     requiresVisitor: true
  //   }
  // },
  {
    path: "/signup",
    name: "Signup",
    component: SignUp,
    meta: {
      requiresVisitor: true
    }
  },
  // User Backend Pages
  {
    path: "/activate/:activateFromEmail",
    name: "Activate",
    component: Activate
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    alias: "/docs",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/messages",
    name: "Messages",
    component: Messages,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/my-documents",
    name: "mydocuments",
    component: MyDocuments,
    alias: ["/docs/more", "/docs/edit"],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/more/:id",
    name: "singledocumentoptions",
    component: SingleDocumentOptions,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: "doc/edit/:id",
  //   name: "singledocumentEDIT",
  //   component: SingleDocumentEDIT,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    path: "/legalboxes",
    name: "Legalboxes",
    component: Legalboxes,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/general",
    name: "general",
    component: General,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/general/non-disclosure",
    name: "nondisclosure",
    component: NonDisclosure,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/general/non-compete",
    name: "noncompete",
    component: NonCompete,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/general/non-circumvention",
    name: "noncircumvention",
    component: NonCircumvention,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/general/contract-of-sale",
    name: "contractofsale",
    component: ContractOfSale,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/general/memorandum-of-understanding",
    name: "memorandumofunderstanding",
    component: MemorandumOfUnderstanding,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/general/loan-contract",
    name: "loancontract",
    component: LoanContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/general/receipt",
    name: "receipts",
    component: Receipts,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/general/invoice",
    name: "invoices",
    component: Invoices,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/general/upload",
    name: "upload",
    component: Upload,
    meta: {
      requiresAuth: true
    }
  },
  // Fashion and Beauty
  {
    path: "/docs/fashion-and-beauty",
    name: "fashionandbeauty",
    component: fashionAndBeauty,
    meta: {
      requiresAuth: true,
      breadCrumbs: [
        {
          text: "Fashion & Beauty",
          to: "/docs/fashion-and-beauty"
        }
      ]
    },
    children: [
      {
        path: "/docs/fashion-and-beauty/partnership-contract",
        name: "fashionAndBeauty_partnershipcontract",
        component: fashionAndBeauty_partnershipContract,
        meta: {
          requiresAuth: true,
          breadCrumbs: [
            {
              text: "Partnership Contract",
              disabled: false,
              to: "/docs/fashion-and-beauty/partnership-ccontract"
            }
          ]
        }
      },
      {
        path: "/docs/fashion-and-beauty/founders-contract",
        name: "fashionAndBeauty_founderscontract",
        component: fashionAndBeauty_foundersContract,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/docs/fashion-and-beauty/finance-contract",
        name: "fashionAndBeauty_financecontract",
        component: fashionAndBeauty_financeContract,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/docs/fashion-and-beauty/staff-contract",
        name: "fashionAndBeauty_staffcontract",
        component: fashionAndBeauty_staffContract,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/docs/fashion-and-beauty/equipment-leasing",
        name: "fashionAndBeauty_equipmentleasing",
        component: fashionAndBeauty_equipmentLeasing,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/docs/fashion-and-beauty/contract-for-service",
        name: "fashionAndBeauty_contractforservice",
        component: fashionAndBeauty_contractForService,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/docs/fashion-and-beauty/training-contract",
        name: "fashionAndBeauty_trainingcontract",
        component: fashionAndBeauty_trainingContract,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  // IT and Design
  {
    path: "/docs/it-and-design",
    name: "itanddesign",
    component: ITandDesign,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/it-and-design/partnership-contract",
    name: "ITandDesign_partnershipcontract",
    component: ITandDesign_partnershipContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/it-and-design/founders-contract",
    name: "ITandDesign_founderscontract",
    component: ITandDesign_foundersContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/it-and-design/finance-contract",
    name: "ITandDesign_financecontract",
    component: ITandDesign_financeContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/it-and-design/staff-contract",
    name: "ITandDesign_staffcontract",
    component: ITandDesign_staffContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/it-and-design/software-license",
    name: "ITandDesign_softwareLicense",
    component: ITandDesign_softwareLicensing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/it-and-design/contract-for-service",
    name: "ITandDesign_contractforservice",
    component: ITandDesign_contractForService,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/it-and-design/training-contract",
    name: "ITandDesign_trainingcontract",
    component: ITandDesign_trainingContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/it-and-design/sponsorship-contract",
    name: "ITandDesign_sponsorshipcontract",
    component: ITandDesign_sponsorshipContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/it-and-design/affiliate-contract",
    name: "ITandDesign_affiliatecontract",
    component: ITandDesign_affiliateContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/it-and-design/license-contract",
    name: "ITandDesign_licensecontract",
    component: ITandDesign_licenseContract,
    meta: {
      requiresAuth: true
    }
  },
  // Entertainment and Media
  {
    path: "/docs/entertainment-and-media/partnership-contract",
    name: "entertainmentAndMedia_partnershipcontract",
    component: entertainmentAndMedia_partnershipContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/entertainment-and-media/founders-contract",
    name: "entertainmentAndMedia_founderscontract",
    component: entertainmentAndMedia_foundersContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/entertainment-and-media/finance-contract",
    name: "entertainmentAndMedia_financecontract",
    component: entertainmentAndMedia_financeContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/entertainment-and-media/staff-contract",
    name: "entertainmentAndMedia_staffcontract",
    component: entertainmentAndMedia_staffContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/entertainment-and-media/software-license",
    name: "entertainmentAndMedia_softwareLicense",
    component: entertainmentAndMedia_softwareLicensing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/entertainment-and-media/contract-for-service",
    name: "entertainmentAndMedia_contractforservice",
    component: entertainmentAndMedia_contractForService,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/entertainment-and-media/training-contract",
    name: "entertainmentAndMedia_trainingcontract",
    component: entertainmentAndMedia_trainingContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/entertainment-and-media/equipment-leasing",
    name: "entertainmentAndMedia_equipmentleasing",
    component: entertainmentAndMedia_equipmentLeasing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/entertainment-and-media/affiliate-contract",
    name: "entertainmentAndMedia_affiliatecontract",
    component: entertainmentAndMedia_affiliateContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/entertainment-and-media/license-contract",
    name: "entertainmentAndMedia_licensecontract",
    component: entertainmentAndMedia_licenseContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/entertainment-and-media",
    name: "entertainmentandmedia",
    component: entertainmentAndMedia,
    meta: {
      requiresAuth: true
    }
  },
  // E-commerce, Retail & Wholesale
  {
    path: "/docs/ecommerce-retail-wholesale/partnership-contract",
    name: "ecommerceRetailWholesale_partnershipcontract",
    component: ecommerceRetailWholesale_partnershipContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/ecommerce-retail-wholesale/founders-contract",
    name: "ecommerceRetailWholesale_founderscontract",
    component: ecommerceRetailWholesale_foundersContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/ecommerce-retail-wholesale/finance-contract",
    name: "ecommerceRetailWholesale_financecontract",
    component: ecommerceRetailWholesale_financeContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/ecommerce-retail-wholesale/staff-contract",
    name: "ecommerceRetailWholesale_staffcontract",
    component: ecommerceRetailWholesale_staffContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/ecommerce-retail-wholesale/hire-purchase",
    name: "ecommerceRetailWholesale_hirepurchase",
    component: ecommerceRetailWholesale_hirepurchase,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/ecommerce-retail-wholesale/contract-for-service",
    name: "ecommerceRetailWholesale_contractforservice",
    component: ecommerceRetailWholesale_contractForService,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/ecommerce-retail-wholesale/training-contract",
    name: "ecommerceRetailWholesale_trainingcontract",
    component: ecommerceRetailWholesale_trainingContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/ecommerce-retail-wholesale/affiliate-contract",
    name: "ecommerceRetailWholesale_affiliatecontract",
    component: ecommerceRetailWholesale_affiliateContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/ecommerce-retail-wholesale",
    name: "ecommerceretailwholesale",
    component: ecommerceRetailWholesale,
    meta: {
      requiresAuth: true
    }
  },
  // Events
  {
    path: "/docs/events",
    name: "events",
    component: Events,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/events/partnership-contract",
    name: "Events_partnershipcontract",
    component: Events_partnershipContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/events/founders-contract",
    name: "Events_founderscontract",
    component: Events_foundersContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/events/finance-contract",
    name: "Events_financecontract",
    component: Events_financeContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/events/staff-contract",
    name: "Events_staffcontract",
    component: Events_staffContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/events/sponsorship-contract",
    name: "Events_sponsorshipcontract",
    component: Events_sponsorshipContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/events/contract-for-service",
    name: "Events_contractforservice",
    component: Events_contractForService,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/events/training-contract",
    name: "Events_trainingcontract",
    component: Events_trainingContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/events/equipment-leasing",
    name: "Events_equipmentleasing",
    component: Events_equipmentLeasing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/events/affiliate-contract",
    name: "Events_affiliatecontract",
    component: Events_affiliateContract,
    meta: {
      requiresAuth: true
    }
  },
  // Education, Training & Consulting
  {
    path: "/docs/education-training-consulting",
    name: "educationTrainingConsulting",
    component: educationTrainingConsulting,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/education-training-consulting/partnership-contract",
    name: "educationTrainingConsulting_partnershipcontract",
    component: educationTrainingConsulting_partnershipContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/education-training-consulting/founders-contract",
    name: "educationTrainingConsulting_founderscontract",
    component: educationTrainingConsulting_foundersContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/education-training-consulting/finance-contract",
    name: "educationTrainingConsulting_financecontract",
    component: educationTrainingConsulting_financeContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/education-training-consulting/staff-contract",
    name: "educationTrainingConsulting_staffcontract",
    component: educationTrainingConsulting_staffContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/education-training-consulting/contract-for-service",
    name: "educationTrainingConsulting_contractforservice",
    component: educationTrainingConsulting_contractForService,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/education-training-consulting/training-contract",
    name: "educationTrainingConsulting_trainingcontract",
    component: educationTrainingConsulting_trainingContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/education-training-consulting/affiliate-contract",
    name: "educationTrainingConsulting_affiliatecontract",
    component: educationTrainingConsulting_affiliateContract,
    meta: {
      requiresAuth: true
    }
  },
  // Leisure, Food & Drinks
  {
    path: "/docs/leisure-food-drinks/partnership-contract",
    name: "leisureFoodDrinks_partnershipcontract",
    component: leisureFoodDrinks_partnershipContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/leisure-food-drinks/founders-contract",
    name: "leisureFoodDrinks_founderscontract",
    component: leisureFoodDrinks_foundersContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/leisure-food-drinks/finance-contract",
    name: "leisureFoodDrinks_financecontract",
    component: leisureFoodDrinks_financeContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/leisure-food-drinks/staff-contract",
    name: "leisureFoodDrinks_staffcontract",
    component: leisureFoodDrinks_staffContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/leisure-food-drinks/contract-for-service",
    name: "leisureFoodDrinks_contractforservice",
    component: leisureFoodDrinks_contractForService,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/leisure-food-drinks/training-contract",
    name: "leisureFoodDrinks_trainingcontract",
    component: leisureFoodDrinks_trainingContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/leisure-food-drinks/equipment-leasing",
    name: "leisureFoodDrinks_equipmentleasing",
    component: leisureFoodDrinks_equipmentLeasing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/leisure-food-drinks/license-contract",
    name: "leisureFoodDrinks_licensecontract",
    component: leisureFoodDrinks_licenseContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/leisure-food-drinks",
    name: "leisurefooddrinks",
    component: leisureFoodDrinks,
    meta: {
      requiresAuth: true
    }
  },
  // +++++++EDITS+++++++
  {
    path: "/docs/edit/:id",
    name: "editSingleDoc",
    component: editSingleDoc,
    meta: {
      requiresAuth: true
    }
  }
  // {
  //   path: "docs/more/:id",
  //   name: "singledocumentoptions",
  //   component: SingleDocumentOptions,
  //   meta: {
  //     requiresAuth: true
  //   }
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
