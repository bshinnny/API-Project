import './BookingCard.css'

function BookingCard({booking}) {
    return (
        <div className='booking-card-cont'>
            <div className='bc-info-div'>
                <div>
                    <div className='bc-name'>{booking.Spot.name}</div>
                    <div className='bc-dates'>{`${booking.startDate} - ${booking.endDate}`}</div>
                </div>
                <div>
                    <div className='bc-address-header'>Location:</div>
                    <div className='bc-address-l1'>{booking.Spot.address}</div>
                    <div className='bc-address-l2'>{`${booking.Spot.city}, ${booking.Spot.state}, ${booking.Spot.country}`}</div>
                </div>
            </div>
            <img src={booking.Spot.previewImage} alt={booking.Spot.name} className='booking-spot-image'></img>
        </div>
    )
}

export default BookingCard;
