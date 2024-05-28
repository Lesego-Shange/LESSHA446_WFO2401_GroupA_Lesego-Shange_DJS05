// Function to create a store with a given reducer
function createStore(reducer) {
  // Variable to hold the state
  let state;
  // Array to hold all listeners (functions to call when state changes)
  let listeners = [];

  // Function to get the current state
  const getState = () => state;

  // Function to dispatch an action to the reducer
  const dispatch = (action) => {
    // Update the state by calling the reducer with the current state and the action
    state = reducer(state, action);
    // Call each listener function to notify about the state change
    listeners.forEach((listener) => listener());
  };

  // Function to add a listener that gets called on state changes
  const subscribe = (listener) => {
    // Add the listener to the list of listeners
    listeners.push(listener);
    // Return a function to unsubscribe (remove) the listener
    return () => {
      // Filter out the listener from the list
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // Initialize the state by dispatching a special action
  dispatch({ type: "@@INIT" });

  // Return an object with methods to get the state, dispatch actions, and subscribe to state changes
  return { getState, dispatch, subscribe };
}

// Define the initial state for the tally
const initialState = { count: 0 };

// Reducer function to handle different actions on the tally state
function tallyReducer(state = initialState, action) {
  // Determine how to update the state based on the action type
  switch (action.type) {
    // Increment the count
    case "ADD":
      return { ...state, count: state.count + 1 };
    // Decrement the count
    case "SUBTRACT":
      return { ...state, count: state.count - 1 };
    // Reset the count to 0
    case "RESET":
      return { ...state, count: 0 };
    // Return the current state if the action type is not recognized
    default:
      return state;
  }
}

// Create the store
const store = createStore(tallyReducer);

// Subscribe to state changes
store.subscribe(() => console.log("State:", store.getState()));
