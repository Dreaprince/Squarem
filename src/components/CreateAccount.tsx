import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import axios from '../util/axios';
import { Endpoint } from '@/util/constants';
import Router from "next/router";

// Define a validation schema using Yup
const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required'),
  });

interface IFormInputs {
    email: string;
    password: string;
    confirmPassword: string;
}

const CreateAccount: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const response = await axios.post(Endpoint.LOGIN, {
                email: data.email,
                password: data.password,
            });
            let payload = response.data

            console.log('Create Account successful:', payload);

            if (payload.statusCode == "00") {
                localStorage.setItem("ut", payload.Token);
                Router.push('/dashboard');
            }

        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Failed to login. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md "
                style={{
                    width: '456px',
                    height: 'auto',
                    padding: '32px 28px',
                    gap: '8px',
                    borderRadius: '10px 0 0 0',
                    border: '1px solid #ccc',
                    opacity: 1
                }}
            >
                <h2 className="text-xl font-bold mb-2  text-center">Create Account</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">Enter your credentials to create your account</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                className={`w-full p-3 pr-10 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:border-blue-500 focus:ring-blue-500`}
                                {...register('email')}
                            />
                            <FaEnvelope className="absolute right-3 top-3 text-gray-500" />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Enter Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter password"
                                className={`w-full p-3 pr-10 bg-white border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:border-blue-500 focus:ring-blue-500`}
                                {...register('password')}
                            />
                          
                            {passwordVisible ? (
                                <FaEyeSlash className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                            ) : (
                                <FaEye className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                            )}
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Confirm password"
                                className={`w-full p-3 pr-10 bg-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:border-blue-500 focus:ring-blue-500`}
                                {...register('confirmPassword')}
                            />
                            {passwordVisible ? (
                                <FaEyeSlash className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                            ) : (
                                <FaEye className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                            )}
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>
                    </div>

                    {errorMessage && <p className="text-red-500 text-xs mb-4 text-center">{errorMessage}</p>}

                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md" disabled={loading}>
                        {loading ? 'Creating your account...' : 'Create your account'}
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-10 text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-500 underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default CreateAccount;
