function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // Initialize the state
  dispatch({ type: "@@INIT" });

  return { getState, dispatch, subscribe };
}

const initialState = { count: 0 };

function tallyReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, count: state.count + 1 };
    case "SUBTRACT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
}

// Create the store
const store = createStore(tallyReducer);

// Subscribe to state changes
store.subscribe(() => console.log("State:", store.getState()));

// Scenario 1: Initial State Verification
console.log("Initial state:", store.getState()); // should show { count: 0 }

// Scenario 2: Incrementing the Counter
store.dispatch({ type: "ADD" }); // should show { count: 1 }
store.dispatch({ type: "ADD" }); // should show { count: 2 }

// Scenario 3: Decrementing the Counter
store.dispatch({ type: "SUBTRACT" }); // should show { count: 1 }

// Scenario 4: Resetting the Counter
store.dispatch({ type: "RESET" }); // should show { count: 0 }
