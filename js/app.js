App = (function(ItemController, UIController ) {
  // Load event listeners
  const loadEventListeners = function() {
    // Load UI selectors
    const UISelectors = UIController.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    e.preventDefault();

    const input = UIController.getItemInput();

    // Make sure the form is filled out
    if (input.name !== '' && input.calories !== '') {
      // Create new item
      const item = new ItemController.createItem(
        input.name,
        input.calories
      );

      // Add to data.items
      ItemController.addItem(item);

      // Add to #item-list
      UIController.addListItem(item);

      // Update calorie count
      updateCalories();
    }
  };

  // Update calorie count
  const updateCalories = function() {
    // Get new calorie count
    let cals = ItemController.getTotalCalories();

    // Update total in UI
    UIController.showTotalCalories(cals);
  };

  // Expose public methods & properties
  return {
    // Initialize App
    init: function() {
      // Get items from data structure
       const items = ItemController.getItems();

      // Check if there are any items, if not then hide list element
      if (items.length === 0) {
        UIController.hideItemsList();
      } else {
        // Make sure list is visible
        UIController.showItemsList();
        // Populate list with items
        UIController.populateItemsList();
      }

      // Set total calorie count
      updateCalories();

      // Load event listeners
      loadEventListeners();
    }
  }
})(ItemController, UIController);

App.init();