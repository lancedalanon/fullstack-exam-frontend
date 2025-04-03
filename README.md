# Junior Full-Stack Developer Frontend Exam

## Backend Repository:

The corresponding backend GitHub repository can be found here:
https://github.com/lancedalanon/fullstack-exam-backend

## Live Application:

The live version of the application is available at:
https://fullstack-exam-frontend-cyan.vercel.app/

## Assumptions and Approach

### Project Approach

For the frontend, I have used **Next.js**, **Material UI**, **TypeScript**, **Zod**, and **React Hook Form** to implement the required functionality. Here’s a breakdown of how I approached the project:

- **Next.js**: As per the exam requirement, I used Next.js to build the application, taking advantage of its file-based routing and server-side rendering for improved performance.

- **Material UI**: Since the instructions mentioned using Material UI (CSS/Bootstrap/Material UI), I chose it for the UI components. It provides a consistent and responsive design across both mobile and desktop screens.

- **Responsive Design**: The application is fully responsive, adapting smoothly to both mobile and desktop screens.

- **Axios**: I’ve set up a global instance of Axios to handle all API requests, ensuring consistency and centralizing the configuration, such as the authorization token.

- **Authorization**: The app follows **JWT-based authentication**, where the user must log in before accessing the app. Upon successful login, the JWT is stored in `localStorage`. Axios intercepts each request and applies the JWT as a Bearer token in the header, ensuring secure communication with the backend.

- **Error and Success Handling**: To improve user experience, I used Material UI’s **Snack** component for handling error and success messages, which are displayed as bottom-left notifications.

- **Form Validation**: I’ve used **Zod** for robust schema validation and **React Hook Form** for handling form data and reactivity. This ensures smooth user interactions and clear validation messages beneath the input fields.

- **Project Structure**:
  - **/api**: Contains functions to call backend APIs.
  - **/app**: Contains the core frontend application logic.
  - **/schemas**: Contains **Zod** schemas for input validation.

Inside **/app**:
- **/auth-login**: Login page, which redirects users here if they aren’t authenticated.
- **/components**: Reusable UI components that follow the **Single Responsibility Principle (SRP)** to maintain clean code and improve maintainability.
- **/contexts**: Contains the **Toast (Snack Alert)** context for global alert notifications.
- **/create-item**: Page for creating new items.
- **/hooks**: Contains reusable hooks that separate logic from components for better maintainability.
- **/item/[id]**: A page for viewing, editing, or deleting a specific item.

- **Pagination, Loading, and Error States**: I’ve implemented basic pagination, as well as loading and error states, for improved usability and to handle the dynamic data in a user-friendly way.

### Key Libraries Used:
- **Next.js** for routing and server-side rendering.
- **Material UI** for UI components and responsiveness.
- **Zod** for schema-based validation.
- **React Hook Form** for handling form data and reactivity.
- **Axios** for API requests and JWT authentication.

This approach ensures a modular, maintainable, and responsive frontend while following best practices for clean code, validation, and API interaction.

# Table of Contents

1. [Setup](#setup)
   - [Clone the Repository](#1-clone-the-repository)
   - [Install Dependencies](#2-install-dependencies)
   - [Configure Environment Variables](#3-configure-environment-variables)
   - [Run the Application (Development Mode)](#4-run-the-application-development-mode)
   - [Build and Run the Application (Production Mode)](#5-build-and-run-the-application-production-mode)

## Setup

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/lancedalanon/fullstack-exam-frontend.git
```

### 2. Install Dependencies

Navigate into the project directory and install the necessary dependencies:

```bash
cd fullstack-exam-frontend
npm install
```

This will install all required dependencies listed in the `package.json` file.

### 3. Configure Environment Variables
Before running the application, make sure to configure the environment variables. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then, open the `.env` file and set the following variable for connecting to the backend:

```bash
NEXT_PUBLIC_FASTAPI_BACKEND_URL=http://localhost:8000
```

This will allow the frontend to properly communicate with the FastAPI backend.

### 4. Run the Application (Development Mode)

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the development server. You can access the application in your browser by going to:

```bash
http://localhost:3000
```

The application will automatically reload when you make changes to the code.

### 5. Build and Run the Application (Production Mode)

Once you’re ready to deploy or test in production mode, you can build and start the application as follows:

- **Build the application**:

  ```bash
  npm run build
  ```

  This will compile the app and optimize it for production.

- **Start the application in production mode**:

  ```bash
  npm start
  ```

  The application will now run in production mode. By default, it will be available at:

  ```bash
  http://localhost:3000
  ```

- **Credentials for Login**:

To access the application, you can log in using the following credentials:

- Username: `admin`
- Password: `password`

You can use these credentials at the `/auth/login` page to access the application.