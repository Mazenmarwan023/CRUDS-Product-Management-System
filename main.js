let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let create=document.getElementById('create')
let mode='create'
let tmp;
// get total

function getTotal(){
    if(price.value != ''){
        let result=(+price.value + +taxes.value + +ads.value - +discount.value)
        total.innerHTML=result
        total.style.backgroundColor='green'
    }else{
        total.style.backgroundColor='rgb(142, 4, 2)'
        total.innerHTML=''
    }
}


// create product
let data;

if(localStorage.product != null){
    data=JSON.parse(localStorage.product)
}else{
     data=[];
}

create.onclick=function(){
    let newProduct={
        title:title.value.toLowerCase(), 
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '' && count.value<=100){
        if(mode=='create'){
            // count
            if(count.value>1){
                for(let i=0;i<count.value;i++){
                    data.push(newProduct)
                }
            }else{
                data.push(newProduct)
            }
        }else{
                data[tmp]=newProduct
                mode='create'
                create.innerText='Create'
                count.style.display='block'
            }
    clearData()

    }
    // console.log(data)
    // save in localstorage
    localStorage.setItem('product', JSON.stringify(data))
    showData()
}

// clear data in inputs after create
let clearData=function(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    category.value=''
}

// show data in table

function showData(){
    getTotal()  // to make the total background returns red after create or delete
    var tablee=''
    for(let i=0;i<data.length;i++){
        tablee += `
                 <tr>
                    <td>${i+1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="update(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
                 </tr>`

    }
    document.getElementById('tbody').innerHTML=tablee
    let deleteA=document.getElementById('delete-all')
    if(data.length>0){           
        deleteA.innerHTML=`<button onclick="deleteAll()" id="delete-all-button">Delete all (${data.length})</button>`
    }else{
        deleteA.innerHTML=''
    }
}
showData()

// delete 

function deleteData(i){
    data.splice(i,1)
    localStorage.product=JSON.stringify(data)
    showData()
}

// delete all

function deleteAll(){
    data.splice(0,data.length)
    localStorage.product=JSON.stringify(data)
    showData()
}


// update 

function update(i){
    create.innerText='Update'
    title.value=data[i].title
    price.value=data[i].price
    ads.value=data[i].ads
    taxes.value=data[i].taxes
    discount.value=data[i].discount
    category.value=data[i].category
    getTotal()
    count.style.display='none'
    mode='update'
    tmp=i
    scroll({
        top:0,
        behavior:"smooth"
    })
}


// SEARCH
let searchMode='title'

function searchModee(id){
    let search=document.getElementById('search')
   if ( id=='search-title'){
        searchMode='title'
        search.placeholder='Search by title'
    
    }else{
        searchMode='category' 
        search.placeholder='Search by category'
    }
    search.focus()
    // if i click on search by title and write any title then i click on search by category i need to show the original data
    search.value=''
    showData()
    // console.log(searchMode)
}

function searchData(value){
    let table=''
    if(searchMode=='title'){
        for(let i=0;i<data.length;i++){
            if(data[i].title.includes(value.toLowerCase())){
                table += `
                 <tr>
                    <td>${i+1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="update(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
                 </tr>`
            }
        }
    }else{
        for(let i=0;i<data.length;i++){
            if(data[i].category.includes(value.toLowerCase())){
                table += `
                 <tr>
                    <td>${i+1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="update(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
                 </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML=table
}
