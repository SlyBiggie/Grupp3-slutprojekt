// Idas Feature

export function shake() {
  const allMessages = document.querySelectorAll(".message");
  allMessages.forEach((msg) => {
    const delay = Math.random() * 500;
    setTimeout(() => {
      msg.classList.add("shake");
      setTimeout(() => {
        msg.classList.remove("shake");
      }, 1000);
    }, delay);
  });
}
