import FilmList from "../components/FilmList";

export default function FavoritePage() {
  return (
    <>
      <h1>Mes Favoris</h1>
      <FilmList isFavoritePage={true} />
    </>
  );
}
