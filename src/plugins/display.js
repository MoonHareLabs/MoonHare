
export default function displayPlugin({ prefix }) {
    return {
        `$--{prefix}d`: initial,
        display: var('--d')
    }
}
