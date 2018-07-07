const ItemController = (function() {
  // Item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };
  
  const fetchItems = function() {
    data.items = StorageController.getAllItems();
  };
  // Data structure/state
  const data = {
    items: [
      // { id: 0, name: 'Steak Dinner', calories: '1000' },
      // { id: 1, name: 'Eggs', calories: '300' },
      // { id: 2, name: 'Cookie', calories: '400' }
    ],
    currentItem: null,
    totalCalories: 0
  };

  return {

    getItems: function() {
      fetchItems();
      return data.items;
    },

    getItem: function(id) {
      return data.items[id];
    },

    getData: function() {
      return data;
    },

    getTotalCalories: function() {
      return data.totalCalories;
    },

    getCurrentItem: function() {
      return data.currentItem;
    },

    countCalories: function() {
      let cals = 0;
      data.items.forEach(item => cals += parseInt(item.calories));

      data.totalCalories = cals;
    },

    setCurrentItem: function(id) {
      data.currentItem = parseInt(id);
    },

    createItem: function(name, calories) {
      return new Item(data.items.length, name, parseInt(calories));
    },
    
    addItem: function(item) {
      data.items.push(item);
      StorageController.addItem(item);
    },

    updateItem: function(item) {
      // Get item from data.items and set item properties
      data.items[item.id] = item;
      StorageController.updateItem(item);
    },

    deleteItem: function(id) {
      data.items.splice(id, 1);
      StorageController.deleteItem(id);
    },

    deleteAllItems: function() {
      data.items = [];
      StorageController.deleteAllItems();
    }
  };
})();