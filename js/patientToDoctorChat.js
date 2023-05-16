////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

// get all doctor's present in database

let cardArea = document.getElementById("cardArea");

////////////////adding navbar//////////////////

import navbar from "../components/navbar.js";

let navabar = document.getElementById("navabar");

navabar.innerHTML = navbar;
/////////////////end of adding navbar///////////

let chatArea = document.getElementById("chatArea");
let chatDoctorInfo = JSON.parse(localStorage.getItem("chatDoctor")) || null;
let patientDeatils = JSON.parse(localStorage.getItem("patientDeatils")) || null;

let diplayChats = async () => {
  chatArea.innerHTML = null;

  let messageData = await getPatientMessage(chatDoctorInfo);
  let doctorName = document.createElement("p");
  doctorName.innerHTML = `<h2><b>Message ${chatDoctorInfo.name}</b></h2>`;

  let inputMessage = document.createElement("input");
  inputMessage.placeholder = "Type";
  inputMessage.setAttribute("id", "inputMessage");

  let sendButton = document.createElement("button");
  sendButton.innerText = "Send";
  sendButton.style.marginTop = "100px";
  sendButton.setAttribute("id", "sendMessage");
  sendButton.style.backgroundColor = "blue";
  sendButton.style.color = "white";

  let messageDiv = document.createElement("div");

  messageData.forEach((eachMessage) => {
    let message = document.createElement("p");
    message.innerHTML = eachMessage.messageContent;
    message.setAttribute("class", "message");
    message.style.display = "inline";
    message.style.borderRadius = "10px";

    let time = document.createElement("p");
    time.innerHTML = formatTime(eachMessage.messageTimeAndDate);
    time.setAttribute("class", "time");

    if (chatDoctorInfo.doctorId == eachMessage.receiver) {
      message.style.marginLeft = "600px";
      message.style.borderRadius = "10px";
      time.style.marginLeft = "600px";
    }

    messageDiv.append(message, time);
  });

  chatArea.append(doctorName, messageDiv, inputMessage, sendButton);

  let sendMessageButton = document.getElementById("sendMessage");

  sendMessageButton.addEventListener("click", async (event) => {
    let messageContent = document.getElementById("inputMessage").value;

    let returnMessage = await sendMessage(messageContent);

    messageDiv.innerHTML = null;

    let newMessage = document.createElement("p");
    newMessage.innerHTML = returnMessage.messageContent;

    messageDiv.append(newMessage);

    chatArea.append(doctorName, messageDiv, inputMessage, sendButton);
    diplayChats();
  });
};

let getPatientMessage = async (chatDoctorInfo) => {
  let url = `http://localhost:8888/message/patientMessage?key=${uuid}`;

  let data = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(chatDoctorInfo),
  });

  data = await data.json();

  return data;
};

let sendMessage = async (messageContent) => {
  let message = {};
  message.messageContent = messageContent;
  message.doctor = chatDoctorInfo;
  message.patient = patientDeatils;

  let url = `http://localhost:8888/message/patientToDoctor?key=${uuid}`;

  let data = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(message),
  });

  data = await data.json();

  console.log(data);

  return data;
};

diplayChats();

let formatTime = (time) => {
  const datetime = new Date(time);

  const hours = datetime.getHours(); // get the hours component (0-23)
  const minutes = datetime.getMinutes(); // get the minutes component (0-59)

  return `${hours}:${minutes}`; // format the time string
};
