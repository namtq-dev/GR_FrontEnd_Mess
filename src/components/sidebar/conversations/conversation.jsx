import { useDispatch, useSelector } from 'react-redux';
import { dateHandler } from '../../../helpers/date';
import { createOrOpenConversation } from '../../../reducers/features/chatSlice';
import {
  getReceiverId,
  getReceiverName,
  getReceiverPicture,
} from '../../../helpers/conversation';
import SocketContext from '../../../context/socketContext';

function Conversation({ conver, online, socket }) {
  const dispatch = useDispatch();

  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const values = {
    receiverId: getReceiverId(user.id, conver.users),
    loginToken: user.loginToken,
  };
  const openConversation = async () => {
    let newConver = await dispatch(createOrOpenConversation(values));
    socket.emit('join conversation', newConver.payload._id);
  };

  return (
    <li
      onClick={openConversation}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1 hover:${
        conver._id === activeConversation._id ? '' : 'dark:bg-dark_bg_2'
      } cursor-pointer dark:text-dark_text_1 px-[10px] ${
        conver._id === activeConversation._id ? 'dark:bg-dark_hover_1' : ''
      }`}
    >
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* Left side */}
        <div className="flex items-center gap-x-3">
          <div
            className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${
              online ? 'online' : ''
            } `}
          >
            <img
              src={getReceiverPicture(user.id, conver.users)}
              alt="conversation picture"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">
              {getReceiverName(user.id, conver.users)}
            </h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>
                    {conver.latestMessage?.message.length > 25
                      ? conver.latestMessage?.message.substring(0, 25) + '...'
                      : conver.latestMessage?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {conver.latestMessage?.createdAt
              ? dateHandler(conver.latestMessage?.createdAt)
              : ''}
          </span>
        </div>
      </div>
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}

const ConversationWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Conversation {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ConversationWithSocket;
