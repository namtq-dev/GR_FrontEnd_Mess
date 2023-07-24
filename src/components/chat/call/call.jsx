import Ringing from './ringing';

export default function Call({ call, setCall, callAccepted }) {
  const { incomingCall, callEnded } = call;

  console.log(incomingCall, callAccepted);

  return (
    <div>
      {incomingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
}
