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
async function profanityCheckAndPost(message) {
  try {
      const res = await fetch('https://vector.profanity.dev', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
      });
      if (!res.ok)  throw new Error(`HTTP error! status: ${res.status}`);
      
      const data = await res.json();
      console.log(data)
     if(data.isProfanity == true){
      alert("you have profanity in your message!!! : \n"+data.flaggedFor );
      return true
     }
     else
      return  false
     
  } catch (error) {
      console.error("Error checking profanity:", error)
      return false;
  }
}
messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userName = document.getElementById("user-name").value;
  const userMessage = document.getElementById("user-message").value;

  if(await profanityCheckAndPost(userMessage) )  {
    return
  }

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
