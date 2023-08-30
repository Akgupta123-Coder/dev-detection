const url = "https://api.github.com/users/";

const root=document.documentElement.style;
const btnmode=document.getElementById("btn-mode");
const modeicon=document.getElementById("mode-icon");
const modetext=document.getElementById("mode-text");
darkMode=false;
btnmode.addEventListener("click",function(){
    if(darkMode==false)
    darkModeProperties();
    else
    lightModeProperties();
});

//switch to darkmode
function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    
}

//switch to light mode
function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false; 
}

const input=document.getElementById("input");
const btnsearch=document.getElementById("btn-search");
const noresult=document.getElementById("no-results");
btnsearch.addEventListener('click',function(){
    if(input.value!=""){
        getUserdata(url+input.value);
    }
});


input.addEventListener('keydown',function(e){
    if(e.key=="Enter")
    {
        if(input.value!=""){
            getUserdata(url+input.value);   
        }
    }
},false);

input.addEventListener('input',function(){
    noresult.style.display="none";
});

async function getUserdata(giturl){
   try{
    const response=await fetch(giturl);
    const data=await response.json()
    console.log(data);
    updateProfile(data);
   }
   catch(e){
     console.log(e);
   }
}

function updateProfile(data){

    //fetch the values
    const avatar=document.getElementById("avatar");
    const userName=document.getElementById("name");
    const user=document.getElementById("user");
    const date=document.getElementById("date");
    const bio=document.getElementById("bio");

  

    const repos=document.getElementById("repos");
    const following=document.getElementById("following");
    const follower=document.getElementById("follower");

    const location=document.getElementById("location");
    const page=document.getElementById("page");
    const twitter=document.getElementById("twitter");
    const company=document.getElementById("company")

  


    if(data.message!=="Not Found"){
        noresult.style.display="none";

        function checkNull(param1, param2) {
            if (param1 === "" || param1 === null) {
              param2.style.opacity = 0.5;

            //   previousElementSibling it is readonly
              param2.previousElementSibling.style.opacity = 0.5;
              return false;
            } else {
              return true;
            }
          }

        avatar.src=`${data.avatar_url}`;
        userName.innerText=data.name===null?data.login:data.name;
        user.innerText=`@${data.login}`;
        user.href = `${data.html_url}`;
    
    
        bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        follower.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
    
        location.innerText=checkNull(data.location,location)?data.location:"Not Available";
          
        page.innerText=checkNull(data.blog,page)?data.blog:"Not Available";
        page.href=checkNull(data.blog,page)?data.blog:"#";

        twitter.innerText=checkNull(data.twitter_username,twitter)?data.twitter_username:"Not Available";
        twitter.href=checkNull(data.twitter_username,twitter)?`https://twitter.com/${data.twitter_username}`:"#";

        company.innerText=checkNull(data.company,company)?data.company:"Not Available";
        
    }
    else{
        noresult.style.display="block";
    }
}







function init(){
     //darkMode = true -> dark mode enable karna h 
    //darMode = false -> light mode enable karna h 

     //by default, pranaygupta ki info show krre h UI pr
    getUserdata(url+"thepranaygupta")
}
init();
