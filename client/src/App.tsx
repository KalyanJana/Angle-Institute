import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBanner from "./components/TopBanner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import CourseDetail from "./pages/CourseDetail";
import Placement from "./pages/Placement";
import StudentZone from "./pages/StudentZone";
import AdminDashboard from "./pages/AdminDashboard";
import OurCenter from "./pages/OurCenter";
import Franchise from "./pages/Franchise";
import WhatsAppButton from "./components/WhatsAppButton";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <TopBanner />
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/placement" element={<Placement />} />
          <Route path="/student-zone" element={<StudentZone />} />
          <Route path="/our-center" element={<OurCenter />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}
