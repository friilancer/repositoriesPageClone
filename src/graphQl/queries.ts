import {gql} from '@apollo/client'


export interface repository{
    name: string;
    updatedAt: string;
    forkCount: number;
    isFork: boolean;
    description: string;
    isPrivate: boolean;
    licenseInfo: null | {
        name:string;
    },
    url:string;
    parent: null | {
        nameWithOwner: string;
        forkCount: number;
    }
    primaryLanguage:{
        name:string;
        color:string
    }
}

export interface edges{
    node: repository
}

interface count{
    totalCount?: number;
}

export interface viewer{
    login?: string;
    avatarUrl?: string;
    name?: string;
    email?: string;
    bio?: string;
    location?: string;
    websiteUrl?: string;
    twitterUsername?: string;
    followers?:count;
    following?:count;
    starredRepositories?:count;
    repositories?:{
        totalCount: number;
        edges: [edges]
    }
}

export interface data{
    viewer?: viewer
}

export const Get_NavData = gql`
    query{
        viewer{
            login
            avatarUrl
            repositories(last:31){
                totalCount
            }
        }
    }
`

export const Get_RepositoriesData = gql`
    query{
        viewer{
            repositories(last:31){
                totalCount
                edges{
                    node{
                        name
                        updatedAt
                        forkCount
                        isFork
                        url
                        description
                        parent{
                            nameWithOwner
                            forkCount
                        }
                        isPrivate
                        licenseInfo{
                            name
                        }
                        primaryLanguage{
                            name
                            color
                        }
                    }
                }
            }
        }
    }
`

export const Get_ProfileData = gql`
    query{
        viewer{
            login
            name
            email
            avatarUrl
            bio
            location
            websiteUrl
            twitterUsername
            followers{
            totalCount
            }
            following{
            totalCount
            }
            starredRepositories{
            totalCount
            }
            repositories(last:31){
                totalCount
            }
        }
    }
`
