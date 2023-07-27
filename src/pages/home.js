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
import Peer from 'simple-peer';
// import {
//   getReceiverId,
//   getReceiverName,
//   getReceiverPicture,
// } from '../helpers/conversation';

const callInfos = {
  socketId: '',
  incomingCall: false,
  callEnded: false,
  name: '',
  picture: '',
  signal: '',
};

function Home({ socket }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState('');
  const [call, setCall] = useState(callInfos);
  const [callAccepted, setCallAccepted] = useState(false);
  const [stream, setStream] = useState(); // for video and audio stream
  const [showVideoCall, setShowVideoCall] = useState(false);

  const myVideo = useRef();
  const yourVideo = useRef();
  // const connectionRef = useRef();

  // const { socketId } = call;

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

  // video call socket and fuctions
  // useEffect(() => {
  //   setupMedia();
  //   socket.on('setup socket', (socketId) => {
  //     console.log('setup socket - my id: ', socketId);
  //     setCall({ ...call, socketId: socketId });
  //   });

  //   // receive incoming call
  //   socket.on('incoming call', (data) => {
  //     console.log('incoming call from: ', data.from);

  //     setCall({
  //       ...call,
  //       socketId: data.from,
  //       name: data.name,
  //       picture: data.picture,
  //       signal: data.signal,
  //       incomingCall: true,
  //     });
  //   });

  //   socket.on('call ended', () => {
  //     console.log('call ended');

  //     setShowVideoCall(false);
  //     setCall({ ...call, callEnded: true, incomingCall: false });
  //     myVideo.current.srcObject = null;
  //     if (callAccepted) {
  //       connectionRef?.current?.destroy();
  //     }
  //   });
  // }, []);

  // const callUser = () => {
  //   enableMedia();
  //   setCall({
  //     ...call,
  //     name: getReceiverName(user.id, activeConversation.users), // get the name of the user i'm calling
  //     picture: getReceiverPicture(user.id, activeConversation.users), // get the picture of the user i'm calling
  //   });

  //   // setup peer-to-peer connection between 2 browser
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: stream,
  //   });

  //   // inform other user that i'm calling
  //   peer.on('signal', (data) => {
  //     console.log('make a call to other user, my socket id: ', socketId);

  //     socket.emit('call user', {
  //       userToCall: getReceiverId(user.id, activeConversation.users),
  //       signal: data,
  //       from: socketId,
  //       myName: `${user.firstName} ${user.lastName}`,
  //       myPicture: user.picture,
  //     });
  //   });

  //   peer.on('stream', (stream) => {
  //     yourVideo.current.srcObject = stream;
  //   });

  //   socket.on('call accepted', (signal) => {
  //     console.log('call accepted');

  //     setCallAccepted(true);
  //     peer.signal(signal); // connect with other user's signal
  //   });

  //   connectionRef.current = peer;
  // };

  // const answerCall = () => {
  //   enableMedia();
  //   setCallAccepted(true);

  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: stream,
  //   });

  //   peer.on('signal', (data) => {
  //     console.log('answer a call from: ', call.socketId);
  //     socket.emit('answer call', { signal: data, to: call.socketId });
  //   });

  //   peer.on('stream', (stream) => {
  //     yourVideo.current.srcObject = stream;
  //   });

  //   peer.signal(call.signal); // connect with other user's signal
  //   connectionRef.current = peer;
  // };

  // const endCall = () => {
  //   console.log('i end this call');

  //   setShowVideoCall(false);
  //   setCall({ ...call, callEnded: true, incomingCall: false });
  //   myVideo.current.srcObject = null;
  //   socket.emit('end call', call.socketId);
  //   connectionRef?.current?.destroy();
  // };

  // const setupMedia = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((deviceStream) => {
  //       setStream(deviceStream);
  //     });
  // };

  // const enableMedia = () => {
  //   myVideo.current.srcObject = stream;
  //   setShowVideoCall(true);
  // };
  // video call socket and fuctions

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        <div className="container h-screen flex py-[19px]">
          <Sidebar onlineUsers={onlineUsers} typing={typing} />
          {activeConversation._id ? (
            <Inbox
              onlineUsers={onlineUsers}
              typing={typing}
              // callUser={callUser}
            />
          ) : (
            <MainHome />
          )}
        </div>
      </div>
      <div
        className={
          (showVideoCall || call.signal) && !call.callEnded ? '' : 'hidden'
        }
      >
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          yourVideo={yourVideo}
          stream={stream}
          // answerCall={answerCall}
          showVideoCall={showVideoCall}
          // endCall={endCall}
        />
      </div>
    </>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
