import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from "react-redux";
function Room() {
  const code = useParams();
  const userData = useSelector((state) => state.auth.userData);
  console.log(code);
  const myMeeting = async (element) => {
    const appID = 1174135598;
 const serverSecret = "69a19f0156eb801664869f16001b8faf";
 const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, code.code,  userData.data?._id,  userData?.data?.fullName);

 const zp = ZegoUIKitPrebuilt.create(kitToken);
 zp.joinRoom({
  container: element,
  sharedLinks: [
    {
      name: 'Personal link',
      url:
       window.location.protocol + '//' + 
       window.location.host + window.location.pathname +
        '?roomID=' +
        code,
    },
  ],
  scenario: {
   mode: ZegoUIKitPrebuilt.VideoConference,
  },
});

  }
  return (
    <div className=" m-32 h-screen flex justify-center items-center ">
      
      <div ref={myMeeting} className="w-full h-full"/>
    </div>
  );
}

export default Room;
