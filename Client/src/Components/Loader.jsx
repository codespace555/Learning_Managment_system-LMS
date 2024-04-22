import React from "react";
import { RotatingSquare } from "react-loader-spinner";
function Loader() {
  return (
    <>
      <div className="loader flex w-full h-screen  items-center justify-center">
        <RotatingSquare
          visible={true}
          height="100"
          width="100"
          color="#b134eb"
          ariaLabel="rotating-square-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}

export default Loader;
