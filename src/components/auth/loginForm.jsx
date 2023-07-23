import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../helpers/validation';
import AuthInput from './authInput';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../reducers/features/userSlice';

export default function LoginForm() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    let response = await dispatch(loginUser({ ...data }));

    if (response.payload.id) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="email"
            type="email"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {user.error && (
            <div>
              <p className="text-red-400">{user.error}</p>
            </div>
          )}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide 
            font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {user.status === 'loading' ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              'Sign in'
            )}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-base dark:text-dark_text_1">
            <span>Create new account?</span>
            <Link
              to="/register"
              className="hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
