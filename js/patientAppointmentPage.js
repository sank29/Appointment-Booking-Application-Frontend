////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

let loginORNot = async () => {
  let url = `http://localhost:8888/checkLogin/${uuid}`;

  let loginOrNot = await fetch(url);

  let data = await loginOrNot.json();

  if (!data.loginOrNot) {
    alert("Please login before accessing this page!!!!");

    window.location.href = "../index.html";
  }
};

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

// get all doctor's present in database

let cardArea = document.getElementById("cardArea");

let bookAppointment = document.getElementsByClassName("bookAppointment");

let getAllDoctors = async () => {
  // let url = `http://localhost:8888//getAllDoctors?key=${uuid}`;

  let ratingUrl = `http://localhost:8888/rating?key=${uuid}`;

  let doctorsDetails = await fetch(url);

  let data = await doctorsDetails.json();

  let rating = await await fetch(ratingUrl);

  let ratingData = await rating.json();

  renderDoctorsDetails(data, ratingData);
};

getAllDoctors();

let renderDoctorsDetails = (data, rating) => {
  console.log(rating);

  data.forEach((data) => {
    let card = `
  <div class="card" style="width: 30rem">
      <img src="https://img.freepik.com/free-photo/smiling-touching-arms-crossed-room-hospital_1134-799.jpg" class="card-img-top" alt="..." />
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

          <p class="card-text">Star Rating</p>
        
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>

       </div>

        <button type="button" class="btn btn-primary bookAppointment">Book Appointment</button>
      </div>
    </div>
  `;

    cardArea.innerHTML += card;
  });
};
