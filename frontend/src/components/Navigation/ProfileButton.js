import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import './ProfileButton.css';

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div className="dropdown">
        <button className='profile-button' onClick={openMenu}>
          {/* <i className="fas fa-user-circle" /> */}
          <i className="fa-solid fa-bars fa-2x"></i>
          <i className="fa-solid fa-circle-user fa-2x"></i>
        </button>
        <div className="dropdown-menu">
        {showMenu && ( user ?
          (<ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <NavLink className='create-spot-link' to={'/spots/new'}>
                Become a Host!
              </NavLink>
            </li>
            <li>
              <NavLink className='user-spots' to={'/spots/current'}>
                User Spots!
              </NavLink>
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>) :
          (<ul className="profile-dropdown">
            <li>
              <button onClick={() => {
                setLogin(true)
                setShowModal(true)
              }}>Log In</button>
            </li>
            <li>
              <button onClick={() => {
                setLogin(false)
                setShowModal(true)
              }}>Sign Up</button>
            </li>
          </ul>)
        )}
        </div>
    </div>
    </>
  );
}

export default ProfileButton;
