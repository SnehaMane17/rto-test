export const BASE_URL = 'https://mdssoftware.com/';
export const MDS_URL = 'https://mdssoftware.com/api/';
// export const BASE_URL = "https://rtovaahan.mdssoftware.com/"

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
  console.log(url, 'url')
  const dataToSend = {
    ...scoreData,
    token
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
  console.log(url, 'url')
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

export const saveReadingCount = async (endpoint, readingData) => {
  const url = `${BASE_URL}${endpoint}`;
  console.log(url, 'url')
  const dataToSend = {
    ...readingData
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


  // to be used for rto screen
export const fetchPracticeDataStatus = async (endpoint, language, s_id) => {
  const url = `${BASE_URL}${endpoint}${language}/${s_id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data, 'dataaaaa')
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch data');
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  // to be used for practice screen
  export const fetchReadingDataStatus = async (endpoint, language, s_id) => {
    const url = `${BASE_URL}${endpoint}${language}/${s_id}`;
    console.log(url, 'url')
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data, 'dataaaaa')
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
  console.log(url, 'url')
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

  export const saveRTOScore = async (endpoint, token, score, data) => {
    const url = `${MDS_URL}${endpoint}`;
    console.log('URL:', url); // Log the URL to the console
  
    const formData = new FormData();
    formData.append('token', token);
    formData.append('score', score);
    formData.append('data', JSON.stringify(data)); // Assuming 'data' needs to be stringified
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      const responseData = await response.json();
      console.log('Response Data:', responseData);
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to save score');
      }
  
      return responseData;
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
  