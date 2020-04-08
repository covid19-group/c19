import { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function() {
  const [modal, setModal] = useState(true);
  const [heunicke, setHeunicke] = useState(false);
  return (
    <AnimatePresence>
      {!!modal && (
        <div className="fixed z-50 inset-0 flex items-start justify-center overflow-auto scrolling-touch">
          <motion.div
            onClick={() => setModal(false)}
            transition={{ exit: { duration: 0.1 } }}
            key={modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            className="absolute bg-teal-900 h-full w-full"
          />
          <div className="px-2 sm:px-4 md:px-6 py-4 md:py-8 w-full max-w-4xl mx-auto max-h-screen overflow-y-scroll">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className={'relative w-full bg-white rounded-md shadow-lg px-4 sm:px-12 md:px-24 py-12'}>
              <button
                type="button"
                onClick={() => setModal(false)}
                className="absolute top-0 right-0 text-xl text-gray-700 hover:text-m-blue-500 m-4">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <h2 className="font-medium text-xl mb-4">COVIDmeter erstatter C19.DK</h2>
              <p className="mt-4">
                For tre uger siden byggede vi c19.dk som en håndsrækning til sundhedsmyndighederne. I de forgangne uger
                har mere end 32.000 danskere meldt sig til at bidrage på c19.dk.
              </p>
              <p className="mt-4">
                Vi besluttede tidligt, at c19.DK ikke ville gå live uden myndighedernes accept. Nu har
                Sundhedsministeriet besluttet at bygge egen løsning: COVIDmeter, og det glæder os, at ideen bag c19.dk
                endelig kommer i brug.
              </p>
              <p className="mt-4">Tusinde tak for den enorme støtte blandt frivillige, tilmeldte og presse.</p>
              <p className="mt-4">
                Holger Thorup og Martin Permin
                <br />
                Techværnet
              </p>
              <hr className="my-4" />
              <p className="text-gray-700 text-center px-8 text-sm">
                Mange tak for jeres velvilje til at hjælpe myndighederne med at svare på spørgsmål om jeres helbred. Vi
                håber, at I fremover vil bruge Statens Serum Instituts nye officielle løsning – COVIDmeter. Jeres
                indsats er af stor betydning for vores muligheder for at vurdere udbredelsen af COVID-19 i samfundet.
                <span className="text-gray-500 block mt-2" onMouseEnter={() => setHeunicke(true)}>
                  Magnus Heunicke, Sundheds- og ældreminister
                </span>
              </p>
              <AnimatePresence>
                {heunicke && (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseLeave={() => setHeunicke(false)}
                    className="rounded-lg"
                    src="/assets/heunicke.png"
                  />
                )}
              </AnimatePresence>
              <hr className="my-4" />
              <div className="flex justify-center flex-wrap -mx-1">
                <div className="inline-flex rounded-md shadow mt-2 flex-1 mx-1">
                  <a
                    href="http://www.sum.dk/Aktuelt/Nyheder/Coronavirus/2020/April/Ny-digital-loesning-til-borgere-skal-COVIDmeter.aspx"
                    className="w-full flex-shrink-0 whitespace-no-wrap inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-teal-600 bg-teal-100 hover:text-teal-500 hover:bg-teal-50 focus:outline-none focus:shadow-outline focus:border-teal-300 transition duration-150 ease-in-out">
                    Læs pressemeddelelsen
                  </a>
                </div>
                <div className="inline-flex mt-2 flex-1 mx-1">
                  <a
                    href="https://www.sundhed.dk/borger/corona/covidmeter/"
                    className="w-full flex-shrink-0 whitespace-no-wrap inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    Gå til COVIDmeter
                    <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5zM5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
