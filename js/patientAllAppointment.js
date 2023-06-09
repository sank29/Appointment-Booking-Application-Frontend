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

  if (allAppointmentData.length == 0) {
    allAppointmentArea.style.width = "50%";
    allAppointmentArea.style.margin = "auto";

    let p = document.createElement("p");
    p.innerText = "No Upcoming Appointments. Please book an appointment.";
    p.style.margin = "auto";

    allAppointmentArea.append(p);

    console.log("HIIIIIIII");

    return;
  }
  // neutral all properties

  allAppointmentArea.style.width = "";
  allAppointmentArea.style.margin = "";

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
              <a id="disable" class="btn btn-danger deleteAppointmentButton">Delete Appointment</a>
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
  });

  // upcomming appointment

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

  // past Appointment

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

  // delete appointment

  let deleteAppointmentButton = document.getElementsByClassName(
    "deleteAppointmentButton"
  );

  deleteAppointmentButton = [...deleteAppointmentButton];

  deleteAppointmentButton.forEach((eachAppointment, index) => {
    eachAppointment.addEventListener("click", async (event) => {
      let result = confirm("Are sure to delete appointment");

      if (result) {
        let url = `http://localhost:8888//appointment?key=${uuid}`;

        let data = await fetch(url, {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(allAppointmentData[index]),
        });

        data = await data.json();

        console.log(data);

        // localStorage.removeItem("updateAppointment");
        getAllAppointment();
      }

      // window.location.href = "../updateAppointment.html";
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
