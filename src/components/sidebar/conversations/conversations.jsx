import { useSelector } from 'react-redux';
import Conversation from './conversation';

export default function Conversations() {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  return (
    <div className="convers scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter(
              (conver) =>
                conver.latestMessage || conver._id === activeConversation._id
            )
            .map((conver) => <Conversation conver={conver} key={conver._id} />)}
      </ul>
    </div>
  );
}
