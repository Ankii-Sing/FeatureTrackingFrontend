import axios from "axios";

export const fetchPullRequests = async (featureId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/api/public/pullrequest/${featureId}`, {
        headers: { Authorization: `${token}` },
      });
  
      return response.data.map((pr) => ({
        pullRequestId: pr.pullrequest_id,
        link: pr.link,
        prstatus: pr.prStatus,
      }));
    } catch (error) {
      console.error("Error fetching PRs:", error);
      return [];
    }
  };

export const updatePrStatus = (pullRequestId, status, fetchPullRequests, role) => {

    if(role  && role !== "ADMIN" && role !== "EPIC_OWNER" && role !== "DEVELOPER") {
        alert("You are not authorized to update PR status.");
        return;
    }

    const token = sessionStorage.getItem("token"); // Get auth token
    const payload = {
        pullRequestId: pullRequestId,
        prStatus: status,
    };

    axios
        .post("http://localhost:8080/api/public/pullrequest/update-status", payload, {
            headers: { Authorization: `${token}` },
        })
        .then(() => {
            alert(`Pull Request ${pullRequestId} ${status ? "approved" : "declined"} successfully!`);
            
            // Refresh PR list after status update
            if (fetchPullRequests) fetchPullRequests();
        })
        .catch((error) => {
            console.error("Error updating PR status:", error);
            alert("Failed to update PR status.");
        });
};