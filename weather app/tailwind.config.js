/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#0B1020',
        mist: '#E8EFFA',
        solar: '#F7B733',
        rain: '#4C6FFF',
      },
      backgroundImage: {
        'sunny-sky': 'linear-gradient(160deg, #FAE29A 0%, #F7C873 35%, #F2A65A 100%)',
        'rainy-sky': 'linear-gradient(160deg, #5B6CFF 0%, #3648B5 45%, #1A245A 100%)',
        'cloudy-sky': 'linear-gradient(160deg, #D9E2EC 0%, #AFC3D9 40%, #7C8EA5 100%)',
        'night-sky': 'linear-gradient(160deg, #0F1438 0%, #1F2C66 45%, #374999 100%)',
      },
      boxShadow: {
        glass: '0 14px 40px rgba(10, 24, 68, 0.18)',
      },
    },
  },
  plugins: [],
}
