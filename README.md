# Flashcard-Generator

# Date Created 05/11/2017

# General Usage Notes
Main.js file connects to the Basic and ClozeCard js files. These files contain questions to be answered based on the user selection or the what user enters. The JSON files contain the questions to be used in the js files of basic and cloze. 
There are no Undo files and whatever choice is made for basic or cloze, it must be completed to restart the whole process of selection. 

# Install NPM Packages
Inquirer: used to enter data into terminal
fs: for reading the Basic and Cloze JSON files. 

# Main.js 
Prompts user with message of choices between Basic and Cloze Question. Based on user choice the basic or cloze js files will be chosen. Function will read JSON file of associated choice and place question into array.

# Basic.js
A constructor that makes a flash card with a front and back. 

# Cloze.js
A constructor that has keys that are full text for answer and partial text as question. 
