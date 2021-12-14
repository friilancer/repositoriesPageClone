import {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {Get_NavData, viewer} from '../../graphQl/queries'
import useWindowSize from '../../controllers/customHooks/useWindowSize'
import './nav.css'

interface Props{
    isOpen: boolean;
    login?: string;
    url?: string
}

interface data{
    viewer?: viewer
}

const MobileNav = ({isOpen, login, url}:Props) => {
    const [isFocused, setIsFocused] = useState(false)
    return (
        <>
            {
                isOpen && 
                    <nav className="secondaryNav">
                    <div className="searchGithub">
                        <input 
                            type="text" 
                            className="searchGithub-input" 
                            name="search" 
                            placeholder="Search or jump to..."
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <i className={`searchSlash ${isFocused && 'hide'}`}>/</i>
                    </div>
                    <ul>
                        <a>
                            <li>Dashboard</li>
                        </a>
                        <a>
                            <li>Pull requests</li>
                        </a>
                        <a>
                            <li>Issues</li>
                        </a>
                        <a>
                            <li>Marketplace</li>
                        </a>
                        <a>
                            <li>Explore</li>
                        </a>
                        <a>
                            <li>Settings</li>
                        </a>
                        <a>
                            <img src={url} className="profilePhoto" alt="repositoryOwner" />
                            <li>{login}</li>
                        </a>
                        <a>                        
                            <li><i className="fa fa-sign-out-alt"></i> Sign Out</li>
                        </a>
                    </ul>
                </nav>
            }
        </>
    )
}

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const windowSize = useWindowSize()
    const {data} : {data: data | undefined} = useQuery(Get_NavData);

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        if(windowSize > 765){
            setIsOpen(false)
        }
    },[windowSize])

    return(
        <>
            <nav className={`primaryNav ${!isFocused ? 'navContainer' : windowSize > 1600 ? 'navContainer__focus_sm' :  'navContainer__focus' }`}>
                <i onClick={() => setIsOpen(prevstate => !prevstate)} className="fa fa-bars"></i>
                <div className="nav-first">
                    <a href="#">
                        <i className="fab fa-github"></i>
                    </a>
                    <div className="sm-none searchGithub">
                        <input 
                            type="text" 
                            className="searchGithub-input" 
                            name="search" 
                            placeholder="Search or jump to..."
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                         />
                        <i id="primarySearchSlash" className={`searchSlash ${isFocused && 'hide'}`}>/</i>
                    </div>
                </div>
                <div className="sm-none nav-second">
                    <a className="pullRequest" href="#">
                        <span>Pull</span>
                        <span className="s">s</span>
                        <span className="request">Request</span>
                    </a>
                    <a href="#">Issues</a>
                    <a href="#">Marketplace</a>
                    <a href="#">Explore</a>
                </div>

                <div className="nav-third">
                    <a href="#" className="nav-bellGroup">
                        <i className="far fa-bell"></i>
                    </a>
                    <a href="#" className="sm-none nav-plusGroup">
                        <i className="fas fa-plus"></i>
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <a href="#" className="sm-none nav-profileGroup">
                        <img src={data?.viewer?.avatarUrl} className="profilePhoto" alt="repositoryOwner" />
                        <i className="fa fa-caret-down"></i>
                    </a>
                </div>
            </nav>
            <MobileNav 
                isOpen={isOpen} 
                login={data?.viewer?.login}
                url={data?.viewer?.avatarUrl}  
            />
        </>
    )
}


export default Nav