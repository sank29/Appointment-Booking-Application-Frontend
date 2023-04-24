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

let getAllDoctors = async () => {
  let url = `http://localhost:8888//getAllDoctors?key=${uuid}`;

  // let ratingUrl = `http://localhost:8888/rating?key=${uuid}`;

  let doctorsDetails = await fetch(url);

  let data = await doctorsDetails.json();

  displayAllDoctors(data);
};

let displayAllDoctors = (data) => {
  data.forEach((eachDoctor) => {
    let div = document.createElement("div");

    let doctorName = document.createElement("p");
    doctorName.innerText = eachDoctor.name + ":";

    let doctorId = document.createElement("p");
    doctorId.innerText = eachDoctor.doctorId;

    div.append(doctorName, doctorId);
    allRegisterDoctorId.append(div);
  });

  displayForm(updateAppointmentData);
};

let displayForm = (updateAppointmentData) => {
  console.log(updateAppointmentData);
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

        <button id="formButton" type="submit" class="btn btn-primary">
          Update Appointment
        </button>
      </form>

      <a href="../patientAllAppointment.html">Return Back</a>
    `;

  formArea.innerHTML += html;

  let form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let newAppointmentDate = document.getElementById(
      "formAppointmentDate"
    ).value;

    let newDoctor = parseInt(document.getElementById("doctorId").value);

    let updatedAppointment = {};

    updatedAppointment.appointmentId = updateAppointmentData.appointmentId;

    updatedAppointment.patient = updateAppointmentData.patient;

    updatedAppointment.appointmentDateAndTime = newAppointmentDate;

    updatedAppointment.doctor = updateAppointmentData.doctor;
    updatedAppointment.doctor.doctorId = newDoctor;

    sendUpdatedAppointment(updatedAppointment);
  });
};

let sendUpdatedAppointment = async (updatedAppointment) => {
  let url = `http://localhost:8888/updateAppointment?key=${uuid}`;

  let data = await fetch(url, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(updatedAppointment),
  });

  let data1 = await data.json();

  console.log(data1);

  if (data1.errorMsg != null) {
    alert(data1.errorMsg);
  } else {
    alert("You update appointment successfully");

    localStorage.setItem("updateAppointment", JSON.stringify(data1));
  }
};

getAllDoctors();
