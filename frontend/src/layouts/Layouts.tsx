import Navigation from '../components/Navigation';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen w-screen border'>
      <Navigation />
      <div className='container mx-auto py-10 flex-1'>{children}</div>
    </div>
  );
}
