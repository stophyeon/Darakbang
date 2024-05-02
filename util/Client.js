

// 로그인 fetch

export async function Loginfetch(email, password) {
  try {
    const response = await fetch("http://darakbang-apigateway-service-1:8888/member/login", {
    //const response = await fetch("http://localhost:8888/member/login", {
      cache: 'no-store',
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      const { accessToken } = data.jwtDto;
      localStorage.setItem("Authorization", `Bearer ${accessToken}`);
      
    }
    else if (response.status === 403) {
      throw new Error('로그인 실패: 아이디 혹은 비밀번호를 다시 확인해주세요.');
    }
  }
  catch (error) {
    console.error(error);
    throw new Error('로그인 요청에 실패했습니다.');
  }
  }

// 회원가입 fetch
export async function signup(formData) {
  const response = await fetch("http://darakbang-apigateway-service-1:8888/member/signup", {
  // const response = await fetch("http://localhost:8888/member/signup", {
    method: "POST",
    body: formData
  });
  const responseData = await response.json();
  console.log(responseData);
  if (response.ok) {
    return responseData;
  } else {
    console.error(response.status);
    throw new Error('API 요청에 실패했습니다.');
  }
}

// 닉네임 중복 체크
export async function checkNickname(nickname) {
  const response = await fetch(`http://darakbang-member-service-1:8080/nick_name?nick_name=${nickname}`, {
  //const response = await fetch(`http://localhost:8888/nick_name?nick_name=${nickname}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}
  

export async function fetchUserProfile(accesstoken) {
  try {
   const response = await fetch("http://darakbang-apigateway-service-1:8888/member/profile", {  
  //  const response = await fetch('http://localhost:8888/member/profile', {
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
