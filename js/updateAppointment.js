////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

// get all doctor's present in database

let cardArea = document.getElementById("cardArea");

////////////////adding navbar//////////////////

import navbar from "../components/navbar.js";

let navabar = document.getElementById("navabar");

navabar.innerHTML = navbar;
/////////////////end of adding navbar///////////

let formArea = document.getElementById("formArea");
let allRegisterDoctorId = document.getElementById("allRegisterDoctorId");

let updateAppointmentData =
  JSON.parse(localStorage.getItem("updateAppointment")) || null;

console.log(updateAppointmentData);

let getAllDoctors = async () => {
  let url = `http://localhost:8888//getAllDoctors?key=${uuid}`;

  // let ratingUrl = `http://localhost:8888/rating?key=${uuid}`;

  let doctorsDetails = await fetch(url);

  let data = await doctorsDetails.json();

  displayAllDoctors(data);
};

getAllDoctors();

let displayAllDoctors = (data) => {
  data.forEach((eachDoctor) => {
    console.log(eachDoctor);
    let div = document.createElement("div");

    let doctorName = document.createElement("p");
    doctorName.innerText = eachDoctor.name + ":";

    let doctorId = document.createElement("p");
    doctorId.innerText = eachDoctor.doctorId;

    div.append(doctorName, doctorId);
    allRegisterDoctorId.append(div);
  });
};

let displayForm = (updateAppointmentData) => {
  let html = `
    <form id="form">
        <div class="mb-3">
          <label for="formAppointmentDate" class="form-label">Appointment Date</label>
          <input
            type="text"
            class="form-control"
            id="formAppointmentDate"
            aria-describedby="emailHelp"
            value= ${updateAppointmentData.appointmentDateAndTime}
          />
        </div>

        <div class="mb-3">
          <label for="doctorId" class="form-label">Doctor Id (Please choice Id from above)</label>
          <input type="text" class="form-control" id="doctorId" value=${updateAppointmentData.doctor.doctorId} />
        </div>

        <button type="submit" class="btn btn-primary">
          Update Appointment
        </button>
      </form>
    `;

  formArea.innerHTML += html;
};

displayForm(updateAppointmentData);
