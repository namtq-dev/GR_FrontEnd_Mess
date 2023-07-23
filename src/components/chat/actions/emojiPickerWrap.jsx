import { useEffect, useState } from 'react';
import { CloseIcon, EmojiIcon } from '../../../svg';
import EmojiPicker from 'emoji-picker-react';

export default function EmojiPickerWrap({ message, setMessage, textRef }) {
  const [showPicker, setShowPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = ({ emoji }, eve) => {
    const ref = textRef.current;
    ref.focus();
    const textBeforeCursor = message.substring(0, ref.selectionStart);
    const textAfterCursor = message.substring(ref.selectionStart);
    const newText = textBeforeCursor + emoji + textAfterCursor;

    setMessage(newText);
    setCursorPosition(textBeforeCursor?.length + emoji?.length);
  };

  return (
    <li className="w-full">
      <button
        className="btn"
        type="button"
        onClick={() => setShowPicker((prev) => !prev)}
      >
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {showPicker ? (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      ) : null}
    </li>
  );
}
