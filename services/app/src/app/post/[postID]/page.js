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
    const res = await fetch(`http://localhost:4000/v1/post/random`)
    const data = await res.json()

    // Pass data to the page via props
    return data
}