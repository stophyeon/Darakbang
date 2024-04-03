
export async function sendProductData(productDetails, accessToken) {
  try {
    const response = await fetch('http://localhost:8888/product', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
      body: JSON.stringify(productDetails),
    });

    if (response.status !== 200) {
      throw new Error('상품을 게시하는데 문제가 발생했습니다.');
    } else {
      <h2>상품 게시 완료!</h2>
    }
  } catch (error) {
    throw new Error(error.message || '상품을 게시하는데 문제가 발생했습니다.');
  }
}

export async function getPostsFile(accessToken) {
  const response = await fetch('http://localhost:8888/product/page', {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`
    },
  });
  const data = await response.json();
  return data;
}

export async function getPostsFiles(page, accessToken) {
    const response = await fetch(`http://localhost:8888/product/page?page=${page}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
    });
    const data = await response.json();
    return data;
  }
  
  export async function getPostData(productid, accessToken) {
    const response = await fetch(`http://localhost:8888/product/detail/${productid}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
    });
    const data = await response.json();
    return data;
  }

  export async function PutPostData(productid, productData, accessToken) {
    const response = await fetch(`http://localhost:8888/product/${productid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
      body: JSON.stringify(productData),
      cache: 'no-store'
    });
  }

  export async function DeletePost(productid, accessToken) {
    const response = await fetch(`http://localhost:8888/product/${productid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
    });

    if (response.status !== 200) {
      throw new Error('상품을 삭제하는데 문제가 발생했습니다.');
    } else {
      console.log('삭제 완료')
    }
  }