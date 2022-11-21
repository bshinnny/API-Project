import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as spotsActions from '../../../store/spots';
import { Redirect } from 'react-router-dom';
import './EditSpotForm.css'

function EditSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    // Latitude and longitude removed from form.
    // const [lat, setLat] = useState('');
    // const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const spot = useSelector(state => state.spots.spotDetails);

    useEffect(() => {
        dispatch(spotsActions.getSpotDetailsThunk(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        if (spot) {
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setCountry(spot.country);
            // setLat(spot.lat);
            // setLng(spot.lng);
            setName(spot.name);
            setDescription(spot.description);
            setPrice(spot.price);
            setUrl('');
            setErrors([]);
        }
    }, [spot])

    const user = useSelector(state => state.session.user);
    if (!user) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = [];

        if (name.length > 49) errors.push('Name must be less than 50 characters.');
        if (address.length > 69) errors.push('Address must be less than 70 characters.');
        // if (lat < -90 || lat > 90) errors.push('Latitude must be between -90 and 90 degrees.');
        // if (lng < -180 || lng > 180) errors.push('Longitude must be between -180 and 180 degrees.');
        if (city.length > 49) errors.push('City must be less than 50 characters.');
        if (state.length > 49) errors.push('State must be less than 50 characters.');
        if (country.length > 49) errors.push('Country must be less than 50 characters.');
        if (price <= 0) errors.push('Price cannot be $0 or less.');
        if (description.length > 255) errors.push('Description must be less than 255 characters.');
        if (url.length > 255) errors.push('URL must be less than 255 characters.');

        setErrors(errors);

        if(errors.length){
            return;
        }

        const editedSpot = {
            address,
            city,
            state,
            country,
            // lat,
            // lng,
            name,
            description,
            price,
            url,
        };

        return dispatch(spotsActions.editASpotThunk(editedSpot, spotId))
            .then(() => {
                setAddress('')
                setCity('')
                setState('')
                setCountry('')
                // setLat('')
                // setLng('')
                setName('')
                setDescription('')
                setPrice('')
                setUrl('')
                history.push(`/spots/current`);
            })
      };

    return (
        <div className='form-div'>
            <form className='create-spot form' onSubmit={handleSubmit}>
                <h1>Edit Your Spot</h1>
                <ul className="errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Address'
                        required
                        className="input"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='City'
                        required
                        className="input"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder='State'
                        required
                        className="input"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Country'
                        required
                        className="input"
                    />
                </label>
                {/* <label>
                    <input
                        type="number"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        placeholder='Latitude'
                        required
                        className="input"
                    />
                </label>
                <label>
                    <input
                        type="number"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        placeholder='Longitude'
                        required
                        className="input"
                    />
                </label> */}
                <label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        required
                        className="input"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                        required
                        className="input"
                    />
                </label>
                <label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Price'
                        required
                        className="input"
                    />
                </label>
                <label>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder='Spot Image URL'
                        required
                        className="input"
                    />
                </label>
                <button className='submit-button clickable'type="submit">Submit Edit</button>
            </form>
        </div>
    )
}

export default EditSpotForm
