import { postUser, getAllUsers } from "./firebase.js";
import { messageDiv, displayAllUsers } from "./display.js";
import { initTheme } from "./theme.js";
import { initSearch } from "./search.js";

const toggleMenu = document.querySelector(".toggleMenu");
const menu = document.querySelector(".menu");
const messageForm = document.getElementById("addMessage");

// Initialize the theme functionality
initTheme();
initSearch();

toggleMenu.addEventListener("click", () => {
  menu.classList.toggle("active");
});

function check(str, subStr, caseSensitive = false) {
  if (caseSensitive) return new RegExp(subStr).test(str);
  return new RegExp(subStr, "i").test(str);
}

messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userName = document.getElementById("user-name").value;
  const userMessage = document.getElementById("user-message").value;
  let profanitylistURL =
    "https://raw.githubusercontent.com/dsojevic/profanity-list/refs/heads/main/en.json";
  let response1 = await fetch(profanitylistURL);
  const json = await response1.json();

  console.log(json);

  json.forEach((element) => {
    if (
      check(userMessage, element.match == "sh*i*t" ? "shit" : element.match)
    ) {
      alert(
        "you have profanity in your message: " +
          element.id +
          "  matchin on:" +
          element.match
      );
      messageForm.message = userMessage;
      return;
    }
  });

  const users = await getAllUsers();

  const bannedList = await fetch(
    "https://gritsquare-default-rtdb.europe-west1.firebasedatabase.app/bannedUsers.json"
  ).then((res) => res.json());

  if (bannedList && bannedList[userName]) {
    alert("This username is banned, try again.");
    return;
  }

  const userObj = {
    userName,
    userMessage,
    banned: false,
  };

  const response = await postUser(userObj);

  if (response) {
    var audio = new Audio("audio/pop-feature.mp3");
    audio.play();

    const users = await getAllUsers();
    displayAllUsers(users);
  } else {
    console.error("Failed to post message");
    alert("Failed to post message, please try again");
  }

  messageForm.reset();
});

displayAllUsers(await getAllUsers());

/// Message Character Counter
const messageInput = document.getElementById("user-message");
