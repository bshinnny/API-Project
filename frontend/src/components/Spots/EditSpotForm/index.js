import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as spotsActions from '../../../store/spots';
import { Redirect } from 'react-router-dom';
import './EditSpotForm.css'

function EditSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const spots = useSelector(state => state.spots.userSpots);
    const spot = spots[spotId];

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);
    if (!user) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        const editedSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            //url,
        };
        return dispatch(spotsActions.editASpotThunk(editedSpot, spotId))
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
                // setUrl('')
                history.push(`/spots/${spot.id}`);
            })
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Address'
                        required
                    />
                </label>
                <label> City:
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
                <button type="submit">Submit Edit</button>
            </form>
        </div>
    )
}

export default EditSpotForm
