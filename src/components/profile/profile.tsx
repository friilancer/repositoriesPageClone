import {useState} from 'react'
import {useQuery} from '@apollo/client'
import {Get_ProfileData, data} from '../../graphQl/queries'
import useWindowSize from '../../controllers/customHooks/useWindowSize'
import './profile.css';

interface SecondaryData_props{
    followers: number | undefined;
    following: number | undefined;
    starredRepos: number | undefined;
    display: string
}
const SecondaryData = ({followers, following, starredRepos, display}: SecondaryData_props) => {
    const [color_followers, setColor_followers] = useState('') 
    const [color_following, setColor_following] = useState('')
    const [color_starred, setColor_starred] = useState('')

    return (
    <div className={`userProfile_following ${display}`}>
        <div
            onMouseEnter={() => setColor_followers('color_followers')}
            onMouseLeave={() => setColor_followers('')} 
            className="userProfile_extras followerCount_container"
        >
            <i className={`fa fa-users followerCount grey ${color_followers}`}></i>
            <span className="strong followerCount">{followers}</span>
            <span className={`grey followerCount ${color_followers}`}>followers</span>
        </div>
        <span className="userProfile_following_seperators">.</span>
        <div
            onMouseEnter={() => setColor_following('color_following')}
            onMouseLeave={() => setColor_following('')} 
            className="userProfile_extras followingsCount_container"
        >
            <span className="strong followingsCount">{following}</span>
            <span className={`grey followingsCount ${color_following}`}>following</span>
        </div>
        <span className="userProfile_following_seperators">.</span>
        <div
            onMouseEnter={() => setColor_starred('color_starred')}
            onMouseLeave={() => setColor_starred('')} 
            className="userProfile_extras starredRepos_container"
        >
            <i className={`fa fa-star-o grey ${color_starred}`}></i>
            <span className="strong starredRepos_number">
                {starredRepos}
            </span>
        </div>
    </div>
    )
}
const Profile = () => {
    const {data} : {data: data | undefined} = useQuery(Get_ProfileData)
    const windowSize = useWindowSize()
    const [status, setStatus] = useState('')
    
    return (
        <div>	
            <div className="userProfile">
                <div className="profileFigure">
                    <img src={data?.viewer?.avatarUrl} alt="repositoryOwner" />
                    <div className="profilePrimaryData">
                        <span className="name">{data?.viewer?.name}</span>
                        <span className="userName">{data?.viewer?.login}</span>
                    </div>
                </div>
                <div className="profileStatus_container">
                    <div                        
                        onMouseEnter={() => setStatus('active')}
                        onMouseLeave={() => setStatus('')}
                        className={`profileStatus ${status === 'active' ? 'statusIcon--active' : ''}`} 
                    >
                        <i className="far fa-smile"></i>
                        <span 
                         className={`statusText ${windowSize > 765 ? 'hide' : ''} ${status === 'active' ? 'statusText--active' : ''}`} 
                        >
                            Set status
                        </span>
                    </div>
                </div>
                <div className="profileSecondaryData">
                    <span id="bio" className="userTitle">{data?.viewer?.bio}</span>
                    <button className="repositoriesSearchContainer_button profileButton">Edit profile</button>
                    <SecondaryData 
                        followers={data?.viewer?.followers?.totalCount}
                        following={data?.viewer?.following?.totalCount}
                        starredRepos={data?.viewer?.starredRepositories?.totalCount}
                        display={"display_lg"}
                    />                    
                    <div className="userProfile_secondaryData">
                        <div className="userProfile_extras display_lg">
                            <i className="fa fa-map-marker"></i>
                            <span id="location">{data?.viewer?.location}</span>
                        </div>
                        <div className="userProfile_extras">
                            <i className="fa fa-envelope-o"></i>
                            <a href={`mailto:${data?.viewer?.email}`} target="_blank" rel="noreferrer" id="emailUrl">{data?.viewer?.email}<span id="userProfile_email"></span></a>
                        </div>
                        <div className="userProfile_extras">
                            <i className="fa fa-link"></i>
                            <a target="blank" href={`https://${data?.viewer?.websiteUrl}`} id="websiteUrl">
                                <span id="website">{data?.viewer?.websiteUrl}</span>
                            </a>
                        </div>
                        <div className="userProfile_extras display_lg">
                            <i className="fa fa-twitter"></i>
                            <a href={`https://twitter.com/${data?.viewer?.twitterUsername}`} target="_blank" rel="noreferrer" id="twitterUrl">
                                <span id="twitter">{`@${data?.viewer?.twitterUsername || ''}`}</span>
                            </a>
                        </div>
                    </div>
                    <SecondaryData 
                        followers={data?.viewer?.followers?.totalCount}
                        following={data?.viewer?.following?.totalCount}
                        starredRepos={data?.viewer?.starredRepositories?.totalCount}
                        display={"display_sm"}
                    />
                </div>
            </div>
        </div>
    )
}

export default Profile