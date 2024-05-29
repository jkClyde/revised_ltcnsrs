import databaseURL from 'database_url';

const fetchChildData = async () => {
  try {
    const response = await fetch(`${databaseURL}/child/view-child/`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.children;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchChildData;
