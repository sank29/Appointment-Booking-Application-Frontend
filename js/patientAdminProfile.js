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

  let updateButton = document.createElement("button");
  updateButton.setAttribute("class", "btn btn-primary btn-lg");
  updateButton.setAttribute("type", "button");
  updateButton.style.marginLeft = "10px";
  updateButton.innerText = "Update profile";

  let logoutButton = document.createElement("button");
  logoutButton.setAttribute("class", "btn btn-danger btn-lg");
  logoutButton.setAttribute("type", "button");
  logoutButton.style.marginLeft = "10px";
  logoutButton.innerText = "Logout";

  profileDeatils.append(name, mobileNumber, email, updateButton, logoutButton);

  logoutButton.addEventListener("click", async (event) => {
    let url = `http://localhost:8888/logout?key=${uuid}`;
    let data = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("uuidkey");

    alert("Logout successful");

    console.log(data);

    window.location.href = "../index.html";
  });
};

displayProfile();
