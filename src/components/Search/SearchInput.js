const SearchInput = ({albumsCollection}) => {

    const handleSearchSubmit = () => {
        console.log("search")
        console.log("this is albums collection that was passed to the search input as a props", albumsCollection)
    }

    return (
        <div>
            <form className="header__form-search" onSubmit={handleSearchSubmit}>
                {/* <label className="label" htmlFor="query">Movie Name</label> */}
                <input 
                    className="header__input-search" 
                    type="search" 
                    name="query"
                    placeholder="search" 
                    // value={query} 
                    // onChange={handleChange}
                />
                <button className="button-search" type="submit">Search</button>
            </form>
        </div>
    )    
}

export default SearchInput