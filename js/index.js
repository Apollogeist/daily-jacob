/**
 * @typedef {Object} JacobEntry
 * @property {String} path Remote path to the image
 * @property {String} title Image title
 * @property {String} description Image description
 * @property {String} photoCredit Credit for the photograph
 */

/**
 * @typedef {Object} JacobData
 * @property {Array<JacobEntry>} list
 */

'use strict';

const resourceURL = "https://cdn.dailyjacob.com/";

var currentIndex;

/** @type {JacobData} */
var data;

initializeJacob();

async function initializeJacob() {
    data = await updateData();
    console.log(data);
    currentIndex = data.list.length - 1;

    getJacob(0)
    //getJacob(currentIndex)
}

async function getJacob(i) {
    console.log("Getting Jacob #" + i);

    const jacobImage = document.getElementById("jacob");
    const loadingImage = document.getElementById("load");
    
    jacobImage.style.display = "none";
    loadingImage.style.display = "inline";

    const entry = data.list[i];

    console.log("Fetching image...");

    // Retrieve current Jacob image from entry
    await fetch(resourceURL + entry.path)
        .then(response => response.blob())
        .then(data => updateJacob(entry, data));

    jacobImage.style.display = "inline";
    loadingImage.style.display = "none";

    console.log("Done fetching");
}

/**
 * 
 * @param {JacobEntry} entry 
 * @param {Blob} image 
 */
function updateJacob(entry, image) {
    let title = entry.title;
    let desc = entry.description;
    let credit = entry.photoCredit;

    // Update title and description
    const titleElement = document.getElementById("title");
    const descElement = document.getElementById("description");
    const creditElement = document.getElementById("photo-credit");

    titleElement.innerHTML = title;
    descElement.innerHTML = desc;
    creditElement.innerHTML = "📷: " + credit;

    // Update Jacob image
    const imageObjectURL = URL.createObjectURL(image);
    document.getElementById("jacob").src = imageObjectURL;
}

/**
 * @returns {JacobData} Response from the server
 */
async function updateData() {
    console.log("Fetching info...");

    let data;

    await fetch(resourceURL + "list.json")
        .then(response => response.json())
        .then(d => {
            console.log("Info fetched!");
            data = d;
        });

    return data;
}