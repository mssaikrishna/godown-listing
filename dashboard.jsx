import React, { useEffect, useState } from "react";
// import { useProjectContext } from "../ProjectContext";
import "./dashboard.css";
import ledgerData from "../ledgerdata";
import NewGodownModal from "../godownModal/godownmodel";
import EditModal from "../editmodal/editmodal";
import { storeProjectsAndIssues, getProjectsAndIssues } from "../storageUtils";

export default function Dashboard() {
  const [ledger, setLedger] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editData, setEditData] = useState("");

  const [editedLedger, setEditedLedger] = useState({
    godownName: "",
    godownLocation: "",
    state: "",
    zipCode: "",
    godownIncharge: "",
    godownGstin: "",
    phone: "",
    email: "",
  });

  const storedLedgers = getProjectsAndIssues();

  useEffect(() => {
    storeProjectsAndIssues(ledgerData);
  }, []);

  useEffect(() => {
    // Load projects and issues from localStorage when the component mounts
    if (storedLedgers.length === 0) {
      setLedger(ledgerData);
    } else {
      setLedger(storedLedgers);
    }
  }, [ledgerData]);

  const generateUniqueId = () => {
    const timestamp = Date.now().toString(16);
    const random = Math.random().toString(16).substr(2, 6);
    return `${timestamp}-${random}`;
  };

  const handleCreate = (newGodownData) => {
    debugger;
    // Add the new godown data to the ledger
    const updatedLedger = [
      ...ledger,
      { godownId: generateUniqueId(), ...newGodownData },
    ];
    setLedger(updatedLedger);

    // Store the updated data in local storage
    storeProjectsAndIssues(updatedLedger);

    // Close the modal
    setShowModal(false);
  };


  const handleSave = () => {
    debugger;
    // Create a copy of the ledger data with the edited item
    const updatedLedger = ledger.map((dataItem) => {
      debugger;
      if (
        dataItem.datas.some((data) => data.godownId === editedLedger.godownId)
      ) {
        // Use map to update the specific item inside the array
        const updatedDatas = dataItem.datas.map((data) => {
          if (data.godownId === editedLedger.godownId) {
            return editedLedger; // Replace the item with editedData
          }
          return data; // Keep other items as they are
        });
        return { ...dataItem, datas: updatedDatas }; // Return the updated array
      }
      return dataItem; // Keep other dataItems as they are
    });

    // Update the ledger state with the edited data
    setLedger(updatedLedger);

    // Store the updated data in local storage
    storeProjectsAndIssues(updatedLedger);

    // Close the modal
    setShowEditModal(false);
  };


  const handleEdit = (e, godownId) => {
    e.preventDefault();
    setShowEditModal(true);

    const dataToEdit = ledger[0].datas.find(
      (entry) => entry.godownId === godownId
    );

    // Set the editData state variable with the data to be edited
    setEditedLedger(dataToEdit);
  };


  const handleClose = () => {
    debugger;
    setShowModal(false);
  };

  const handleEditModalClose = () => {
    debugger;
    setShowEditModal(false);
  };


  const handleDelete = (godownId) => {
    const confirmation = window.confirm("Are you sure you want to delete this item?");
  
    if (confirmation) {
      // User clicked OK in the confirmation dialog
  
      // Map through the datas and filter out the entry with the specified godownId
      const updatedLedger = ledger.map((entry) => {
        return {
          ...entry,
          datas: entry.datas.filter((data) => data.godownId !== godownId),
        };
      });
  
      // Update the ledger state
      setLedger(updatedLedger);
      alert("Deleted");
  
      // Store the updated data in local storage
      storeProjectsAndIssues(updatedLedger);
    } else {
      // User clicked Cancel in the confirmation dialog
      alert("Deletion canceled");
    }
  };
  

  const handleClear = () => {
    debugger;
    setSearchTerm("");
    setLedger(storedLedgers);
  };

  const handleSearch = () => {
    debugger;
    const filteredIssues = [];
    if (searchTerm == "") {
      setLedger(storedLedgers);
    } else {
      ledger.forEach((ledgers) => {
        debugger;
        const filteredIssuesInProject = ledgers.datas.filter((data) =>
          data.godownName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredIssuesInProject.length > 0) {
          filteredIssues.push({
            ...ledgers,
            datas: filteredIssuesInProject,
          });
        }
      });
      setLedger(filteredIssues);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="glowing-text">LEDGER</h1>
      <div className="row">
        <div className="d-flex justify-content-between align-items-center">
        <div className="search-bar d-flex align-items-center">
        <div className="input-group">
        <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by godown name..."
          />
        </div>
          <button className="btn btn-outline-primary m-2" onClick={handleSearch}><i className="fa fa-filter"></i></button>
          <button className="btn btn-outline-secondary" onClick={handleClear}><i class="fa fa-refresh"></i></button>
        </div>
        <button
            className="mb-2 text-right btn btn-outline-primary"
            onClick={() => {
              console.log("Button clicked");
              setShowModal(true);
            }}
          >
          <i className="fa fa-plus"></i>  Create New Godown
          </button>
          </div>
        <div className="container-fluid mt-5">
          {showModal && (
            <NewGodownModal
              showModal={showModal}
              setShowModal={setShowModal}
              onSave={handleCreate}
              onCancel={handleClose}
            />
          )}
          <table className="table table-bordered table-striped rounded">
            <thead className="thead-dark">
              <tr>
                <th>Godown ID</th>
                <th>Godown Name</th>
                <th>Godown Location</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Godown Incharge</th>
                <th>Godown GSTIN</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ledger[0]?.datas?.map((data) => (
                <tr key={data.godownId}>
                  <td>{data.godownId}</td>
                  <td>{data.godownName}</td>
                  <td>{data.godownLocation}</td>
                  <td>{data.state}</td>
                  <td>{data.zipCode}</td>
                  <td>{data.godownIncharge}</td>
                  <td>{data.godownGstin}</td>
                  <td>{data.phone}</td>
                  <td>{data.email}</td>
                  <td>
                    <div
                      className="btn btn-primary btn-sm mr-2"
                      onClick={(e) => handleEdit(e, data.godownId)}
                    >
                      <i className="fa fa-pencil"></i>
                    </div>
                    <a
                      className="btn btn-danger btn-sm m-2"
                      onClick={() => handleDelete(data.godownId)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showEditModal && (
            <EditModal
              data={editData}
              onClose={() => {
                setShowEditModal(false);
                // Clear the editData state when the modal is closed
                setEditData(null);
              }}
              showEditModal={showEditModal}
              setShowEditModal={setShowEditModal}
              onCancel={handleEditModalClose}
              setEditedLedger={setEditedLedger}
              editedLedger={editedLedger}
              handleSave={handleSave}
            />
          )}
        </div>
      </div>
    </div>
  );
}
