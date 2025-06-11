import { useParams } from "react-router-dom";
import useStore from "../store/store";

export default function FilmDetailPage() {
  const films = useStore((state) => state.films);
  const { id } = useParams();
  const film = films.find((film) => film.id === id);

  if (!film) {
    return <div className="loading">Chargement...</div>;
  }
  return (
    <div className="container">
      <div className="film-detail">
        <div className="film-detail-content">
          <div className="film-detail-image">
            <img src={film.image} alt={film.title} />
          </div>
          <div className="film-detail-info">
            <h1>{film.title}</h1>
            <div className="film-detail-meta">
              <p><strong>Réalisateur :</strong> {film.director}</p>
              <p><strong>Année :</strong> {film.release_date}</p>
              <p><strong>Score :</strong> {film.rt_score}/100</p>
            </div>
            <div className="film-detail-description">
              <h2>Synopsis</h2>
              <p>{film.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}