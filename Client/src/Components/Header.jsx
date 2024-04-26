import React, { useCallback, useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
const TEXTS = ["EASY", "AFFORDABLE", "PRACTICAL"];
function Header() {
  const [index, setIndex] = React.useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div className="  w-full  h-screen  bg-[#18202c]  lg:flex  justify-center items-center ">
      <div className="  lg:w-1/2  p-5 flex gap-5 flex-col ">
        <h1 className="md:text-4xl text-sm font-extrabold flex w-full z-100">
          Learn Tech Made&nbsp;{" "}
          <span className="text-pink-800 z-100 text-sm">
            <TextTransition
              className="text-pink-800 z-10"
              springConfig={presets.wobbly}
            >
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
          </span>{" "}
        </h1>
        <p className=" my-2 pr-10 ">
          LearnIfytech is the one-stop destination for your upskilling journey.
          Brace yourself to find the best job-ready courses and high-end
          technologies available in the sector. And if that weren't good enough,
          get the highest quality course content at the most affordable prices!
        </p>
        <p className="my-5">What are we waiting for ? Let's push Start!</p>
        <button className="opacity-100  text-white text-sm medium:text-base medium:px-6 medium:py-3 font-semibold rounded-md flex gap-2 justify-center items-center font-nunitoSans cursor-pointer mx-auto large:!mx-0 w-full px-[88px] py-[13px] large:!px-12 large:!py-3 bg-pink-900 hover:bg-pink-800">
          Courses
        </button>
      </div>
      <div className="h-full md:w-1/2 ">
        <img src="./Illustration(1).png" alt="" />
      </div>
    </div>
  );
}

export default Header;
