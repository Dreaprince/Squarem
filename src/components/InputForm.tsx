import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define a validation schema using Yup
const schema = yup.object({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  description: yup.string().required('Description is required').min(3, 'Description must be at least 3 characters'),
  shortenUrl: yup.string().required('ShortenUrl is required').min(3, 'ShortenUrl must be at least 3 characters'),
}).required();

interface IFormInputs {
  name: string;
  description: string;
  shortenUrl: string;
}

const InputForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log(data);
  };

  return (
    <div className="" style={{ marginTop: '3px',}}>
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
        <label htmlFor="shortenUrl" className="text-sm font-medium text-gray-700">Shorten Url</label>
        <div className="relative flex items-center">
          <div 
            className="absolute left-0 flex items-center justify-center bg-gray-100 text-gray-700 rounded-l-md rounded-r-none"
            style={{ width: '70px', height: '100%' }}
          >
            <span className="text-sm" style={{ width: '55px', height: '20px' }}>http://</span>
          </div>
          <input
            id="shortenUrl"
            placeholder='www.placeholder.com'
            {...register('shortenUrl')}
            className={`pl-[80px] pr-4 py-2 border ${errors.shortenUrl ? 'border-red-500' : 'border-gray-500'} rounded-md`}
            style={{ width: '400px', height: '40px' }}
          />
        </div>
        {errors.shortenUrl && <p className="text-red-500 text-xs">{errors.shortenUrl.message}</p>}
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

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-[400px]">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputForm;
