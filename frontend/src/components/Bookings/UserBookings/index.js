import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import * as bookingsActions from '../../../store/bookings';
import BookingCard from '../BookingCard';
import './UserBookings.css';

function UserBookings() {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings.userBookings);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(bookingsActions.getAllUserBookingsThunk())
    }, [dispatch, user])

    if (!user) return <Redirect to="/" />;

    if (!bookings) return <h1>User has no bookings.</h1>;

    return (
        <>
            {Object.values(bookings).length > 0 && <div className='user-bookings-div'>
                <h2 className='ub-header'>User Bookings</h2>
                <div className='user-bookings'>
                    {Object.values(bookings).reverse().map((booking) => {
                        return (
                            <BookingCard key={`booking-${booking.id}`} booking={booking} />
                        )
                    })}
                </div>
            </div>}
        </>
    )
}

export default UserBookings;
