import { useState } from 'react';
import { AttachmentIcon } from '../../../../svg';
import Menu from './menu/menu';

export default function Attachments() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <li className="relative">
      <button
        type="button"
        className="btn"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {showMenu ? <Menu /> : null}
    </li>
  );
}
