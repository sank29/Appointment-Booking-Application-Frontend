let form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // let url = "http://localhost:8888/login";

  let mobile = document.getElementById("formMobile").value;

  let password = document.getElementById("formPassword").value;

  let customerDetails = {
    mobileNo: mobile,
    password: password,
  };

  let data = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(customerDetails),
  });

  let data1 = await data.json();

  let uuidKey = data1.uuid;

  localStorage.setItem("uuidkey", uuidKey);

  if (uuidKey != undefined) {
    localStorage.setItem("uuidkey", uuidKey);
  } else {
    alert(data1.errorMsg);
  }
});
