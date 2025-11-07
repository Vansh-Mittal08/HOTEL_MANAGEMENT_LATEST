import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Roominfo.css";

const RoomInfo = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    size: "",
    capacity: "",
    bedType: "",
    category: "luxury",
    warning: "",
    images: [""], // Array of image URLs
    pricing: [{ type: "", details: [""], memberPrice: "", standardPrice: "" }],
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  const handleAddRoom = async () => {
    try {
      await axios.post("http://localhost:5000/api/rooms", newRoom);
      setShowForm(false);
      fetchRooms();
    } catch (err) {
      console.error("Error adding room:", err);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${roomId}`);
      fetchRooms();
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...newRoom.images];
    updatedImages[index] = value;
    setNewRoom({ ...newRoom, images: updatedImages });
  };

  const handleAddImageField = () => {
    setNewRoom({ ...newRoom, images: [...newRoom.images, ""] });
  };

  const handlePricingChange = (index, field, value) => {
    const updatedPricing = [...newRoom.pricing];
    updatedPricing[index][field] = value;
    setNewRoom({ ...newRoom, pricing: updatedPricing });
  };

  const handleAddPricingField = () => {
    setNewRoom({
      ...newRoom,
      pricing: [...newRoom.pricing, { type: "", details: [""], memberPrice: "", standardPrice: "" }],
    });
  };

  return (
    <div className="room-info">
        <div className="room-header">
      <h2>Room Info</h2>
      <button onClick={() => setShowForm(true)} className="add-room-btn">
      ➕ Add Room
      </button>
      </div>

      
      <div className={`slide-panel ${showForm ? "open" : ""}`}>
      <button className="close-btn" onClick={() => setShowForm(false)}>
          ✖
        </button>
        <div className="room-form">
          <input
            type="text"
            placeholder="Room Name"
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Size"
            onChange={(e) => setNewRoom({ ...newRoom, size: e.target.value })}
          />
          <input
            type="text"
            placeholder="Capacity"
            onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
          />
          <input
            type="text"
            placeholder="Bed Type"
            onChange={(e) => setNewRoom({ ...newRoom, bedType: e.target.value })}
          />
          <input
            type="text"
            placeholder="Warning Message"
            onChange={(e) => setNewRoom({ ...newRoom, warning: e.target.value })}
          />
          <select onChange={(e) => setNewRoom({ ...newRoom, category: e.target.value })}>
            <option value="luxury">Luxury</option>
            <option value="deluxe">Deluxe</option>
            <option value="economy">Economy</option>
          </select>

          {/* Image URL Input (Multiple Images) */}
          <div>
            <h4>Room Images</h4>
            {newRoom.images.map((image, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Image URL ${index + 1}`}
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
            ))}
            <button onClick={handleAddImageField}>Add Image</button>
          </div>

          {/* Pricing Information */}
          <div>
            <h4>Pricing</h4>
            {newRoom.pricing.map((price, index) => (
              <div key={index} className="pricing-group">
                <input
                  type="text"
                  placeholder="Pricing Type"
                  value={price.type}
                  onChange={(e) => handlePricingChange(index, "type", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Member Price"
                  value={price.memberPrice}
                  onChange={(e) => handlePricingChange(index, "memberPrice", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Standard Price"
                  value={price.standardPrice}
                  onChange={(e) => handlePricingChange(index, "standardPrice", e.target.value)}
                />
                <textarea
                  placeholder="Details (comma-separated)"
                  value={price.details.join(", ")}
                  onChange={(e) => handlePricingChange(index, "details", e.target.value.split(", "))}
                />
              </div>
            ))}
            <button onClick={handleAddPricingField}>Add Pricing Option</button>
          </div>

          <button onClick={handleAddRoom}>Submit</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
        </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Room Type</th>
            <th>Size</th>
            <th>Capacity</th>
            <th>Bed Type</th>
            <th>Category</th>
            <th>Pricing</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={room._id}>
              <td>{index + 1}</td>
              <td>{room.name}</td>
              <td>{room.size}</td>
              <td>{room.capacity}</td>
              <td>{room.bedType}</td>
              <td>{room.category}</td>
              <td>
                {room.pricing.map((price, i) => (
                  <div key={i}>
                    {/* <strong>{price.type}</strong> */}
                    <p>Member Price:  <strong>{price.memberPrice} </strong></p>
                    <p>Standard Price:  <strong>{price.standardPrice}</strong></p>
                    {/* <p>Details: {price.details.join(", ")}</p> */}
                  </div>
                ))}
              </td>
              <td>
                <button onClick={() => handleDeleteRoom(room._id)} className="delete-btn">
                  🗑️ 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomInfo;
