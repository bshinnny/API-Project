import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// One modal for login and signup.
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormModal/SignupForm';
import { Modal } from '../../context/Modal';
import AirbnbLogo from "../../images/clipart2562521.png"
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [login, setLogin] = useState(true)

    // let sessionLinks;
    // if (sessionUser) {
    //     sessionLinks = (
    //     <ProfileButton user={sessionUser} />
    //     );
    // } else {
    //     sessionLinks = (
    //         <>
    //         <LoginFormModal />
    //         <SignupFormModal />
    //         </>
    //     );
    // }

    return (
        <div className='page-div'>
            <ul className='navigation-header'>
                <li className='navigation-li'>
                    <div className='logo-div'>
                        <NavLink exact to="/">
                            <img className='logo' alt='airbnb-logo' src={AirbnbLogo}></img>
                        </NavLink>
                    </div>
                    <div className='left-side-header'>
                        {sessionUser && (<NavLink className='create-spot-link header-create' to={'/spots/new'}>
                            Become a Host!
                        </NavLink>)}
                        {isLoaded && (
                            <div className='profile-button-div'>
                                <ProfileButton
                                    user={sessionUser}
                                    setLogin={setLogin}
                                    setShowModal={setShowModal}
                                    />
                            </div>
                        )}
                    </div>
                </li>
                {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {login ? <LoginForm setShowModal={setShowModal}/> : <SignupForm setShowModal={setShowModal}/>}
                </Modal>
                )}
            </ul>
        </div>
    );
}

export default Navigation;
