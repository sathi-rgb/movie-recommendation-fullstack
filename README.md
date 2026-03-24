🍿 Movie Mania: Your Personal Cinema Hub
Welcome to Movie Mania! This isn't just another movie database; it’s a space I built for people who actually care about what they watch. Whether you’re hunting for your next favorite film or want to vent (or rave) about the last one you saw, this app has you covered.

🌟 Why I Built This
I wanted to combine the sleek feel of modern streaming platforms with some smart tech under the hood. I integrated a Sentiment Analysis API so that when you leave a review, the app actually "understands" if you're happy or annoyed—labeling your feedback automatically.

✨ What it Does
Search & Discover: Real-time data pulled straight from the TMDB API so you’re always up to date with what’s trending.

Smart Watchlist: See something you like? Save it for later. It stays there even if you refresh the page thanks to local storage.

AI Movie Assistant: Stuck on what to watch? Open the chat bubble (💬) and talk to the built-in bot for instant recommendations.

Honest Reviews: Write, edit, or delete your reviews. The app tracks the "vibe" of your feedback using AI sentiment detection.

Bilingual: The welcome page speaks both English and Hindi, making it accessible to more movie lovers.

🛠 The "Brain" Behind the App
I used a mix of frontend flair and backend logic to get this running:

The Look: HTML5, CSS3, and Bootstrap 5 for that polished, responsive feel.

The Logic: Vanilla JavaScript handles the API calls and the interactive UI.

The Backend: A Flask (Python) server manages the AI sentiment analysis and the streaming chatbot responses.

🚀 Getting Started
Clone it: Grab the code from this repo.

API Key: You'll need your own TMDB API key (stick it in script.js) to fetch the movie data.

Run the Backend: Make sure your Flask server is up and running on localhost:5000 so the reviews and chatbot can talk back to you.

📁 Project Structure

├── index.html          # Main landing grid & search
├── welcome.html        # Entry page with language toggle
├── watchlist.html      # User's saved movies
├── reviews.html        # Management page for personal reviews
├── script.js           # Main logic (TMDB integration & Chatbot)
├── reviews.js          # CRUD logic for reviews via Backend API
├── watchlist.js        # LocalStorage handling
├── styles.css          # Main UI styling & animations
└── reviews.css         # Styling specifically for the review dashboard



 🔮 Future Improvements

* [ ] Implement User Authentication (Firebase or JWT).
* [ ] Add a "Top Rated" and "Genre Filter" sidebar.
* [ ] Enhance the Chatbot to allow clicking suggested movies to open their details.


