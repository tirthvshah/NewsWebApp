//search bar
let search = document.getElementById('searchNews');
search.addEventListener("input",function(){
    let inputVal = search.value
    console.log("Input Event fired",inputVal);
    let newsdrop = document.getElementsByClassName('news');
    Array.from(newsdrop).forEach(function(element){
        let newsTxt = element.getElementsByTagName("p")[0].innerText;
        if(newsTxt.includes(inputVal)){
            element.style.display="contents";
        }
        else{
            element.style.display="none";
        }
        // console.log(newsTxt);

    })
})