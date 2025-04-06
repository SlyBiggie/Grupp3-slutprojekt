# fe24-versionshantering-gritsquare-grupp3

# Grit Message - Interactive Message Board

## Overview
Grit Message is an interactive message board application that allows users to post messages, engage with content through likes/dislikes, and utilize features like searching, pinning, and theme customization. This project offers a smooth, real-time experience with intuitive animations and moderative tools.

---

## Features
### Log in
- Log in when using the webbsite.

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

## Project Structure
```
├── audio
│   └── pop-feature.mp3
├── css
│   ├── aboutUs.css        # css for about us page
│   ├── contacts.css       # css for contacts page
│   ├── home.css           # css for home page
│   ├── login.css          # css for login page
│   ├── pin.css            # css for pin feature
│   ├── shake.css          # css for shake feature
│   └── style.css          # General style
├── img
├── modules             # JavaScript modules for different functionality
│   ├── auth.js            # Log in
│   ├── display.js         # Handles message rendering
│   ├── firebase.js        # Database operations
│   ├── main.js            # Core application
│   ├── pin.js             # Message pinning functionality
│   ├── search.js          # Message filtering
│   ├── shake.js           # Handles shake when messages are removed
│   └── theme.js           # Dark/light mode implementation
├── index.html          # Main HTML file
├── home.html           # Messageboard HTML file
├── contacts.html       # Contacts HTML file
├── aboutUs.html        # About us HTML file
```

---

## Usage
### Post a Message
1. Log in.
2. Enter your name and message in the form.
3. Click "Lägg till" to submit.

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

- Matti 2 features
- Leon 1 feature
- Hampus 1 feature
- Alrik 1 feature
- Ida 1 feature

## License
This project is licensed under the MIT License.

