import $ from "jquery"; //import jQuery

// To import specific jquery block of code inside of any component. follow sample below
// import {somethingWithjQuery} from './assets/js/main'
// import {backPage} from './assets/js/main'

export function somethingWithjQuery() {
  console.log($);
  // if (top.location.pathname === "/general/docs/receipts") {
  //   $("body").hide();
  // }
}

export function backPage() {
  console.log($);
  $("#removeInput").addClass("yyy");
}
