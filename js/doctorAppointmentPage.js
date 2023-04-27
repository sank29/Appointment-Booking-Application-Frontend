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

  console.log(upcomingAppointment);

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
    console.log(filterValue);
    let html;

    if (filterValue == "upcommingAppointment") {
      html = `
      <div class="card" style="width: 18rem;">

      <img src="${data.doctor.doctorImg}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">Appointment</h5>
              <p>Appointment Data and Time: ${data.appointmentDateAndTime}</p>
              <p>Doctor Name: ${data.doctor.name}</p>
              <p>Doctor Experience: ${data.doctor.experience}</p>
              <p>Doctor Education: ${data.doctor.education}</p>
              <p>Doctor Specialty: ${data.doctor.specialty}</p>
              <p>Doctor Contact: ${data.doctor.mobileNo}</p>
          </div>
      </div>`;
    } else {
      html = `
      <div class="card" style="width: 18rem;">

      <img src="${data.doctor.doctorImg}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">Appointment</h5>
              <p>Appointment Data and Time: ${data.appointmentDateAndTime}</p>
              <p>Doctor Name: ${data.doctor.name}</p>
              <p>Doctor Experience: ${data.doctor.experience}</p>
              <p>Doctor Education: ${data.doctor.education}</p>
              <p>Doctor Specialty: ${data.doctor.specialty}</p>
              <p>Doctor Contact: ${data.doctor.mobileNo}</p>
              <a id="disable" class="btn btn-primary upcommingAppointmentButton">See Review</a>
          </div>
      </div>`;
    }

    allAppointmentArea.innerHTML += html;
  });
};

let appointmentFilter = document.getElementById("appointmentFilter");

appointmentFilter.addEventListener("change", (event) => {
  let value = appointmentFilter.value;

  console.log(value);

  if (value == "pastAppointment") {
    getPastAppointment();
  } else {
    getUpcommingAppointment();
  }
});

getUpcommingAppointment();
