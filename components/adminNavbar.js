let uuid = localStorage.getItem("uuidkey");

let adminDeatils = JSON.parse(localStorage.getItem("adminDeatils")) || null;

let getPatinetDetails = async () => {
  let url = `http://localhost:8888//patientDetails?key=${uuid}`;

  let data = await fetch(url);

  let finalData = await data.json();

  console.log(finalData);

  localStorage.setItem("adminDeatils", JSON.stringify(finalData));
};

getPatinetDetails();

let html = () => {
  return `<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
   <img href="#" id="navbarLogo" src="../img/online-doctor-appointment.svg" alt="" />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>

        <li  class="d-flex">
          <a class="nav-link float-end " href="../doctorRegistrationPage.html">Register Doctor</a>
        </li>

        <li  class="d-flex">
          <a class="nav-link float-end " href="../adminAllDoctorsPage.html">All Doctors</a>
        </li>

        <li  class="d-flex">
          <a class="nav-link float-end " href="../patientAdminProfile.html"><b>Welcome ${adminDeatils.name} Admin</b></a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;
};

export default html();
