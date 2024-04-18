

export async function memberPay(accessToken, paymentData) {
    const response = await fetch("http://localhost:8888/member/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${accessToken}`
      },
      body: JSON.stringify(paymentData)
    });
    return response.json();
  }
  
  export async function completePay(accessToken, paymentData) {
    const response = await fetch("http://localhost:8888/payments/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${accessToken}`
      },
      body: JSON.stringify(paymentData)
    });
    return response.json();
  }