import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from './chatHeader';
import ChatMessages from './messages/chatMessages';
import { useEffect, useState } from 'react';
import { getMessages } from '../../reducers/features/chatSlice';
import { ChatActions } from './actions';
import { checkOnlineStatus } from '../../helpers/conversation';
import FilesPreview from './preview/filesPreview';

export default function Inbox({ onlineUsers, typing, callUser }) {
  const dispatch = useDispatch();

  const { activeConversation, files } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const [error, setError] = useState(false);

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
          online={
            activeConversation.isGroup
              ? false
              : checkOnlineStatus(
                  onlineUsers,
                  user.id,
                  activeConversation.users
                )
          }
          // callUser={callUser}
        />
        {files.length > 0 ? (
          <FilesPreview error={error} setError={setError} />
        ) : (
          <>
            <ChatMessages typing={typing} />
            <ChatActions error={error} setError={setError} />
          </>
        )}
      </div>
    </div>
  );
}
