/*
File: script.js
GUI Assignment: Homework 4, Part 1: jQuery Validation
David Lee, Umass Lowell, david_lee2@student.uml.edu
Date: 11/28/2024
*/

$(document).ready(function (){
    $("#myForm").validate({
        rules: {
            rowStart: {
                number: true,
                required: true,
                min: -50,
                max: 50
            },
            rowEnd: {
                number: true,
                required: true,
                min: -50,
                max: 50
            },
            colStart: {
                number: true,
                required: true,
                min: -50,
                max: 50
            },
            colEnd: {
                number: true,
                required: true,
                min: -50,
                max: 50
            }
        },
        messages: {
            rowStart: {
                number: "Enter a valid number.",
                required: "Input n/a, enter a valid number",
                min: "The number must be > than -50.",
                max: "The number must be < than 50."
            },
            rowEnd: {
                number: "Enter a valid number.",
                required: "Input n/a, enter a valid number",
                min: "The number must be > than -50.",
                max: "The number must be < than 50."
            },
            colStart: {
                number: "Enter a valid number.",
                required: "Input n/a, enter a valid number",
                min: "The number must be > than -50.",
                max: "The number must be < than 50."
            },
            colEnd: {
                number: "Enter a valid number.",
                required: "Input n/a, enter a valid number",
                min: "The number must be > than -50.",
                max: "The number must be < than 50."
            }
        },
        submitHandler: function() {
            generateTable();
        },
        invalidHandler: function() {
            $("#myTable").empty();
        }
    });
});

function generateTable() {
    //pulling inputs from the form in html
    var rStart = Number(document.getElementById('rowStart').value);
    var rEnd = Number(document.getElementById('rowEnd').value);
    var cStart = Number(document.getElementById('colStart').value);
    var cEnd = Number(document.getElementById('colEnd').value);
    //checks all parameters & swaps if start point > end point
    if (rStart > rEnd) {
        let tmp = rStart;
        rStart = rEnd;
        rEnd = tmp;
    }
    if (cStart > cEnd) {
        let tmp = cStart;
        cStart = cEnd;
        cEnd = tmp;
        console.log(cStart);
    }
    //bounds checker
    const tmp = [rStart, rEnd, cStart, cEnd]; //shove into array
    const isOOB = tmp.some(value => Math.abs(value) > 50); // in the event numbers are greater than 50 popup msg.
    if (isOOB) {
        document.getElementById('statusMsg').innerHTML = "Please enter a number [-50,50] inclusive.";
        return false; // prevents user from submitting in the event that their input does not meet the criteria.
    }
    else {
        document.getElementById('statusMsg').innerHTML = "Your numbers fit the criteria, success!";
    }
    //calculation portion, creating matrix
    var matrix = [];
    for (i = rStart; i <= rEnd; i++) {
        tmp1 = [];
        for (j = cStart; j <= cEnd; j++) {
            var result = i * j;
            tmp1.push(result);
        }
        matrix.push(tmp1);
    }
    //call render function
    renderTable(matrix);
    return false; //prevents code from jumping back into loop.
}

function renderTable(matrix) {
    //default parameters
    var rStart = Number(document.getElementById('rowStart').value);
    var rEnd = Number(document.getElementById('rowEnd').value);
    var cStart = Number(document.getElementById('colStart').value);
    var cEnd = Number(document.getElementById('colEnd').value);
    //double check for swap once more
    if (rStart > rEnd) {
        let tmp = rStart;
        rStart = rEnd;
        rEnd = tmp;
    }
    if (cStart > cEnd) {
        let tmp = cStart;
        cStart = cEnd;
        cEnd = tmp;
    }
    //start of rendering table by calling tag
    var output = "<table>";
    //index for column number
    var index = 0;
    //top section, removes top left cell
    output += "<tr>";
    output += "<th style='border-top:none; border-left:none;'></th>";
    //row numbers
    for(i = 0; i <= rEnd-rStart; i++) {
        var tmp = i + rStart;
        output += "<th style='background-color:darkgreen;'>" + tmp + "</th>";
    }
    output += "</tr>";
    //generates rest of the table
    for(i = 0; i <= rEnd-rStart; i++) {
        output = output + "<tr>";
        for(j = -1; j <= cEnd-cStart; j++) { //starts at -1 to account for shift
            if (j==-1) {
                //calculates column numbers
                var tmp = index + cStart;
                output = output + "<th style='background-color:darkgreen;'>" + tmp + "</th>";
                index++;
            }
            else {
                output = output + "<td>" + matrix[i][j] + "</td>"; //products
            }
        }
        output = output + "</tr>" // closing tags - row
    }
    output += "</table>"; // closing tags - table
    myTable.innerHTML=output; //display - table
}


