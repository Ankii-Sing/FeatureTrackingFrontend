import React, { Component } from "react";
import SearchBar from "../components/searchBar";
import UserContext from "../../../../store/userContext";
import FeatureTile from "../components/featureTile";
import FeatureContext from "../store/featureContext";
import { isAuthenticated } from "../../../../shared/utils/auth";
import { fetchFeaturesApi } from "../api";
import { useNavigate } from "react-router-dom";

class FeatureContainer extends Component {
  static contextType = FeatureContext;

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 5,
      features: [],
    };
  }

  componentDidMount() {
    isAuthenticated();
    this.loadFeatures();
  }

  loadFeatures = async () => {
    try {
      const features = await fetchFeaturesApi();
      this.setState({ features });
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleLogout = (setUser) => {
    setUser(null); // Clear user data from context
    localStorage.removeItem("token"); // Remove stored authentication token if used
    this.props.navigate("/login"); // Redirect to login page
  };

  render() {
    const { searchQuery, currentPage, itemsPerPage, features } = this.state;

    return (
      <UserContext.Consumer>
        {(userContext) => {
          const { user, setUser } = userContext;

          if (!user) {
            return <p>Loading user data...</p>;
          }

          const isAdminOrManager =
            user && ["ADMIN", "PRODUCT_MANAGER", "EPIC_OWNER"].includes(user.role);

            const filteredFeatures = isAdminOrManager
            ? features
            : features.filter((feature) => {
                if (user.role === "QA_ENGINEER") {
                  return feature.qaEngineer?.userId === user?.userId; // Filter by QA Engineer.
                }
                return feature.assignedTo?.userId === user?.userId; // filter for Developers.
              });

          const searchedFeatures = filteredFeatures.filter((feature) =>
            feature.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

          const indexOfLastFeature = currentPage * itemsPerPage;
          const indexOfFirstFeature = indexOfLastFeature - itemsPerPage;
          const currentFeatures = searchedFeatures.slice(indexOfFirstFeature, indexOfLastFeature);

          return (
            <div className="p-6 bg-gradient-to-br from-sky-50 to-teal-50 min-h-screen relative">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-lg text-teal-700 font-semibold">
                    {user ? `Welcome, ${user.username}` : "Not logged in"}
                  </div>
                  <button
                    className="p-2 px-4 bg-teal-600 text-white rounded-lg shadow-md 
                    hover:bg-teal-700 transition-all duration-300"
                    onClick={() => this.handleLogout(setUser)} 
                  >
                    Logout
                  </button>
                </div>

                
                <div className="mb-6">
                  <SearchBar onSearch={this.handleSearch} placeholder="Search features..." />
                </div>

                
                <h1 className="text-2xl font-bold text-teal-700 mb-6">Feature List</h1>

                
                <div className="space-y-4">
                  {currentFeatures.length > 0 ? (
                    currentFeatures.map((feature) => (
                      <FeatureTile key={feature.featureId} feature={feature} />
                    ))
                  ) : (
                    <p className="text-slate-500">No features available.</p>
                  )}
                </div>

              
                <div className="flex justify-center mt-8">
                  {[...Array(Math.ceil(searchedFeatures.length / itemsPerPage)).keys()].map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => this.paginate(number + 1)}
                        className={`mx-1 px-4 py-2 rounded-lg transition-colors ${
                          currentPage === number + 1
                            ? "bg-teal-600 text-white"
                            : "bg-blue-200 text-slate-700 hover:bg-blue-300"
                        }`}
                      >
                        {number + 1}
                      </button>
                    )
                  )}
                </div>

                
                {isAdminOrManager && (
                  <button
                    className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg 
                    hover:bg-teal-700 transition-transform transform hover:scale-105"
                    onClick={() => this.props.navigate("/AddFeature")}
                  >
                    + Add Feature
                  </button>
                )}
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

const FeatureContainerWithNavigation = (props) => {
  const navigate = useNavigate();
  return <FeatureContainer {...props} navigate={navigate} />;
};

export default FeatureContainerWithNavigation;
