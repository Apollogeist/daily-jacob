'use strict';

const resourceURL = "https://cdn.dailyjacob.com/";

getJacob(0);

async function getJacob(index) {
        
    const jacobImage = document.getElementById("jacob");
    const loadingImage = document.getElementById("load");
    
    jacobImage.style.display = "none";
    loadingImage.style.display = "inline";
    
    var entry;

    await fetch(resourceURL + "list.json")
        .then(response => response.json())
        .then(data => {
            // Get most recent Jacob entry
            entry = (index == null) ?
                data.list[data.list.length - 1] : data.list[index];
        });

    console.log("Fetching image...")

    // Retrieve current Jacob image from entry
    await fetch(resourceURL + entry.path)
        .then(response => response.blob())
        .then(data => updateJacob(entry.title, entry.description, data));

    jacobImage.style.display = "inline";
    loadingImage.style.display = "none";

    console.log("Done fetching");
}

function updateJacob(title, desc, data) {
    // Update title and description
    const titleElement = document.getElementById("title");
    const descElement = document.getElementById("description");

    titleElement.innerHTML = title;
    descElement.innerHTML = desc;

    // Update Jacob image
    const imageObjectURL = URL.createObjectURL(data);
    document.getElementById("jacob").src = imageObjectURL;
}