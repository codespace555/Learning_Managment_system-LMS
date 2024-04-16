import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  
const queryClient = new QueryClient()
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <div className="bg-gray-300 w-full dark:bg-[#18202c] h-auto overflow-hidden">
        <Navbar />
        <main className="h-screen">

       <Outlet/>
        </main>
        <Footer />
      </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
