import React from "react";

export default async function Post({ params }) {
    const { postID } = params; 
    const data = await populateFromServer(postID);

    return (
        <>
            <div>{ data.title } ({ data.id } / { postID })</div>
            <div>{ data.description }</div>
        </>
    )
}

// ISR
export const revalidate = 10

async function populateFromServer(postID) {
    // Fetch data from external API
    const res = await fetch(`${process.env.API_HOST}/${process.env.API_VERSION}/post/random`)
    const data = await res.json()

    // Pass data to the page via props
    return data
}