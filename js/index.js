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

function left() {
    if (currentIndex <= 0)
        return;

    currentIndex--;
    updateJacobImage(currentIndex);
}

function right() {
    if (currentIndex >= data.list.length - 1)
        return;

    currentIndex++;
    updateJacobImage(currentIndex);
}

function search() {
    const input = window.prompt("Where to? (jacob #)");
    
    /** @type {Number} */
    let page;

    page = Number.parseInt(input);

    if (isNaN(page)) {
        return;
    } else if (page < 1 || page > data.list.length) {
        window.alert(`Page #${page} doesn't exist!`);
        return;
    }

    currentIndex = page - 1;
    updateJacobImage(currentIndex);
}

/**
 * Initialize navigation. Called on page load.
 */
async function initializeJacob() {
    data = await updateData();
    console.log(data);
    currentIndex = data.list.length - 1;

    initializeMeta();

    updateJacobImage(currentIndex);
}

/**
 * Updates the image displayed to the specified image (page) number.
 * @param {JacobEntry} entry 
 * @param {Blob} imageURL 
 */
async function updateJacobImage(i) {
    const entry = data.list[i];

    // Retrieve current Jacob image from entry
    document.getElementById("jacob").src = resourceURL + entry.path;

    // displayJacob() called when image loads
}

/**
 * Updates the page text. Called when the image loads.
 */
function displayJacob() {
    let entry = data.list[currentIndex];

    let title = entry.title;
    let desc = entry.description;
    let credit = entry.photoCredit;

    // Update title and description
    const titleElement = document.getElementById("title");
    const descElement = document.getElementById("description");
    const creditElement = document.getElementById("photo-credit");

    titleElement.innerHTML = `${title} <span class="index-number">(#${currentIndex + 1})</span>`;
    descElement.innerHTML = desc;
    creditElement.innerHTML = "📷: " + credit;
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

/**
 * Initialize a website's meta tags.
 */
function initializeMeta() {
    const entry = data.list[currentIndex];

    document.querySelector('meta[property="og:title"]')
        .setAttribute("content", `${entry.title} - Daily Jacob #${currentIndex + 1}`);

    document.querySelector('meta[property="og:description"]')
        .setAttribute("content", entry.description);

    document.querySelector('meta[property="og:image"]')
        .setAttribute("content", resourceURL + entry.path);
}