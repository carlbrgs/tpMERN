import React, { useState, useEffect } from "react";
import axios from "axios";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const AnnonceEdit = ({ annonce, onSave, onClose }) => {
  const [title, setTitle] = useState(annonce.title);
  const [image, setImage] = useState(annonce.image);
  const [description, setDescription] = useState(annonce.description);
  const [category, setCategory] = useState(annonce.category);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  // useEffect pour récupérer le token au chargement
  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      setError("You are not authenticated. Please log in again.");
    } else {
      setToken(token);
    }
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const updatedAnnonce = {
        title,
        image,
        description,
        category,
      };

      if (!token) {
        setError("You are not authenticated. Please log in again.");
        setLoading(false);
        return;
      }

      await axios.put(
        `http://localhost:3000/annonce/update/${annonce._id}`,
        updatedAnnonce,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        }
      );

      onSave(updatedAnnonce); // Callback pour mettre à jour la liste
      onClose(); // Ferme le modal
    } catch (err) {
      setError("Failed to update the annonce. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Annonce</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnonceEdit;
