let title = document.getElementById("title");
let price= document.getElementById('price');
let taxes= document.getElementById("taxes");
let discount= document.getElementById("discount");
let ads= document.getElementById("ads");
let total= document.getElementById("total");
let amount= document.getElementById("amount");
let category= document.getElementById("category");
let submit = document.getElementById("create");

let mood = "create" ;
let searchMood;
let temp;
// get total

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

// create 
let products ;
if(localStorage.product != null){
    products=JSON.parse(localStorage.product)
}else{
    products=[];
}
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
    if(title.value!="" && price.value!=""){
        if(mood === "create"){
            if(newPro.amount > 1){
                for(let j = 0 ; j<newPro.amount; j++) {
                    products.push(newPro)
                }
            }else{
                products.push(newPro)
            }
        }else{
            products[temp] = newPro 
            mood = "create"
            submit.innerHTML = "create"
            amount.style.display = "block"
        }
        
        localStorage.setItem("product" , JSON.stringify(products));
        clearInputs();
        showData();
    }
}

//clear inputs 
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

// read products 
function showData(){
 let tbody = document.getElementById("tbody");
    let table ;
    for(let i=0 ; i<products.length ; i++){
        table += `<tr>
            <td>${i+1}</td>
            <td>title</td>
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
    tbody.innerHTML = table;
    let deleteAll = document.getElementById("delete-all");
    if(products.length>0){
        deleteAll.innerHTML = `<button onclick=deletAll() id="all">Delet All (${products.length})</button> `
    }else{
        deleteAll.innerHTML = ""
    }

};
showData();

// delete 
function deleteProduct(i){
    products.splice(i,1);
    localStorage.product = JSON.stringify(products);
    showData()
};

function deletAll(){
    products.splice(0)
    localStorage.clear()
    showData()
};

//update
function updataDate (i){
    title.value = products[i].title
    price.value = products[i].price
    taxes.value = products[i].taxes
    ads.value = products[i].ads
    amount.style.display = "none"
    submit.innerHTML = "Update"
    temp = i ;
    mood="update"
    scroll({
        top:0 ,
        behavior : "smooth"
    })
    getTotal()
};

// search

function searchbyMood (id){
    let searchIcon = document.getElementById("search");
    if(id=="search-title"){
        searchMood="title"
    }else{
        searchMood="category"
    }    
    searchIcon.value=""
};  
function searchProduct(value){
    let table ;
    if(searchMood==="title"){
        for(let i = 0 ; i<products.length; i++){
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
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = table;
};

// light mood 

 function lightMood(){
        document.body.style.cssText="background-color:white; color:#222"
        let inputs = document.querySelectorAll("input");
        for(let i = 0; i<inputs.length; i++){
         inputs[i].style.cssText="background: rgb(68 68 68 / 21%);; color: #111;"
        }
        total.style.backgroundColor="#e17575"
        document.getElementById("sun").style.display="block"
        document.getElementById("moon").style.display="none"
 };

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
