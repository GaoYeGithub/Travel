export const postData = async (endpoint, body) => {
    const allHeaders = { "Content-Type": "application/json" };
  
    const response = await fetch(`/${endpoint}`, {
      method: "POST",
      headers: allHeaders,
      body: JSON.stringify(body),
    });
  
    const data = await response.json();
    return data;
};