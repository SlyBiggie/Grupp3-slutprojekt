const BaseUrl =
  "https://gritsquare-default-rtdb.europe-west1.firebasedatabase.app/users";

export async function getAllUsers() {
  const url = BaseUrl + ".json";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
    }

    const userObj = await res.json();
    return userObj;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}
export async function getAllUserCredentials() {
  const url =
    "https://gritsquare-default-rtdb.europe-west1.firebasedatabase.app/" +
    "credentials.json";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
    }

    const userObj = await res.json();
    return userObj;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

export async function postUser(user) {
  const url = BaseUrl + ".json";

  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Failed to post user: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error posting user:", error);
    return null;
  }
}

export async function patchBanned(userName, bannedStatus) {
  try {
    const url = `https://gritsquare-default-rtdb.europe-west1.firebasedatabase.app/bannedUsers/${userName}.json`;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bannedStatus),
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(
        `Failed to update banned list: ${res.status} ${res.statusText}`
      );
    }

    console.log(`Updated ban status for: ${userName} ${bannedStatus}`);
  } catch (error) {
    console.error("Error updating banned list:", error);
  }
}

/// Function to update like/dislike count in Firebase
/// Takes userId and type (like or dislike) as arguments
/// Returns the updated like and dislike counts
export async function updateLikeDislikeFirebase(userId, type) {
  const url = `${BaseUrl}/${userId}.json`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data) {
      throw new Error("User not found");
    }

    let newLike = data.like || 0;
    let newDislike = data.dislike || 0;

    if (type === "like") {
      newLike++;
    } else if (type === "dislike") {
      newDislike++;
    }

    const patchRes = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: newLike, dislike: newDislike }),
    });

    if (!patchRes.ok) {
      throw new Error("Failed to update like/dislike");
    }

    return { like: newLike, dislike: newDislike };
  } catch (error) {
    console.error("Error updating like/dislike:", error);
    throw error;
  }
}

export async function updatePinStatusFirebase(messageId, isPinned) {
  const url = `https://gritsquare-default-rtdb.europe-west1.firebasedatabase.app/users/${messageId}.json`;

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pinned: isPinned }),
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Failed to update pin status");
    console.log(`✅ Pin status updated for ${messageId}: ${isPinned}`);
  } catch (err) {
    console.error("🔥 Error updating pin status:", err);
  }
}
