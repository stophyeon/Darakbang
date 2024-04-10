import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();


export async function createNewEvent(eventData) {
  const response = await fetch(`http://localhost:8888/member/signup`, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    // 회원가입 성공 시 메인 페이지로 리다이렉션
    //window.location.href = "/login";
  } else {
    throw new Error(data.message || "Something went wrong!");
  }

  if (!response.ok) {
    const error = new Error('An error');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}




// 상품 검색 API 연결 함수
export async function fetchItemsByProductName(product_name, page) {

  const response = await fetch(`http://localhost:8888/product/by-product-name?product_name=${product_name}&page=${page}`);

  if (!response.ok) {
    const error = new Error('연결 오류');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { search } = await response.json();

  return search;
}

// 사용자 프로필 게시물 API 연결 함수
export async function fetchItemsByUser(nick_name) {
  let url = `http://localhost:8888/product/by-user?nick_name=${nick_name}`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('연결 오류');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { search } = await response.json();

  return search;
}



// 멤버 프로필 api

export async function fetchUserProfile(accesstoken) {
  try {
    const response = await fetch(`http://localhost:8888/member/profile`, {
      method: 'POST',
      headers: {
        'Authorization': `${accesstoken}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('사용자 프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

// 상대방 프로필 api

export async function fetchOtherUserProfile(nick_name, accessToken){
  try {
    const response = await fetch(`http://localhost:8888/member/profile/${nick_name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('상대방 프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

// 팔로우 요청 api

export async function followUser(accessToken, email) {
  try {
    const response = await fetch('http://localhost:8888/member/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
      body: JSON.stringify({ email })
    });
    if (response.ok) {
      console.log("팔로우 성공!");
    }
  } catch (error) {
    console.error('팔로우 요청을 보내는 중 오류가 발생했습니다.', error);
    throw error;
  }
}
