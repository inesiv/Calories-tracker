   const data = {
        items:[
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 0, name: ' Cookie', calories: 400},
            {id: 0, name: 'Eggs', calories: 300},
            {id: 1, name: ' Cookie', calories: 400},
            {id: 2, name: 'Eggs', calories: 300},
        ],
        total: 0
    }
@@ -24,6 +24,23 @@ const ItemCtrl = (function (){
        getItems: function (){
            return data.items
        },
        addItem: function (name, calories){
            let ID
            //Create ID
            if (data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }
            // calories to number
            calories = parseInt(calories);
            //create new item
            newItem = new Item(ID, name, calories);
            //add to items array
            data.items.push(newItem);
            // return new item
            return newItem
        },
        logData: function (){
            return data
        }
@@ -32,6 +49,13 @@ const ItemCtrl = (function (){

//UI Controller
const UICtrl = (function(){
    //UI selectors
    const UISelectors = {
        itemList: '#item-list',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addBtn: '.add-btn'
    }
    return {
    populateItemList: function(items){
        //create html content
@@ -48,20 +72,50 @@ const UICtrl = (function(){
        })

        //insert list items
        document.querySelector("#item-list").innerHTML = html;
        document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function (){
        return UISelectors;
        },
        getItemInput: function (){
        return {
            name:document.querySelector(UISelectors.itemNameInput).value,
            calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        }
    }
})();

//App Controller
const App = (function (ItemCtrl, UICtrl){
    //Load event listeners
    const loadEventListeners = function(){
        //get UI selectors
        const UISelectors = UICtrl.getSelectors();
        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }
    //item add submit function
    const itemAddSubmit = function (event){
        //get form input from UI Controller
        const input = UICtrl.getItemInput()
        //check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
           const newItem = ItemCtrl.addItem(input.name, input.calories)
            console.log(newItem)
        }
        console.log(input)
        event.preventDefault()
    }
    return {
        init: function (){
            console.log('Initializing App')
            //fetch items from data structure
            const items = ItemCtrl.getItems()
            //populate items list
            UICtrl.populateItemList(items)
            //load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl)
