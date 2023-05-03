let patientLogo = document.getElementById("patientLogo");
let doctorLogo = document.getElementById("doctorLogo");

patientLogo.addEventListener("click", (event) => {
  window.location.href = "./patientAdminLoginForm.html";
});

doctorLogo.addEventListener("click", (event) => {
  window.location.href = "./doctorLoginForm.html";
});
