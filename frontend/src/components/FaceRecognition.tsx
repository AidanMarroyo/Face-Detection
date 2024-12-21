interface FaceRecognitionProps {
  imageUrl: string;
  box: {
    topRow: number;
    rightCol: number;
    bottomRow: number;
    leftCol: number;
  };
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ imageUrl, box }) => {
  return (
    <div className='flex justify-center mt-8'>
      <div className='relative'>
        <img
          id='inputimage'
          alt=''
          src={imageUrl}
          className='w-[500px] h-auto'
        />
        <div
          className='absolute border-2 border-blue-500'
          style={{
            top: `${box.topRow}px`,
            right: `${box.rightCol}px`,
            bottom: `${box.bottomRow}px`,
            left: `${box.leftCol}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
