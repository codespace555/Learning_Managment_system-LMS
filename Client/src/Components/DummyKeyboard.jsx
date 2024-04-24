import React, { useEffect, useState } from "react";
import keyPositions from "../Controller/Key";
import keyboardImage from "../assets/keyboard.png";

function DummyKeyboard({ pressedKey }) {
    const [highlightedKeys, setHighlightedKeys] = useState({});

    useEffect(() => {
        if (pressedKey) {
            setHighlightedKeys(pressedKey);
        } else {
            setHighlightedKeys({});
        }
    }, [pressedKey]);

    const getKeyStyle = (key) => {
        return key === highlightedKeys
            ? { backgroundColor: "rgba(255, 255, 0, 0.5)" } // Highlight yellow with 50% opacity
            : {};
    };

    return (
        <div className="flex items-center justify-center">
            {/* Keyboard container */}
            <div className="relative flex items-center justify-center border w-[500px] h-[300px] glass">
                {/* Keyboard image */}
               
                
                {/* Render keys */}
                {Object.entries(keyPositions).map(([key, position]) => (
                    <div
                        key={key}
                        className="absolute flex items-center justify-center font-bold rounded-md gap-5 p-5"
                        style={{
                            ...position,
                            ...getKeyStyle(key),
                        }}
                    >
                        {key}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DummyKeyboard;
