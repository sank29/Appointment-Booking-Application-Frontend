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

let profileDeatils = document.getElementById("profileDeatils");

let patientProfile = JSON.parse(localStorage.getItem("patientDeatils")) || null;

let displayProfile = () => {
  console.log(patientProfile);

  let name = document.createElement("p");
  name.innerText = `Name: ${patientProfile.name}`;

  let mobileNumber = document.createElement("p");
  mobileNumber.innerText = `Mobile Number: ${patientProfile.mobileNo}`;

  let email = document.createElement("p");
  email.innerText = `Email Address: ${patientProfile.email}`;

  let button = document.createElement("button");
  button.setAttribute("class", "btn btn-primary btn-lg");
  button.setAttribute("type", "button");
  button.style.marginTop = "10px";

  button.innerText = "Update profile";

  profileDeatils.append(name, mobileNumber, email, button);
};

displayProfile();
