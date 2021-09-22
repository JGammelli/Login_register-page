let regTab = document.getElementById("regtab");
let logTab = document.getElementById("logtab");
let regBox = document.getElementById("register");
let loginBox = document.getElementById("login");
let logoutBox = document.getElementById("logout");
let container = document.getElementById("container");
let h1 = document.getElementById("greet");

//Users + passwords that already exists
let usrArray; 
let pswArray; 

if(window.localStorage.getItem("name") !== null && window.localStorage.getItem("psw") !== null){
    usrArray = JSON.parse(window.localStorage.getItem("name"));
    pswArray = JSON.parse(window.localStorage.getItem("psw"));

}else{
    usrArray = ["janne", "donald", "winnie"];
    pswArray = ["test", "duck", "pooh"];
}



logoutBox.style.visibility="hidden"; 

//What shows when signed in
function signedIn(user){
    h1.innerHTML = "";
    h1.insertAdjacentHTML("afterbegin", "Welcome " + user + "!");
    container.style.visibility="hidden";
    logoutBox.style.visibility="visible";
    loginBox.style.visibility="hidden";
}

//What shows when signed out
function signedOut(){
    h1.innerHTML = "";
    container.style.visibility="visible";
    logoutBox.style.visibility="hidden";
    loginBox.style.visibility="visible";
    h1.insertAdjacentHTML("afterbegin", "Hello! You can choose to sign in or to register.");
}

// Press the register tab
regTab.addEventListener("click", function ()
    {
    event.preventDefault();
    regBox.style.visibility="visible";
    loginBox.style.visibility="hidden";

    regTab.style.backgroundColor="rgb(255, 255, 255)";
    logTab.style.backgroundColor="rgb(177, 177, 177)";
});

//  Press the sign in tab
logTab.addEventListener("click", function (){
    event.preventDefault();
    regBox.style.visibility = "hidden";
    loginBox.style.visibility = "visible";

    logTab.style.backgroundColor="rgb(255, 255, 255)";
    regTab.style.backgroundColor="rgb(177, 177, 177)";
});

//Checks if the user's signed in or not
let checkStatus = function(){
    if(window.localStorage.getItem("signedIn") == "true"){
        signedIn(window.localStorage.getItem("signedinUser"));
    }
    else if(window.localStorage.getItem("signedIn") == "false"){
        signedOut();
    }
}

// Logg in
document.getElementById("logsub").addEventListener("click", function(){
    event.preventDefault();
    let userName = document.getElementById("usr").value;
    let userPsw = document.getElementById("psw").value;
    let i = usrArray.indexOf(userName);

    //Checks if the username is in the arrays
    if(usrArray.indexOf(userName) ==-1 || userName == "" || pswArray[i] != userPsw || userPsw == "")
    {
        h1.innerHTML = "";
        h1.insertAdjacentHTML("afterbegin", "Error. Could not sign in.");
    }
    else{
        document.cookie = "signedIn=true";
        window.localStorage.setItem("signedIn", "true");
        window.localStorage.setItem("signedinUser", userName);
        checkStatus();
    }
});

// Register the new user
document.getElementById("regsub").addEventListener("click", function(){
    let name = document.getElementById("inpusr");
    let psw = document.getElementById("inppsw");
 
    //make sure the user filled in name + password
    if(name.value.length == 0 || psw.value.length == 0){
        h1.innerHTML = "";
        h1.insertAdjacentHTML("afterbegin", "Please fill in username and password.");
    }
    //add the username + password in array
    else if (usrArray.indexOf(name) == -1){
        usrArray.push(name.value);
        pswArray.push(psw.value);
        window.localStorage.setItem("name", JSON.stringify(usrArray));
        window.localStorage.setItem("psw", JSON.stringify(pswArray));
        h1.innerHTML = "";
        h1.insertAdjacentHTML("afterbegin", "Congrats! You have successfully been registerd." + "</br>" + "You can now sign in.");
        console.log(window.localStorage.getItem("name"));
        console.log(window.localStorage.getItem("psw"));
    }
});

//Signing out
document.getElementById("outBtn").addEventListener("click", function (){
    window.localStorage.setItem("signedIn", "false");
    checkStatus();
    window.localStorage.removeItem("signedinUser");
});

checkStatus();