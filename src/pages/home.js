import { useEffect, useRef, useState } from 'react';
import { Sidebar } from '../components/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConversations,
  updateIncomingMessages,
} from '../reducers/features/chatSlice';
import { Inbox, MainHome } from '../components/chat';
import SocketContext from '../context/socketContext';
import Call from '../components/chat/call/call';

const callInfos = {
  incomingCall: true,
  callEnded: false,
};

function Home({ socket }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState('');
  const [call, setCall] = useState(callInfos);
  const [callAccepted, setCallAccepted] = useState(false);
  const [stream, setStream] = useState();

  const myVideo = useRef();
  const yourVideo = useRef();

  useEffect(() => {
    if (user?.loginToken) {
      // send online status to BE
      socket.emit('online', user.id);

      // get online users list
      socket.on('online users list', (usersList) => {
        setOnlineUsers(usersList);
      });

      // get all conversations
      dispatch(getConversations(user.loginToken));
    }
  }, [user]);

  useEffect(() => {
    // socket to receive new messages
    socket.on('receive message', (message) => {
      dispatch(updateIncomingMessages(message));
    });

    // socket to receive typing status
    socket.on('typing', (conversationId) => setTyping(conversationId));
    socket.on('stop typing', () => setTyping(''));
  }, []);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        <div className="container h-screen flex py-[19px]">
          <Sidebar onlineUsers={onlineUsers} typing={typing} />
          {activeConversation._id ? (
            <Inbox onlineUsers={onlineUsers} typing={typing} />
          ) : (
            <MainHome />
          )}
        </div>
      </div>
      <Call
        call={call}
        setCall={setCall}
        callAccepted={callAccepted}
        myVideo={myVideo}
        yourVideo={yourVideo}
        stream={stream}
      />
    </>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
