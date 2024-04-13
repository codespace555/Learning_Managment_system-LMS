import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <div className="bg-gray-300 w-full dark:bg-[#18202c] h-auto overflow-hidden">
        <Navbar />
        <main className="h-screen">

       <Outlet/>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
