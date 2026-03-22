# Weather Forecasting App

A simple weather forecasting application that lets users search for a city and view current weather details (and forecasts if supported), powered by a weather API.

## Features
- Search weather by **city name**
- Shows common weather details like:
  - Temperature
  - Humidity
  - Wind speed
  - Weather condition (e.g., Clear, Clouds, Rain)
- Clean, beginner-friendly UI

## Tech Stack
> Update this section based on what your repo actually uses.

- **Frontend:** HTML, CSS, JavaScript  
- **API:** (e.g., OpenWeatherMap / WeatherAPI / etc.)

## Getting Started

### 1) Clone the repository
```bash
git clone https://github.com/PrashantRanjan-2006/Weather_forcasting_app.git
cd Weather_forcasting_app
```

### 2) Configure API Key (recommended)
If your app uses an API key, create a `.env` file (or update your config file) and add:

```env
API_KEY=your_api_key_here
```

If your project is purely frontend (no Node/Express), you may be storing the key in a JS config file—make sure you **do not commit secret keys** to GitHub.

### 3) Run the project
Depending on your setup:

#### Option A: Plain HTML/JS
- Open `index.html` in a browser  
  or use VS Code extension **Live Server**.

#### Option B: Node project (if applicable)
```bash
npm install
npm start
```

## Usage
1. Enter a city name in the search box  
2. Click **Search**  
3. View the weather details displayed on the page

## Screenshots
Add screenshots of your app here:

- `assets/screenshot-1.png`
- `assets/screenshot-2.png`

Example:
```md
![Home Page](assets/screenshot-1.png)
```

## Project Structure
(Example — update to match your repo)
```
Weather_forcasting_app/
├─ index.html
├─ style.css
├─ script.js
└─ README.md
```

## Contributing
Contributions are welcome!
1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push: `git push origin feature-name`
5. Open a Pull Request

## License
Add a license if you want (MIT is common for small projects). If you add one, update this section accordingly.
