import SearchBox from "./SearchBox"

const NothingFoundOnSearch = ({searchInput}) => {
    return (
        <div>
            <div className="container-album">
               
               <div>
                   <p>Sorry, nothing found. Please try again.</p>
                   <SearchBox searchInput={searchInput}/>
               </div>
                
            </div>
        </div>
    )
}

export default NothingFoundOnSearch