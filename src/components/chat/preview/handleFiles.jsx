import { useDispatch, useSelector } from 'react-redux';
import AddNewFiles from './addNewFiles';
import { CloseIcon, SendIcon } from '../../../svg';
import { uploadFiles } from '../../../helpers/file';
import { useState } from 'react';
import {
  removeFileFromPreview,
  sendMessage,
} from '../../../reducers/features/chatSlice';
import SocketContext from '../../../context/socketContext';
import { DotLoader } from 'react-spinners';
import VideoThumbnail from 'react-video-thumbnail';

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

  const handleRemoveFile = (index) => {
    dispatch(removeFileFromPreview(index));
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
            ) : file.type === 'VIDEO' ? (
              <VideoThumbnail videoUrl={file.fileData} />
            ) : (
              <img
                src={`../../../images/file/${file.type}.png`}
                alt=""
                className="w-8 h-10 mt-1.5 ml-2.5"
              />
            )}
            {/* Remove file */}
            <div
              className="removeFileIcon hidden"
              onClick={() => handleRemoveFile(i)}
            >
              <CloseIcon className="dark:fill-white absolute right-0 top-0 w-4 h-4" />
            </div>
          </div>
        ))}
        <AddNewFiles setActiveIndex={setActiveIndex} />
      </div>
      <div
        onClick={(eve) => sendFilesHandler(eve)}
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
      >
        {loading ? (
          <DotLoader color="#e9edef" size={25} speedMultiplier={3} />
        ) : (
          <SendIcon className="fill-white" />
        )}
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
