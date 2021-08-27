const SearchInput = () => {

    const handleSearchSubmit = () => {
        console.log("search")
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