import './nav.css'
import {useQuery} from '@apollo/client'
import { data, Get_NavData } from '../../graphQl/queries'
import useWindowScroll from '../../controllers/customHooks/useWindowScroll'


const SecondaryNav = ({display}: {display : string}) => {

    const offsetY = useWindowScroll()

    const {data} : {data: data | undefined} = useQuery(Get_NavData)
    return (
        <section className={`repositoriesNav sticky ${display}`}>
            <div className="repositoriesNav-userDetails">
                <img 
                    className={`profileLargerPhoto ${offsetY < 400 && 'hide'}`}
                    src={data?.viewer?.avatarUrl || ''} 
                    alt="repository owner" />
                <span className={`${offsetY < 400 && 'hide'}`}>
                    {data?.viewer?.login || ''}
                </span>
            </div>
            <div className="repositoriesTab">
                <div>
                    <span className="fa fa-book-open"></span>
                    Overview
                </div>
                <div className="repositories">
                    <span className="fa fa-book"></span>
                    Repositories
                    <span id="repoCount" className="repoCount">
                        {data?.viewer?.repositories?.totalCount || 0}
                    </span>
                </div>
                <div>
                    <span id= "fa-stream" className="fa fa-stream"></span>
                    Projects
                </div>
                <div>
                    <span className="fa fa-dice-d6"></span>
                    Packages
                </div>			
            </div>
        </section>
    )
}

export default SecondaryNav