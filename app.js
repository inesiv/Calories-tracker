@@ -10,7 +10,7 @@ const ItemCtrl = (function (){
        this.calories = calories
    }

    //Data Struckture
    //Data Structure
    const data = {
        items:[
            {id: 0, name: 'Steak Dinner', calories: 1200},
@@ -21,22 +21,47 @@ const ItemCtrl = (function (){
    }

    return {
        getItems: function (){
            return data.items
        },
        logData: function (){
            return data
        }
    }
})();

//UI Controller
const UICtrl = (function (){
    console.log('UICtrl')
const UICtrl = (function(){
    return {
    populateItemList: function(items){
        //create html content
        let html = '';

        //parse data and create list items html
        items.forEach(function(item){
            html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
            <i class="fas fa-pencil-alt"></i>
        </a>
        </li>`;
        })

        //insert list items
        document.querySelector("#item-list").innerHTML = html;
        }
    }
})();

//App Controller
const App = (function (ItemCtrl, UICtrl){
    return {
        init: function (){
            console.log(ItemCtrl.logData())
            console.log('Initializing App')
            //fetch items from data structure
            const items = ItemCtrl.getItems()
            //populate items list
            UICtrl.populateItemList(items)
        }
    }
})(ItemCtrl, UICtrl)
