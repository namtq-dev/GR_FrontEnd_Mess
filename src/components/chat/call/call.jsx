import { useState } from 'react';
import CallActions from './callActions';
import Header from './header';
import Ringing from './ringing';
import CallInfo from './callInfo';

export default function Call({
  call,
  setCall,
  callAccepted,
  myVideo,
  yourVideo,
  stream,
}) {
  const { incomingCall, callEnded } = call;

  const [showCallActions, setSHowCallActions] = useState(false);

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg`}
      onMouseOver={() => setSHowCallActions(true)}
      onMouseOut={() => setSHowCallActions(false)}
    >
      <div>
        <div>
          <Header />
          <CallInfo name="Quang Viet" />
          {showCallActions ? <CallActions /> : null}
        </div>
        <div>
          {/* Your video */}
          <div>
            <video
              ref={yourVideo}
              playsInline
              muted
              autoPlay
              className="largeVideoCall "
            ></video>
          </div>
          {/* My video */}
          <div>
            <video
              ref={myVideo}
              playsInline
              muted
              autoPlay
              className={`smallVideoCall ${
                showCallActions ? 'moveVideoCall' : ''
              }`}
            ></video>
          </div>
        </div>
      </div>

      {/* Call popup */}
      {incomingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
}
