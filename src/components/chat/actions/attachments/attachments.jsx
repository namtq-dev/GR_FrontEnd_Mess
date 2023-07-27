import { AttachmentIcon } from '../../../../svg';
import Menu from './menu/menu';

export default function Attachments({
  showAttachmentsMenu,
  setShowAttachmentsMenu,
  setShowPicker,
  setError,
}) {
  return (
    <li className="relative">
      <button
        type="button"
        className="btn"
        onClick={() => {
          setShowPicker(false);
          setShowAttachmentsMenu((prev) => !prev);
        }}
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {showAttachmentsMenu ? <Menu setError={setError} /> : null}
    </li>
  );
}
