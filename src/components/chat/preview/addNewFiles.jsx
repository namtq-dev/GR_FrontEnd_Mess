import { useRef } from 'react';
import { CloseIcon } from '../../../svg';
import { useDispatch } from 'react-redux';
import { addFiles } from '../../../reducers/features/chatSlice';
import { getFileType } from '../../../helpers/file';

export default function AddNewFiles() {
  const dispatch = useDispatch();

  const addInputRef = useRef(null);

  const filesHandler = (eve) => {
    let files = Array.from(eve.target.files);

    files.forEach((file) => {
      if (
        file.type !== 'application/pdf' &&
        file.type !== 'text/plain' &&
        file.type !== 'application/msword' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        file.type !== 'application/vnd.ms-powerpoint' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.presentationml.presentation' &&
        file.type !== 'application/vnd.ms-excel' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        file.type !== 'application/vnd.rar' &&
        file.type !== 'application/zip' &&
        file.type !== 'audio/mpeg' &&
        file.type !== 'audio/wav' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/gif' &&
        file.type !== 'image/webp' &&
        file.type !== 'video/mp4' &&
        file.type !== 'video/mpeg'
      ) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 10) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent) => {
          dispatch(
            addFiles({
              file: file,
              fileData:
                getFileType(file.type) === 'IMAGE'
                  ? readerEvent.target.result
                  : '',
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };

  return (
    <>
      <div
        onClick={() => addInputRef.current.click()}
        className="w-14 h-14 mt-2 border dark:border-white rounded-md flex items-center justify-center cursor-pointer"
      >
        <span className="rotate-45">
          <CloseIcon className="dark:fill-dark_svg_1" />
        </span>
      </div>
      <input
        type="file"
        hidden
        multiple
        ref={addInputRef}
        accept="application/*,text/plain,image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg"
        onChange={filesHandler}
      />
    </>
  );
}
