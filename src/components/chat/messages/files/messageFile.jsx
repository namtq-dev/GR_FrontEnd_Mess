import moment from 'moment';
import TriangleIcon from '../../../../svg/Triangle';
import ImageVideoFile from './imageVideoFile';
import OthersFile from './othersFile';

export default function MessageFile({ fileItem, message, mine }) {
  const { file, type } = fileItem;

  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        mine ? 'ml-auto justify-end ' : ''
      }`}
    >
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 rounded-lg
          ${mine ? 'border-[3px] border-green_3' : 'dark:bg-dark_bg_2'}
          ${
            mine && file.public_id.split('.')[1] === 'png'
              ? 'bg-white'
              : 'bg-green_3 p-1'
          }
    `}
        >
          <p
            className={`h-full text-sm ${
              type !== 'IMAGE' && type !== 'VIDEO' ? 'pb-5' : ''
            }`}
          >
            {type === 'IMAGE' || type === 'VIDEO' ? (
              <ImageVideoFile url={file.secure_url} type={type} />
            ) : (
              <OthersFile file={file} type={type} />
            )}
          </p>
          <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
            {moment(message.createdAt).format('HH:mm')}
          </span>
          {!mine ? (
            <span>
              <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
