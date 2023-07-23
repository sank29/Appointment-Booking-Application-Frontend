////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

////////////////adding navbar//////////////////

import navbar from "../components/doctorNavbar.js";

let navabar = document.getElementById("navabar");

navabar.innerHTML = navbar;
/////////////////end of adding navbar///////////

let formArea = document.getElementById("formArea");
let reviewAppointment = JSON.parse(localStorage.getItem("seeReview")) || null;
let reviewId;

let getReview = async (reviewAppointment) => {
  let url = `http://localhost:8888/getReivew?key=${uuid}`;

  let reviewDataPresentInDatabase = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(reviewAppointment),
  });

  reviewDataPresentInDatabase = await reviewDataPresentInDatabase.json();
  reviewId = reviewDataPresentInDatabase.reviewId;

  console.log(reviewAppointment);

  return reviewDataPresentInDatabase;
};

let displayData = async () => {
  let data = await getReview(reviewAppointment);

  displayReviewOnPage(data);
};

let displayReviewOnPage = (databaseReview) => {
  let reviewArea = document.getElementById("reviewArea");

  if (databaseReview.errorMsg != undefined) {
    let heading = document.createElement("p");
    heading.innerText = databaseReview.errorMsg;

    let returnBack = document.createElement("a");
    returnBack.innerText = "Return Back";
    returnBack.href = "../doctorAppointmentPage.html";

    reviewArea.append(heading, returnBack);
  } else {
    let heading = document.createElement("p");
    heading.innerText = "Patient Name: " + databaseReview.patient.name;

    let content = document.createElement("p");
    content.innerText = `Feedback: ${databaseReview.reviewContent}`;

    let rating = document.createElement("p");
    rating.innerText = `Rating: ${databaseReview.rating}`;

    let returnBack = document.createElement("a");
    returnBack.innerText = "Return Back";
    returnBack.href = "../doctorAppointmentPage.html";

    reviewArea.append(heading, content, rating, returnBack);
  }
};

displayData();
