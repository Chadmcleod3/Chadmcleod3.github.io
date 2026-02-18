// Toggle: show Filter form, hide Add New form
function showFilter() {
    let filterForm = document.getElementById("filterContent");
    let newForm = document.getElementById("newContent");

    filterForm.style.display = "block";
    newForm.style.display = "none";
}

// Toggle: show Add New form, hide Filter form
function showAddNew() {
    let newForm = document.getElementById("newContent");
    let filterForm = document.getElementById("filterContent");

    newForm.style.display = "flex";
    filterForm.style.display = "none";
}

// Filter articles by type based on checkbox state
function filterArticles() {
    let showOpinion = document.getElementById("opinionCheckbox").checked;
    let showRecipe = document.getElementById("recipeCheckbox").checked;
    let showUpdate = document.getElementById("updateCheckbox").checked;

    // Get all articles of each type
    let opinionArticles = document.getElementsByClassName("opinion");
    let recipeArticles = document.getElementsByClassName("recipe");
    let updateArticles = document.getElementsByClassName("update");

    // Show or hide opinion articles
    for (let i = 0; i < opinionArticles.length; i++) {
        if (showOpinion) {
            opinionArticles[i].style.display = "block";
        } else {
            opinionArticles[i].style.display = "none";
        }
    }

    // Show or hide recipe articles
    for (let i = 0; i < recipeArticles.length; i++) {
        if (showRecipe) {
            recipeArticles[i].style.display = "block";
        } else {
            recipeArticles[i].style.display = "none";
        }
    }

    // Show or hide update articles
    for (let i = 0; i < updateArticles.length; i++) {
        if (showUpdate) {
            updateArticles[i].style.display = "block";
        } else {
            updateArticles[i].style.display = "none";
        }
    }
}

// Add a new article to the list
function addNewArticle() {
    let title = document.getElementById("inputHeader").value;
    let text = document.getElementById("inputArticle").value;

    // Determine which radio button is selected
    let articleType = "";
    if (document.getElementById("opinionRadio").checked) {
        articleType = "opinion";
    } else if (document.getElementById("recipeRadio").checked) {
        articleType = "recipe";
    } else if (document.getElementById("lifeRadio").checked) {
        articleType = "update";
    }

    // Only add if title, text, and type are provided
    if (title === "" || text === "" || articleType === "") {
        return;
    }

    // Create the article element
    let newArticle = document.createElement("article");
    newArticle.classList.add(articleType);

    // Create the marker span
    let marker = document.createElement("span");
    marker.classList.add("marker");
    if (articleType === "opinion") {
        marker.innerText = "Opinion";
    } else if (articleType === "recipe") {
        marker.innerText = "Recipe";
    } else if (articleType === "update") {
        marker.innerText = "Update";
    }

    // Create the title h2
    let newTitle = document.createElement("h2");
    newTitle.innerText = title;

    // Create the text paragraph
    let newText = document.createElement("p");
    newText.innerText = text;

    // Append all parts to the article
    newArticle.appendChild(marker);
    newArticle.appendChild(newTitle);
    newArticle.appendChild(newText);

    // Add the article to the article list
    let articleList = document.getElementById("articleList");
    articleList.appendChild(newArticle);

    // Clear the form fields
    document.getElementById("inputHeader").value = "";
    document.getElementById("inputArticle").value = "";
    document.getElementById("opinionRadio").checked = false;
    document.getElementById("recipeRadio").checked = false;
    document.getElementById("lifeRadio").checked = false;
}
