////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

// get all doctor's present in database

let cardArea = document.getElementById("cardArea");

////////////////adding navbar//////////////////

import navbar from "../components/adminNavbar.js";

let navabar = document.getElementById("navabar");

navabar.innerHTML = navbar;
/////////////////end of adding navbar///////////

let getAllDoctors = async () => {
  let url = `http://localhost:8888/getValidInValidDoctors?key=${uuid}`;

  // let ratingUrl = `http://localhost:8888/rating?key=${uuid}`;

  let doctorsDetails = await fetch(url);

  let data = await doctorsDetails.json();

  // let rating = await fetch(ratingUrl);

  // let ratingData = await rating.json();        /// rating part not done do this

  renderDoctorsDetails(data);
};

getAllDoctors();

let renderDoctorsDetails = (data) => {
  data.forEach((data, index) => {
    let card;

    if (data.validDoctor == true) {
      card = `<div class="card" style="width: 30rem">
      <img src=${data.doctorImg} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">
           <p>Education: ${data.education}</p>
           <p>Experience: ${data.experience}</p>

           <p>Specialty: ${data.specialty}</p>
           <p>Insurance Acceptance: ${
             data.insuranceAcceptance == true ? "Yes" : "No"
           }</p>
           <p>Location: ${data.location}</p>
           <p>Contact Number: ${data.mobileNo}</p>
           <p>Available from: ${data.appointmentFromTime} (24 hours)</p>
           <p>Available to: ${data.appointmentToTime} (24 hours)</p>
        </p>

       <div class = "rating">

          <p class="card-text">Doctor Rating</p>
        
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>

       </div>

        <button type="button" class="btn btn-danger bookAppointment">Revok Permission</button>
      </div>
    </div>
  `;
    } else {
      card = `<div class="card" style="width: 30rem">
      <img src=${data.doctorImg} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">
           <p>Education: ${data.education}</p>
           <p>Experience: ${data.experience}</p>

           <p>Specialty: ${data.specialty}</p>
           <p>Insurance Acceptance: ${
             data.insuranceAcceptance == true ? "Yes" : "No"
           }</p>
           <p>Location: ${data.location}</p>
           <p>Contact Number: ${data.mobileNo}</p>
           <p>Available from: ${data.appointmentFromTime} (24 hours)</p>
           <p>Available to: ${data.appointmentToTime} (24 hours)</p>
        </p>

       <div class = "rating">

          <p class="card-text">Doctor Rating</p>
        
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>

       </div>

        <button type="button" class="btn btn-primary bookAppointment">Grant Permission</button>
      </div>
    </div>
  `;
    }

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
      // let confirmation = confirm("Are you sure to ")
      let doctorData = data[index];

      console.log(doctorData);

      givePermissionOrRevokPermission(doctorData);
    });
  });
};

let givePermissionOrRevokPermission = async (doctorData) => {
  if (doctorData.validDoctor == false) {
    let confirmation = confirm("Are you sure to grant permission?");

    if (confirmation == true) {
      const url = `http://localhost:8888/grantPermission?key=${uuid}`;
      let data = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(doctorData),
      });

      data = await data.json();

      if (data.errorMsg != undefined) {
        alert(data.errorMsg);
      } else {
        alert("Permission Granted");
        window.location.reload();
      }
    }
  } else {
    let confirmation = confirm("Are you sure to revoke permission?");

    if (confirmation == true) {
      const url = `http://localhost:8888/revokePermission?key=${uuid}`;
      let data = await fetch(url, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(doctorData),
      });

      data = await data.json();

      if (data.errorMsg != undefined) {
        alert(data.errorMsg);
      } else {
        alert("Permission Revoke");
        window.location.reload();
      }
    }
  }
};
