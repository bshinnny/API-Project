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
        <button className='profile-button clickable' onClick={openMenu}>
          {/* <i className="fas fa-user-circle" /> */}
          <i className="fa-solid fa-bars fa-2x"></i>
          <i className="fa-solid fa-circle-user fa-2x"></i>
        </button>
        <div className="dropdown-menu">
        {showMenu && ( user ?
          (<ul className="profile-dropdown-2">
              <div className="user-info-dropdown">
                <li className="profile-li">User: {user.username}</li>
                <li className="profile-li">{user.email}</li>
              </div>
              <div className="profile-spots-div">
                  <li className="profile-li">
                  <NavLink className='create-spot-link' to={'/spots/new'}>
                    Become a Host!
                  </NavLink>
                </li>
                <li className="profile-li">
                  <NavLink className='user-spot-link' to={'/spots/current'}>
                    User Spots!
                  </NavLink>
                </li>
              </div>
              <li>
                <button className='button clickable logout' onClick={logout}>Log Out</button>
              </li>
          </ul>) :
          (<ul className="profile-dropdown">
            <li>
              <button className='button dropdown clickable' onClick={() => {
                setLogin(true)
                setShowModal(true)
              }}>Log In</button>
            </li>
            <li>
              <button className='button dropdown clickable' onClick={() => {
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
