
// 상품 검색 
export async function fetchProductName(searchTerm) {
  const response = await fetch('http://darakbang-apigateway-service-1:8888/product/search', {  
  //  const response = await fetch('http://localhost:8888/product/search', {
      cache: 'no-store',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: searchTerm,
      }),
    });
    if (!response.ok) {
      const error = new Error('연결 오류');
      throw error;
    }
    
    const search = await response.json();
    return search;
  }
  