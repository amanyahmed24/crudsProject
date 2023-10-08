//define all variables
// *********
let title = document.getElementById("title");
let price= document.getElementById('price');
let taxes= document.getElementById("taxes");
let discount= document.getElementById("discount");
let ads= document.getElementById("ads");
let total= document.getElementById("total");
let amount= document.getElementById("amount");
let category= document.getElementById("category");
let submit = document.getElementById("create");
//mood flag
let mood = "create" ;

//search flag
let searchMood;
//temp array to hold data
let temp;

//array that hold all products
let products ;
// *********
//end of variables

// get total price

function getTotal (){
    if(price.value != ""){
        if(! discount.value.includes("%")){
            let result = +price.value + +taxes.value + +ads.value - +discount.value;
            total.innerHTML= result ;
        }else{
            let discValue=((+price.value + +taxes.value + +ads.value)* parseFloat(discount.value)) /100
            let result = (+price.value + +taxes.value + +ads.value)- discValue;
            total.innerHTML = result;
        }
    }
};

// create new product
//check if there is items in local storage
if(localStorage.product != null){
    products=JSON.parse(localStorage.product);
}else{
    products=[];
}
//handling submit event
submit.onclick = function(){
    let newPro = {
        title : title.value,
        price : price.value ,
        taxes : taxes.value ,
        discount : discount.value,
        ads : ads.value ,
        total : total.innerHTML,
        amount : amount.value ,
        category : category.value
    }
    //if there is no actual data
    if(title.value!="" && price.value!=""){
        if(mood === "create"){

            //handling amount method
            if(newPro.amount > 1){
                for(let j = 0 ; j<newPro.amount; j++) {
                    products.push(newPro);
                }
            }else{
                //only one product added
                products.push(newPro);
            }
        }else{
            products[temp] = newPro ;
            mood = "create";
            submit.innerHTML = "create";
            amount.style.display = "block";
        }
        //save in local storage
        localStorage.setItem("product" , JSON.stringify(products));
        clearInputs();
        showData();
    }
}

//clear inputs after adding
function clearInputs(){
    title.value =""
    price.value ="";
    taxes.value ="";
    discount.value ="";
    ads.value ="";
    total.innerHTML ="";
    amount.value ="";
    category.value =""
};

// read products to show
function showData(){
    let table = "";
    
    for(let i=0 ; i<products.length ; i++){
        table += `<tr>
            <td>${i+1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td> <button onclick=updataDate(${i}) id="update">update</button></td>
            <td> <button onclick=deleteProduct(${i}) id="delete">delete</button></td>
        </tr>`
    }
    let tbody = document.getElementById("tbody");
    //fill table data
    tbody.innerHTML = table;
    let deleteAll = document.getElementById("delete-all");
    if(products.length>0){
        deleteAll.innerHTML = `<button onclick=deletAll() id="all">Delet All (${products.length})</button> `
    }else{
        //hide delete all button if there is no products
        deleteAll.innerHTML = ""
    }

};
//fire the function
showData();

// delete handling
function deleteProduct(i){
    products.splice(i,1);
    localStorage.product = JSON.stringify(products);
    //show new data after deleting
    showData();
};

//delete all handling
function deletAll(){
    products.splice(0);
    //delete all in local storage
    localStorage.clear();
    showData()
};

//update handling
function updataDate (i){

    //get old data
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    amount.style.display = "none";
    submit.innerHTML = "Update";
    temp = i ;

    //change mood flag
    mood="update";
    //scroll top to the product
    scroll({
        top:0 ,
        behavior : "smooth"
    })
    getTotal()
};

// search handling

function searchbyMood (id){
    let searchIcon = document.getElementById("search");
    if(id=="search-title"){
        searchMood="title";
    }else{
        searchMood="category";
    }    
    searchIcon.value="";
};  
function searchProduct(value){
    let table ;
    if(searchMood==="title"){
        //search by title
        for(let i = 0 ; i<products.length; i++){
            //filter data to match title
            if(products[i].title.includes(value)){
                table += `<tr>
                <td>${i}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td> <button onclick=updataDate(${i}) id="update">update</button></td>
                <td> <button onclick=deleteProduct(${i}) id="delete">delete</button></td>
                </tr>`
                
            }
        }
        //search by category
    }else{
        for(let i = 0 ; i<products.length; i++){
            if(products[i].category.includes(value)){
                table += `<tr>
                <td>${i}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td> <button onclick=updataDate(${i}) id="update">update</button></td>
                <td> <button onclick=deleteProduct(${i}) id="delete">delete</button></td>
                </tr>`
            
            }
        }
    }
    //fill table data
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = table;
};

// light mood 

 function lightMood(){
        document.body.style.cssText="background-color:white; color:#222";
        //get all inputs to change style
        let inputs = document.querySelectorAll("input");
        for(let i = 0; i<inputs.length; i++){
         inputs[i].style.cssText="background: rgb(68 68 68 / 21%);; color: #111;"
        }
        total.style.backgroundColor="#e17575"
        document.getElementById("sun").style.display="block"
        document.getElementById("moon").style.display="none"
 };

 //dark mood 

function darkMood(){
    document.body.style.cssText=" background-color: #222;color: #fff;"
    let inputs = document.querySelectorAll("input");
        for(let i = 0; i<inputs.length; i++){
         inputs[i].style.cssText=" background: #111; color: #fff;"
        }
        document.getElementById("sun").style.display="none"
        document.getElementById("moon").style.display="block"
        total.style.background="#a00d02"

}
