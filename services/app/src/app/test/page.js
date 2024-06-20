import simulateAsyncData from "./simulateAsyncData";

export default async function Page() {
    const uuid = await simulateAsyncData();

    return (
        <div>
            <h1>UUID</h1>
            <p>{ uuid }</p>
        </div>
    )
}

export const maxDuration = 2;
export const revalidate = 60;