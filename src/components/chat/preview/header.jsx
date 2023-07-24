import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '../../../svg';
import { clearFiles } from '../../../reducers/features/chatSlice';

export default function Header() {
  const dispatch = useDispatch();

  const { files } = useSelector((state) => state.chat);

  const clearFilesHandler = () => {
    dispatch(clearFiles());
  };

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <div
          className="translate-x-4 cursor-pointer"
          onClick={() => clearFilesHandler()}
        >
          <CloseIcon className="dark:fill-dark_svg_1" />
        </div>
        <h3 className="dark:text-dark_text_1 text-[15px]">
          {files[0]?.file?.name}
        </h3>
        <span></span>
      </div>
    </div>
  );
}
