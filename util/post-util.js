
export async function getPostsFiles() {
    const response = await fetch('http://localhost:6080/product/list');
    const data = await response.json();
    return data;
  }
  
  export async function getPostData(productid) {
    const response = await fetch(`http://localhost:6080/product/${productid}`);
    const data = await response.json();
    return data;
  }

  export async function DeletePost(productid) {
    const response = await fetch(`http://localhost:6080/product/delete/${productid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('상품을 삭제하는데 문제가 발생했습니다.');
    } else {
      console.log('삭제 완료')
    }
  }
  
  export async function getAllPosts() {
    const postFiles = await getPostsFiles();
  
    const allPosts = await Promise.all(postFiles.map(async (postFile) => {
      const postData = await getPostData(postFile);
      return postData;
    }));
  
    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
  
    return sortedPosts;
  }
  

  