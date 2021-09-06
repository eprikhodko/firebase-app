import { useHistory } from "react-router"
import * as ROUTES from "../../constants/routes"

const SearchBox = ({searchInput, submit}) => {

    // https://stackoverflow.com/questions/48433008/js-es6-destructuring-of-undefined
    // here we're using "Short-circuit evaluation", https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR#short-circuit_evaluation
    const {searchQuery, setSearchQuery} = searchInput || {}
    const {setSubmitSearch} = submit || {}
  
    const history = useHistory()

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        setSubmitSearch(searchQuery)
        history.push(ROUTES.SEARCH)
        // if (searchQuery !== "") {
        //     history.push(`/search`)
        // } else {
        //     history.push("/upload")
        // }

        // history.push(`/search/${searchQuery}`)
    }

    console.log("this is input value:", searchQuery)

    return (
        <div>
            <form className="header__form-search" onSubmit={handleSearchSubmit}>
                {/* <label className="label" htmlFor="query"></label> */}
                <input 
                    className="header__input-search" 
                    type="search" 
                    name="query"
                    placeholder="search" 
                    value={searchQuery} 
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button 
                    // className="button-search" 
                    className={`button-search ${!searchQuery && "btn-disabled"}`}
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND
                    // expr1 && expr2
                    // If expr1 can be converted to true, returns expr2; else, returns expr1
                    // disabled={true} makes button inactive. disabled={false} makes button active
                    // It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.
                    // Therefore, if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it.
                    disabled={!searchQuery && true}
                    // className="btn-disabled"
                    type="submit">Search</button>
            </form>
        </div>
    )    
}

export default SearchBox