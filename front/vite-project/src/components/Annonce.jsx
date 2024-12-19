import React, { useEffect, useState } from "react";
import axios from "axios";
import AnnonceEdit from "./AnnonceEdit";

const Annonce = () => {
  const [annonces, setAnnonces] = useState([]);
  const [editingAnnonce, setEditingAnnonce] = useState(null);

  // Fonction pour récupérer toutes les annonces
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

  useEffect(() => {
    fetchAnnonces();
  }, []);

  // Fonction appelée après l'enregistrement d'une annonce mise à jour
  const handleSave = async (updatedAnnonce) => {
    try {
      // Mise à jour de l'annonce via l'API
      const response = await axios.put(
        `http://localhost:3000/annonce/update/${updatedAnnonce._id}`,
        updatedAnnonce,
        { withCredentials: true }
      );

      // Met à jour directement l'état local avec l'annonce mise à jour
      setAnnonces((prev) =>
        prev.map((annonce) =>
          annonce._id === updatedAnnonce._id ? response.data : annonce
        )
      );
      setEditingAnnonce(null); // Ferme le modal
    } catch (err) {
      console.error("Error updating annonce:", err);
    }
  };

  return (
    <div>
      <h1 className="text-center">Annonces</h1>
      <ul className="list-group">
        {annonces.map((annonce) => (
          <li className="list-group-item" key={annonce._id}>
            <h2>{annonce.title}</h2>
            <img src={annonce.image} alt={annonce.title} className="img-fluid" />
            <p>{annonce.description}</p>
            <p>
              <strong>Category:</strong> {annonce.category}
            </p>
            <button
              className="btn btn-primary mt-2"
              onClick={() => setEditingAnnonce(annonce)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      {editingAnnonce && (
        <AnnonceEdit
          annonce={editingAnnonce}
          onSave={handleSave} // Appelé après l'enregistrement
          onClose={() => setEditingAnnonce(null)} // Ferme le modal
        />
      )}
    </div>
  );
};

export default Annonce;
