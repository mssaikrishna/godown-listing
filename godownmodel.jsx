import React, { useState } from "react";

const NewGodownModal = ({ onSave, onCancel, showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    godownName: "",
    godownLocation: "",
    state: "",
    zipCode: "",
    godownGstin: "",
    godownIncharge: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    onSave(formData);
    setFormData({
      godownName: "",
      godownLocation: "",
      state: "",
      zipCode: "",
      godownGstin: "",
      godownIncharge: "",
      phone: "",
      email: "",
    });
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`modal ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Godown</h5>
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body row input-group">
            {/* Input fields for godown details */}
            {/* Example: */}
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="mb-2 form-control"
                name="godownName"
                value={formData.godownName}
                onChange={handleChange}
                placeholder="Godown Name"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="mb-2 form-control"
                name="godownLocation"
                value={formData.godownLocation}
                onChange={handleChange}
                placeholder="Godown Location"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="mb-2 form-control"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="state"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="mb-2 form-control"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Zipcode"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="mb-2 form-control"
                name="godownGstin"
                value={formData.godownGstin}
                onChange={handleChange}
                placeholder="GSTIN"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="mb-2 form-control"
                name="godownIncharge"
                value={formData.godownIncharge}
                onChange={handleChange}
                placeholder="Godown Incharge"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="mb-2 form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="phone"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="mb-2 form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            {/* Repeat for other fields */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGodownModal;
