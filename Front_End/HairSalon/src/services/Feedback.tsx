export const submitReview = async ({
    stylistId,
    rating,
    comment,
  }: {
    stylistId: string;
    rating: number;
    comment: string;
  }) => {
    const token = localStorage.getItem('token'); 
  
    try {
      const response = await fetch('https://api.vol-ka.studio/api/v1/feedback/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
          'accept': 'text/plain'
        },
        body: JSON.stringify({
          stylistId,
          rating,
          comment
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
  
      const data = await response.json();
      return data.message;
    } catch (error) {
      throw error;
    }
  }; 