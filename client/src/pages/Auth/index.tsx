import { ChangeEvent, ReactNode } from 'react';
import AuthImg from '@/assets/Illustration.svg';

export const InputLabel = ({
  onChange,
  id = 'emai',
  value = '',
  type = 'text',
  label = 'Email',
}: {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="shadow-sm px-4 py-3 rounded-md flex flex-col gap-1">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      value={value || ''}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}...`}
      className="border-none outline-none text-(--dark-gray) placeholder:text-(--gray) caret-(--pink)"
    />
  </div>
);

const Authentication = ({ children }: { children: ReactNode }) => {
  /**
   * TSX
   */
  return (
    <section className="w-full h-screen flex">
      <aside className="h-full py-12 w-145 bg-(--pink) text-white flex flex-col justify-evenly">
        <div className="w-107 mx-auto flex flex-col gap-4">
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
