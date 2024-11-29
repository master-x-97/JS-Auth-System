root = document.getElementById('root')
let userContainer = []

function displayInputs(){
    let userNameInput = document.getElementById('userName')
    let userEmailInput = document.getElementById('userEmail')
    let userPasswordInput = document.getElementById('userPassword')
    addNewGuest(userNameInput , userEmailInput ,userPasswordInput)
}
function addNewGuest(userNameInput , userEmailInput ,userPasswordInput){
let validationName = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
 let validationPassword = /[a-zA-Z0-9._%+-]{6,20}/
if (!validationName.test(userEmailInput.value)  ) {
    msg = '<p class="text-danger text-center">Enter a true Email </p>';
    displayRegisterPage(msg);
    return; // لمنع استمرار تنفيذ الكود في حالة عدم صحة البريد الإلكتروني
}
if(!validationPassword.test(userPasswordInput.value)){
    msg = '<p class="text-danger text-center">password must be between 6 - 20 char </p>';
    displayRegisterPage(msg);
    return; // لمنع استمرار تنفيذ الكود في حالة عدم صحة البريد الإلكتروني
}
    let guest = {
        userName :userNameInput.value,
        userEmail :userEmailInput.value,
        userPassword :userPasswordInput.value,
    }

    if( userNameInput.value == '' || userEmailInput.value == ''|| userPasswordInput.value == ''){
        msg = '<p class="text-danger text-center">All inputs is required </p>'
        displayRegisterPage(msg)
        }else{
            if(localStorage.getItem('userAcc')){
                userContainer = JSON.parse(localStorage.getItem('userAcc'))
            }


        
        let userExsist = userContainer.some(user => user.userEmail === userEmailInput.value)
        if(userExsist){
            let msg = '<p class="text-danger text-center">This account already exists</p>';
            displayRegisterPage(msg);
        }else{
            userContainer.push(guest);
            localStorage.setItem('userAcc', JSON.stringify(userContainer));
            let msg = '<p class="text-success text-center">Register is successful</p>';
            displayRegisterPage(msg);
        }

    }
}


function displayRegisterPage(msg = ''){

    root.innerHTML = `<div class=" w-50 p-4  m-auto my-5   main-color main-boxshadow">
    <h1 class=" text-center text-color">Smart Login System</h1>
    <input id="userName" class="d-block py-1 my-3 m-auto w-50 bg-transparent main-shadow" type="text" placeholder="  Enter your name">
    <input id="userEmail" class="d-block py-1 my-3 m-auto w-50 bg-transparent main-shadow" type="text" placeholder="  email">
    <input id="userPassword" class="d-block py-1 my-3 m-auto w-50 bg-transparent main-shadow" type="password" placeholder="  password">
    ${msg}
    <br>
    <button onclick="displayInputs()"  class="m-auto w-50 d-block py-1 my-2 bg-transparent   btn-main" type="submit">Signup</button>
    
    <h5 class=" text-center my-3 text-white">Do you have an account ? <button onclick="displayLoginPage()" type="submit" class="bg-transparent border-0 text-white">Signin</button></h5>
</div>`


}



function displayLoginPage(msg = '') {
    
    root.innerHTML = `<div class=" w-50 p-4  m-auto my-5   main-color main-boxshadow">
    <h1 class=" text-center text-color">Smart Login System</h1>
    <input id="userEmail" class="d-block py-1 my-3 m-auto w-50 bg-transparent main-shadow" type="text" placeholder="  email">
    <input id="userPassword" class="d-block py-1 my-3 m-auto w-50 bg-transparent main-shadow" type="password" placeholder="  password">
    <p class="text-danger text-center"> ${msg}</p>
    <br>
    <button onclick="checkUseracc()" class="m-auto w-50 d-block py-1 my-2 bg-transparent   btn-main" type="submit">Login</button>

    <p class=" text-center my-3 text-white">Don’t have an account ? <button onclick="displayRegisterPage()" type="submit" class="bg-transparent border-0 text-white">Sign Up</button></p>
</div>`


}


function checkUseracc(){
    userLoginInputEmail = document.getElementById('userEmail');
    userLoginInputPassword = document.getElementById('userPassword');
    if(localStorage.getItem('userAcc')){
        newGuestContainer = JSON.parse(localStorage.getItem('userAcc'));

        for(i = 0; i < newGuestContainer.length; i++){
            if(newGuestContainer[i].userEmail == userLoginInputEmail.value && newGuestContainer[i].userPassword == userLoginInputPassword.value){
                localStorage.setItem('userName', newGuestContainer[i].userName); // تخزين اسم المستخدم
                displayHomePage(newGuestContainer[i].userName);
                return;
            }else if(userLoginInputEmail.value == '' && userLoginInputPassword.value == ''){
                msg = 'All inputs are required';
                displayLoginPage(msg);
            } else if(newGuestContainer[i].userEmail != userLoginInputEmail.value || newGuestContainer[i].userPassword != userLoginInputPassword.value){
                msg = 'Email or password not correct';
                displayLoginPage(msg);
            }
        }
    }else{
        msg = 'You must create an account';
        displayLoginPage(msg);
    }
}


checkSession();

function checkSession() {
    const loginTime = localStorage.getItem('loginTime');
    const currentTime = new Date().getTime();
    
    if (loginTime) {
        const elapsedTime = currentTime - loginTime;
        const oneHour = 60 * 60 * 1000; // ساعة واحدة بالمللي ثانية

        if (elapsedTime >= oneHour) {
            logOut(); // تسجيل الخروج إذا مرت ساعة
        } else {
            const remainingTime = oneHour - elapsedTime;
            setTimeout(logOut, remainingTime); // ضبط مؤقت لتسجيل الخروج بعد انتهاء المدة المتبقية
            // إعادة توجيه المستخدم إلى صفحة الهوم لأن الجلسة ما زالت نشطة
            const userName = localStorage.getItem('userName');
            if (userName) {
                displayHomePage(userName);
            }
        }
    } else {
        displayLoginPage(); // إذا لم يكن هناك وقت تسجيل دخول مخزن، عرض صفحة تسجيل الدخول
    }
}

function displayHomePage(name){
    const loginTime = new Date().getTime(); // الحصول على الوقت الحالي
    localStorage.setItem('loginTime', loginTime); // تخزين وقت تسجيل الدخول
    root.innerHTML = `<div class="main-height text-white d-flex justify-content-around  ">
    <div class="div1 my-4">
        <h3><a class="text-decoration-none text-white fw-medium" href="#">SMART LOGIN</a></h3>
    </div>
    <div onclick="logOut()" class="div2 my-4"><button class="bg-transparent text-white p-2 border-0">logout</button></div>
</div>

<div class=" w-50 p-4  m-auto msg   main-color main-boxshadow">
<h1 class=" text-center text-color fw-bold ">Welcome ${name}</h1>

</div>`
}




function logOut(){
    localStorage.removeItem('loginTime'); // إزالة وقت تسجيل الدخول
    localStorage.removeItem('userName'); // إزالة اسم المستخدم
    msg = '';
    displayLoginPage(msg);
}
