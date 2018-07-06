const UIController = (function() {
  
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemForm: '#item-form',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    editItem: '.edit-item',
    itemName: '#item-name',
    itemCalories: '#item-calories',
    totalCalories: '.total-calories'
  };
  // Clear add item form
  const clearAddForm = function() {
    document.querySelector(UISelectors.itemName).value = '';
    document.querySelector(UISelectors.itemCalories).value = '';
  };

  const focusNameField = function() {
    document.querySelector(UISelectors.itemName).focus();
  }

  
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

    hideItemsList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    
    showItemsList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'block';
    },

    addListItem: function(item) {
      // Make sure list is visible
      if (document.querySelector(UISelectors.itemList).style.display === 'none') {
        this.showItemsList();
      }

      // Create li and add necessary id + class
      const li = document.createElement('li');
      li.classList.add('collection-item');
      li.id = `item-${item.id}`;
      
      // Set inner content
      li.innerHTML = `
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      `;

      // Add to list
      document.querySelector(UISelectors.itemList).appendChild(li);

      // Clear add form and focus item-name for next item
      clearAddForm();
      focusNameField();
    },

    updateListItem: function(id, name, calories) {
      // Get the correct list item
      const listItem = document.querySelector(`#item-${id}`);
      
      // Update its content
      listItem.querySelector('strong').textContent = `${name}:`;
      listItem.querySelector('em').textContent = `${calories} Calories`;

      // Reset default add state
      this.setAddState();
    },

    removeListItem: function(id) {
      document.querySelector(`#item-${id}`).remove();
      this.showTotalCalories(ItemController.getTotalCalories());
      this.setAddState();
    },

    showTotalCalories: function(calories) {
      // Get total calories display element and update value
      document.querySelector(UISelectors.totalCalories).textContent = calories;
    },

    setAddState: function(e) {
      // Keep page from reloading on click
      if (e !== undefined) {
        e.preventDefault();
      }

      // Clear add form
      clearAddForm();

      // Hide update, delete, and back buttons and show add button
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline-block';
    },

    setEditState: function(e) {
      // Check if click is on edit button
      if (e.target.matches(UISelectors.editItem)) {
        e.preventDefault();

        // Clear add form
        clearAddForm();

        // Hide add button
        document.querySelector(UISelectors.addBtn).style.display = 'none';

        // Show edit state buttons
        document.querySelector(UISelectors.updateBtn).style.display = 'inline-block';
        document.querySelector(UISelectors.deleteBtn).style.display = 'inline-block';
        document.querySelector(UISelectors.backBtn).style.display = 'inline-block';

        // Get item properties from list-item and set as field values
        const li = e.target.parentElement.parentElement;
        const name = li.querySelector('strong').textContent;
        const cals = li.querySelector('em').textContent;
        document.querySelector(UISelectors.itemName).value = name.replace(':', '');
        document.querySelector(UISelectors.itemCalories).value = cals.split(' ')[0];

        // Get item ID and set as data attribute on form
        const id = parseInt(li.id.slice(li.id.indexOf('-') + 1));
        document.querySelector(UISelectors.itemForm).setAttribute('data-item-id', id);

        // Focus item-name field
        focusNameField();
      }
    }
  }
})();