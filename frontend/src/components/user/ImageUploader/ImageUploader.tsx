import { useRef } from 'react';
import { PiNotePencil } from 'react-icons/pi';

const ImageUploader = ({
  setFile,
  setUploadedImage,
}: {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setUploadedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);

      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileRef}
        style={{ display: 'none' }}
        accept="image/jpg, image/png, image/jpeg, image/webp"
        onChange={onChangeImage}
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="w-8 h-8 absolute bottom-2 right-2 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer"
      >
        <PiNotePencil color="white" size={20} />
      </button>
    </>
  );
};

export default ImageUploader;
