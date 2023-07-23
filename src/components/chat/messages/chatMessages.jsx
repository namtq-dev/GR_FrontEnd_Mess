import { useSelector } from 'react-redux';
import Message from './message';

export default function ChatMessages() {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  return (
    <div
      className="mb-[60px] bg-cover bg-no-repeat 
    bg-[url('https://res.cloudinary.com/djccswary/image/upload/v1690098794/postBgs/whatsapp-chat-background-upt218t7uwyuhvd8_ejguyb.jpg')]"
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
      </div>
    </div>
  );
}
