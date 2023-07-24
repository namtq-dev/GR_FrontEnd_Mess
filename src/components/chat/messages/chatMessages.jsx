import { useSelector } from 'react-redux';
import Message from './message';
import { useEffect, useRef } from 'react';
import Typing from './typing';

export default function ChatMessages({ typing }) {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const endRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="mb-[60px] bg-cover bg-no-repeat 
    bg-[url('https://res.cloudinary.com/djccswary/image/upload/v1690103369/postBgs/HD-wallpaper-whatsapp-cartoon-random-skull-simple-dark-black_kbcjsv.jpg')]"
    >
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {messages &&
          messages.map((message) => (
            <Message
              message={message}
              key={message._id}
              mine={user.id === message.sender._id}
            />
          ))}
        {typing === activeConversation._id ? <Typing /> : null}
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  );
}
