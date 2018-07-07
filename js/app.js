App = (function(ItemController, UIController ) {
  // Load UI selectors
  const UISelectors = UIController.getSelectors();

  // Load event listeners
  const loadEventListeners = function() {

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Change to edit item state
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEdit);

    // Change to add item state without updating item
    document.querySelector(UISelectors.backBtn).addEventListener('click', itemNoUpdate);

    // Update item
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Clear all items
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems)
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
        parseInt(input.calories)
      );

      // Add to data.items
      ItemController.addItem(item);

      // Add to #item-list
      UIController.addListItem(item);

      // Update calorie count
      updateCalories();
    }
  };

  const itemEdit = function(e) {
    e.preventDefault();

    if (e.target.matches(UISelectors.editItem)) {
      const li = UIController.getListItem(e.target);
      UIController.setEditState(li);
      ItemController.setCurrentItem(UIController.getItemId(li));
    }
  };

  const itemNoUpdate = function(e) {
    // Keep page from reloading on click
    e.preventDefault();

    UIController.setAddState();
  };

  const itemUpdateSubmit = function(e) {
    e.preventDefault();

    // Get current item id
    const id = ItemController.getCurrentItem();

    // Get item properties from form
    const input = UIController.getItemInput();

    // Create item
    const item = ItemController.getItem(id);
    
    // Update item properties
    item.name = input.name;
    item.calories = parseInt(input.calories);

    ItemController.updateItem(item);
    UIController.updateListItem(item);

    updateCalories();
  };

  const itemDeleteSubmit = function(e) {
    e.preventDefault();
    // Get current item
    const id = parseInt(ItemController.getCurrentItem());

    // Delete from data structure
    ItemController.deleteItem(id);

    // Remove from UI
    UIController.removeListItem(id);
  };

  const clearAllItems = function(e) {
    e.preventDefault();

    ItemController.deleteAllItems();
    UIController.clearItemsList();
  };

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