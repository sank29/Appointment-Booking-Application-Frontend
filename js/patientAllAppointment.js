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

let allAppointmentArea = document.getElementById("AllAppointmentArea");

let allAppointmentData;

let getAllAppointment = async () => {
  let url = `http://localhost:8888/allAppointment?key=${uuid}`;

  let data = await fetch(url);

  allAppointmentData = await data.json();

  let upcomingAppointment = filterAppointment(
    allAppointmentData,
    "upcommingAppointment"
  );

  displayAllAppointment(upcomingAppointment);
};

let displayAllAppointment = (allAppointmentData) => {
  allAppointmentArea.innerHTML = "";

  allAppointmentData.forEach((data) => {
    let html = "";

    if (data.filterType == "upcommingAppointment") {
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
              <a id="disable" class="btn btn-primary upcommingAppointmentButton">Update Appointment</a>

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
                <a id="disable" class="btn btn-primary pastAppoinmentButton">Review Appointment</a>
            </div>
        </div>`;
    }

    allAppointmentArea.innerHTML += html;

    const date = new Date(data.appointmentDateAndTime);

    if (date.getTime() < Date.now()) {
      document.getElementById("disable").disabled = true;
      // console.log(document.getElementById("disable"));
    } else {
      // console.log("This date is fature");
    }
  });

  let upcommingAppointmentButton = document.getElementsByClassName(
    "upcommingAppointmentButton"
  );

  upcommingAppointmentButton = [...upcommingAppointmentButton];

  upcommingAppointmentButton.forEach((eachAppointment, index) => {
    eachAppointment.addEventListener("click", (event) => {
      localStorage.setItem(
        "updateAppointment",
        JSON.stringify(allAppointmentData[index])
      );

      window.location.href = "../updateAppointment.html";
    });
  });

  let pastAppoinmentButton = document.getElementsByClassName(
    "pastAppoinmentButton"
  );

  pastAppoinmentButton = [...pastAppoinmentButton];

  pastAppoinmentButton.forEach((eachAppointment, index) => {
    eachAppointment.addEventListener("click", (event) => {
      setObjectForReview(allAppointmentData[index]);
      window.location.href = "../reviewPage.html";
    });
  });
};

getAllAppointment();

// filter based on past appointment and upcomming appointment

let appointmentFilter = document.getElementById("appointmentFilter");

appointmentFilter.addEventListener("change", (event) => {
  let filterValue = appointmentFilter.value;

  let pastAppointments = filterAppointment(allAppointmentData, filterValue);

  displayAllAppointment(pastAppointments);
});

let filterAppointment = (data, filterValue) => {
  let presentDate = new Date(); // get the current date and time
  presentDate = new Date(presentDate.getTime() + 60 * 60 * 1000); // add 1 hour in milliseconds

  let filterData = [];

  data.forEach((eachAppointment) => {
    const date = new Date(eachAppointment.appointmentDateAndTime);
    if (filterValue == "upcommingAppointment") {
      if (presentDate < date) {
        filterData.push(eachAppointment);
        eachAppointment.filterType = filterValue;
      }
    } else {
      if (presentDate > date) {
        filterData.push(eachAppointment);
        eachAppointment.filterType = filterValue;
      }
    }
  });

  return filterData;
};

let setObjectForReview = (allAppointmentData) => {
  let reviewObject = {};

  reviewObject.patient = allAppointmentData.patient;
  reviewObject.doctor = allAppointmentData.doctor;
  reviewObject.appointment = allAppointmentData;

  localStorage.setItem("reviewAppointment", JSON.stringify(reviewObject));
};
