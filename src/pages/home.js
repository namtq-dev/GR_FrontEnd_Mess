import { useEffect } from 'react';
import { Sidebar } from '../components/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../reducers/features/chatSlice';
import { Inbox, MainHome } from '../components/chat';

export default function Home() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  // get all conversations
  useEffect(() => {
    if (user?.loginToken) {
      dispatch(getConversations(user.loginToken));
    }
  }, [user]);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="container h-screen flex">
        <Sidebar />
        {activeConversation._id ? <Inbox /> : <MainHome />}
      </div>
    </div>
  );
}
