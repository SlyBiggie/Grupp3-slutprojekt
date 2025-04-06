import { getAllUsers, patchBanned } from "./firebase.js";
import { updateLikeDislikeFirebase } from "./firebase.js";
import { addPinFunctionality } from "./pin.js";
import { shake } from "./shake.js";

export const messageDiv = document.getElementById("messageColumn");

// la till dislike och like knappar, Vill ni styla dom så är classnamnen "like-button" och "dislike-button"/Matti
export function displayAllUsers(userObj) {
  messageDiv.innerHTML = "";

  const colors = [
    "#FFB3BA",
    "#FFDFBA",
    "#FFFFBA",
    "#BAFFC9",
    "#BAE1FF",
    "#E2BAFF",
    "#FFC8DD",
    "#A0E7E5",
  ];

  // Sort entries: pinned first, then reverse order for newest first
  let sortedEntries = Object.entries(userObj).sort(([, a], [, b]) => {
    return (b.pinned === true) - (a.pinned === true);
  });

  // Get just the pinned messages
  const pinnedEntries = sortedEntries.filter(
    ([, data]) => data.pinned === true
  );

  // Get non-pinned messages and reverse them (newest first)
  const nonPinnedEntries = sortedEntries
    .filter(([, data]) => data.pinned !== true)
    .reverse(); // Reverse to get newest first (assuming Firebase keys are chronological)

  // Combine pinned messages (at top) with reversed non-pinned messages
  sortedEntries = [...pinnedEntries, ...nonPinnedEntries];

  for (const [firebaseID, userData] of sortedEntries) {
    if (document.getElementById(firebaseID)) {
      continue;
    }

    const messageContainer = document.createElement("div");
    messageContainer.className = "message";
    messageContainer.id = firebaseID;

    messageContainer.dataset.pinned = userData.pinned || false;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    messageContainer.style.setProperty("--random-color", randomColor);

    const userHeader = document.createElement("div");
    userHeader.className = "user-header";

    const userName = document.createElement("p");
    userName.className = "user-name";
    userName.innerText = userData.userName;
    userHeader.appendChild(userName);

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    const userMessage = document.createElement("p");
    userMessage.innerText = userData.userMessage;
    messageContent.appendChild(userMessage);

    messageContainer.appendChild(userHeader);
    messageContainer.appendChild(messageContent);
    addPinFunctionality(messageContainer, messageDiv);
    messageDiv.insertBefore(messageContainer, messageDiv.firstChild);

    const likeButton = document.createElement("button");
    likeButton.className = "like-button";
    likeButton.innerHTML = '<i class="fa-solid fa-heart"></i> ';
    const likeSpan = document.createElement("span");
    likeSpan.innerText = userData.like || "0";
    likeButton.appendChild(likeSpan);

    const dislikeButton = document.createElement("button");
    dislikeButton.className = "dislike-button";
    dislikeButton.innerHTML = '<i class="fa-solid fa-heart-crack"></i> ';
    const dislikeSpan = document.createElement("span");
    dislikeSpan.innerText = userData.dislike || "0";
    dislikeButton.appendChild(dislikeSpan);

    likeButton.addEventListener("click", async () => {
      try {
        const updated = await updateLikeDislikeFirebase(firebaseID, "like");
        if (updated) {
          likeSpan.innerText = updated.like;
          dislikeSpan.innerText = updated.dislike;

          messageContainer.classList.add("flash-green");
          setTimeout(
            () => messageContainer.classList.remove("flash-green"),
            500
          );
        }
      } catch (error) {
        console.error(error);
      }
    });

    dislikeButton.addEventListener("click", async () => {
      try {
        const updated = await updateLikeDislikeFirebase(firebaseID, "dislike");
        if (updated) {
          likeSpan.innerText = updated.like;
          dislikeSpan.innerText = updated.dislike;

          messageContainer.classList.add("flash-red");
          setTimeout(() => messageContainer.classList.remove("flash-red"), 500);
        }
      } catch (error) {
        console.error(error);
      }
    });

    messageContainer.appendChild(likeButton);
    messageContainer.appendChild(dislikeButton);

    if (userObj[firebaseID].pinned) {
      messageDiv.insertBefore(messageContainer, messageDiv.firstChild);
    } else {
      messageDiv.appendChild(messageContainer);
    }

    anime({
      targets: messageContainer,
      opacity: [0, 1],
      translateX: [-200, 0],
      scale: [0.5, 1],
      duration: 800,
      easing: "easeOutCubic",
    });

    // Add ellipsis icon and ban button functionality
    const ellipsisIcon = document.createElement("i");
    ellipsisIcon.className = "fa-solid fa-ellipsis-vertical ellipsis-icon";
    userHeader.appendChild(ellipsisIcon);

    const banButton = document.createElement("button");
    banButton.className = "ban-button";
    banButton.innerText = "Ban";
    banButton.style.display = "none";
    userHeader.appendChild(banButton);

    ellipsisIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      if (banButton.style.display === "none") {
        banButton.style.display = "block";
      } else {
        banButton.style.display = "none";
      }
    });

    banButton.addEventListener("click", async (event) => {
      event.stopPropagation();
      const confirmBan = confirm("Do you want to ban this user?");
      if (confirmBan) {
        await patchBanned(userName.innerText, true);
        const users = await getAllUsers();
        displayAllUsers(users);
      } else {
        const users = await getAllUsers();
        displayAllUsers(users);
      }
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    messageContainer.appendChild(removeButton);
    removeButton.addEventListener("click", async () => {
      console.log(firebaseID);
      shake();
      await removeMessageById(firebaseID);
      const allMessages = document.querySelectorAll(".message");
      allMessages.forEach((message) => {
        const delay = Math.random() * 500;
        setTimeout(() => {
          message.classList.add("shake");
          setTimeout(() => {
            message.classList.remove("shake");
          }, 1000);
        }, delay);
      });
    });
  }
}

export async function removeMessageById(id) {
  try {
    const url = `https://gritsquare-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`;
    const options = {
      method: "DELETE",
    };
    const res = await fetch(url, options);
    if (res.ok) {
      console.log(`User with ID: ${id} removed successfully.`);
      document.getElementById(id)?.remove();
      const users = await getAllUsers();
      displayAllUsers(users);
    } else {
      console.log(`Failed to delete user with ID: ${id}`);
    }
  } catch (error) {
    console.error(`Error removing message with ID: ${id}, error`);
  }
}
