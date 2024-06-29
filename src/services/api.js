export const BASE_URL = 'https://rtovaahan.mdssoftware.com/';
export const MDS_URL = 'https://mdssoftware.com/api/'

export const fetchData = async (endpoint, language, limit, offset) => {
const url = `${BASE_URL}${endpoint}${language}/${limit}/${offset}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
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
    const data = await response.json();
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
  try {
    const response = await fetch(url);
    const data = await response.json();
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
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch data');
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const saveRTOScore = async (endpoint,token, score, data ) => {
    const url = `${MDS_URL}${endpoint}`;
    console.log('URL:', url); // Log the URL to the console
    const dataToSend = { 
      token, 
      score ,
      data
    };
    console.log('req body', dataToSend)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      console.log('req body', dataToSend)
      const data = await response.json();
      console.log('rtodata', data)
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
      try {
        const response = await fetch(url);
        const data = await response.json();
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
  
      const response = await fetch(`${MDS_URL}login`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  