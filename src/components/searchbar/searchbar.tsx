import './searchbar.css'

const SearchBar = () => {
    return(
        <div className="repositoriesSearch_main">
            <div>
                <button className="repositoriesSearchContainer_button button_new button_new_main">
                    <i className="fa fa-book"></i>
                    New
                </button>
            </div>
            <div className="repositoriesSearchContainer">
                <input 
                    className="repositoriesSearch" 
                    type="text" 
                    name="repositorySearch" 
                    placeholder="Find a repository..."
                />
                <div className="filtersContainer filtersContainer_secondary">
                    <button className="repositoriesSearchContainer_button"	>
                        Type
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <button className="repositoriesSearchContainer_button">
                        Language
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <button className="repositoriesSearchContainer_button">
                        Sort
                        <i className="fa fa-caret-down"></i>
                    </button>
                </div>
                <button className="repositoriesSearchContainer_button button_new button_new_secondary">
                    <i className="fa fa-book"></i>
                    New
                </button>
            </div>
            <div className="filtersContainer filtersContainer_main">
                <button className="repositoriesSearchContainer_button"	>
                    Type
                    <i className="fa fa-caret-down"></i>
                </button>
                <button className="repositoriesSearchContainer_button">
                    Language
                    <i className="fa fa-caret-down"></i>
                </button>
                <button className="repositoriesSearchContainer_button">
                    Sort
                    <i className="fa fa-caret-down"></i>
                </button>
            </div>
        </div>
    )
}

export default SearchBar