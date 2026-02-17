function showFilter(){
    let filterForm = document.getElementById("filterContent");
    let newForm = document.getElementById("newContent");

    filterForm.style.display = "block";
    newForm.style.display = "none";
}

function showAddNew(){
    let newForm = document.getElementById("newContent");
    let filterForm = document.getElementById("filterContent");

    newForm.style.display = "flex";
    filterForm.style.display = "none";
}

function filterArticles(){
    let showOpinion = document.getElementById("opinionCheckbox").checked;
    let showRecipe = document.getElementById("recipeCheckbox").checked;
    let showUpdate = document.getElementById("updateCheckbox").checked;


    let opinionArticles = document.getElementsByClassName("opinion");
    let recipeArticles = document.getElementsByClassName("recipe");
    let updateArticles = document.getElementsByClassName("update");
    
    for (let i = 0; i < opinionArticles.length; i++){
        if (showOpinion){
            opinionArticles[i].style.display = "block";
        } else{
            opinionArticles[i].style.display = "none";
        }
    }

    for (let i = 0; i < recipeArticles.length; i++){

        if (showRecipe){ 
            recipeArticles[i].style.display = "block";
        } else{
             recipeArticles[i].style.display = "none";
        }
    }

  for (let i = 0; i < updateArticles.length; i++){
        if (showUpdate){
            updateArticles[i].style.display = "block";
        } else{
          updateArticles[i],style.display = "none";
        }
    }
}

function addNewArticle(){
    let title = document.getElementById("inputHeader").value;
    let text = document.getElementById("inputArticle").value;

    let articleType = "";
    if(document.getElementById("opinionRadio").checked){
        articleType = "opinion";
    } else if (document.getElementById("recipeRadio").checked){
        articleType = "recipe";
    } else if (document.getElementById("lifeRadio").checked){
        articleType = "update";
    }

    if (title === "" || text === "" || articleType === ""){
        return;
    }

    let newArticle = document.createElement("article");
    newArticle.classList.add(articleType);

    let marker = document.createElement("span");
    marker.classList.add("marker");
    if(articleType === "opinion"){
        marker.innerText = "Opinion";
    } else if(articleType === "recipe"){
        marker.innerText = "Recipe";
    } else if(articleType === "update"){
        marker.innerText = "Update";
    }

    let newTitle = document.createElement("h2");
    newTitle.innerText = title;

    let newText = document.createElement("p");
    newText.innerText = text;

    newArticle.appendChild(marker);
    newArticle.appendChild(newTitle);
    newArticle.appendChild(newText);

    let articleList = document.getElementById("articleList");
    articleList.appendChild(newArticle);

    document.getElementById("inputHeader").value = "";
    document.getElementById("inputArticle").value = "";
    document.getElementById("opinionRadio").checked = false;
    document.getElementById("recipeRadio").checked = false;
    document.getElementById("lifeRadio").checked = false;

}
