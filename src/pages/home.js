import { useEffect } from 'react';
import { Sidebar } from '../components/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../reducers/features/chatSlice';

export default function Home() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  // get all conversations
  useEffect(() => {
    if (user?.loginToken) {
      dispatch(getConversations(user.loginToken));
    }
  }, [user]);

  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="container min-h-screen flex">
        <Sidebar />
      </div>
    </div>
  );
}
