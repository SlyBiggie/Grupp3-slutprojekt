// Leons Feature

import { updatePinStatusFirebase } from "./firebase.js";

export function addPinFunctionality(messageContainer, messageDiv) {
  const pinButton = document.createElement("button");
  pinButton.className = "pin-button";
  pinButton.innerHTML =
    '<i class="fa-solid fa-thumbtack" style="transform: rotate(45deg);"></i> Pin';

  let isPinned = messageContainer.dataset.pinned === "true";
  let originalNextSibling = null;

  // 🧠 Place pinned message on top if it was pinned in DB
  if (isPinned) {
    messageDiv.insertBefore(messageContainer, messageDiv.firstChild);
    messageContainer.classList.add("pinned");
    pinButton.innerHTML = '<i class="fa-solid fa-thumbtack"></i> Unpin';
  }

  pinButton.addEventListener("click", async () => {
    isPinned = !isPinned;

    if (isPinned) {
      originalNextSibling = messageContainer.nextSibling;
      messageDiv.insertBefore(messageContainer, messageDiv.firstChild);
      messageContainer.classList.add("pinned");
      pinButton.innerHTML = '<i class="fa-solid fa-thumbtack"></i> Unpin';
    } else {
      messageContainer.classList.remove("pinned");
      pinButton.innerHTML =
        '<i class="fa-solid fa-thumbtack" style="transform: rotate(45deg);"></i> Pin';

      if (
        originalNextSibling &&
        originalNextSibling.parentNode === messageDiv
      ) {
        messageDiv.insertBefore(messageContainer, originalNextSibling);
      } else {
        messageDiv.appendChild(messageContainer);
      }
    }

    // ✅ Save to Firebase
    await updatePinStatusFirebase(messageContainer.id, isPinned);
  });

  const footer = document.createElement("div");
  footer.className = "message-footer";
  footer.appendChild(pinButton);

  messageContainer.appendChild(footer);
}
