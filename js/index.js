
let rowData = document.getElementById('rowData')

let RowInputs = document.getElementById('RowInputs')

$(document).ready(()=>{
    searchByName().then(()=>{
        $('.loading').fadeOut(500)
        $('.loadingin').fadeOut(500)
        $('body').css('overflow','visible')
        
    })
   
})

function openSideNav(){
    $(".side-nav-menu").animate({left:0},500)

    $(".open-close-icon").removeClass('fa-align-justify')
    $(".open-close-icon").addClass('fa-x')
   
    $('.links li').eq(0).animate({top:0},500)
    $('.links li').eq(1).animate({top:0},600)
    $('.links li').eq(2).animate({top:0},700)
    $('.links li').eq(3).animate({top:0},800)
    $('.links li').eq(4).animate({top:0},900)
}

function closeSideNav(){
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu").animate({left:-boxWidth},500)
    $(".open-close-icon").removeClass('fa-x')
    $(".open-close-icon").addClass('fa-align-justify')
    $('.links li').animate({top:300},500)
}

closeSideNav()

$(".side-nav-menu i.open-close-icon").click(()=>{
   
    
    if($(".side-nav-menu").css("left")== "0px"){
        closeSideNav()
    }else{
            openSideNav()
    }
    
    
})



async function searchByName() {
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let res = await response.json()
    console.log(res.meals);
    displayMeals(res.meals)
    
}





function displayMeals(meals){
   
    let cartona = '' 
    for (let index = 0; index < meals.length; index++) {
        
        cartona += `
        
        
           <div class="col-md-3" onclick='Details(${meals[index].idMeal})'>
                <div class="meal position-relative overflow-hidden rounded-2">
                    <img class="w-100" src="${meals[index].strMealThumb}" alt="meal">

                    <div class=" text-dark meal-layer position-absolute d-flex align-items-center">
                        <h3>${meals[index].strMeal}</h3>
                    </div>
                </div>
            </div>
        
        
        
        
        
        `
        
    }

    rowData.innerHTML = cartona
    

}


async function getCategories() {
    $('.loading').fadeIn(500)
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let res = await response.json()
    console.log(res.categories);
    DisplayCategories(res.categories)
    $('.loading').fadeOut(500)
   
    
}



async function getCategoriesMeals(category) {
    $('.loading').fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let res = await response.json()
    displayMeals(res.meals)
    $('.loading').fadeOut(500)
    
}


function DisplayCategories(categories){
    let cartona = ''
     for (let index = 0; index < categories.length; index++) {
       cartona += `
       
       
        
        <div class="col-md-3" onclick="getCategoriesMeals('${categories[index].strCategory}')">
                <div class="meal position-relative overflow-hidden rounded-2">
                    <img  class="w-100" src="${categories[index].strCategoryThumb}" alt="meal">

                    <div class=" text-dark  meal-layer position-absolute d-flex flex-column justify-content-center align-items-center ">
                        <h3>${categories[index].strCategory}</h3>
                        <p class='mt-1 p-2'>${categories[index].strCategoryDescription.split(' ').slice(0,10).join(' ')}</p>
                    </div>
                </div>
            </div>
        
       
       
       `
        
     }


     rowData.innerHTML = cartona
     RowInputs.innerHTML=''
}





async function GetArea() {
    $('.loading').fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let res = await response.json()
    console.log(res.meals);
    DisplayArea(res.meals)
    $('.loading').fadeOut(500)
    
}

async function GetAreaMeals(area) {
    $('.loading').fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let res = await response.json()
    displayMeals(res.meals)
    $('.loading').fadeOut(500)
}



function DisplayArea(areas){
    let cartona = ''

    for (let index = 0; index < areas.length; index++) {
            cartona += `
            
            
            
        <div class="col-md-3 text-center" >
                <div onclick="GetAreaMeals('${areas[index].strArea}')" class="meal    overflow-hidden d-flex flex-column justify-content-center align-items-center rounded-2">
                    
                        <i class="fa-solid fa-house size"></i>
                   
                        <h3>${areas[index].strArea}</h3>
                        
                    
                </div>
            </div>
        
            
            `
    }


    rowData.innerHTML = cartona
    RowInputs.innerHTML=''
}






