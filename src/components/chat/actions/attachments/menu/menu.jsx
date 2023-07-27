import {
  CameraIcon,
  ContactIcon,
  PollIcon,
  StickerIcon,
} from '../../../../../svg';
import DocumentAttachment from './documentAttachment';
import PhotoAttachment from './photoAttachment';

export default function Menu({ setError }) {
  return (
    <ul className="absolute bottom-14 openEmojiAnimation">
      <li>
        <button type="button" className="rounded-full">
          <PollIcon />
        </button>
      </li>
      <li>
        <button type="button" className="bg-[#0EABF4] rounded-full">
          <ContactIcon />
        </button>
      </li>
      <DocumentAttachment setError={setError} />
      <li>
        <button type="button" className="bg-[#D3396D] rounded-full">
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full">
          <StickerIcon />
        </button>
      </li>
      <PhotoAttachment setError={setError} />
    </ul>
  );
}
