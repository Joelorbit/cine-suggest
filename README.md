
Perfect! You want your app to have **smart, mood-based and personalized movie suggestions**, not just standard search. Here’s how we can structure your README and feature description to highlight that:

````markdown
# CineSuggest 🎬

**CineSuggest** is a smart movie recommendation web app built with **React** and **TypeScript**. It helps users discover movies based on their **mood**, **similar movies**, or even get a **surprise random pick**, using the **TMDb API** and **GROQ API**.  

---

## Features

- **Mood-based suggestions:** Pick a mood (e.g., happy, sad, thrilling) and get tailored movie recommendations  
- **Find similar movies:** Enter a movie you like and explore similar titles  
- **Surprise me:** Get a random movie recommendation for when you can’t decide  
- **Perfectly curated suggestions:** Combines mood, popularity, and user preferences for an ideal pick  
- Search movies by title or genre  
- Responsive UI built with React and TypeScript  

---

## Tech Stack

- **Frontend:** React, TypeScript  
- **APIs:** TMDb API, GROQ API  
- **Styling:** CSS / Tailwind / Styled Components (flexible choice)  

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/Joelorbit/cine-suggest.git
cd cine-suggest
````

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file with your API keys:

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_GROQ_API_KEY=your_groq_api_key
```

4. Run the app:

```bash
npm  eun start
or
npm run dev
```

Your app will be live at `http://localhost:3000`.

---

## Usage

1. **Mood Search:** Select your current mood to get personalized recommendations
2. **Similar Movie:** Enter a movie you like and discover similar films
3. **Surprise Me:** Click the “Surprise Me” button for a random pick
4. Browse popular and trending movies

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make changes
4. Commit changes (`git commit -m 'Add new feature'`)
5. Push to branch (`git push origin feature-name`)
6. Open a Pull Request

---

## License

MIT License

---

## Acknowledgements

* [TMDb API](https://www.themoviedb.org/documentation/api)
* [GROQ API](https://www.sanity.io/docs/query-cheat-sheet)
* React & TypeScript communities


