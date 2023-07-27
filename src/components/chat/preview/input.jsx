import { CloseIcon } from '../../../svg';

export default function Input({ message, setMessage, error, setError }) {
  return (
    <div className="w-full max-w-[60%] dark:bg-dark_hover_1 rounded-lg">
      {error ? (
        <div className="w-full bg-transparent h-11 pt-3 text-red-400 flex justify-center gap-3">
          <span>{error}</span>
          <div onClick={() => setError('')}>
            <CloseIcon className="dark:fill-dark_svg_1" />
          </div>
        </div>
      ) : (
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(eve) => setMessage(eve.target.value)}
          className="w-full bg-transparent h-11 pl-2 focus:outline-none 
        border-none dark:text-dark_text_1"
        />
      )}
    </div>
  );
}
