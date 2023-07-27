import { useState } from 'react';
import { useSelector } from 'react-redux';
import SocketContext from '../../../context/socketContext';

function Input({ message, setMessage, textRef, error, socket }) {
  const { activeConversation } = useSelector((state) => state.chat);

  const [typing, setTyping] = useState(false);

  const onChangeHandler = (eve) => {
    setMessage(eve.target.value);

    if (!typing) {
      setTyping(true);
      socket.emit('typing', activeConversation._id);
    }

    // check stop typing
    let lastTypingTime = new Date().getTime();
    let timer = 1500;
    setTimeout(() => {
      let currentTime = new Date().getTime();
      let timeDiff = currentTime - lastTypingTime;
      if (timeDiff >= timer && typing) {
        socket.emit('stop typing', activeConversation._id);
        setTyping(false);
      }
    }, timer);
  };

  return (
    <div className="w-full">
      {error ? (
        <p className="dark:bg-dark_hover_1 text-red-400 h-[45px] w-full flex-1 rounded-lg text-center pt-3">
          {error}
        </p>
      ) : (
        <input
          type="text"
          className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
          placeholder="Type a message"
          value={message}
          onChange={onChangeHandler}
          ref={textRef}
        />
      )}
    </div>
  );
}

const InputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Input {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default InputWithSocket;
