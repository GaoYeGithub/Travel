import React, { useState, useEffect } from "react";
import './CSS/InfoList.css';

const InfoList = () => {
  const [infos, setInfos] = useState([]);
  const [newInfo, setNewInfo] = useState({
    title: "",
    description: "",
    wiki_like:"",
    price: "",
    coverImg: "",
    stats: { rating: "", reviewCount: "" },
    location: "",
    openSpots: ""
  });
  const [editingInfo, setEditingInfo] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setInfos(data))
      .catch((error) => console.error("Error fetching infos:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "rating" || name === "reviewCount") {
      setNewInfo({
        ...newInfo,
        stats: { ...newInfo.stats, [name]: value }
      });
    } else {
      setNewInfo({ ...newInfo, [name]: value });
    }
  };

  const handleDelete = (id) => {
    fetch(`/api/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => setInfos(infos.filter((info) => info._id.$oid !== id)))
      .catch((error) => console.error("Error deleting info:", error));
  };

  const handleEdit = (info) => {
    setEditingInfo(info);
    setNewInfo({
      title: info.title,
      description: info.description,
      wiki_link: info.wiki_link,
      price: info.price,
      coverImg: info.coverImg,
      stats: info.stats,
      location: info.location,
      openSpots: info.openSpots
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`/api/edit/${editingInfo._id.$oid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInfo),
    })
      .then((response) => response.json())
      .then((updatedInfo) => {
        setInfos(
          infos.map((info) =>
            info._id.$oid === updatedInfo._id.$oid ? updatedInfo : info
          )
        );
        setEditingInfo(null);
        setNewInfo({
          title: "",
          description: "",
          wiki_link:"",
          price: "",
          coverImg: "",
          stats: { rating: "", reviewCount: "" },
          location: "",
          openSpots: ""
        });
      })
      .catch((error) => console.error("Error updating info:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingInfo) {
      handleUpdate(e);
    } else {
      fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInfo),
      })
        .then((response) => response.json())
        .then((info) => setInfos([...infos, JSON.parse(info)]))
        .catch((error) => console.error("Error adding info:", error));
    }
  };

  return (
    <div className="App">
      <div className="info-list">
        <h1 className="info-list-title">Info List</h1>
        <form className="info-form" onSubmit={handleSubmit}>
          <input
            className="info-input"
            type="text"
            name="title"
            placeholder="Title"
            value={newInfo.title}
            onChange={handleInputChange}
            required
          />
          <input
            className="info-input"
            type="text"
            name="description"
            placeholder="Description"
            value={newInfo.description}
            onChange={handleInputChange}
            required
          />
          <input
            className="info-input"
            type="text"
            name="wiki_link"
            placeholder="Wiki Link"
            value={newInfo.wiki_link}
            onChange={handleInputChange}
            required
          />
          <input
            className="info-input"
            type="number"
            name="price"
            placeholder="Price"
            value={newInfo.price}
            onChange={handleInputChange}
            required
          />
          <input
            className="info-input"
            type="text"
            name="coverImg"
            placeholder="Cover Image URL"
            value={newInfo.coverImg}
            onChange={handleInputChange}
            required
          />
          <input
            className="info-input"
            type="number"
            name="rating"
            placeholder="Rating"
            value={newInfo.stats.rating}
            onChange={handleInputChange}
            required
          />
          <input
            className="info-input"
            type="number"
            name="reviewCount"
            placeholder="Review Count"
            value={newInfo.stats.reviewCount}
            onChange={handleInputChange}
            required
          />
          <input
            className="info-input"
            type="text"
            name="location"
            placeholder="Location"
            value={newInfo.location}
            onChange={handleInputChange}
            required
          />
          <input
            className="info-input"
            type="number"
            name="openSpots"
            placeholder="Open Spots"
            value={newInfo.openSpots}
            onChange={handleInputChange}
            required
          />
          <button className="info-button" type="submit">
            {editingInfo ? "Update Info" : "Add Info"}
          </button>
        </form>
        {infos.length > 0 ? (
          <ul className="info-items">
            {infos.map((info) => (
              <li key={info._id.$oid} className="info-item">
                <h3 className="info-item-title">{info.title}</h3>
                <p className="info-item-description">{info.description}</p>
                <p className="info-item-price">Price: {info.price}</p>
                <img className="info-item-image" src={info.coverImg} alt={info.title} />
                <p className="info-item-rating">Rating: {info.stats.rating}</p>
                <p className="info-item-reviewCount">Review Count: {info.stats.reviewCount}</p>
                <p className="info-item-location">Location: {info.location}</p>
                <p className="info-item-openSpots">Open Spots: {info.openSpots}</p>
                <p className="info-item-date">Date: {new Date(info.pub_date.$date).toLocaleString()}</p>
                <button className="info-item-button" onClick={() => handleEdit(info)}>Edit</button>
                <button className="info-item-button" onClick={() => handleDelete(info._id.$oid)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="placeholder">No infos available</p>
        )}
      </div>
    </div>
  );
};

export default InfoList;
