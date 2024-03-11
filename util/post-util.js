export async function getPostsFiles() {
    const response = await fetch('http://localhost:8080/product/list');
    const data = await response.json();
    return data;
  }
  
  export async function getPostData(postIdentifier) {
    const response = await fetch(`http://localhost:8080/product/list/${postIdentifier}`);
    const data = await response.json();
    return data;
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
  

  