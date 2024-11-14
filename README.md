
# 📋 Job Portal - ApniJob

The Job Portal is a full-featured web application developed using the MERN stack (MongoDB, Express.js, React, Node.js). This platform serves as a bridge between job seekers and recruiters, making it easy for companies to find the right candidates and for individuals to discover career opportunities. It provides a seamless experience for managing job listings, applications, and profiles, ensuring that the hiring process is efficient, organized, and accessible.

This portal includes robust user authentication, role-based access for applicants and recruiters, and advanced job search functionality, all wrapped in a clean and responsive design.




## 🎯 Key Features

**User Authentication** - Secure sign-up and login using JWT, ensuring safe access for all users.

**Role-Based Access Control** - Separate functionalities for recruiters and applicants to provide a tailored user experience.

**Job Listings Management** - Recruiters can easily create, update, and delete job listings with detailed descriptions and requirements.

**Application Tracking System** - Applicants can track the status of their applications, and recruiters can manage applicants effectively.

**Advanced Search and Filter Options** - Search for jobs by title, location, category, and other filters to find the best match.

**Interactive and Responsive UI** - Modern UI components with mobile-first responsiveness for a smooth experience on all devices.
## 📐Tech Stack

This project is powered by the MERN stack, which provides a scalable and robust framework for modern web applications.


* **Frontend:**	React, Tailwind CSS, ShadCN UI components
* **Backend:**	Node.js, Express.js
* **Database:**	MongoDB
* **State Management:**	Redux Toolkit for centralized and efficient state management
* **Authentication:**	JSON Web Token (JWT)
* **Sooner Additions**: Advanced search, notification system, and more.
* **File Storage**: Cloudinary for image uploads





## 🚀 Getting Started
**Prerequisites:**

Node.js (v14+ recommended)

MongoDB (local or cloud instance)

**Installation:**

1. Clone the Repository

```bash
git clone https://github.com/yourusername/job-portal.git

```
2. Navigate to the Project Directory

```bash
cd job-portal

```

3. Install Dependencies

```bash
npm install

```
4. Set Up Environment Variables

Create a .env file in the root directory and add the following variables:

```bash
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>

```
5. Start the Server

```bash
npm run dev

```




    
## 🛠️ Project Structure
**Backend :**
```bash
backend/
├── controllers/                # Contains the controller logic for handling requests
├── middlewares/                # Middleware functions for validation and authentication
├── models/                     # Mongoose schemas for database models
├── node_modules/               # Backend dependencies
├── routes/                     # API route handlers
├── utils/                      # Utility functions and helper files
├── .env                        # Environment variables
├── .gitignore                  # Git ignore configuration
├── index.js                    # Main entry point for the backend server
├── package-lock.json           # Dependency lock file
└── package.json                # Backend dependencies and scripts

```
**Frontend :**
```bash
frontend/
├── node_modules/               # Frontend dependencies
├── public/                     # Static files (HTML, images, etc.)
├── src/
│   ├── assets/                 # Static assets like images and icons
│   ├── components/             # Reusable React components
│   ├── lib/                    # Additional libraries or helper functions
│   ├── redux/                  # Redux setup and state management
│   ├── App.css                 # Global styles
│   ├── App.jsx                 # Main App component
│   ├── index.css               # Base CSS styles
│   ├── index.js                # Frontend entry point
│   └── main.jsx                # Root React rendering file
├── .gitignore                  # Git ignore configuration
├── components.json             # Configuration for components
├── eslint.config.js            # ESLint configuration for code quality
├── index.html                  # Main HTML file for React app
├── jsconfig.json               # JavaScript configuration for paths
└── package.json                # Frontend dependencies and scripts

```
## 🌟 Usage Guide

 **For Applicants :**

* Create an account or log in to an existing account.
* Browse job listings using filters like location, title, and more.
* Apply to jobs directly and track the status of applications.

**For Recruiters :**
* Sign up as a recruiter.
* Post job openings, providing details like job title, description, location, and requirements.
* View applicants for each job posting and track the recruitment process.






## 🙏 Acknowledgments


Special thanks to all contributors, open-source libraries, and resources that made this project possible.


## 📬 Contact

For any questions or feedback, please reach out:

* Email: rishavkamboj75@gmail.com
