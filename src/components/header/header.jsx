import React, { useState } from 'react';
import { Container } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './Logoutbtn';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (slug) => {
    navigate(slug);
    setMenuOpen(false); // Close the menu on click
  };

  return (
    <header className='py-3 shadow bg-blue-500 rounded-md text-white font-bold text-xl'>
      <Container>
        <nav className='flex flex-wrap items-center justify-between'>
          <div className='mr-4 mb-4 md:mb-0'>
            <Link to='/'>
              <img src="/logo.png" alt="" style={{ height: '80px' }} />
            </Link>
          </div>
          <div className='md:hidden'>
            <button
              className='text-white focus:outline-none'
              onClick={handleMenuToggle}
            >
              {menuOpen ? (
                <img src='closed.png' alt='' />
              ) : (
                <img src='navicon.png' alt='' />
              )}
            </button>
          </div>
          <ul className='hidden md:flex flex-wrap ml-auto space-x-4 items-center'>
            {navItems.map(
              (item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => handleMenuItemClick(item.slug)}
                      className='inline-block px-3 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full text-sm md:text-base lg:text-xl'
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
      {/* Dropdown Menu */}
      {menuOpen && (
        <div className='md:hidden absolute  right-10 bg-blue-200 p-2 rounded-md shadow-md'>
          {navItems.map(
            (item) =>
              item.active ? (
                <div
                  key={item.name}
                  onClick={() => handleMenuItemClick(item.slug)}
                  className='cursor-pointer py-2 hover:bg-blue-100 px-4 text-black'
                >
                  {item.name}
                </div>
              ) : null
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
