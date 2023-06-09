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

let getAllDoctors = async () => {
  let url = `http://localhost:8888//getAllDoctors?key=${uuid}`;

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
    let card = `
  <div class="card" style="width: 30rem">
      <img src=${data.doctorImg} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
       
       <div class = "rating">

          <p class="card-text">Doctor Rating</p>
        
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>

       </div>

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

      let doctorData = data[index];

      localStorage.setItem("chatDoctor", JSON.stringify(doctorData));
      window.location.href = "../patientToDoctorChat.html";
    });
  });
};
