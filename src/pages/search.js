import Header from "../components/Header"
import SearchResults from "../components/Search/SearchResults"

const Search = ({searchInput, nothingIsFound, filtered, submit}) => {

    return (
        <div>
            <Header searchInput={searchInput} submit={submit}/>

            <h2>this is search page</h2>

            <SearchResults searchInput={searchInput} nothingIsFound={nothingIsFound} filtered={filtered} submit={submit}/>
        </div>
    )
}

export default Search