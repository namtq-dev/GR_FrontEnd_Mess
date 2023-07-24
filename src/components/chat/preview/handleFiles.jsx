import { useDispatch, useSelector } from 'react-redux';
import AddNewFiles from './addNewFiles';
import { SendIcon } from '../../../svg';
import { uploadFiles } from '../../../helpers/file';
import { useState } from 'react';
import { sendMessage } from '../../../reducers/features/chatSlice';
import SocketContext from '../../../context/socketContext';

function HandleFiles({ activeIndex, setActiveIndex, message, socket }) {
  const dispatch = useDispatch();

  const { files, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const sendFilesHandler = async (eve) => {
    eve.preventDefault();
    setLoading(true);

    // upload files to cloudinary
    const uploadedFiles = await uploadFiles(files);

    // send message to BE
    const values = {
      loginToken: user.loginToken,
      message,
      converId: activeConversation._id,
      files: uploadFiles.length > 0 ? uploadedFiles : [],
    };

    const newMsg = await dispatch(sendMessage(values));
    socket.emit('send message', newMsg.payload);
    setLoading(false);
  };

  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
      <span></span>
      <div className="flex items-center gap-x-2">
        {files.map((file, i) => (
          <div
            key={i}
            className={`fileThumbnail relative w-14 h-14 border dark:border-white mt-2 rounded-md overflow-hidden cursor-pointer ${
              activeIndex === i ? 'border-[3px] !border-green_1' : ''
            }`}
            onClick={() => setActiveIndex(i)}
          >
            {file.type === 'IMAGE' ? (
              <img
                src={file.fileData}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={`../../../images/file/${file.type}.png`}
                alt=""
                className="w-8 h-10 mt-1.5 ml-2.5"
              />
            )}
          </div>
        ))}
        <AddNewFiles setActiveIndex={setActiveIndex} />
      </div>
      <div
        onClick={(eve) => sendFilesHandler(eve)}
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
      >
        <SendIcon className="fill-white" />
      </div>
    </div>
  );
}

const HandleFilesWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <HandleFiles {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HandleFilesWithSocket;
