// Initialize the state object
let state = {
    mode: 'deploy' // default mode is 'deploy'
  };
  
  // Export functions to get and set the state
  module.exports = {
    getMode: () => state.mode,
    setMode: (newMode) => state.mode = newMode
  };