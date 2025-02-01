import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import TheJobs from "./components/admin/TheJobs";
import PostJobs from "./components/admin/PostJobs";
import Applicants from "./components/admin/Applicants";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";
import NotFound from "./components/NotFound";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Public route
  },
  {
    path: "/login",
    element: <Login />, // Public route
  },
  {
    path: "/signup",
    element: <Signup />, // Public route
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRoutes isPublic={true}>
        {/* Public route but restricted for recruiters */}
        <Jobs />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/job/description/:id",
    element: (
      <ProtectedRoutes isPublic={true}>
        {/* Public route but restricted for recruiters */}
        <JobDescription />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/browse",
    element: (
      <ProtectedRoutes isPublic={true}>
        {/* Public route but restricted for recruiters */}
        <Browse />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoutes role="student">
        {/* Only accessible to users with the "student" role */}
        <Profile />
      </ProtectedRoutes>
    ),
  },
  {
    path: "*", // Catch-all route for unmatched paths
    element: <NotFound />,
  },

  // Admin routes (only accessible to users with the "recruiter" role)
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoutes role="recruiter">
        <Companies />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/company/new",
    element: (
      <ProtectedRoutes role="recruiter">
        <CompanyCreate />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoutes role="recruiter">
        <CompanySetup />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoutes role="recruiter">
        <TheJobs />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/jobs/new",
    element: (
      <ProtectedRoutes role="recruiter">
        <PostJobs />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoutes role="recruiter">
        <Applicants />
      </ProtectedRoutes>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
