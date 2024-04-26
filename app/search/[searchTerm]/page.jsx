import SearchContainer from "@compoents/containers/SearchContainer";
import { fetchProductName } from "@compoents/util/search-util";

export default async function SearchPage({ params }) {
    console.log(decodeURIComponent(params.searchTerm))
    const searchTerm = await fetchProductName(decodeURIComponent(params.searchTerm));
    
    const [searchTerms] = await Promise.all([searchTerm]);

    return (
        <>
            <SearchContainer searchTerm={searchTerms}/>
        </>
    )
}