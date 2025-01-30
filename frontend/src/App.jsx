import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import TheJobs from './components/admin/TheJobs';
import PostJobs from './components/admin/PostJobs';
import Applicants from './components/admin/Applicants';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/job/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  // now moving to admin routes //
  {
    path: "/admin/companies",
    element: <Companies />,
  },
  {
    path: "/admin/company/new",
    element: <CompanyCreate />,
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />,
  },
  {
    path: "/admin/jobs",
    element: <TheJobs />,
  },
  {
    path: "/admin/jobs/new",
    element: <PostJobs />,
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants/>,
  },
]);
function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
