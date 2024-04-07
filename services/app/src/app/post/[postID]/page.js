import React from "react";

export default async function Post({ params }) {
    const { postID } = params; 
    const data = await populateFromServer(postID);

    return (
        <div>
            { metadata(data, postID) }
            <div>{ data.title } ({ data.id } / { postID })</div>
            <div>{ data.description }</div>
        </div>
    )
}

// Metadata for social sharing and search engines
const metadata = (data, postID) => (
    <>
        <title>{ data.title }</title>
        <meta name="description" content={ data.description }/>
        <meta property="og:title" content={ data.title }/>
        <meta property="og:description" content={ data.title }/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content={ `https://localhost/post/${postID}` }/>
        <meta property="og:image" content="https://img.freepik.com/free-vector/gradient-abstract-mountain-background-design_23-2149178797.jpg"/>
        <meta name="twitter:title" content={data.title}/>
        <meta name="twitter:description" content={data.description}/>
        <meta name="twitter:image" content="https://img.freepik.com/free-vector/gradient-abstract-mountain-background-design_23-2149178796.jpg"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="X:card" content="summary_large_image"/>
    </>
)

// ISR
export const revalidate = 10

async function populateFromServer(postID) {
    // TODO: Default variables and exclude .env files from git
    // const { API_HOST, API_VERSION } = process.env; 
    
    // Fetch data from external API
    // const res = await fetch(`${process.env.API_HOST}/${process.env.API_VERSION}/post/random`)
    // const data = await res.json()

    const random = Math.floor(Math.random() * 100);

    const data = {
        id:random,
        title:"Sample Page", 
        description:"Lorem ipsum..."
    }

    // Pass data to the page via props
    return data
}