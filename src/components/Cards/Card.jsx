import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addFavorite, deleteFavorite } from "../../redux/actions";

export default function Card({onClose, name, species, gender, image, id}) {

   const dispatch = useDispatch();
   const myFavorites = useSelector(state => state.myFavorites)
   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if(isFav){
         setIsFav(false);
         dispatch(deleteFavorite(id))
      } else {
         dispatch(addFavorite({onClose, name, species, gender, image, id}))
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (
      <div>
         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }

         <button onClick={onClose}>X</button>
         <Link to={`/detail/${id}`}>
            <h2 className="card-title">{name}</h2>
         </Link>
            <h2>{species}</h2>
            <h2>{gender}</h2>
            <div>
               <img  src={image} alt={name} />
            </div>
      </div>
   );
}
