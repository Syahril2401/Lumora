const axios = require('axios');

(async () => {
  try {
    const loginRes = await axios.post('http://localhost:8008/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    if (!loginRes.data || !loginRes.data.data) {
        console.log('Login failed:', loginRes.data);
        return;
    }
    
    const token = loginRes.data.data.token;
    console.log('Got token, fetching planner...');
    
    const res = await axios.get('http://localhost:8008/api/dashboard/planner', {
      headers: { Authorization: 'Bearer ' + token }
    });
    
    console.log('Success:', res.data);
  } catch (err) {
    if (err.response) {
      console.log('API Error:', err.response.data);
    } else {
      console.log('Network Error:', err.message);
    }
  }
})();
