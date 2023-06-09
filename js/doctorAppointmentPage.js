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

let allAppointmentArea = document.getElementById("AllAppointmentArea");

let getUpcommingAppointment = async () => {
  let url = `http://localhost:8888/upcomingAppointments?key=${uuid}`;

  let data = await fetch(url);

  let upcomingAppointment = await data.json();

  displayAllAppointment(upcomingAppointment, "upcommingAppointment");
};

let getPastAppointment = async () => {
  let url = `http://localhost:8888/pastAppointments?key=${uuid}`;

  let data = await fetch(url);

  let pastAppointment = await data.json();

  displayAllAppointment(pastAppointment, "pastAppointment");
};

let displayAllAppointment = (allAppointmentData, filterValue) => {
  if (allAppointmentData.errorMsg != undefined) {
    console.log(allAppointmentData.errorMsg);
    return;
  }
  allAppointmentArea.innerHTML = "";

  allAppointmentData.forEach((data) => {
    let html;

    if (filterValue == "upcommingAppointment") {
      html = `
      <div class="card" style="width: 18rem;">

          <div class="card-body">
              <h5 class="card-title">Appointment</h5>
              <p>Appointment Data and Time: ${data.appointmentDateAndTime}</p>
              <p>Patient Name: ${data.patient.name}</p>
              <p>Patient Mobile Number: ${data.patient.mobileNo}</p>
              <p>Patient Email Address: ${data.patient.email}</p>
          </div>
      </div>`;
    } else {
      html = `
      <div class="card" style="width: 18rem;">

          <div class="card-body">
              <h5 class="card-title">Appointment</h5>
              <p>Appointment Data and Time: ${data.appointmentDateAndTime}</p>
              <p>Patient Name: ${data.patient.name}</p>
              <p>Patient Mobile Number: ${data.patient.mobileNo}</p>
              <p>Patient Email Address: ${data.patient.email}</p>
              <a id="disable" class="btn btn-primary seeReview">See Review</a>
          </div>
      </div>`;
    }

    allAppointmentArea.innerHTML += html;
  });

  let seeReview = document.getElementsByClassName("seeReview");

  seeReview = [...seeReview];

  seeReview.forEach((eachAppointment, index) => {
    eachAppointment.addEventListener("click", (event) => {
      console.log(index);
      localStorage.setItem(
        "seeReview",
        JSON.stringify(allAppointmentData[index])
      );
      window.location.href = "../doctorReviewPage.html";
    });
  });
};

let appointmentFilter = document.getElementById("appointmentFilter");

appointmentFilter.addEventListener("change", (event) => {
  let value = appointmentFilter.value;

  if (value == "pastAppointment") {
    getPastAppointment();
  } else {
    getUpcommingAppointment();
  }
});

getUpcommingAppointment();
