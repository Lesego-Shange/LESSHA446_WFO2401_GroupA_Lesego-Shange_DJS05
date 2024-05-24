document.addEventListener("DOMContentLoaded", (event) => {
  let count = 0;

  const tallyDisplay = document.getElementById("tally-display");
  const incrementBtn = document.getElementById("increment-btn");
  const decrementBtn = document.getElementById("decrement-btn");
  const resetBtn = document.getElementById("reset-btn");

  function updateDisplay() {
    tallyDisplay.textContent = count;
  }

  incrementBtn.addEventListener("click", () => {
    count++;
    updateDisplay();
  });

  decrementBtn.addEventListener("click", () => {
    count--;
    updateDisplay();
  });

  resetBtn.addEventListener("click", () => {
    count = 0;
    updateDisplay();
  });

  // Initialize the display
  updateDisplay();
});
