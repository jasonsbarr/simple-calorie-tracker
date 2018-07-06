const UIController = (function() {
  
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemName: '#item-name',
    itemCalories: '#item-calories'
  };

  
  return {
    // Get UI Selectors
    getSelectors: function() {
      return UISelectors;
    },
    
    // Get input from Add Item form
    getItemInput: function() {
      const input = {
        name: document.querySelector(UISelectors.itemName).value,
        calories: document.querySelector(UISelectors.itemCalories).value
      };
      
      return input;
    },
    
    // Clear add item form
    clearAddForm: function() {
      document.querySelector(UISelectors.itemName).value = '';
      document.querySelector(UISelectors.itemName).focus();
      document.querySelector(UISelectors.itemCalories).value = '';
    },

    // Populate list of items
    populateItemsList: function(items) {
      let html = '';

      items.forEach(item => {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
        </li>
        `;
      });

      // Insert list items
      this.clearItemsList();
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    clearItemsList: function() {
      document.querySelector(UISelectors.itemList).innerHTML = '';
    },

    addListItem: function(item) {
      const li = document.createElement('li');
      li.classList.add('collection-item');
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      `;

      document.querySelector(UISelectors.itemList).appendChild(li);
      this.clearAddForm();
    }
  }
})();