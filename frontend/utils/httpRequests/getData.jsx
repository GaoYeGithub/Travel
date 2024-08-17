export const getData = async (endpoint) => {
    const response = await fetch(`/${endpoint}`, {
      method: "GET",
    });
    const data = await response.json();
  
    return data;
  };
  