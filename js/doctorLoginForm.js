let form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let url = "http://localhost:8888/loginDoctor";

  let mobile = document.getElementById("formMobile").value;

  let password = document.getElementById("formPassword").value;

  let doctorDeatils = {
    mobileNo: mobile,
    password: password,
  };

  let data = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(doctorDeatils),
  });

  let data1 = await data.json();

  let uuidKey = data1.uuid;

  localStorage.setItem("uuidkey", uuidKey);

  if (uuidKey != undefined) {
    localStorage.setItem("uuidkey", uuidKey);
    let type = await cheakUserIsPatientOrAdmin(uuidKey);

    window.location.href = "../doctorAppointmentPage.html";
  } else {
    alert(data1.errorMsg);
  }
});

let cheakUserIsPatientOrAdmin = async (uuid) => {
  let url = `http://localhost:8888//patientDetails?key=${uuid}`;
  let userDeatils = await fetch(url);

  userDeatils = await userDeatils.json();

  if (userDeatils.type == "patient") {
    return "patient";
  } else {
    return "admin";
  }
};
