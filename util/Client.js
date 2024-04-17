


// 로그인 fetch

export async function Loginfetch(email, password) {
    try {
      const response = await fetch("http://localhost:8888/member/login", {
        cache: 'no-store',
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
  
      if (response.ok) {
        const { accessToken, refreshToken } = data.jwtDto;
        localStorage.setItem("Authorization", `Bearer ${accessToken}`);
        document.cookie = `refreshToken=${refreshToken};`;
        
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