import Header from './header';
import Ringing from './ringing';
import VideoArea from './videoArea';

export default function Call({ call, setCall, callAccepted }) {
  const { incomingCall, callEnded } = call;

  console.log(incomingCall, callAccepted);

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg`}
    >
      <div>
        <div>
          <Header />
          <VideoArea name="Quang Viet" />
        </div>
      </div>
      {/* Call popup */}
      {incomingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
}
