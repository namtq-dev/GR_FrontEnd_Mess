import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PhotoIcon } from '../../../../../svg';
import { addFiles } from '../../../../../reducers/features/chatSlice';
import { getFileType } from '../../../../../helpers/file';

export default function PhotoAttachment({ setError }) {
  const dispatch = useDispatch();

  const photosInputRef = useRef(null);

  const imageHandler = (eve) => {
    let files = Array.from(eve.target.files);

    files.forEach((file) => {
      if (
        file.type !== 'image/png' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/gif' &&
        file.type !== 'image/webp' &&
        file.type !== 'video/mp4' &&
        file.type !== 'video/mpeg'
      ) {
        files = files.filter((item) => item.name !== file.name);
        setError(`${file.name} file type is not supported.`);
        return;
      } else if (file.size > 1024 * 1024 * 10) {
        files = files.filter((item) => item.name !== file.name);
        setError(`${file.name} file size is too large.`);
        return;
      } else {
        setError('');

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent) => {
          dispatch(
            addFiles({
              file: file,
              fileData: readerEvent.target.result,
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };

  return (
    <li>
      <button
        type="button"
        className="bg-[#BF59CF] rounded-full"
        onClick={() => photosInputRef.current.click()}
      >
        <PhotoIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={photosInputRef}
        accept="image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg"
        onChange={imageHandler}
      />
    </li>
  );
}
