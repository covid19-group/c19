import { useState } from 'react';
import { InputWithDropDown } from './Form';

export default function Modal({ close }) {
  const [countryCode, setCountryCode] = useState('');
  const [code, setCode] = useState('');
  const codeIsComplete = code.length === 6;
  const phoneIsValid = true; // TODO: validation
  const isValid = phoneIsValid && codeIsComplete;
  return (
    <div className="z-50 fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
      <div onClick={close} className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75" />
      </div>
      <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6">
        <form className="sm:mx-auto sm:w-full sm:max-w-md">
          <div>
            <label className="block text-sm font-medium leading-5 text-gray-700">
              Phone Number
              {/* TODO: Validation, placeholders and country code */}
              <InputWithDropDown
                options={['+45']}
                onSelectChange={({ value }) => setCountryCode(value)}
                placeholder="60 55 07 09"
              />
            </label>
          </div>

          <div className="mt-6">
            <label for="email" className="block text-sm font-medium leading-5 text-gray-700 mb-1">
              Verification Code
            </label>
            <div className="-mt-px flex">
              {[0, 1, 2, 3, 4, 5].map(idx => (
                <div className="-ml-px flex-1 min-w-0">
                  <input
                    value={[...code][0]}
                    className={`form-input relative block w-full rounded-none ${
                      idx === 0 ? 'rounded-l-md ' : idx === 5 ? 'rounded-r-md ' : ''
                    }bg-transparent focus:z-10 transition text-center ease-in-out duration-150 sm:text-sm sm:leading-5 px-0 sm:px-auto`}
                    placeholder="0"
                  />
                </div>
              ))}
              <div className="relative flex items-center justify-center text-sm leading-5">
                <span className="mx-2 bg-white text-gray-500">or</span>
              </div>
              <span className="inline-flex rounded-md shadow-sm">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out">
                  <span className="hidden sm:inline-block">Send Code</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:hidden">
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <polyline points="23 20 23 14 17 14"></polyline>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <div className="mt-6">
            <span className="block w-full rounded-md shadow-sm">
              <button className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                Continue to Registration
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
