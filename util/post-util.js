
export async function getPostsFiles() {
    const response = await fetch('http://localhost:6080/product/list', {
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  }
  
  export async function getPostData(productid) {
    const response = await fetch(`http://localhost:6080/product/${productid}`, {
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  }

  export async function PutPostData(productid, productData) {
    const response = await fetch(`http://localhost:6080/product/update/${productid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
      cache: 'no-store'
    });
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

  // 댓글 api
  
  export async function getComments(productid) {
    const response = await fetch(`http://localhost:6080/comment/getall/${productid}`, {
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  }

  export async function PostComments(jwt, productId, commentdetail) {
    const response = await fetch('http://localhost:6080/comment/create', {
        next: { tags: ['collection'] },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jwt: jwt,
          productid: productId,
          commentdetail: commentdetail
        }),
      });
      if (response.status !== 200) {
        throw new Error('댓글을 게시하는데 문제가 발생했습니다.');
      } else {
        return { message: '댓글이 게시되었습니다!' };
      }
  }

  export async function DeleteComment(commentid) {
    const response = await fetch(`http://localhost:6080/comment/delete/${commentid}`, {
      cache: 'no-store',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error('댓글을 삭제하는데 문제가 발생했습니다.');
    } else {
      console.log('삭제 완료')
    }
  }

  export async function UpdateComment(commentid, commentdetail) {
    const response = await fetch(`http://localhost:6080/comment/update/${commentid}`, {
      cache: 'no-store',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentdetail),
      cache: 'no-store'
    });
  }