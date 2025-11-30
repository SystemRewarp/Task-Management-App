
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Pages/About.jsx';
import HomePage from './Pages/HomePage.jsx';
import CreateTaskPage from './Pages/CreateTaskPage.jsx';
import EditTask from './component/EditTask.jsx';
import NavBar from './component/Navbar.jsx';
import TaskDetails from "./Pages/TaskDetails.jsx";
import DeleteTask from "./component/DeleteTask.jsx";
import EmailPage from "./Pages/EmailPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTaskPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/delete/:id" element={<DeleteTask />} />
        <Route path="/send-email" element={<EmailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
