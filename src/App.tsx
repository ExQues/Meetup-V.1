import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventPage from "@/pages/EventPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventPage />} />
      </Routes>
    </Router>
  );
}
