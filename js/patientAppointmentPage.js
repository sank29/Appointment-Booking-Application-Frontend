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

let getAllDoctors = async () => {
  let url = `http://localhost:8888//getAllDoctors?key=${uuid}`;

  let doctorsDetails = await fetch(url);

  let data = await doctorsDetails.json();

  renderDoctorsDetails(data);
};

getAllDoctors();

let renderDoctorsDetails = (data) => {
  console.log(data);

  data.forEach((data) => {
    let card = `
  <div class="card" style="width: 30rem">
      <img src="https://img.freepik.com/free-photo/smiling-touching-arms-crossed-room-hospital_1134-799.jpg" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">
           <p>Doctor's education: ${data.education}</p>
           <p>Doctor's experience: ${data.experience}</p>

           <p>Doctor's specialty: ${data.specialty}</p>
           <p>Doctor's insurance Acceptance: ${
             data.insuranceAcceptance == true ? "Yes" : "No"
           }</p>
           <p>Doctor's Location: ${data.location}</p>
           <p>Doctor's contact Number: ${data.mobileNo}</p>
           <p>Doctor's Available from: ${
             data.appointmentFromTime
           } (24 hours)</p>
            <p>Doctor's Available to: ${data.appointmentToTime} (24 hours)</p>
        </p>
        <a href="#" class="btn btn-primary">Book Appointment</a>
      </div>
    </div>
  `;

    cardArea.innerHTML += card;
  });
};
