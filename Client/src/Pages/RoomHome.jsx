import { useState ,memo} from "react";
import Input from "../Components/Input";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";
import { useSelector } from "react-redux";
import Select from "../Components/Select";
import courses from "../Controller/course";

const Joinbtn = memo(function ({obj,btnText,handlebtnFunction}){

  return(
    <>
          <button
            className="btn btn-outline btn-secondary w-full mt-4"
            onClick={(e) => {
              e.preventDefault();
              handlebtnFunction(obj);
            }}
          >
            {btnText}
          </button>
        </>
  )

})

function JoinFunction({ handlebtnFunction, btnText, inputText, option }) {
  const [value, setValue] = useState("");
  const obj = {
    roomcode: value,
  };
  return (
    <>
      <Input
        label={inputText}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
          {/* {option && <Select label="course" option={option} />} */}
     <Joinbtn obj= {obj} handlebtnFunction={handlebtnFunction} btnText={btnText}/>
    </>
  );
}

function RoomHome() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [courseTitle, setCoursetitle] = useState();

  const getCourse = async () => {
    try {
      const allCourse = courses.getCourse();
      console.log(allCourse);
      if (!allCourse) {
        setCoursetitle(allCourse.data);
      }
    } catch (error) {}
  };

  const joinroom = (data) => {
    console.log(data);
    navigate(`/room/${data.roomcode}`);
  };
  const createRoom = (data) => {
    console.log(data);
  };
  return (
    <div className=" h-screen flex items-center justify-center  ">
      <div className=" w-ful m-5  rounded-lg md:flex bg-slate-950 items-center justify-between ">
        <img
          className="lg:w-1/2 md:w-1/2 glass rounded-lg "
          src="./Image.png"
          alt=""
        />
        <div className="p-10 w-full ">
          <JoinFunction
            inputText="Enter Room Code"
            btnText="Join Room"
            handlebtnFunction={joinroom}
          />
          {userData && userData?.data?.role === "ADMIN" ? (
            <>
              <h2 className="text-center my-5">or</h2>

              <Modal text="Create Room">
                <JoinFunction
                  btnText="Create Room"
                  handlebtnFunction={createRoom}
                  option={courseTitle}
                />
              </Modal>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default RoomHome;
