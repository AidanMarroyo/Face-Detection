export default function ImageLinkForm({
  onInputChange,
  onButtonSubmit,
}: {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div>
      <h1 className='p-8 text-2xl sm:text-4xl font-extrabold tracking-tight'>
        This Face Detection AI will detect faces in your pictues. Give it a try.
      </h1>
      <div className='flex gap-4 justify-center'>
        <input
          type='text'
          className='w-70 border border-gray-800'
          onChange={onInputChange}
        />
        <button onClick={onButtonSubmit} className='w-30'>
          Detect
        </button>
      </div>
    </div>
  );
}
