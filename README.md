# Next.js Authentication with MongoDB and Google OAuth

This project demonstrates how to set up user authentication in a Next.js application using MongoDB for data storage and Google OAuth for authentication. Users have the option to sign up and log in using their credentials or Google authentication.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed on your system.
- A MongoDB database ready to use.
- Google OAuth credentials (Client ID and Client Secret). Refer to [this Medium post](link) for instructions on obtaining these credentials.

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <project-folder>

   
2.Install project dependencies:

 ```bash
  npm install

3.Create a .env file in the root directory of your project with the following variables:

 ```bash
  DATABASE_URL=your-mongodb-uri
  GOOGLE_CLIENT_ID=your-google-client-id
  GOOGLE_CLIENT_SECRET=your-google-client-secret

Replace your-mongodb-uri, your-google-client-id, and your-google-client-secret with your MongoDB URI and Google OAuth credentials obtained from the Medium post mentioned above.

4.Start the development server:
 ```bash
  npm run dev

Your Next.js application is now running. Visit http://localhost:3000 in your browser to access it.

Acknowledgments
Next.js
MongoDB
NextAuth.js
Google OAuth
Feel free to customize this README to provide more specific information about your project and its features.
