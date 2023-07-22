import { useSelector } from 'react-redux';
import Conversation from './conversation';

export default function Conversations() {
  const { conversations } = useSelector((state) => state.chat);
  return (
    <div className="convers scrollbar">
      <ul>
        {conversations &&
          conversations.map((conver) => (
            <Conversation conver={conver} key={conver._id} />
          ))}
      </ul>
    </div>
  );
}
