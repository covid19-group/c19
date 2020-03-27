import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import confirmationModalContent from '../content/confirmationModal';

export default function ConfirmationModal({ language, show, close, offerToAddParticipants, addParticipant }) {
  const router = useRouter();
  const content = confirmationModalContent[language];
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed z-50 bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
          <motion.div
            key="modalWrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0">
            <div className="absolute inset-0 bg-teal-900 opacity-50"></div>
          </motion.div>
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, transition: { delay: 0.15 } }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            className="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl sm:max-w-lg sm:w-full sm:p-6">
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{content.title}</h3>
                <div className="mt-2">
                  <p className="text-sm leading-5 text-gray-500">{content.description}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <span className="flex w-full rounded-md shadow-sm sm:col-start-2">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-teal-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-teal-600 sm:text-sm sm:leading-5">
                  {content.close}
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                  {content.back}
                </button>
              </span>
            </div>
            <div className="mt-3 flex flex-rol justify-center">
              <span className="mt-3 flex rounded-md  sm:mt-0 sm:col-start-1">
                <button
                  type="button"
                  onClick={addParticipant}
                  className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                  {content.addParticipant}
                </button>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
