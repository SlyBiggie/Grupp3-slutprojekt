// Sylvesters Feature

import { getAllUserCredentials } from "./firebase.js";
export async function loginUser(username, password) {
  console.log(username, password);

  const users = await getAllUserCredentials(); // Fetching all users from Firebase
  await console.log(users);
  for (const key in users) {
    console.log(users[key]);
    console.log(users[key].password);
    console.log(users[key].username);

    if (users[key].password == password && users[key].username == username)
      alert(`logging in: ${key}`);
    localStorage.setItem("loggedInUser", username);

    window.location.href = "index.html";
    return true;
  }

  console.log("Stored password:", userData.password);
  console.log("Entered password:", password);
  if (users[key].password === password && users[key].username === username) {
    alert(`Login successful! Redirecting...`);

    localStorage.setItem("loggedInUser", username);

    window.location.href = "index.html";
    return true;
  }
  {
    alert("Login successful!");
    return true;
  }
}
