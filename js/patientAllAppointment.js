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

let AllAppointmentArea = document.getElementById("AllAppointmentArea");

let getAllAppointment = async () => {
  let url = `http://localhost:8888/allAppointment?key=${uuid}`;

  let data = await fetch(url);

  let allAppointmentData = await data.json();

  displayAllAppointment(allAppointmentData);
};

let displayAllAppointment = (allAppointmentData) => {
  console.log(allAppointmentData);

  allAppointmentData.forEach((data) => {
    let html = `
    
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
            <a href="../updateAppointment.html" class="btn btn-primary">Update Appointment</a>
        </div>
    </div>`;

    AllAppointmentArea.innerHTML += html;
  });
};

getAllAppointment();
