'use server';


// 회원가입 fetch
export async function signup(formData) {
  const response = await fetch("http://localhost:8888/member/signup", {
    method: "POST",
    body: formData
  });

  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    console.error(response.status);
    throw new Error('API 요청에 실패했습니다.');
  }
}

// 닉네임 중복 체크
export async function checkNickname(nickname) {
  const response = await fetch(`http://localhost:8888/nick_name?nick_name=${nickname}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}


export async function EditProfile(formData, accessToken) {
  const response = await fetch("http://localhost:8888/member/profile", {
    method: "PUT",
    headers: {
      'Authorization': `${accessToken}`
    },
    body: formData
  });

  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    console.error(response.status);
    throw new Error('API 요청에 실패했습니다.');
  }
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
    const response = await fetch('http://localhost:8888/member/profile', {
      cache: 'no-store',
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

// 멤버 프로필 수정 api
export async function PUTUserProfile(accesstoken, formData) {
  try {
    const response = await fetch(`http://localhost:8888/member/profile`, {
      cache: 'no-store',
      method: 'PUT',
      headers: {
        'Authorization': `${accesstoken}`
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('사용자 프로필 정보 수정 중 오류가 발생했습니다.', error);
    throw error;
  }
};

// 상대방 프로필 api

export async function fetchOtherUserProfile(nick_name, accessToken){
  try {
    const response = await fetch(`http://localhost:8888/member/profile/${nick_name}`, {
      cache: 'no-store',
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
    const response = await fetch('http://localhost:8888/follow', {   // 본문에 이메일 넣어서?
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

// followList 가져오기
export async function fetchFollowUser(accessToken) {
  try {
    const response = await fetch('http://localhost:8888/follow/follower', {
      cache: 'no-store',
      headers: {
        'Authorization': `${accessToken}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('사용자 프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};
// following List
export async function fetchFollowingUser(accessToken) {
  try {
    const response = await fetch('http://localhost:8888/follow/following', {
      cache: 'no-store',
      headers: {
        'Authorization': `${accessToken}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('사용자 프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};