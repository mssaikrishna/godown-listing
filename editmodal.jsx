import React, { useState } from "react";

const EditModal = ({
  showEditModal,
  onClose,
  rowData,
  onSave,
  data,
  onCancel,
  setEditedLedger,
  setShowEditModal,
  editedLedger,
  handleSave
}) => {

 const closeModal = () =>{
    debugger
    setShowEditModal(false)
}
  console.log("datas", data);

  return (
    <div
      className={`modal ${showEditModal ? "show" : ""}`}
      style={{ display: showEditModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Godown</h5>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group input-group">
              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="godownName"
                  value={editedLedger.godownName}
                  onChange={(e) => {
                    debugger; // Add a debugger here
                    setEditedLedger({ ...editedLedger, godownName: e.target.value })
                  }}
                />
                </div>
                <div className="col-md-6 mb-2">

                <input
                  type="text"
                  className="form-control"
                  name="godownLocation"
                  value={editedLedger.godownLocation}
                  onChange={(e) => setEditedLedger({ ...editedLedger, godownLocation: e.target.value })}
                />
                </div>
                <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={editedLedger.state}
                  onChange={(e) => setEditedLedger({ ...editedLedger, state: e.target.value })}
                />
                </div>
                <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="zipCode"
                  value={editedLedger.zipCode}
                  onChange={(e) => setEditedLedger({ ...editedLedger, zipCode: e.target.value })}
                />
                </div>
                <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="godownIncharge"
                  value={editedLedger.godownIncharge}
                  onChange={(e) => setEditedLedger({ ...editedLedger, godownIncharge: e.target.value })}
                />
                </div>
                <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="godownGstin"
                  value={editedLedger.godownGstin}
                  onChange={(e) => setEditedLedger({ ...editedLedger, godownGstin: e.target.value })}
                />
                </div>
                <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={editedLedger.phone}
                  onChange={(e) => setEditedLedger({ ...editedLedger, phone: e.target.value })}
                />
                </div>
                <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={editedLedger.email}
                  onChange={(e) => setEditedLedger({ ...editedLedger, email: e.target.value })}
                />
                </div>
              </div>
              {/* Add similar input fields for other data */}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
