import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from '../components/Modal';

const navItems = [
  { title: 'Home', to: '/' },
  { title: 'Data', to: '/data' },
  { title: 'FAQ', to: '/faq' },
];

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>[COVID-19] Self-reporting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav items={navItems} />
      <main>
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">{children}</div>
        </div>
      </main>
    </div>
  );
}

const Nav = ({ items }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="sm:-my-px flex">
              {items.map(item => (
                <NavLink key={item.title} {...item} />
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center my-3 cursor-pointer py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
            Register Now
          </button>
        </div>
      </div>
      {showModal && <Modal close={() => setShowModal(false)} />}
    </nav>
  );
};

const NavLink = ({ title, to }) => {
  const router = useRouter();
  const isActive = router.pathname === to;
  const className = isActive
    ? 'mr-4 sm:mr-8 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
    : 'mr-4 sm:mr-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out';
  return (
    <Link href={to}>
      <a className={className}>{title}</a>
    </Link>
  );
};