async function GetIngredients() {
    $('.loading').fadeIn(500)
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let res = await response.json()
    console.log(res.meals);
    DisplayIngredients(res.meals.slice(0,21))
    $('.loading').fadeOut(500)
    
}



async function GetIngredientsMeals(Ingredients) {
    $('.loading').fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
    let res = await response.json()
    displayMeals(res.meals)
    $('.loading').fadeOut(500)
}





function DisplayIngredients(ingredients){
    let cartona = ''

    for (let index = 0; index < ingredients.length; index++) {
            cartona += `
            
            
            
        <div class="col-md-3">
                <div onclick="GetIngredientsMeals('${ingredients[index].strIngredient}')" class="meal   overflow-hidden d-flex flex-column justify-content-center align-items-center rounded-2">
                    
                        <i class="fa-solid fa-utensils size"></i>
                   
                        <h3>${ingredients[index].strIngredient}</h3>
                        <p class='mt-1 p-2'>${ingredients[index].strDescription.split(' ').slice(0,20).join(' ')}</p>
                        
                    
                </div>
            </div>
        
            
            `
    }


    rowData.innerHTML = cartona
    RowInputs.innerHTML=''
}





async function Details(id){
    $('.loading').fadeIn(500)
   let response = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
   let res = await response.json()
   console.log(res.meals);
   ShowDetails(res.meals[0])
   $('.loading').fadeOut(500)
   
    
}





// function ShowDetails(mealDetails){
//     let cartona = ``;
// فيها عنصر واحد بس لو كان فيها اكتر كانت هتشتغل كدا (array)دى مش شغاله بسبب ان ال 
//     // التكرار على عناصر المصفوفة mealDetails
//     for (let index = 0; index < mealDetails.length; index++) {
//         let li = '';

//         // بناء قائمة المكونات لكل عنصر في المصفوفة
//         for (let i = 1; i <= 20; i++) {
//             if(mealDetails[index][`strIngredient${i}`]){
//                 li += `<li class="alert alert-info p-1 m-2"> ${mealDetails[index][`strMeasure${i}`]} ${mealDetails[index][`strIngredient${i}`]}</li>`;
//             }
//         }

//         // بناء تفاصيل الوجبة وإضافة المكونات التي تم إنشاؤها
//         cartona += `
//             <div class="col-md-5 ps-5">
//                 <img class="w-100 rounded" src="${mealDetails[index].strMealThumb}" alt="">
//                 <h2 class="text-center">${mealDetails[index].strMeal}</h2>
//             </div>
//             <div class="col-md-7">
//                 <h2>Information</h2>
//                 <p>${mealDetails[index].strInstructions.split(' ').slice(0, 70).join(' ')}</p>
//                 <h3><span>Area:</span> ${mealDetails[index].strArea}</h3>
//                 <h3><span>Category:</span> ${mealDetails[index].strCategory}</h3>
//                 <h3>Recipes</h3>
//                 <ul class="list-unstyled d-flex g-3 flex-wrap">
//                     ${li} <!-- المكونات المجمعة من الحلقة الداخلية -->
//                 </ul>
//                 <h3>Tags</h3>
//                 <ul class="list-unstyled d-flex g-3 flex-wrap">
//                     <li class="alert alert-info p-1 m-2">${mealDetails[index].strIngredient6}</li>
//                     <li class="alert alert-info p-1 m-2">${mealDetails[index].strIngredient7}</li>
//                     <li class="alert alert-info p-1 m-2">${mealDetails[index].strIngredient8}</li>
//                     <li class="alert alert-info p-1 m-2">${mealDetails[index].strIngredient9}</li>
//                 </ul>
//                 <a href="${mealDetails[index].strSource}" role="button" class="btn btn-success">Source</a>
//                 <a href="${mealDetails[index].strYoutube}" role="button" class="btn btn-danger">YouTube</a>
//             </div>
//         `;
//     }

