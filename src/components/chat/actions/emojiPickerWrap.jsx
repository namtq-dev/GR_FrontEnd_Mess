import { EmojiIcon } from '../../../svg';
import EmojiPicker from 'emoji-picker-react';

export default function EmojiPickerWrap() {
  return (
    <li className="w-full">
      <button className="btn" type="button">
        <EmojiIcon className="dark:fill-dark_svg_1" />
      </button>
      <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
        <EmojiPicker theme="dark" />
      </div>
    </li>
  );
}
