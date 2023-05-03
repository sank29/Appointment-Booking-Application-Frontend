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

let formArea = document.getElementById("formArea");

let displayForm = () => {
  let html = `
    
    <form id="form">

            <div class="mb-3">
              <label for="oldPassword" class="form-label">Old Password</label>
              <input type="text" class="form-control" id="oldPassword" />
            </div>

            <div class="mb-3">
              <label for="newPassword" class="form-label">New Password</label>
              <input type="text" class="form-control" id="newPassword" />
            </div>

            
            <div class="mb-3">
              <label for="confirmNewPassword" class="form-label">Confirm New Password</label>
              <input type="text" class="form-control" id="confirmNewPassword" />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>            

        </form>
        <a id="DontHaveAccount" href="../patientAdminProfile.html"><h7>Return Back</h7></a>

    `;

  formArea.innerHTML += html;

  let form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const forgetPassword = {};

    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmNewPassword =
      document.getElementById("confirmNewPassword").value;

    forgetPassword.oldPassword = oldPassword;
    forgetPassword.newPassword = newPassword;
    forgetPassword.confirmNewPassword = confirmNewPassword;

    sendForgetPassword(forgetPassword);
  });
};

let sendForgetPassword = async (forgetPassword) => {
  const url = `http://localhost:8888/forgetPassword?key=${uuid}`;

  let finalData = await fetch(url, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(forgetPassword),
  });

  finalData = await finalData.json();

  if (finalData.errorMsg != undefined) {
    alert(finalData.errorMsg);
  } else {
    alert("Password Change");
  }

  console.log(finalData);
};

displayForm();
