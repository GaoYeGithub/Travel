import React, { useState, useEffect } from "react";
import axios from "axios";
import './TravelData.css';

export default function TravelData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    return (
        <div className="cards-list">
            {data.map((item) => (
                <div key={item._id.$oid} className="card">
                    {item.openSpots === 0 && (
                        <div className="card--badge">SOLD OUT</div>
                    )}
                    <img src={item.coverImg} alt={item.title} className="card--image" />
                    <div className="card--title">{item.title}</div>
                    <div className="card--stats">
                        <img src="star-icon.png" alt="star" className="card--star" />
                        <span>{item.stats?.rating}</span>
                        <span className="gray">({item.stats?.reviewCount}) • </span>
                        <span className="gray">{item.location}</span>
                    </div>
                    <p className="card--price"><strong>From ${item.price}</strong> / person</p>
                    <p>{item.text}</p>
                </div>
            ))}
        </div>
    );
}
