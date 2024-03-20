// /search/posts/[searchTerm]

import Items from "@compoents/components/items/Items";


export default function SearchPosts({ params: { searchTerm} }) {

    return (
        <Items items={searchTerm}/>
    )
}