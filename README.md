# fe24-versionshantering-gritsquare-grupp3

# Grit Message - Interactive Message Board

## Overview
Grit Message is an interactive message board application that allows users to post messages, engage with content through likes/dislikes, and utilize features like searching, pinning, and theme customization. This project offers a smooth, real-time experience with intuitive animations and moderative tools.

---

## Features
### Message Posting
- Share your thoughts with a username and message content.
- Messages are instantly saved and posted on the board. 

### Interactive Engagement
- Like or dislike messages with visual feedback.
- Animated color flashes when interacting.

### Message Management
- Pin important messages to the top for easy access.
- Remove messages with a smooth, satisfying animation.
- Animation when loading message.
- Shake animation when removing messages.

### User Experience
- Dark/light mode toggle with persistent settings.
- Real-time search filtering across usernames and message content.
- Random colorful message cards for added visual appeal.

### Moderation
- Ban problematic users.
- Automatic profanity filter to ensure appropriate content.
- Remove button that removes messages from database.

---

## Technologies Used
- Vanilla JavaScript (ES6+)
- Firebase Realtime Database
- Anime.js for animations
- FontAwesome for icons
- CSS3 with custom properties for theming
- HTML5

---

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/thealindsjo/fe24-versionshantering-gritsquare-grupp3
   ```
2. Open the project in your favorite code editor.
3. Launch a local server:
   ```bash
   npm start
   ```
4. Open in your browser:
   ```
   http://localhost:5000
   ```

---

## Project Structure
```
├── modules               # JavaScript modules for different functionality
│   ├── display.js         # Handles message rendering
│   ├── firebase.js        # Database operations
│   ├── pin.js             # Message pinning functionality
│   ├── search.js          # Message filtering
│   └── theme.js           # Dark/light mode implementation
└── index.html            # Main HTML file
```

---

## Usage
### Post a Message
1. Enter your name and message in the form.
2. Click "Lägg till" to submit.

### Interact with Messages
- Click the heart icon to like a message.
- Click the broken heart icon to dislike.
- Use the pin button to highlight important messages.
- Delete messages using the trash can icon.

### Search Messages
- Type in the search box to filter messages by username or content.
- Results update in real-time as you type.

### Change Theme
- Click the moon/sun icon to toggle between dark and light mode.

---

## Contributors
- Thea - Developer
- Linn - Developer
- Kim - Developer
- Sylvester - Developer

## License
This project is licensed under the MIT License.

