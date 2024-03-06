import React from 'react';
import { Container, Logo } from '../index';
import LogoutBtn from './Logoutbtn';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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

  return (
    <header className='py-3 shadow bg-blue-500 rounded-md text-white font-bold text-xl'>
      <Container>
        <nav className='flex flex-wrap items-center justify-between'>
          <div className='mr-4 mb-4 md:mb-0'>
            <Link to='/'>
             <img src="/logo.png" alt=""  style={{height:'80px'}}/>
            </Link>
          </div>
          <ul className='flex flex-wrap ml-auto space-x-4 items-center'>
            {navItems.map(
              (item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
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
    </header>
  );
}

export default Header;
