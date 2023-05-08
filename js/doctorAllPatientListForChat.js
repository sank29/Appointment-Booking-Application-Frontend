////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

// get all doctor's present in database

let cardArea = document.getElementById("cardArea");

////////////////adding navbar//////////////////

import navbar from "../components/doctorNavbar.js";

let navabar = document.getElementById("navabar");

navabar.innerHTML = navbar;
/////////////////end of adding navbar///////////

let getAllDoctors = async () => {
  let url = `http://localhost:8888/listOfPatient?key=${uuid}`;

  // let ratingUrl = `http://localhost:8888/rating?key=${uuid}`;

  let patientDetails = await fetch(url);

  let data = await patientDetails.json();

  // let rating = await fetch(ratingUrl);

  // let ratingData = await rating.json();        /// rating part not done do this

  renderDoctorsDetails(data);
};

getAllDoctors();

let renderDoctorsDetails = (data) => {
  console.log(data);
  data.forEach((data, index) => {
    let card = `
  <div class="card" style="width: 30rem">
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
       
       <p>Email id ${data.email}</p>
       <p>Mobile no ${data.mobileNo}</p>

        <button type="button" class="btn btn-primary bookAppointment">Chat</button>
      </div>
    </div>
  `;

    cardArea.innerHTML += card;
  });

  let bookAppointment = document.querySelectorAll(".bookAppointment");

  addEventToButton(bookAppointment, data);
};

// add event listener to all appointment booking button

// set doctor id .. user click on specific doctor

let addEventToButton = (bookAppointment, data) => {
  bookAppointment.forEach((eachButton, index) => {
    eachButton.addEventListener("click", (event) => {
      console.log(data[index]);

      let patientData = data[index];

      localStorage.setItem("chatPatient", JSON.stringify(patientData));
      window.location.href = "../doctorToPatientChat.html";
    });
  });
};
