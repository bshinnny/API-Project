import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotsActions from '../../../store/spots';
import { Redirect } from 'react-router-dom';
import './SpotForm.css'

function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);
    if (!user) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = [];

        if (name.length > 49) errors.push('Name must be less than 50 characters.');
        if (lat < -90 || lat > 90) errors.push('Latitude must be between -90 and 90 degrees.');
        if (lng < -180 || lng > 180) errors.push('Longitude must be between -180 and 180 degrees.');
        if (price <= 0) errors.push('Price cannot be $0 or less.');

        setErrors(errors);

        if(errors.length){
            return;
        }

        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            url,
        };
        return dispatch(spotsActions.createASpotThunk(newSpot))
            .then((spot) => {
                setAddress('')
                setCity('')
                setState('')
                setCountry('')
                setLat('')
                setLng('')
                setName('')
                setDescription('')
                setPrice('')
                setUrl('')
                history.push(`/spots/${spot.id}`);
            })
    };

    return (
        <div>
            <h1>Create New Spot</h1>
            <form onSubmit={handleSubmit}>
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
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='City'
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder='State'
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Country'
                        required
                    />
                </label>
                <label>
                    <input
                        type="number"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        placeholder='Latitude'
                        required
                    />
                </label>
                <label>
                    <input
                        type="number"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        placeholder='Longitude'
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                        required
                    />
                </label>
                <label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Price'
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder='Preview Image URL'
                        required
                    />
                </label>
                <button type="submit">Submit Spot</button>
            </form>
        </div>
    )
}

export default CreateSpotForm;
