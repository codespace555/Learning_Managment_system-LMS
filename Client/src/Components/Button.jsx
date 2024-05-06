import React, { useEffect, useState } from "react";

function Button({ isPending}) {
  // The `progress` variable stores the progress value (0-100)
  const [progress, setProgress] = useState(0);

  console.log(isPending);
  useEffect(() => {
    if (isPending) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          // Increase progress by 10% every 500 ms, stop at 100%
          if (prevProgress < 100) {
            return prevProgress + 5;
          } else {
            clearInterval(interval);
            return prevProgress;
          }
        });
      }, 500);
      return () => clearInterval(interval);
    } else {
      // Reset progress if `isPending` is false
      setProgress(0);
    }
  }, [isPending]);

  return (
   <>
        {isPending && (
            <div className="absolute top-36 left-0  h-screen w-full flex items-center justify-center backdrop-blur-sm ">
          <div
            className="radial-progress text-primary"
            style={{ "--value": progress }}
            role="progressbar"
          >
            {progress}%
          </div>
          </div>
        )}
  
    </>
  );
}

export default Button;
