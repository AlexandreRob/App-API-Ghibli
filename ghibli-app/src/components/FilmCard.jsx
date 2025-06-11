import { Link } from "react-router-dom";
import useStore from "../store/store";

export default function FilmCard({ film }) {
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const favorites = useStore((state) => state.favorites);
  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <img src={film.image} alt={film.title} />
        <button 
          className="favorite-button"
          onClick={() => toggleFavorite(film.id)}
          aria-label={favorites.includes(film.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {favorites.includes(film.id) ? "★" : "☆"}
        </button>
      </div>
      <div className="movie-info">
        <h3>{film.title}</h3>
        <p><strong>Réalisateur :</strong> {film.director}</p>
        <p><strong>Année :</strong> {film.release_date}</p>
        <Link to={`/film/${film.id}`} className="details-link">
          Voir plus
        </Link>
      </div>
    </div>
  );
 }