/* eslint-disable no-unused-vars */
import {Container,LogoutBtn,Logo} from '../index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link ,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useState } from 'react'
function Header() {
    const authStatus=useSelector((state)=>(state.auth.status))
    const navigate=useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]     
    return (
        <header className='py-3 shadow bg-black'>
            <Container>
        <nav className='flex justify-between flex-col sm:flex-row'>
          <div className='w-full flex justify-between sm:w-auto'>
          <div className='mr-4 flex items-center'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <div className='sm:hidden flex'>
            <button onClick={toggleMenu} className='text-white'>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
          </div>
          <ul className={`transition-all duration-300 ease-linear overflow-hidden w-full flex flex-col items-center ml-auto 
              sm:flex sm:w-auto sm:flex-row 
              ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} 
              sm:overflow-visible sm:max-h-full sm:opacity-100`}>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
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
    )
}

export default Header
