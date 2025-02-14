import axios from "axios";

export const updatePrStatus = (pullRequestId, status, fetchPullRequests) => {
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