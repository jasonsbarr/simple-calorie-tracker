const StorageController = (function() {

  // Store items in LocalStorage
  const storeItems = function(items) {
    localStorage.setItem('items', JSON.stringify(items));
  }
  
  return {
    // Get all items
    getAllItems: function() {
      return JSON.parse(localStorage.getItem('items'));
    },

    getItem: function(id) {
      const items = this.getAllItems();

      return items[id];
    },

    addItem: function(item) {
      const items = this.getAllItems() || [];

      items.push(item);

      storeItems(items);
    },

    updateItem: function(item) {
      const items = this.getAllItems();

      items[item.id] = item;

      storeItems(items);
    },

    deleteItem: function(id) {
      const items = this.getAllItems();

      items.splice(id, 1);

      storeItems(items);
    },

    deleteAllItems: function() {
      localStorage.clear('items');
    }

  };
})();