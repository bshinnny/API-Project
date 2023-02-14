import React from 'react';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
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
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [login, setLogin] = useState(true)
    const [searchTerm, setSearchTerm] = useState('');

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

    const dispatchSearch = (e) => {
        e.preventDefault();
        setSearchTerm('');
        history.push(`/spots/search/${searchTerm}`);
    }

    return (
        <div className='page-div'>
            <ul className='navigation-header'>
                <li className='navigation-li'>
                    <div className='logo-div'>
                        <NavLink exact to="/">
                            <img className='logo' alt='airbnb-logo' src={AirbnbLogo}></img>
                        </NavLink>
                    </div>
                    <div className='search-input-div'>
                        <input
                            type='text'
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            placeholder='Search Spots on TheBnb'
                            required
                            className='search-input'
                        />
                        <button className='search-button clickable' onClick={dispatchSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
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
