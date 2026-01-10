import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ChangeEvent, ReactNode } from 'react';
import AuthImg from '@/assets/Illustration.svg';
import { getAuthState } from '@/redux/global/globalSlice';

export const InputLabel = ({
  onChange,
  id = 'emai',
  value = '',
  type = 'text',
  label = 'Email',
  required = true,
}: {
  id: string;
  type: string;
  label: string;
  value: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="shadow-sm px-4 py-3 rounded-md flex flex-col gap-1">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      value={value || ''}
      onChange={onChange}
      required={required}
      placeholder={`Enter ${label.toLowerCase()}...`}
      className="border-none outline-none text-(--dark-gray) placeholder:text-(--gray) caret-(--pink)"
    />
  </div>
);

const Authentication = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useSelector(getAuthState);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  /**
   * TSX
   */
  return (
    <section className="relative w-full h-screen flex">
      <h1 className="lg:hidden absolute top-4 left-4 text-4xl font-bold mb-4 text-(--dark-gray)">
        StoreMe<span className="text-(--skyblue)">.</span>
      </h1>
      <aside className="hidden lg:flex  h-full py-12 lg:w-100 xl:w-145 bg-(--pink) text-white flex-col justify-evenly">
        <div className="md:w-85 xl:w-107 mx-auto flex flex-col gap-4">
          <h1 className="text-4xl font-bold mb-4">
            StoreMe<span className="text-(--skyblue)">.</span>
          </h1>
          <h1 className="h1">Manage your files the best way</h1>
          <p className="body-1">
            Awesome, we've created the perfect place for you to store all your
            documents.
          </p>
        </div>
        <img
          width={342}
          height={342}
          src={AuthImg}
          className="mx-auto"
          alt="login illustration"
        />
      </aside>
      <main className="h-full flex flex-col justify-center items-center mx-auto">
        {children}
      </main>
    </section>
  );
};

export default Authentication;
