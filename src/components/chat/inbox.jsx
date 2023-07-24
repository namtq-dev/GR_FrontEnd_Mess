import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from './chatHeader';
import ChatMessages from './messages/chatMessages';
import { useEffect } from 'react';
import { getMessages } from '../../reducers/features/chatSlice';
import { ChatActions } from './actions';
import { checkOnlineStatus } from '../../helpers/conversation';

export default function Inbox({ onlineUsers }) {
  const dispatch = useDispatch();

  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const values = {
    loginToken: user.loginToken,
    converId: activeConversation?._id,
  };
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
      <div>
        <ChatHeader
          online={checkOnlineStatus(
            onlineUsers,
            user.id,
            activeConversation.users
          )}
        />
        <ChatMessages />
        <ChatActions />
      </div>
    </div>
  );
}
