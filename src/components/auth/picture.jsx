import { useRef, useState } from 'react';

export default function Picture({ showPicture, setShowPicture, setPicture }) {
  const [error, setError] = useState('');

  const pictureInputRef = useRef(null);

  const handlePicture = (eve) => {
    let img = eve.target.files[0]; // only 1 image per upload
    if (
      img.type !== 'image/jpeg' &&
      img.type !== 'image/png' &&
      img.type !== 'image/webp'
    ) {
      setError(`${img.name} format is unsupported.`);
      return;
    } else if (img.size > 1024 * 1024 * 5) {
      setError(`${img.name} file size is too large.`);
      return;
    }

    setError('');
    setPicture(img);

    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = (readerEvent) => {
      setShowPicture(readerEvent.target.result);
    };
  };

  const handleChangePicture = () => {
    setPicture('');
    setShowPicture('');
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {showPicture ? (
        <div>
          <img
            src={showPicture}
            alt="Avatar"
            className="w-20 h-20 object-cover rounded-full"
          />
          <div
            className="mt-2 py-1 w-20 dark:bg-dark_bg_3 rounded-md text-xs font-bold
            flex items-center justify-center cursor-pointer"
            onClick={() => handleChangePicture()}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold 
          flex items-center justify-center cursor-pointer"
          onClick={() => {
            pictureInputRef.current.click();
          }}
        >
          Upload avatar
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={pictureInputRef}
        accept="image/jpeg,image/png,image/webp"
        onChange={handlePicture}
      />
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
}
