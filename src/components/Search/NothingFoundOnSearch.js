import SearchBox from "./SearchBox"

const NothingFoundOnSearch = ({searchInput, submit}) => {
    return (
        <div>
            <div className="container-album">
               
               <div>
                   <p>Sorry, nothing found. Please try again.</p>
                   <SearchBox searchInput={searchInput} submit={submit}/>
               </div>
                
            </div>
        </div>
    )
}

export default NothingFoundOnSearch