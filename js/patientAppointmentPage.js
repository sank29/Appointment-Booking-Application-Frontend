////////////////////////////////check user is login or not/////////////////
let uuid = localStorage.getItem("uuidkey");

let loginORNot = async () => {
  let url = `http://localhost:8888/checkLogin/${uuid}`;

  let loginOrNot = await fetch(url);

  let data = await loginOrNot.json();

  if (!data.loginOrNot) {
    alert("Please login before accessing this page!!!!");

    window.location.href = "../index.html";
  }

  console.log("Login aahe patient");
};

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////
