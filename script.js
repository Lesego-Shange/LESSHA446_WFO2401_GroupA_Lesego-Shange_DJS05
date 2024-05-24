document.addEventListener("DOMContentLoaded", (event) => {
  const tallyDisplay = document.getElementById("tally-display");
  const incrementBtn = document.getElementById("increment-btn");
  const decrementBtn = document.getElementById("decrement-btn");
  const resetBtn = document.getElementById("reset-btn");

  function updateDisplay() {
    const state = store.getState();
    tallyDisplay.textContent = state.count;
  }

  incrementBtn.addEventListener("click", () => {
    store.dispatch({ type: "ADD" });
  });

  decrementBtn.addEventListener("click", () => {
    store.dispatch({ type: "SUBTRACT" });
  });

  resetBtn.addEventListener("click", () => {
    store.dispatch({ type: "RESET" });
  });

  // Subscribe to state changes
  store.subscribe(updateDisplay);

  // Initialize the display
  updateDisplay();
});
