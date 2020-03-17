import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import LanguageSelector, { LanguageContext } from './LanguageSelector';
import content from '../content/nav';

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>[COVID-19] Self-reporting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">{children}</div>
        </div>
      </main>
    </div>
  );
}

const Nav = () => {
  const { language } = useContext(LanguageContext);
  const items = [
    { title: content[language].root, to: '/' },
    { title: content[language].data, to: '/data' },
    { title: content[language].faq, to: '/faq' },
  ];
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="sm:-my-px flex">
            {items.map(item => (
              <NavLink key={item.title} {...item} />
            ))}
          </div>
          <div className="mt-3 z-50">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ title, to }) => {
  const router = useRouter();
  const isActive = router.pathname === to;
  const className = isActive
    ? 'mr-4 sm:mr-8 inline-flex items-center px-1 pt-1 border-b-2 border-teal-500 text-sm font-medium leading-5 text-gray-900 focus:border-teal-700 focus:shadow-none transition duration-150 ease-in-out'
    : 'mr-4 sm:mr-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-teal-700 focus:shadow-none transition duration-150 ease-in-out';
  return (
    <Link href={to}>
      <a className={className}>{title}</a>
    </Link>
  );
};
