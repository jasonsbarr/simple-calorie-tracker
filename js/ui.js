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
      const listItems = document.querySelectorAll('.collection-item');

      listItems.forEach(item => item.remove());
      
      // Reset calorie count
      document.querySelector(UISelectors.totalCalories).textContent = '0';
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

    updateListItem: function(item) {
      // Get the correct list item
      const listItem = document.querySelector(`#item-${item.id}`);
      
      // Update its content
      listItem.querySelector('strong').textContent = `${item.name}:`;
      listItem.querySelector('em').textContent = `${item.calories} Calories`;

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

    setAddState: function() {
      // Clear add form
      clearAddForm();

      // Hide and disable update, delete, and back buttons
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';

      document.querySelector(UISelectors.updateBtn).disabled = true;
      document.querySelector(UISelectors.deleteBtn).disabled = true;
      document.querySelector(UISelectors.backBtn).disabled = true;

      // Show add button, enable, and set to submit
      document.querySelector(UISelectors.addBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.addBtn).removeAttribute('disabled');
      document.querySelector(UISelectors.addBtn).type = 'submit';

      // Focus add-name field
      document.querySelector(UISelectors.itemName).focus();
    },

    setEditState: function(li) {
      // Clear add form
      clearAddForm();

      // Hide and disable add button
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).type = 'button';
      document.querySelector(UISelectors.addBtn).disabled = true;

      // Show and enable edit state buttons, set updateBtn to submit
      document.querySelector(UISelectors.updateBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.backBtn).style.display = 'inline-block';

      document.querySelector(UISelectors.updateBtn).removeAttribute('disabled');
      document.querySelector(UISelectors.deleteBtn).removeAttribute('disabled');
      document.querySelector(UISelectors.backBtn).removeAttribute('disabled');

      document.querySelector(UISelectors.updateBtn).type = 'submit';

      // Get item properties from list-item and set as field values
      const name = li.querySelector('strong').textContent;
      const cals = li.querySelector('em').textContent;
      document.querySelector(UISelectors.itemName).value = name.replace(':', '');
      document.querySelector(UISelectors.itemCalories).value = cals.split(' ')[0];

      // Focus item-name field
      focusNameField();
    },

    getListItem: function(target) {
      return target.parentElement.parentElement;
    },
    
    getItemId: function(li) {
      return li.id.split('-')[1];
    }
  }
})();