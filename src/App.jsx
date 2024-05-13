import SignIn from "./components/auth/SignIn";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SignUp from "./components/auth/SignUp";
import { useDispatch } from "react-redux";
import { currentUser } from "./features/auth/authThunks";
import Projects from "./components/projects/Projects";
import ProjectDetail from "./components/projects/ProjectDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tickets from "./components/tickets/Tickets";
import Ticket from "./components/tickets/Ticket";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  token && dispatch(currentUser());
  return (
    <div>
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/*" element={<Layout />}>
          <Route index element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="tickets/:id" element={<Ticket />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;

