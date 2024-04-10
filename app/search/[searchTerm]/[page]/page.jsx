
export default function SearchFormPageForm({params}) {
    const page = params.page;
    const product_name = params.searchTerm;
    // 지현이형 상품 헤더에 토큰 다 넣으라 했는데 토큰 null 값이어도 상품은 보여
    return (
        <>
            <h1>여기다가 상품 검색 페이지 네이션 구현</h1>
        </>
    )
}