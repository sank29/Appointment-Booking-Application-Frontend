let form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let url = "http://localhost:8888/registerPatient";

  let name = document.getElementById("formName").value;

  let mobileNumber = document.getElementById("formMobile").value;

  let password = document.getElementById("exampleInputPassword1").value;

  let email = document.getElementById("exampleInputEmail1").value;

  let customerDetails = {
    name: name,
    mobileNo: mobileNumber,
    password,
    email: email,
  };

  let data = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(customerDetails),
  });

  let data1 = await data.json();

  console.log(data1);

  if (!data1.errorMsg) {
    alert(
      "You have succefully register in our database. You are redirecting towards login page"
    );
  } else {
    alert(data1.errorMsg + ". Please login.");
  }

  window.location.href = "../patientAdminLoginForm.html";
});
