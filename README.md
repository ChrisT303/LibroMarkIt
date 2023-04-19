# LibroMarkit 

LibroMarkit is a book search app that allows users to browse featured books, search for specific books, and save them to a personalized saved books list. This project is built using Next.js, GraphQL, MongoDB, and Tailwind CSS, and utilizes the Google Books API for book data.

![LibroMarkit Screenshot](./screenshot.png)

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Running the App](#running-the-app)
4. [Contributing](#contributing)
5. [License](#license)

## Features

- Featured books displayed on the landing page
- User authentication (signup and login)
- Book search functionality using the Google Books API
- Saving books to a personal saved books list
- Removing books from the saved books list
- Responsive design using Tailwind CSS

## Getting Started

To set up the project on your local machine, follow these instructions:

1. Clone the repository:
`git clone https://github.com/yourusername/libromarkit.git`

2. Change directory to the project folder:

`cd libromarkit`

3. Install the required dependencies:

`npm install`

4. Create a `.env.local` file in the root directory and add your environment variables:

`NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=your_google_books_api_key`
`MONGODB_URI=your_mongodb_connection_string`


5. You're all set! Now you can run the app.

## Running the App

In the project directory, you can run the following scripts:

- `npm run dev` - Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

- `npm run build` - Builds the app for production. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include the hashes.

- `npm run start` - Runs the production build of the app. Ensure you've run `npm run build` before using this command.

- `npm run lint` - Lints the project using Next.js built-in ESLint configuration.

## Contributing

Contributions are always welcome! To contribute to this project, follow these steps:

1. Fork the repository
2. Create a new branch with your changes
3. Commit and push your changes
4. Create a pull request to the main repository

## License

![The MIT License](https://img.shields.io/badge/license-MIT-green)



