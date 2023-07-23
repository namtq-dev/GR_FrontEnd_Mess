import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SendIcon } from '../../../svg';
import Attachments from './attachments';
import EmojiPicker from './emojiPicker';
import Input from './input';
import { sendMessage } from '../../../reducers/features/chatSlice';

export default function ChatActions() {
  const dispatch = useDispatch();

  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const [message, setMessage] = useState('');

  const values = {
    message,
    converId: activeConversation._id,
    files: [],
    loginToken: user.loginToken,
  };
  const sendMessageHandler = async (eve) => {
    eve.preventDefault();
    await dispatch(sendMessage(values));
    setMessage('');
  };

  return (
    <form
      onSubmit={(eve) => sendMessageHandler(eve)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex gap-x-2">
          <EmojiPicker />
          <Attachments />
        </ul>
        <Input message={message} setMessage={setMessage} />
        <button type="submit" className="btn">
          <SendIcon className="dark:fill-dark_svg_1" />
        </button>
      </div>
    </form>
  );
}
