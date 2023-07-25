import { useEffect, useState } from 'react';
import { CloseIcon, ValidIcon } from '../../../svg';

export default function Ringing({ call, setCall, answerCall }) {
  const { incomingCall, callEnded, name, picture } = call;

  const [timer, setTimer] = useState(0);

  let interval;
  const handleTimer = () => {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer <= 10) {
      handleTimer();
    } else {
      setCall({ ...call, incomingCall: false });
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div
      className="dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 
                    -translate-x-1/2 -translate-y-1/2 shadow-lg z-30"
    >
      <div className="p-4 flex items-center justify-between gap-x-8">
        {/* Call infos */}
        <div className="flex items-center gap-x-2">
          <img
            src={picture}
            alt={`caller profile picture`}
            className="w-28 h-28 rounded-full"
          />
          <div>
            <h3 className="dark:text-white">
              <b>{name}</b>
            </h3>
            <span className="dark:text-dark_text_2">Video Call...</span>
          </div>
        </div>
        {/* Call actions */}
        <ul className="flex items-center gap-x-2">
          <li>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <CloseIcon className="fill-white w-5" />
            </button>
          </li>
          <li onClick={answerCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
              <ValidIcon className="fill-white w-6 mt-2" />
            </button>
          </li>
        </ul>
      </div>
      {/* Ringtone */}
      <audio src="../../../../audio/incoming.mp3" autoPlay loop></audio>
    </div>
  );
}