//     // تحديث الـ HTML في الـ DOM
//     rowData.innerHTML = cartona;
// }





function ShowDetails(mealDetails){
    let cartona = ``

                

    let li = ''


    for (let i = 1; i <= 20; i++) {
        if(mealDetails[`strIngredient${i}`] != ''){
            li += `<li class=" alert alert-info p-1 m-2"> ${mealDetails[`strMeasure${i}`]} ${mealDetails[`strIngredient${i}`]}</li>`
        }
        
    }

    let tags = mealDetails.strTags?.split(',')
   
    
    
    if(!tags) tags = []
    //هيخليها فاضيه  (undefiend او null) هنا عملت شرط وعلامه التعجب معناها لو هى 
    let setTag=''
    for (let index = 0; index < tags.length; index++) {
        
        setTag += ` <li class=" alert alert-info p-1 m-2">${tags[index]}</li>`
        
    }
       
            

         
          cartona += `
          
            
          
            <div class="col-md-5 ps-5">
                <img class="w-100 rounded" src="${mealDetails.strMealThumb}" alt="">
                <h2 class="text-center">${mealDetails.strMeal}</h2>
            </div>
            <div class="col-md-7">
                <h2>information</h2>
                <p>${mealDetails.strInstructions.split(' ').slice(0,70).join(' ')}</p>
                <h3><span>area :</span> ${mealDetails.strArea}</h3>
                <h3><span>category :</span> ${mealDetails.strCategory}</h3>
                <h3>Recipes</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap ">
                   ${li}
                    
                </ul>
                <h3>tags</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap ">
                   ${setTag}
                 
                    
                    
                </ul>
                <a href="${mealDetails.strSource}" target="_blank" role="button" class="btn btn-success">source</a>
                <a href="${mealDetails.strYoutube}" target="_blank" role="button" class="btn btn-danger">youtube</a>
                
            </div>
          
          
          `
            
       


        rowData.innerHTML=cartona
        RowInputs.innerHTML = ''

}









 function search(){
    
    
  let cartona = ``

  cartona+=`
  
    
     <div   class="col-md-6">
         <label class='text-white'  for="searchName">SearchByName</label>
     <input oninput='searchName()' class="form-control bg-transparent text-white  "  id="searchName" placeholder="search by name" type="text">
     </div>
    <div  class="col-md-6">
     <label class='text-white'  for="searchLetter">SearchByFirstLetter</label>
     <input oninput='searchByLetter()' maxlength="1" class="form-control bg-transparent text-white" id="searchLetter"  placeholder="search by first letter" type="text"></div> 
  
  `


  RowInputs.innerHTML= cartona
  rowData.innerHTML = ''
  
}


async function searchName() {
    $('.loadingin').fadeIn(500)
    let data = document.getElementById('searchName').value
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`)
    let res = await response.json()
    displayMeals(res.meals)
    $('.loadingin').fadeOut(500)
    
    
    
    
    
    
    

    
    
    
    
}



async function searchByLetter() {
    $('.loadingin').fadeIn(500)
    let data = document.getElementById('searchLetter').value
    if (data=='') {
        data='k'
    }
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${data}`)
    let res = await response.json()
    console.log(res);
    
    displayMeals(res.meals)
    $('.loadingin').fadeOut(500)
    

}






