const ItemController = (function() {
  // Item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
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

    const countCalories = function() {
      data.totalCalories = 0;
      data.items.forEach(item => data.totalCalories += item.calories);
    };

  return {
    getItems: function() {
      return data.items;
    },

    getData: function() {
      return data;
    },

    getTotalCalories: function() {
      return data.totalCalories;
    },

    createItem: function(name, calories) {
      return new Item(data.items.length, name, parseInt(calories));
    },

    addItem: function(item) {
      data.items.push(item);
      countCalories();
    }

  };
})();