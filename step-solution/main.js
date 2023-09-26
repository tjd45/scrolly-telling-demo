let verseid = 1;
const verseMax = 5;
let lineid = 1;
const lineMax = 20;

let svg = d3.select("#svg");
let width = 500;
let height = 400;

// Initialize a variable to track the scroll position
let scrollPosition = 0;

let scrollRatio = 100;

var scrollScale = d3.scaleLinear()
    .domain([0, (scrollRatio * lineMax)]) // Set the domain
    .range([1, 5]);   // Set the range

// Attach a wheel event listener to the window
window.addEventListener('wheel', function (event) {

    handleScroll(event.deltaY);

});

document.getElementById("forward-button").addEventListener("click", forwardClicked);
document.getElementById("backward-button").addEventListener("click", backwardClicked);


function getVerseId(lineid) {
    return Math.ceil(lineid / 4);

}

function handleScroll(deltaY) {

    let osp = scrollPosition;

    if (deltaY < 0) {

        lineid--;
        lineid = Math.max(lineid, 1);
    } else {

        lineid++;
        lineid = Math.min(lineid, lineMax);

    }

    updateActiveLine(lineid);

    console.log("Line: " + lineid);

    // // Calculate the new scroll position based on the wheel delta
    // scrollPosition += event.deltaY;

    // scrollPosition = (Math.max(0, scrollPosition));

    // scrollPosition = (Math.min(scrollPosition, scrollRatio * lineMax));

    // // Your code to handle the scroll event goes here
    // console.log("They see me scrolling to " + scrollPosition);
    // console.log(scrollScale(scrollPosition));

    // if (Math.round(scrollScale(scrollPosition)) !== verseid) {
    //     verseid = Math.round(scrollScale(scrollPosition));
    //     updateActiveVerse(verseid);
    //     updateSVG(verseid);
    // }

    // // Optionally, you can use the scrollPosition variable to determine scroll direction
    // // If scrollPosition > 0, the user scrolled down; if scrollPosition < 0, the user scrolled up

}

function initialise() {
    updateActiveVerse(verseid);
    updateActiveLine(lineid);
    svg.attr("width", width);
    svg.attr("height", height);
    updateSVG(verseid);


}



function forwardClicked() {
    console.log("FORWARD");
    // if (verseid < verseMax) {
    //     verseid++;
    //     updateActiveVerse(verseid);
    //     updateSVG(verseid);
    // }

    if (lineid < lineMax) {
        lineid++;
        updateActiveLine(lineid);

    }

}

function backwardClicked() {
    console.log("BACWARD");

    // if (verseid > 1) {
    //     verseid--;
    //     updateActiveVerse(verseid);
    //     updateSVG(verseid);
    // }

    if (lineid > 1) {
        lineid--;
        updateActiveLine(lineid);

    }
}

function updateActiveVerse(id) {
    d3.selectAll(".verse").classed("active-verse", false);

    d3.select("#verse" + id).classed("active-verse", true);

    scrollLeftColumnToActiveVerse(id);
}

function updateActiveLine(id) {
    let thisVerse = getVerseId(id);


    console.log(id, thisVerse, verseid);

    if (thisVerse !== verseid) {
        verseid = thisVerse;
        updateActiveVerse(thisVerse);
        updateSVG(thisVerse);
    }

    d3.selectAll(".line").classed("active-line", false);

    d3.select("#line" + id).classed("active-line", true);
}

function updateSVG(id) {
    svg.selectAll("*").remove();

    let number = id;

    svg.append('text')
        .attr('x', width / 2) // Set the x-coordinate for the middle
        .attr('y', height / 2) // Set the y-coordinate for the middle
        .attr('text-anchor', 'middle') // Center the text horizontally
        .attr('dominant-baseline', 'middle') // Center the text vertically
        .attr('font-size', '24px')
        .text(number); // Set the text content to your number
}

// Function to scroll the left column to center the active verse
function scrollLeftColumnToActiveVerse(activeVerseId) {

    console.log("trying to scroll to verse " + activeVerseId);
    // Select the left column
    var leftColumn = document.querySelector('.content');

    // Select the active verse
    var activeVerse = document.getElementById("verse" + activeVerseId);

    if (leftColumn && activeVerse) {
        // Calculate the position of the active verse relative to the left column
        var verseRect = activeVerse.getBoundingClientRect();
        var leftColumnRect = leftColumn.getBoundingClientRect();

        // Calculate the desired scroll position to center the active verse
        var desiredScrollTop = verseRect.top + leftColumn.scrollTop - leftColumnRect.top - (leftColumnRect.height - verseRect.height) / 2;

        // Set the scroll position to center the active verse with smooth scrolling
        leftColumn.scrollTo({
            top: desiredScrollTop,
            behavior: 'smooth' // Add smooth scrolling animation
        });
    }
}

initialise();