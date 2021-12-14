import {useQuery} from '@apollo/client'
import {edges, Get_RepositoriesData, data} from '../../graphQl/queries'
import  dayjs from 'dayjs'
import './repositories.css'


const Repository = ({node}: edges) => {
    const {
        name,
        updatedAt,
        forkCount,
        isFork,
        description,
        parent,
        url,
        isPrivate,
        licenseInfo,
        primaryLanguage
    } = node
    return(
        <div id="repository" className="repository">
            <div>
                <div id="primaryRepositoryData" className="primaryRepositoryData">
                    <a href={url} target="_blank" rel="noreferrer" id="repositoryName" className="repositoryName">{name}</a>
                    <span className="isPrivate">{isPrivate ? "Private" : "Public"}</span>
                </div>
                <div id="forkedFrom" className="forkedFrom">
                    {isFork && `Forked from ${parent?.nameWithOwner}`}
                </div>
                <div id="repositoryDescription" className="repositoryDescription">
                    {description}
                </div>
                <div id="secondaryRepositoryData" className="secondaryRepositoryData">
                    { 
                        primaryLanguage &&
                        <div id="primaryLanguage" className="primaryLanguage detailContainer">
                            <i className="fa fa-circle" style={{color:primaryLanguage?.color}}></i>
                            <span>{primaryLanguage?.name}</span>
                        </div>
                    }
                    {
                        forkCount > 0 && (
                            <div id="repositoryForks" className="repositoryForks detailContainer">
                                <i className="fa fa-code-branch" aria-hidden="true"></i>
                                <span>{forkCount}</span>
                            </div>
                        )
                    }
                    {   

                        licenseInfo && (
                            <div className="detailContainer">
                                <i className="fa fa-balance-scale" aria-hidden="true"></i>
                                <span>{licenseInfo?.name}</span>
                            </div>
                        )
                    }
                    <div className="detailContainer">
                        {
                            `Updated on
                            ${dayjs(updatedAt).format('MMM D')}${dayjs(updatedAt).year() !== dayjs().year() ? `, ${dayjs(updatedAt).year()}` : ''} `
                        }
                    </div>
                </div>
            </div>
            <div id="repositoryStar" className="repositoryStar">
                <i className="far fa-star"></i>
                <span className="repositoryStarText">Star</span>
            </div>
        </div>
    )
}

const Repositories = () => {
    const {data} : {data: data | undefined} = useQuery(Get_RepositoriesData)

    return (
        <>
            {
                data?.viewer?.repositories?.edges.map(({node}) => 
                    <Repository
                        key={node.name}
                        node={node}
                    />
                )
            }
        </>
    )
}

export default Repositories