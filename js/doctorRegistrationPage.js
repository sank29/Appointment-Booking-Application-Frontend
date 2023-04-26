////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

let formArea = document.getElementById("formArea");

let displayForm = () => {
  let html = `
    <form id="form">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
          />
        </div>

        <div class="mb-3">
          <label for="specialty" class="form-label">Specialty</label>
          <input type="text" class="form-control" id="specialty" />
        </div>

        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <input type="text" class="form-control" id="location" />
        </div>

        <div class="mb-3">
          <label for="insuranceAcceptance" class="form-label">Insurance Acceptance (Enter true or false)</label>
          <input type="text" class="form-control" id="insuranceAcceptance" />
        </div>

        <div class="mb-3">
          <label for="education" class="form-label">Education</label>
          <input type="text" class="form-control" id="education" />
        </div>

        <div class="mb-3">
          <label for="experience" class="form-label">Experience</label>
          <input type="text" class="form-control" id="experience" />
        </div>

        <div class="mb-3">
          <label for="appointmentFromTime" class="form-label">Appointment From Time</label>
          <input type="number" class="form-control" id="appointmentFromTime" />
        </div>

        <div class="mb-3">
          <label for="appointmentToTime" class="form-label">Appointment To Time</label>
          <input type="number" class="form-control" id="appointmentToTime" />
        </div>

        <div class="mb-3">
          <label for="mobileNo" class="form-label">Mobile Number</label>
          <input type="number" class="form-control" id="mobileNo" />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" />
        </div>

        <div class="mb-3">
          <label for="doctorImg" class="form-label">doctor Img</label>
          <input type="text" class="form-control" id="doctorImg" />
        </div>

        <button id="formButton" type="submit" class="btn btn-primary">
          Register Doctor
        </button>
      </form>

    `;

  formArea.innerHTML += html;

  let form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;

    let specialty = document.getElementById("specialty").value;

    let location = document.getElementById("location").value;

    let insuranceAcceptance = document.getElementById(
      "insuranceAcceptance"
    ).value;

    let education = document.getElementById("education").value;

    let experience = document.getElementById("experience").value;

    let appointmentFromTime = document.getElementById(
      "appointmentFromTime"
    ).value;

    let appointmentToTime = document.getElementById("appointmentToTime").value;

    let mobileNo = document.getElementById("mobileNo").value;

    let password = document.getElementById("password").value;

    let doctorImg = document.getElementById("doctorImg").value;

    let doctorDeatils = {};

    doctorDeatils.name = name;
    doctorDeatils.specialty = specialty;
    doctorDeatils.location = location;
    doctorDeatils.insuranceAcceptance = insuranceAcceptance;
    doctorDeatils.education = education;
    doctorDeatils.experience = experience;
    doctorDeatils.appointmentFromTime = appointmentFromTime;
    doctorDeatils.appointmentToTime = appointmentToTime;
    doctorDeatils.mobileNo = mobileNo;
    doctorDeatils.password = password;
    doctorDeatils.doctorImg = doctorImg;

    sendDoctorDeatils(doctorDeatils);
  });
};

let sendDoctorDeatils = async (doctorDeatils) => {
  let url = `http://localhost:8888/registerDoctor?key=${uuid}`;

  let data = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(doctorDeatils),
  });

  let data1 = await data.json();

  console.log(data1);

  if (data1.errorMsg != null) {
    alert(data1.errorMsg);
  } else {
    alert("You register Doctor successfully");
  }
};

displayForm();
