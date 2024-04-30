const fetchChildData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/child/view-child/');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log(data);
    return data.children;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchChildData;
