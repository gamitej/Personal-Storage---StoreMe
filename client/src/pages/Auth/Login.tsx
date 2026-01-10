import { ZodError } from 'zod';
import http from '@/services/https';
import { Link } from 'react-router-dom';
import { loginSchema } from './auth.schema';
import { ChangeEvent, FormEvent } from 'react';
import Authentication, { InputLabel } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState, setLogin } from '@/redux/global/globalSlice';

const Login = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(getLoginState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = loginSchema.parse({
        email: loginState.email,
        password: loginState.password,
      });

      dispatch(setLogin({ loading: true, error: null }));
      const { data } = await http.post('/auth/login', validatedData);
      console.log(data);
    } catch (err) {
      if (err instanceof ZodError) {
        dispatch(
          setLogin({
            error: err.issues[0].message,
          }),
        );
      } else {
        dispatch(
          setLogin({
            error: 'Something went wrong',
          }),
        );
      }
    } finally {
      dispatch(setLogin({ loading: false }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, type } = e.target;
    if (type === 'text') {
      dispatch(setLogin({ email: value }));
    } else if (type === 'password') {
      dispatch(setLogin({ password: value }));
    }
  };

  /**
   * TSX
   */
  return (
    <Authentication>
      <form onSubmit={handleSubmit} className="w-145 flex flex-col gap-6">
        <h1 className="h1 text-(--dark-gray)">Login</h1>
        <InputLabel
          id="email"
          type="text"
          label="Email"
          onChange={handleChange}
          value={loginState.email || ''}
        />
        <InputLabel
          id="password"
          type="password"
          label="Password"
          onChange={handleChange}
          value={loginState.password || ''}
        />
        {/* Error message display */}
        {loginState.error && (
          <p className="text-sm text-(--pink) font-medium">
            {loginState.error}
          </p>
        )}
        {/* submit button for login */}
        <button
          type="submit"
          disabled={loginState.loading}
          className="bg-(--pink) rounded-full py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Login
        </button>
        <p className="font-normal text-(--dark-gray) text-sm text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-(--pink) font-medium">
            Signup
          </Link>
        </p>
      </form>
    </Authentication>
  );
};

export default Login;
