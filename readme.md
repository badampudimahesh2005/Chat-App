# ChatApp

A real-time chat application built using the **MERN Stack**, **Socket.IO**, and **Tailwind CSS**.

## Features

- **User Authentication**: Secure signup, login, and profile management using JWT tokens for session management.
- **Real-Time Messaging**: Instant messaging powered by **Socket.IO**.
- **State Management**: Efficient and predictable state management with **Zustand**.
- **Responsive Design**: Built with **Shadcn UI components** and styled using **Tailwind CSS** for a seamless experience across devices.

## Tech Stack

- **Frontend**: React, Zustand, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)

## Screenshots

### Login Page
![Login Page](/client/public/screenshots/login.png)

### Chat Interface
![Chat Interface](/client/public/screenshots/interface.png)
![chat page](/client/public/screenshots/chat.png)

### Profile Management
![Profile Management](/client/public/screenshots/profile.png)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/chatApp.git
    cd chatApp
    ```

2. Install dependencies for both client and server:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `server` directory.
    - Add the following:
      -Frontend
      ```env
      VITE_SERVER_URL = backend url
      ```
      -backend
      ```env
      PORT = port number
      ORIGIN = frontend url
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      ```

4. Start the development servers:
    ```bash
    # In the client directory
    npm run dev

    # In the server directory
    node index.js
    ```

5. Open your browser .

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

