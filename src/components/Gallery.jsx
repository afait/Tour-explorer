import React, { useEffect, useState } from 'react';
import TourCard from './TourCard.jsx';



const Gallery = ({ tours, setTours, onRemove }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  // Use the proxied endpoint
  // ExampleComponent.js or App.js

  // Creating the tour list component
  const fetchTours = async () => {
    try {
      const res = await fetch("https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project");
      if (!res.ok) {
        throw new Error("Failed to fetch tours");
      }
      const data = await res.json();
      setTours(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tours:", err);
      setError(true);
      setLoading(false);
    }
  };
  




  useEffect(() => {
    fetchTours();
  }, []);




  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Something went wrong. Please try again later.</h2>;
  if (tours.length === 0)
    return (
      <div>
        <h2>No Tours Left</h2>
        <button onClick={fetchTours}>Refresh</button>
      </div>
    );




  return (
    <section className="gallery">
      {tours.map((tour) => (
        <TourCard key={tour.id} {...tour} onRemove={onRemove} />
      ))}
    </section>
  );
};



export default Gallery;




