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

    getJacob(currentIndex)
}

function left() {
    if (currentIndex <= 0)
        return;

    currentIndex--;
    getJacob(currentIndex);
}

function right() {
    if (currentIndex >= data.list.length - 1)
        return;

    currentIndex++;
    getJacob(currentIndex);
}

async function getJacob(i) {
    const entry = data.list[i];

    // Retrieve current Jacob image from entry
    document.getElementById("jacob").src = resourceURL + entry.path;
}

/**
 * 
 * @param {JacobEntry} entry 
 * @param {Blob} imageURL 
 */
function updateJacob(entry) {
    // Update Jacob image
    document.getElementById("jacob").src = resourceURL + entry.path;
}

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