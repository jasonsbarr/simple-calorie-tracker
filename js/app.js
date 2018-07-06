App = (function(ItemController, UIController ) {
  // Load UI selectors
  const UISelectors = UIController.getSelectors();

  // Load event listeners
  const loadEventListeners = function() {

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Change to edit item state
    document.querySelector(UISelectors.itemList).addEventListener('click', UIController.setEditState.bind(UIController));

    // Change to add item state without updating item
    document.querySelector(UISelectors.backBtn).addEventListener('click', UIController.setAddState.bind(UIController));

    // Update item
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
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

  const itemUpdateSubmit = function(e) {
    e.preventDefault();

    // Get item properties from form
    const id = parseInt(document.querySelector(UISelectors.itemForm).dataset.itemId);
    const name = document.querySelector(UISelectors.itemName).value;
    const cals = parseInt(document.querySelector(UISelectors.itemCalories).value);

    ItemController.updateItem(id, name, cals);
    ItemController.countCalories();

  }

  // Update calorie count
  const updateCalories = function() {
    // Get new calorie count and update total in UI
    UIController.showTotalCalories(ItemController.getTotalCalories());
  };

  // Expose public methods & properties
  return {
    // Initialize App
    init: function() {
      // Set initial add state
      UIController.setAddState();

      // Get items from data structure
       const items = ItemController.getItems();

      // Check if there are any items, if not then hide list element
      if (items.length === 0) {
        UIController.hideItemsList();
      } else {
        // Make sure list is visible
        UIController.showItemsList();
        // Populate list with items
        UIController.populateItemsList(items);
      }

      // Set total calorie count
      ItemController.countCalories();
      updateCalories();

      // Load event listeners
      loadEventListeners();
    }
  }
})(ItemController, UIController);

App.init();