    //Data Structure
    const data = {
        items:[
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: ' Cookie', calories: 400},
            {id: 2, name: 'Eggs', calories: 300},
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            //{id: 1, name: ' Cookie', calories: 400},
            //{id: 2, name: 'Eggs', calories: 300},
        ],
        total: 0
    }
@@ -82,6 +82,28 @@ const UICtrl = (function(){
            name:document.querySelector(UISelectors.itemNameInput).value,
            calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){

        //create li element
            const li = document.createElement('li');
            //add class
            li.className = 'collection-item';
            //add ID
            li.id = `item-${item.id}`;
            //add HTML
            li.innerHTML = `<strong>${item.name}: </strong>
                <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a>`;
            //insert item
            console.log(item)
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        clearInput: function (){
        document.querySelector(UISelectors.itemNameInput).value = '';
        document.querySelector(UISelectors.itemCaloriesInput).value = '';
        }
    }
})();
@@ -102,7 +124,10 @@ const App = (function (ItemCtrl, UICtrl){
        //check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
           const newItem = ItemCtrl.addItem(input.name, input.calories)
            console.log(newItem)
            // clear item to UI items list
            UICtrl.addListItem(newItem)
            //clear fields
            UICtrl.clearInput();
        }
        console.log(input)
        event.preventDefault()
    
       // return new item
            return newItem
        },
        getTotalCalories: function(){
            let total = 0;
            //loop through items and add calories
            data.items.forEach(function(item){
                total = total + item.calories;
                console.log(total)
            });
            //set total calories in data structure
            data.total = total;
            console.log(data.total)
            //return total
            return data.total;
        },
        logData: function (){
            return data
        }
@@ -54,7 +67,8 @@ const UICtrl = (function(){
        itemList: '#item-list',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addBtn: '.add-btn'
        addBtn: '.add-btn',
        totalCalories: '.total-calories'
    }
    return {
    populateItemList: function(items){
@@ -104,6 +118,9 @@ const UICtrl = (function(){
        clearInput: function (){
        document.querySelector(UISelectors.itemNameInput).value = '';
        document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        showTotalCalories: function(totalCalories){
        document.querySelector(UISelectors.totalCalories).textContent =totalCalories;
        }
    }
})();
@@ -126,6 +143,10 @@ const App = (function (ItemCtrl, UICtrl){
           const newItem = ItemCtrl.addItem(input.name, input.calories)
            // clear item to UI items list
            UICtrl.addListItem(newItem)
            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            //clear fields
            UICtrl.clearInput();
        }
