
  // 1. Extract UTM Parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const utmParameters = {
    source: urlParams.get('utm_source'),
    medium: urlParams.get('utm_medium'),
    campaign: urlParams.get('utm_campaign'),
    term: urlParams.get('utm_term'),
    content: urlParams.get('utm_content')
  };

  // 2. Store UTM Parameters in Session Storage (optional for per-session tracking)
  for (const [key, value] of Object.entries(utmParameters)) {
    if (value) {
      sessionStorage.setItem(key, value);
    }
  }

  // 3. Send UTM Parameters to Your Backend
  fetch('http://localhost:3000/api/utm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      utmParameters,  
      pageUrl: window.location.href
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    // Handle successful response (optional)
  })
  .catch(error => {
    console.error('Error sending UTM parameters:', error);
    // Handle error gracefully (e.g., store data locally for later retry)
  });

