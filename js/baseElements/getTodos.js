export async function getTodos(query = '', endpoint = 'http://localhost:3000') {
    try {
      
      const queryString = query ? `?${query}` : '';
      const response = await fetch(`${endpoint}${queryString}`);

      if (!response.ok) throw new Error(response.statusText);
  
      const json = await response.json();
      return json;
    } catch (err) {
      console.error(err.message || err);
      throw err; 
    }
}
  