function Contact(){
    RowInputs.innerHTML = ``
    rowData.innerHTML = `
    
 <div class="contact min-vh-100 d-flex justify-content-center align-items-center ">
                
                <div class="container w-75 text-center">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <input oninput='inputsValidation()' class="form-control" id='nameInput' placeholder="enter your name" type="text">
                            <div id="name" class=" alert alert-danger d-none w-100 mt-2">
                                name should not have any special char
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input oninput='inputsValidation()' class="form-control" id='emailInput' placeholder="enter your email" type="email">
                            <div id="email" class=" alert alert-danger d-none w-100 mt-2">
                                example@gamail.com
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input oninput='inputsValidation()' class="form-control" id='phoneInput' placeholder="enter your phone" type="number">
                            <div id='phone' class=" alert alert-danger d-none w-100 mt-2">
                                only egyptian numbers
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input oninput='inputsValidation()' class="form-control" id='ageInput' placeholder="enter your age" type="number">
                            <div id="age" class=" alert alert-danger d-none w-100 mt-2">
                                the age should be less than 80 and more than 19
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input oninput='inputsValidation()' class="form-control" id='passwordInput' placeholder="enter your password" type="password">
                            <div id="pass" class=" alert alert-danger d-none w-100 mt-2">
                               the password should be 7 numbers and 2 char
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input oninput='inputsValidation()' class="form-control" id='rePasswordInput' placeholder="RePassword" type="password">
                            <div id="repass" class=" alert alert-danger d-none w-100 mt-2">
                                the passwords are not matched
                            </div>
                        </div>
                    </div>
                    <button id='buttonOFF' disabled class="btn btn-outline-danger  px-2 mt-2">submit</button>
                </div>
            </div>
    
    
    `
    document.getElementById('nameInput').addEventListener('focus',function(){
        Name=true
    })
    document.getElementById('emailInput').addEventListener('focus',function(){
        email=true
    })
    document.getElementById('ageInput').addEventListener('focus',function(){
        age=true
    })
   document.getElementById('phoneInput').addEventListener('focus',function(){
        phone=true
    })
    document.getElementById('passwordInput').addEventListener('focus',function(){
        pass=true
    })
    document.getElementById('passwordInput').addEventListener('focus',function(){
        Repass=true
    })


}


let Name = false
let email = false
let phone = false
let age = false
let pass = false
let Repass = false






function inputsValidation(){
    if(Name){
        if(nameValid()){
            document.getElementById('name').classList.add('d-none')
        }else{
            document.getElementById('name').classList.remove('d-none')
        }
    }
  

    if(email){
        if(emailValid()){
            document.getElementById('email').classList.add('d-none')
        }else{
            document.getElementById('email').classList.remove('d-none')
        }
    }

  
    if(phone){
        if(phoneValid()){
            document.getElementById('phone').classList.add('d-none')
        }else{
            document.getElementById('phone').classList.remove('d-none')
        }
    
    }



   if(age){

    if(ageValid()){
        document.getElementById('age').classList.add('d-none')
    }else{
        document.getElementById('age').classList.remove('d-none')
    }
   }



   if(pass){
    if(PasswordValid()){
        document.getElementById('pass').classList.add('d-none')
    }else{
        document.getElementById('pass').classList.remove('d-none')
    }
   }



   if(Repass){
    if(rePasswordValid()){
        document.getElementById('repass').classList.add('d-none')
    }else{
        document.getElementById('repass').classList.remove('d-none')
    }
   }



   







    if(nameValid()&& emailValid()&& phoneValid()&& ageValid()&&   PasswordValid() && rePasswordValid()){
            document.getElementById('buttonOFF').removeAttribute('disabled')        
            console.log('done');
            
    }else{
        document.getElementById('buttonOFF').setAttribute('disabled',true)   
        console.log('no');
        
    }
 

 

 



 


}



function nameValid(){
  return (/^[a-zA-Z ]+$/.test(document.getElementById('nameInput').value)) 
}
function emailValid(){
  return  (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('emailInput').value)) 
}
function phoneValid(){
  return  (/^01(1|2|5)[0-9]{8}$/.test(document.getElementById('phoneInput').value)) 
}
function ageValid(){
  return (/^[2-7][0-9]$/.test(document.getElementById('ageInput').value))  
}
function PasswordValid(){
  return   (/^[0-9]{7}[a-zA-Z]{2}$/.test(document.getElementById('passwordInput').value)) 
}
function rePasswordValid(){
  return   document.getElementById('rePasswordInput').value == document.getElementById('passwordInput').value
}