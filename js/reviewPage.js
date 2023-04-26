////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

////////////////adding navbar//////////////////

import navbar from "../components/navbar.js";

let navabar = document.getElementById("navabar");

navabar.innerHTML = navbar;
/////////////////end of adding navbar///////////

let formArea = document.getElementById("formArea");
let reviewAppointment =
  JSON.parse(localStorage.getItem("reviewAppointment")) || null;

let displayForm = async (databaseReview) => {
  let html;
  if (databaseReview == null || databaseReview.reviewContent == undefined) {
    html = `
        <form id="giveReviewForm">
            <div class="mb-3">
            <label for="reviewContent" class="form-label">Review</label>
            <input
                type="text"
                class="form-control"
                id="reviewContent"
                value= ""
            />
            </div>

            <div class="mb-3">
            <label for="rating" class="form-label">Rating</label>
            <input type="text" class="form-control" id="rating" value= ""/>
            </div>

            <button id="formButton" type="submit" class="btn btn-primary">
            Give Review
            </button>
        </form>

        <a href="../patientAllAppointment.html">Return Back</a>
        `;
  } else {
    html = `
        <form id="updateReviewForm">
                <div class="mb-3">
                <label for="reviewContent" class="form-label">Review</label>
                <input
                    type="text"
                    class="form-control"
                    id="reviewContent"
                    value="${databaseReview.reviewContent}"
                />
                </div>

                <div class="mb-3">
                <label for="rating" class="form-label">Rating</label>
                <input type="text" class="form-control" id="rating" value= "${databaseReview.rating}"/>
                </div>

                <button id="formButton" type="submit" class="btn btn-primary">
                Update Review
                </button>
            </form>

            <a href="../patientAllAppointment.html">Return Back</a>
        `;

    displayReviewOnPage(databaseReview);
  }

  formArea.innerHTML += html;

  let giveReviewForm = document.getElementById("giveReviewForm");

  if (giveReviewForm != null) {
    giveReviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let reviewContent = document.getElementById("reviewContent").value;

      let rating = parseInt(document.getElementById("rating").value);

      reviewAppointment.reviewContent = reviewContent;
      reviewAppointment.rating = rating;

      giveReview(reviewAppointment);
      window.location.reload();
    });
  }

  let updateReviewForm = document.getElementById("updateReviewForm");

  if (updateReviewForm != null) {
    updateReviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let reviewContent = document.getElementById("reviewContent").value;

      let rating = parseInt(document.getElementById("rating").value);

      reviewAppointment.reviewContent = reviewContent;
      reviewAppointment.rating = rating;

      updateReview(reviewAppointment);
      window.location.reload();
    });
  }
};

let giveReview = async (reviewObject) => {
  let url = `http://localhost:8888/review?key=${uuid}`;

  let reviewData = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(reviewObject),
  });

  reviewData = await reviewData.json();
  console.log(reviewData);

  localStorage.setItem("reviewAppointment", JSON.stringify(reviewData));

  if (reviewData.errorMsg != undefined) {
    alert(reviewData.errorMsg);
  }
};

let getReview = async (reviewAppointment) => {
  let url = `http://localhost:8888/getReview?key=${uuid}`;

  let reviewDataPresentInDatabase = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(reviewAppointment),
  });

  reviewDataPresentInDatabase = await reviewDataPresentInDatabase.json();
  console.log(reviewDataPresentInDatabase);

  return reviewDataPresentInDatabase;
};

let displayData = async () => {
  let data = await getReview(reviewAppointment);

  displayForm(data);
};

let displayReviewOnPage = (databaseReview) => {
  let reviewArea = document.getElementById("reviewArea");

  let heading = document.createElement("p");
  heading.innerText = "Past Review: ";

  let content = document.createElement("p");
  content.innerText = `feedback: ${databaseReview.reviewContent}`;

  let rating = document.createElement("p");
  rating.innerText = `Rating: ${databaseReview.rating}`;

  reviewArea.append(heading, content, rating);
};

let updateReview = async (updateReview) => {
  let url = `http://localhost:8888/updateReview?key=${uuid}`;

  let updatedReview = await fetch(url, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(updateReview),
  });

  updatedReview = await updatedReview.json();
  console.log(updatedReview);
};

displayData();
