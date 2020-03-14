import { useState, useRef, createContext } from 'react';
import { InputWithFix } from './Form';
import { AsYouType, parsePhoneNumberFromString, isValidNumber } from 'libphonenumber-js';
import flag from 'country-code-emoji';

export const ModalContext = createContext();

export default function Modal({ children }) {
  const codeInputRef = useRef({});
  const submitBtnRef = useRef(null);

  const [show, setShow] = useState(false);

  const [countryCode, setCountryCode] = useState('');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [focused, setFocused] = useState(false);

  const asYouTypeParser = new AsYouType();
  const codeIsComplete = code.length === 6;
  const phoneIsValid = phone && isValidNumber(phone);
  const parsedPhone = parsePhoneNumberFromString(phone);
  const error = phone.length && !focused && (!parsedPhone || !parsedPhone.country || !phoneIsValid);

  return (
    <ModalContext.Provider value={() => setShow(true)}>
      {children}
      {show && (
        <div className="z-50 fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
          <div onClick={() => setShow(false)} className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
          <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6">
            <form className="sm:mx-auto sm:w-full sm:max-w-md">
              <div>
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Phone Number
                  <span className="block text-gray-500 font-normal text-xs">Please include country code</span>
                  <InputWithFix
                    suffix={
                      phoneIsValid && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          class="text-green-500">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      )
                    }
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    prefix={parsedPhone && parsedPhone.country ? flag(parsedPhone.country) : '🌍'}
                    type="phone"
                    value={asYouTypeParser.input(phone)}
                    onChange={({ value }) => {
                      setPhone(value);
                      if (isValidNumber(value)) {
                        codeInputRef.current[0].focus();
                      }
                    }}
                    placeholder="+45 60 55 07 09"
                    autoFocus
                  />
                  {!!error && (
                    <p class="mt-2 text-xs font-thin text-red-600">
                      {!parsedPhone || !parsedPhone.country
                        ? 'Please specify your country code (e.g. +44)'
                        : "This doesn't look right. Try again."}
                    </p>
                  )}
                </label>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium leading-5 text-gray-700 mb-1">
                  Verification Code
                  <span className="block text-gray-500 font-normal text-xs">Received by SMS</span>
                </label>
                <div className="-mt-px flex">
                  {[0, 1, 2, 3, 4, 5].map(idx => (
                    <div key={idx} className="-ml-px flex-1 min-w-0">
                      <input
                        maxLength="1"
                        onChange={e => {
                          const value = e.target.value;
                          setCode(
                            [...code]
                              .filter((val, index) => index < idx)
                              .concat(value)
                              .join('')
                          );
                          const nextField = codeInputRef.current[idx + 1];
                          idx !== 5 && nextField
                            ? nextField.focus()
                            : setTimeout(() => submitBtnRef.current.focus(), 100);
                        }}
                        value={[...code][idx] || ''}
                        ref={input => (codeInputRef.current[idx] = input)}
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
                <button
                  disabled={!code.length}
                  onClick={e => {
                    e.preventDefault();
                    setCode('');
                    codeInputRef.current[0].focus();
                  }}
                  className={'font-normal text-xs mt-1 ' + (!!code.length ? 'text-blue-500' : 'text-gray-500')}>
                  Reset
                </button>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    disabled={!(codeIsComplete && phoneIsValid)}
                    ref={btn => (submitBtnRef.current = btn)}
                    className={
                      'w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none transition duration-150 ease-in-out ' +
                      (phoneIsValid && codeIsComplete
                        ? 'bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700'
                        : 'bg-gray-500 focus:shadow-outline-gray ')
                    }>
                    Continue to Registration
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
