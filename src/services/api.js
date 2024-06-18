export const BASE_URL = 'https://returning-adolescent-composer-monitoring.trycloudflare.com/';

export const fetchData = async (endpoint, language, limit, offset) => {
const url = `${BASE_URL}${endpoint}${language}/${limit}/${offset}`;
console.log(url,'url')
  try {
    const response = await fetch(url);
    console.log('response', response)
    const data = await response.json();
    console.log('data', data)
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch data');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const saveScore = async (endpoint, scoreData, token) => {
  const url = `${BASE_URL}${endpoint}`;
  console.log(url, 'url');
  const dataToSend = {
    ...scoreData,
    token,  // Include token as a field in the body
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });
    console.log('response', response);
    const data = await response.json();
    console.log('data', data);
    if (!response.ok) {
      throw new Error(data.message || 'Failed to save score');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getScore = async (endpoint, student_id, limit, offset) => {
  const url = `${BASE_URL}${endpoint}${student_id}/${limit}/${offset}`;
  console.log(url,'url')
  try {
    const response = await fetch(url);
    console.log('response', response)
    const data = await response.json();
    console.log('data', data)
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch data');
    }
    return data;
  } catch (error) {
    throw error;
  }
};
export const fetchRTOData = async (endpoint, language) => {
  const url = `${BASE_URL}${endpoint}${language}`;
  console.log(url,'url')
    try {
      const response = await fetch(url);
      console.log('response', response)
      const data = await response.json();
      console.log('data', data)
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch data');
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const saveRTOScore = async (endpoint, scoreData, token) => {
    const url = `${BASE_URL}${endpoint}`;
    console.log(url, 'url');
    const dataToSend = {
      ...scoreData,
      token,  
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      console.log('response', response);
      const data = await response.json();
      console.log('data', data);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save score');
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchPracticeList = async (endpoint, language, s_id) => {
    const url = `${BASE_URL}${endpoint}${language}/${s_id}`;
    console.log(url,'url')
      try {
        const response = await fetch(url);
        console.log('response', response)
        const data = await response.json();
        console.log('data', data)
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch data');
        }
        return data;
      } catch (error) {
        throw error;
      }
    };

  export const login = async (registrationNo, dob) => {
    try {
      const formData = new FormData();
      formData.append('registration_no', registrationNo);
      formData.append('dob', dob);
  
      const response = await fetch('https://mdssoftware.com/api/login', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  console.log('dtaaaaa', data)
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  