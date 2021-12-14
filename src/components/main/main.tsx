import Profile from "../profile/profile"
import SearchBar from "../searchbar/searchbar"
import Repositories from "../repositories/repositories"
import './main.css'
import SecondaryNav from "../nav/secondary_nav"

const Main = () => {
    return (
        <section className="main">
            <Profile />
            <SecondaryNav display={'display_sm'} />
            
            <div>
                <SearchBar />
                <Repositories />
            </div>
        </section>
    )
}


export default Main