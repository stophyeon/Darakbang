


import Items from "@compoents/components/items/Items"
import LoadingIndicator from "@compoents/components/UI/LoadingIndicator"
import ErrorBlock from "@compoents/components/UI/ErrorBlock"
import { fetchitems } from "@compoents/util/http";

export default async function SearchPage({ params }) {
    const searchTerm = fetchitems(params.searchTerm)
  
    const [ searchTerms ] = await Promise.all([searchTerm]);



    return (
        <>
            <h1>검색 페이지</h1>
                <ul>
                    {searchTerms.map((searchTerm) => (
                        <li key={searchTerm.productId}>
                            <Items searchTerm={searchTerms} />
                        </li>
                    ))}
                </ul>
        </>
    )
}