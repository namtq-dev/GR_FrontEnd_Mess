import { useEffect } from 'react';
import { Sidebar } from '../components/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConversations,
  updateIncomingMessages,
} from '../reducers/features/chatSlice';
import { Inbox, MainHome } from '../components/chat';
import SocketContext from '../context/socketContext';

function Home({ socket }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  // get all conversations
  useEffect(() => {
    if (user?.loginToken) {
      socket.emit('online', user.id);
      dispatch(getConversations(user.loginToken));
    }
  }, [user]);

  // socket to receive new messages
  useEffect(() => {
    socket.on('receive message', (message) => {
      dispatch(updateIncomingMessages(message));
    });
  }, []);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container h-screen flex py-[19px]">
        <Sidebar />
        {activeConversation._id ? <Inbox /> : <MainHome />}
      </div>
    </div>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
