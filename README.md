# movie-recommendation-fullstack
This is a solid project! You’ve built a comprehensive movie application with features that go beyond a simple "search and display" site—incorporating a **Sentiment Analysis API**, a **Streaming Chatbot**, and **Local Storage** for watchlists.

Here is a structured, professional `README.md` template tailored specifically to the files and logic you've implemented.

---

# 🎬 Movie Mania

**Movie Mania** is a dynamic web application that allows users to discover trending movies, manage a personal watchlist, and post reviews. It features an integrated AI-powered sentiment analysis for reviews and a real-time streaming chatbot for movie recommendations.

---

## 🚀 Features

* **Movie Discovery:** Fetches real-time data (trending, search, details) from the **TMDB API**.
* **Watchlist Management:** Users can add/remove movies to a personal watchlist, persisted via `localStorage`.
* **AI Sentiment Analysis:** When a user submits a review, the app sends it to a Flask backend to determine if the feedback is **Positive** or **Negative**.
* **Streaming Chatbot:** A built-in "Movie Assistant" that provides recommendations using a streaming response (Markdown-supported).
* **Multi-language Support:** Welcome page supports toggling between English and Hindi.
* **Full CRUD on Reviews:** Users can post, view, edit, and delete their movie reviews.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom animations & Bootstrap 5), JavaScript (ES6+).
* **Backend (Required):** Python Flask (for `/predict`, `/reviews`, and `/chat` endpoints).
* **Database:** MongoDB (implied by the `_id` usage in `reviews.js`).
* **APIs:** * [TMDB API](https://www.themoviedb.org/documentation/api) for movie data.
    * Custom Flask API for Sentiment Analysis and Chatbot logic.

---

## 📁 Project Structure

```text
├── index.html          # Main landing grid & search
├── welcome.html        # Entry page with language toggle
├── watchlist.html      # User's saved movies
├── reviews.html        # Management page for personal reviews
├── script.js           # Main logic (TMDB integration & Chatbot)
├── reviews.js          # CRUD logic for reviews via Backend API
├── watchlist.js        # LocalStorage handling
├── styles.css          # Main UI styling & animations
└── reviews.css         # Styling specifically for the review dashboard
```

---

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/movie-mania.git
    ```

2.  **API Key Configuration:**
    * Open `script.js`.
    * Replace the `api_key` in `API_URL` and `SEARCH_URL` with your own TMDB API key if necessary.

3.  **Backend Requirements:**
    * Ensure your Flask server is running on `http://127.0.0.1:5000`.
    * The backend should have the following endpoints:
        * `POST /predict`: Sentiment analysis.
        * `GET/POST/PUT/DELETE /reviews`: Review management.
        * `POST /chat`: Streaming chatbot response.

4.  **Run the App:**
    * Open `welcome.html` in your browser (or use Live Server in VS Code).

---

## 📸 UI Preview

* **Hero Section:** A sleek, Netflix-inspired entry point.
* **Movie Cards:** Interactive cards showing ratings and "slide-up" overviews.
* **Review Badges:** Automatically colored (Green/Red) based on AI sentiment detection.
* **Chatbot:** Floating action button (💬) to trigger the AI assistant.

---

## 🔮 Future Improvements

* [ ] Implement User Authentication (Firebase or JWT).
* [ ] Add a "Top Rated" and "Genre Filter" sidebar.
* [ ] Enhance the Chatbot to allow clicking suggested movies to open their details.

---

### Would you like me to help you draft the **Python Flask code** for the backend to match these frontend requirements?
Movie Mania is a full-stack web app built with JavaScript and Flask, integrating the TMDB API for real-time movie data. It features an AI chatbot, sentiment analysis for reviews, a watchlist using local storage, and a modern multilingual UI with embedded trailers.
