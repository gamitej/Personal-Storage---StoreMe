import { ZodError } from 'zod';
import http from '@/services/https';
import { signupSchema } from './auth.schema';
import { ChangeEvent, FormEvent } from 'react';
import Authentication, { InputLabel } from '.';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSignupState, setAuth, setSignup } from '@/redux/global/globalSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupState = useSelector(getSignupState);

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

      dispatch(setSignup({ loading: true, error: null }));
      // Make API call to signup
      const { data, status } = await http.post('/auth/signup', validatedData);
      if (data.success && status === 200) {
        navigate('/login');
        dispatch(setAuth(true));
      } else {
        dispatch(
          setSignup({
            error: data.message || 'Signup failed',
          }),
        );
      }
    } catch (err) {
      if (err instanceof ZodError) {
        dispatch(
          setSignup({
            error: err.issues[0].message,
          }),
        );
      } else {
        dispatch(
          setSignup({
            error: 'Something went wrong',
          }),
        );
      }
    } finally {
      dispatch(setSignup({ loading: false }));
    }
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    dispatch(setSignup({ [id]: value }));
  };

  /**
   * TSX
   */
  return (
    <Authentication>
      <form onSubmit={handleSubmit} className="w-145 flex flex-col gap-6">
        <h1 className="h1 text-(--dark-gray)">Create Account</h1>
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
          className="bg-(--pink) rounded-full py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Create Account
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
