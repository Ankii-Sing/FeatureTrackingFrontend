import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFeatureDetails, fetchDocumentsByFeatureId, submitApproval } from "../API/featureStatusApi";
import { fetchPullRequests, updatePrStatus } from "../API/prService";
import FeatureForm from "../component/FeatureForm";

const FeatureStatus = () => {
  const [feature, setFeature] = useState(null);
  const [documentMap, setDocumentMap] = useState(new Map());
  const [pullRequests, setPullRequests] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [prModalOpen, setPrModalOpen] = useState(false);
  const [prLink, setPrLink] = useState("");
  const navigate = useNavigate();

  const featureId = sessionStorage.getItem("FeatureId");
  const userJson = JSON.parse(sessionStorage.getItem("user"));
  const userId = userJson.userId;
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchFeatureDetails(featureId, token).then((data) => setFeature(data));
  
    useEffect(() => {
        fetchDocumentsByFeatureId(featureId).then((data) => {
          const mapData = new Map(Object.entries(data)); // ✅ Convert to Map
          setDocumentMap(mapData);
        });
      }, [featureId]);
      
  
    fetchPullRequests(featureId).then((data) => setPullRequests(data));
  }, [featureId, refreshKey]);

  const handleAddPR = async (prLink) => {
    if (!prLink.trim()) {
      alert("PR link cannot be empty!");
      return;
    }
  
    const token = sessionStorage.getItem("token");
    try {
      await axios.post(`http://localhost:8080/api/public/pullrequest/add/${featureId}`, 
        { link: prLink }, 
        { headers: { Authorization: `${token}` } }
      );
      alert("Pull Request added successfully!");
      setPrModalOpen(false);
      setPrLink("");
      fetchPullRequests(featureId).then((data) => setPullRequests(data)); // Refresh PR List
    } catch (error) {
      console.error("Error adding PR:", error);
      alert("Failed to add PR. Try again.");
    }
  };
  

  const handleApproval = async (stage, decision) => {
    const stageMapping = {
      "Product Go-Ahead": "PRODUCT_GO_AHEAD",
      "Epic Owner Go-Ahead": "EPIC_OWNER_GO_AHEAD",
    };
  
    if (!stageMapping[stage]) return;
  
    const token = sessionStorage.getItem("token");
    const isApproved = decision === "Approved";
  
    const payload = {
      featureId: featureId,
      stage: stageMapping[stage],
      status: isApproved,
      userId: userId,
    };
  
    try {
      await axios.post("http://localhost:8080/api/public/feature/approval", payload, {
        headers: { Authorization: `${token}` },
      });
      alert(`Feature ${featureId} ${stage} ${decision} successfully!`);
      fetchFeatureDetails(featureId, token).then((data) => setFeature(data));
    } catch (error) {
      console.error("Error updating approval status:", error);
      alert("Failed to update approval status.");
    }
  };
  

  return (
    <FeatureForm
      feature={feature}
      documentMap={documentMap}
      pullRequests={pullRequests}
      prModalOpen={prModalOpen}
      setPrModalOpen={setPrModalOpen}
      prLink={prLink}
      setPrLink={setPrLink}
      handleApproval={handleApproval}
      updatePrStatus={updatePrStatus}
      userJson={userJson}
      featureId={featureId}
      userId={userId}
      setRefreshKey={setRefreshKey}
    />
  );
};

export default FeatureStatus;
