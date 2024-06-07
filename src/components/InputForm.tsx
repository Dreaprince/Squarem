import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '../util/axios';
import { Endpoint } from '@/util/constants';
import Router from "next/router";

// Define a validation schema using Yup
const schema = yup.object({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  description: yup.string().required('Description is required').min(3, 'Description must be at least 3 characters'),
  website: yup.string().required('website is required').min(3, 'website must be at least 3 characters'),
}).required();

interface IFormInputs {
  name: string;
  description: string;
  website: string;
}

const InputForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post(Endpoint.LOGIN, data);
      let payload = response.data

      console.log('Login successful:', payload);


    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Failed to login. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="" style={{ marginTop: '3px', }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white pl-6 pt-5 rounded-lg flex flex-col gap-[10px] opacity-1"
        style={{ width: '450px', height: '320px' }}
      >
        <div className="flex flex-col gap-[2px] opacity-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            placeholder='input name'
            {...register('name')}
            className={`p-4 border ${errors.name ? 'border-red-500' : 'border-gray-300'} bg-gray-100 rounded-md`}
            style={{ width: '400px', height: '40px' }}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>


        <div className="flex flex-col gap-[2px] opacity-1">
          <label htmlFor="website" className="text-sm font-medium text-gray-700">Shorten Url</label>
          <div className="relative flex items-center">
            <div
              className="absolute left-0 flex items-center justify-center bg-gray-100 text-gray-700 rounded-l-md rounded-r-none"
              style={{ width: '70px', height: '100%' }}
            >
              <span className="text-sm" style={{ width: '55px', height: '20px' }}>http://</span>
            </div>
            <input
              id="website"
              placeholder='www.placeholder.com'
              {...register('website')}
              className={`pl-[80px] pr-4 py-2 border ${errors.website ? 'border-red-500' : 'border-gray-500'} rounded-md`}
              style={{ width: '400px', height: '40px' }}
            />
          </div>
          {errors.website && <p className="text-red-500 text-xs">{errors.website.message}</p>}
        </div>

        <div className="flex flex-col gap-[2px] opacity-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
          <input
            id="description"
            placeholder='input description'
            {...register('description')}
            className={`p-4 border ${errors.description ? 'border-red-500' : 'border-gray-500'} bg-gray-100 rounded-md`}
            style={{ width: '400px', height: '40px' }}
          />
          {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
        </div>


        {errorMessage && <p className="text-red-500 text-xs mb-4 text-center">{errorMessage}</p>}

        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
