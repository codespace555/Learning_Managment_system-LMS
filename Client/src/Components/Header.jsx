import React, { useCallback, useEffect,useState } from "react";
import TextTransition, { presets } from 'react-text-transition';
const TEXTS = ['EASY', 'AFFORDABLE', 'PRACTICAL'];
function Header() {
  const [index, setIndex] = React.useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div className="m-5 w-full h-55 ">
      <div className="flex flex-col  ">
        <h1 className="text-4xl font-extrabold flex w-full">Learn Tech  Made &nbsp; <span className="text-pink-800">
        <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition> 
          </span>  </h1>
        <p className="mt-5">
        LearnIfytech is the one-stop destination for your upskilling journey. Brace yourself to find the best job-ready courses and high-end technologies available in the sector. And if that weren't good enough, get the highest quality course content at the most affordable prices!
        </p>
        <p className="mt-5">What are we waiting for ? Let's push Start!</p>
        </div>
        <button className=" px-10 py-2 font-semibold rounded-md mt-5 p-5 bg-pink-900 hover:bg-pink-800">Courses</button>
      <div>

      </div>
    </div>
  );
}

export default Header;
