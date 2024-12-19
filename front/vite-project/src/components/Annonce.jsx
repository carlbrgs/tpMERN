import React, { useEffect, useState } from "react";
import axios from "axios";

const Annonce = () => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await axios.get("http://localhost:3000/annonce/get", {
          withCredentials: true,
        });
        setAnnonces(response.data);
      } catch (err) {
        console.error("Error fetching annonces:", err);
      }
    };

    fetchAnnonces();
  }, []);

  return (
    <div>
      <h1 className="text-center">Annonces</h1>
      <ul className="list-group">
        {annonces.map((annonce) => (
          <li className="list-group-item" key={annonce._id}>
            <h2>{annonce.title}</h2>
            <img src={annonce.image} alt={annonce.title} className="img-fluid" />
            <p>{annonce.description}</p>
            <p><strong>Category:</strong> {annonce.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Annonce;