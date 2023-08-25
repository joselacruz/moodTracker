# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Mood Tracker App

Welcome to the Mood Tracker App! This application serves as a Mood Tracker, allowing you to log your emotions and diary entries. It also incorporates sentiment analysis through OpenAI's artificial intelligence API to determine if your written content aligns with the selected emotion.

# Demo App

You can check here the demo app: https://jocular-queijadas-9d022c.netlify.app/

## Project Overview

This project is built using React and Vite, and it integrates with Firebase for user authentication and data storage. Additionally, it employs Cloud Functions on Netlify to interact with the OpenAI API for sentiment analysis.

## Setup

1. Clone the repository to your local machine:

```sh
git clone https://github.com/joselacruz/moodTracker.git
cd moodTracker
```

2. Install the project dependencies:

```sh
npm install
```

3. Before you begin
   If you haven't already, you need to create a [Firebase project](https://firebase.google.com/docs/web/setup#create-project)

4. Then Enable a [Create a Cloud Firestore database]https://firebase.google.com/docs/firestore/quickstart#create
5. Then Enable Email Link sign-in for your Firebase project
   To sign in users by email link, you must first enable the Email provider and Email link sign-in method for your Firebase project:

- In the [Firebase console](https://console.firebase.google.com/), open the Auth section.
- On the Sign in method tab, enable the Email/Password provider and Click Save.

6. Create a .env file in the root directory of the project and set your Firebase configuration:

- VITE_FIREBASE_API_KEY=your-api-key
- VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
- VITE_FIREBASE_PROJECT_ID=your-project-id
- VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
- VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
- VITE_FIREBASE_APP_ID=your-app-id
- VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id # optional

## Usage

1. Start the development server:

```sh
   npm run dev
```

2. Access the app in your browser at http://localhost:5173.

3. Log in or sign up to use the Mood Tracker app.

## Features

- Log your moods and diary entries.
- Analyze sentiments of your diary entries using OpenAI's language model.
- Visualize your moods over time through a calendar.
- View mood trends over the last 6 months with a graphical representation.

## OpenAI Integration

To enable sentiment analysis, make sure you have added your OpenAI API key to the Netlify environment variables under the name OPENAI_API_KEY.

## Contributing

Feel free to contribute to this project by opening pull requests or issues on the repository.

## Credits

This project was created by Jose Lacruz.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
