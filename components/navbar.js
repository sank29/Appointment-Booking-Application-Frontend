let uuid = localStorage.getItem("uuidkey");

let patientDeatils = JSON.parse(localStorage.getItem("patientDeatils")) || null;

let getPatinetDetails = async () => {
  let url = `http://localhost:8888//patientDetails?key=${uuid}`;

  let data = await fetch(url);

  let finalData = await data.json();

  localStorage.setItem("patientDeatils", JSON.stringify(finalData));
};

getPatinetDetails();

let html = () => {
  return `<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Book Docs</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="../index.html">Home</a>
        </li>
         <li class="nav-item">
          <a class="nav-link" href="../patientAppointmentPage.html">All Doctors</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../patientAllAppointment.html">All Appointments</a>
        </li>

        <li  class="d-flex">
          <a class="nav-link float-end " href="../patientAdminProfile.html">Welcome ${patientDeatils.name}</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;
};

export default html();
