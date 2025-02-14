import axios from "axios";

export const fetchDocumentsByFeatureId = async (featureId) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/api/public/doc/${featureId}`, {
            headers: { Authorization: `${token}` },
        });

        const documents = response.data;
        console.log("Fetched documents:", documents);

        // Group documents by documentType
        const documentMap = new Map();
        documents.forEach((doc) => {
            const type = doc.documentType;
            if (!documentMap.has(type)) {
                documentMap.set(type, []);
            }
            documentMap.get(type).push(doc);
        });

        console.log("Fetched and grouped documents:", documentMap);
        
        return documentMap;
    } catch (error) {
        console.error("Error fetching documents:", error);
        return new Map(); // Return empty map if error occurs
    }
};