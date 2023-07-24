import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SendIcon } from '../../../svg';
import Input from './input';
import { sendMessage } from '../../../reducers/features/chatSlice';
import { DotLoader } from 'react-spinners';
import EmojiPickerWrap from './emojiPickerWrap';
import { Attachments } from './attachments';
import SocketContext from '../../../context/socketContext';

function ChatActions({ socket }) {
  const dispatch = useDispatch();

  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const [message, setMessage] = useState('');
  const [showAttachmentsMenu, setShowAttachmentsMenu] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [sendMessLoading, setSendMessLoading] = useState(false);

  const textRef = useRef();

  const values = {
    message,
    converId: activeConversation._id,
    files: [],
    loginToken: user.loginToken,
  };
  const sendMessageHandler = async (eve) => {
    eve.preventDefault();
    setSendMessLoading(true);
    let newMsg = await dispatch(sendMessage(values));
    socket.emit('send message', newMsg.payload);
    setMessage('');
    setSendMessLoading(false);
  };

  return (
    <form
      onSubmit={(eve) => sendMessageHandler(eve)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex gap-x-2">
          <EmojiPickerWrap
            message={message}
            setMessage={setMessage}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setShowAttachmentsMenu={setShowAttachmentsMenu}
            textRef={textRef}
          />
          <Attachments
            showAttachmentsMenu={showAttachmentsMenu}
            setShowAttachmentsMenu={setShowAttachmentsMenu}
            setShowPicker={setShowPicker}
          />
        </ul>
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        <button type="submit" className="btn">
          {status === 'loading' && sendMessLoading ? (
            <DotLoader color="#e9edef" size={25} speedMultiplier={3} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}

const ChatActionsWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatActions {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatActionsWithSocket;
