import { ZodError } from 'zod';
import http from '@/services/https';
import { Link } from 'react-router-dom';
import { signupSchema } from './auth.schema';
import { ChangeEvent, FormEvent } from 'react';
import Authentication, { InputLabel } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState, setLogin, setSignup } from '@/redux/global/globalSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const signupState = useSelector(getLoginState);

  /**
   * ============================ EVENT HANDLERS ============================
   */

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = signupSchema.parse({
        name: signupState.name,
        email: signupState.email,
        password: signupState.password,
      });

      dispatch(setLogin({ loading: true, error: null }));
      const { data } = await http.post('/auth/signup', validatedData);
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

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, type } = e.target;
    if (type === 'text') {
      dispatch(setSignup({ email: value }));
    } else if (type === 'password') {
      dispatch(setSignup({ password: value }));
    } else if (type === 'name') {
      dispatch(setSignup({ name: value }));
    }
  };

  /**
   * TSX
   */
  return (
    <Authentication>
      <form onSubmit={handleSubmit} className="w-145 flex flex-col gap-6">
        <h1 className="h1 text-(--dark-gray)">Signup</h1>
        <InputLabel
          id="name"
          type="text"
          label="Name"
          onChange={handleChange}
          value={signupState.name || ''}
        />
        <InputLabel
          id="email"
          type="text"
          label="Email"
          onChange={handleChange}
          value={signupState.email || ''}
        />
        <InputLabel
          id="password"
          type="password"
          label="Password"
          onChange={handleChange}
          value={signupState.password || ''}
        />
        {/* Error message display */}
        {signupState.error && (
          <p className="text-sm text-(--pink) font-medium">
            {signupState.error}
          </p>
        )}
        {/* submit button for login */}
        <button
          type="submit"
          disabled={signupState.loading}
          className="bg-(--pink) rounded-full py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Signup
        </button>
        <p className="font-normal text-(--dark-gray) text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-(--pink) font-medium">
            Login
          </Link>
        </p>
      </form>
    </Authentication>
  );
};

export default Signup;
