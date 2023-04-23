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

// get available timing of perticular docotor

let doctorDetails =
  JSON.parse(window.localStorage.getItem("doctorData")) || null;

let getAvailableTiming = async () => {
  let url = `http://localhost:8888/availableTiming?key=${uuid}`;

  let timing = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(doctorDetails),
  });

  let finalTiming = await timing.json();

  displayAllTiming(finalTiming);
};

getAvailableTiming();

let displayAllTiming = async (finalTiming) => {
  let allTiming = document.getElementById("allTiming");

  finalTiming.forEach((element) => {
    let newDiv = document.createElement("div");

    let para = document.createElement("p");

    para.setAttribute("class", "display-6");

    para.innerText = element;

    newDiv.style.cursor = "pointer";
    newDiv.setAttribute("class", "allTimings");
    newDiv.append(para);

    allTiming.append(newDiv);
  });

  let allTimings = document.getElementsByClassName("allTimings");
  getPatinetTiming(allTimings);
};

let getPatinetTiming = (allTimings) => {
  let allTimingsInArray = [...allTimings];

  allTimingsInArray.forEach((eachTiming) => {
    eachTiming.addEventListener("click", (event) => {
      let confirm = window.confirm(
        `Are you sure to book appointment on ${eachTiming.innerText} of doctor ${doctorDetails.name}`
      );

      if (confirm) {
        bookAppointmentFinally(eachTiming);
        // window.location.reload();
      }
    });
  });
};

let bookAppointmentFinally = async (eachTiming) => {
  let url = `http://localhost:8888/bookAppointment?key=${uuid}`;

  let clientDate = {};

  clientDate.appointmentDateAndTime = eachTiming.innerText;
  clientDate.doctor = doctorDetails;

  let finalData = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(clientDate),
  });

  console.log(finalData);

  let data = await finalData.json();

  console.log(data);

  if (data.errorMsg != undefined) {
    alert(data.errorMsg);
  } else {
    alert(
      `Your appointment book successfully. ` +
        `Your appointment id ${data.appointmentId}, doctor name is ${data.doctor.name} at ${eachTiming.innerText}`
    );

    window.location.reload();
  }
};
