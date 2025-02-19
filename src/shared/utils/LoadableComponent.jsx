import Loadable from 'react-loadable';

// Loader component (shows while loading)
const Loading = () => <div>Loading...</div>;

// Function to create lazy-loaded components
const LoadableComponent = (loader) =>
  Loadable({
    loader,
    loading: Loading,
  });

export default LoadableComponent;
