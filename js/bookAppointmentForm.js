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
};

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

// Create datepicker
var datepicker = document.getElementById("datepicker");
var timepicker = document.getElementById("timepicker");

flatpickr(datepicker, {
  enableTime: false,
  dateFormat: "F j, Y",
  onChange: function (selectedDates, dateStr, instance) {
    // Get selected date and time
    var selectedDate = dateStr;
    var selectedTime = timepicker.value;

    // Do something with the selected date and time
    console.log("Selected date: " + selectedDate);
    console.log("Selected time: " + selectedTime);
  },
});

timepicker.addEventListener("change", function () {
  var selectedDate = datepicker.value;
  var selectedTime = timepicker.value;

  // Do something with the selected date and time
  console.log("Selected date: " + selectedDate);
  console.log("Selected time: " + selectedTime);
});
