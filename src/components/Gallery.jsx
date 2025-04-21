

import React, { useEffect, useState } from 'react';
import TourCard from './TourCard.jsx';




const Gallery = ({ tours, setTours, onRemove }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("All"); // State for dropdown selection




  // Function to fetch tours from the API
  const fetchTours = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project");
      if (!res.ok) {
        throw new Error("Failed to fetch tours");
      }
      const data = await res.json();
      setTours(data);
    } catch (err) {
      console.error("Error fetching tours:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };




  // useEffect to fetch tours when the component mounts
  useEffect(() => {
    fetchTours();
  }, []);








  // Task 2
  // Get unique destinations for the dropdown
  const getUniqueDestinations = () => {
    const destinations = new Set(tours.map((tour) => tour.name));
    return ["All", ...Array.from(destinations)];
  };




  // Filter tours based on the selected destination
  const filteredTours =
    selectedDestination === "All"
      ? tours
      : tours.filter((tour) => tour.name === selectedDestination);




  // Conditional rendering for loading, error, and empty states
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
      {/* Dropdown Selector */}
      <div className="filter">
        <label htmlFor="destination">Filter by Destination: </label>
        <select
          id="destination"
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
        >
          {getUniqueDestinations().map((destination) => (
            <option key={destination} value={destination}>
              {destination}
            </option>
          ))}
        </select>
      </div>




      {/* Render Tours */}
      {filteredTours.map((tour) => (
        <TourCard key={tour.id} {...tour} onRemove={onRemove} />
      ))}
    </section>
  );
};




export default Gallery;








