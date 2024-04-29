import React, { useEffect, useState } from "react";
import DummyKeyboard from "../Components/DummyKeyboard";
function Typeing() {
  const [pressedKey, setPressedKey] = useState(null);

  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();
    setPressedKey(key);
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen w-full">
      <h1>Typing Test</h1>
      <p>Press keys on your keyboard to highlight them on the image below.</p>
     <div className="">
      <DummyKeyboard pressedKey={pressedKey} />
     </div>
    </div>
  );
}

export default Typeing;
