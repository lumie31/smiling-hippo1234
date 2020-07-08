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
export function documentCreation() {
  // console.log($);
  $(".scrollUpDownButton#scrollUp").bind("click", function() {
    $("html, body").animate(
      { scrollTop: $(".bodyWrapper").offset().top },
      1000
    );
    return false;
  });
  $(".scrollUpDownButton#scrollDown").bind("click", function() {
    $("html, body").animate(
      { scrollTop: $(".contractsignatory").offset().top },
      1000
    );
    return false;
  });

  $(".saveOnly").hide();
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 600) {
      $(".saveOnly").hide();
      $(".saveOnly").show();
    } else {
      $(".saveOnly").show();
      $(".saveOnly").hide();
    }
  });
}
