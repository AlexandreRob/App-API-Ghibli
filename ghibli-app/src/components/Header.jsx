export default function Header({ setSearch, setSortMethod }) {
  return (
    <header className="header">
        <div className="search-container">
        <input
            type="text"
            className="search-input"
            onInput={(e) => {
            setSearch(e.target.value);
            }}
            placeholder="Rechercher un film..."
        />
        </div>
        
        <div className="sort-container">
            <button className="sort-button" onClick={() => setSortMethod("date")}>
            Par date
            </button>

            <button 
            className="sort-button"
            onClick={() => setSortMethod("title")}
            >
            Par titre
            </button>

            <button className="sort-button" onClick={() => setSortMethod("score")}>
            Par score
            </button>
        </div>
    </header>
  );
}