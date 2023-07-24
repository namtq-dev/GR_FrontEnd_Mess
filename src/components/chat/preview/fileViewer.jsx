import { useSelector } from 'react-redux';

export default function FileViewer() {
  const { files } = useSelector((state) => state.chat);

  return (
    <div className="w-full max-w-[60%]">
      <div className="flex justify-center items-center">
        {files[0].type === 'IMAGE' ? (
          <img
            src={files[0].fileData}
            alt=""
            className="max-w-[80%] object-contain hview"
          />
        ) : files[0].type === 'VIDEO' ? (
          <video
            src={files[0].fileData}
            controls
            className="max-w-[80%] object-contain hview"
          ></video>
        ) : (
          <div className="min-w-full hview flex flex-col items-center justify-center">
            <img
              src={`../../../images/file/${files[0].type}.png`}
              alt={files[0].type}
            />
            <h3 className="dark:text-dark_text_2 text-2xl">
              No preview available
            </h3>
            <span className="dark:text-dark_text_2">
              {files[0]?.file?.size} kB - {files[0]?.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
