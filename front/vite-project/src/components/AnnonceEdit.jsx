import React, { useState, useEffect } from "react";
import axios from "axios";

const EditAnnonce = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      };

      const token = getCookie("token");

      if (!token) {
        alert("You must be logged in to edit an annonce.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/user/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.data.authenticated) {
          alert("You must be logged in to edit an annonce.");
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("Authentication check failed:", err);
        alert("You must be logged in to edit an annonce.");
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/annonces/1", {
        title,
        image,
        description,
        category,
      }, { withCredentials: true });
      setMessage("Annonce updated successfully");
    } catch (err) {
      setMessage("Failed to update annonce");
      console.error("Error updating annonce:", err);
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "600px" }}>
      <div className="card-body">
        <h1 className="card-title text-center">Edit Annonce</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea
              className="form-control"
              placeholder="Enter the description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Category:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Save Changes</button>
          {message && <p className="text-success mt-3 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditAnnonce;