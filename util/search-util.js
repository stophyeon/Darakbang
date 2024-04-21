
// 상품 검색 
export async function fetchProductName(product_name) {

    const response = await fetch(`http://localhost:8888/product/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: product_name,
      }),
    });
    if (!response.ok) {
      const error = new Error('연결 오류');
      throw error;
    }
  
    const { search } = await response.json();
  
    return search;
  }
  