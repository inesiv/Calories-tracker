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

                                  //Storage Controller
//create later

const StorageCtrl = (function (){
    //public methods
    return{
        storeItem: function(item){
            let items;
            //check if any items in ls
            if(localStorage.getItem('items') === null){
                items = [];
                //push new item
                items.push(item)
                //set ls
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                //get what is already in ls
                items = JSON.parse(localStorage.getItem('items'));
                //push new item
                items.push(item);
                //reset ls
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function (){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        }
    }
})();
//Item Controller
const ItemCtrl = (function (){
    //Item Constructor
@@ -126,13 +157,15 @@ const UICtrl = (function(){
})();

//App Controller

const App = (function (ItemCtrl,StorageCtrl, UICtrl){
    //Load event listeners
    const loadEventListeners = function(){
        //get UI selectors
        const UISelectors = UICtrl.getSelectors();
        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        //add document reload event
        document.addEventListener('DOMContentLoaded', getItemsFromStorage)
    }
    //item add submit function
    const itemAddSubmit = function (event){
@@ -147,12 +180,29 @@ const App = (function (ItemCtrl, UICtrl){
            const totalCalories = ItemCtrl.getTotalCalories();
            //add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            //store in localStorage
            StorageCtrl.storeItem(newItem);
            //clear fields
            UICtrl.clearInput();
        }
        console.log(input)
        event.preventDefault()
    }
    //get items from storage
    const getItemsFromStorage = function(){
        //get items form storage
        const items = StorageCtrl.getItemsFromStorage()
        //set storage items to ItemCtrl data items
        items.forEach(function (item){
            ItemCtrl.addItem(item('name'), item('calories'))
        })
        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        //populate items list
        UICtrl.populateItemList(items)
    }
    return {
        init: function (){
            console.log('Initializing App')
@@ -164,7 +214,7 @@ const App = (function (ItemCtrl, UICtrl){
            loadEventListeners();
        }
    }

})(ItemCtrl, StorageCtrl, UICtrl)

//Initialize App
App.init() 
