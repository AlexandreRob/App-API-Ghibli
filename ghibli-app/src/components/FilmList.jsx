import FilmCard from "./FilmCard";
import useStore from "../store/store";

export default function FilmList({ isFavoritePage = false }) {
  let films = useStore((state) => state.films);
  let favorites = useStore((state) => state.favorites);
  
  // Si c'est la page des favoris, filtrer les films
  if (isFavoritePage === true) {
    films = films.filter((film) => favorites.includes(film.id));
  }
  
  return (
    <section className="film-list">
      {films.length === 0 && isFavoritePage ? (
        <p className="text-center">Aucun film en favori pour le moment.</p>
      ) : (
        films.map((film) => (
          <FilmCard film={film} key={film.id} />
        ))
      )}
    </section>
  );
}