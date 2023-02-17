import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { orderCards, filterCards } from "../../redux/actions";

const Favorites = () => {
    const { myFavorites } = useSelector(state => state)
    const dispatch = useDispatch();

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
    }

    const handleFilter = (event) => {
        dispatch(filterCards(event.target.value))
    }


    return (
        <div>
            <div>
                <select onChange={handleOrder}>
                    <option value="Order" disabled="disbled">Order by</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>
                <select onChange={handleFilter}>
                    <option value="Filter" disabled="disbled">Filter by</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="Unknown">Unknown</option>
                </select>
            </div>
            {
                myFavorites.map((char) => {
                    return(
                        <div>
                            <Link to={`/detail/${char.id}`}>
                                <h2 className="card-title">{char.name}</h2>
                            </Link>
                                <h2>{char.species}</h2>
                                <h2>{char.gender}</h2>
                                <div>
                                <img  src={char.image} alt={char.name} />
            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Favorites;