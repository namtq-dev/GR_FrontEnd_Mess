import { useSelector } from 'react-redux';
import { CallIcon, DotsIcon, SearchLargeIcon, VideoCallIcon } from '../../svg';
import {
  getReceiverName,
  getReceiverPicture,
} from '../../helpers/conversation';

export default function ChatHeader({
  online,
  // callUser
}) {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className="btn">
            <img
              src={
                activeConversation.isGroup
                  ? activeConversation.picture
                  : getReceiverPicture(user.id, activeConversation.users)
              }
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <div className="flex flex-col">
            <h3 className="dark:text-white text-md font-bold">
              {activeConversation.isGroup
                ? activeConversation.name
                : getReceiverName(user.id, activeConversation.users)}
            </h3>
            <span className="text-xs dark:text-dark_svg_2">
              {online ? 'online' : activeConversation.isGroup ? '' : 'offline'}
            </span>
          </div>
        </div>
        {/* Right */}
        <ul className="flex items-center gap-x-2.5">
          {online ? (
            <li
            // onClick={() => callUser()}
            >
              <button className="btn">
                <VideoCallIcon />
              </button>
            </li>
          ) : null}
          {online ? (
            <li>
              <button className="btn">
                <CallIcon />
              </button>
            </li>
          ) : null}
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
