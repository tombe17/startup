# Notes from Startup
Using GitHub is super useful and allows for an easy way to interact with the internet. Always remember to commit changes and push them out to the repository.

## Server
Through AWS you can get a server running on EC2, need to make an instance first.

## Domain Name
Purchase a domain name through Route 53 (.click is super cheap)
Then you need to create a record of it using the ip address as well as a subdomain using a wildcard. This allows you to access the site with the name rather than just the ip address.

## GIT BASH
Use this to get in: . ~/.bashrc

To ssh: ssh -i [keyfile] ubuntu@54.174.116.248

## HTTPS
To make it secure go through the caddy file and update it. This allows you to access your website securely!

## Deployment to Server
Go to the file in terminal and then use this comand to deploy the files onto the server.
./deployFiles.sh -k \<yourpemkey\> -h wirdle.click -s simon

## HTML, CSS, JAVASCRIPT help
1. In the following code, what does the link element do?
The link element links between external resources (usually used for stylesheets). Only accepts attributes. Can define relation and what the link is  <link rel="stylesheet" href="styles.css">
2. In the following code,  what does a div tag do?
Div - division/section that outlines a container for code
3. In the following code, what is the difference between the #title and .grid selector?
#title creates an unique ID to be assigned to an element. .grid makes a class that can be assigned to multiple elements
4. In the following code, what is the difference between padding and margin?
(picture)

5. Given this HTML and this CSS how will the images be displayed using flex?
Flex allows for items to be responsive with changes in window size
Flex-direction: column (children are stacked on top of each other rather than side by side(row)) shows direction to stack flex items (can do column or column-reverse (to start from top and flex up)
Flex-wrap will specify if items should wrap
Justify-content will align items (center, flex-start, space-around
Align-items can align them vertically
Align-content will align flex rows
6. What does the following padding CSS do?
Padding: space inside border around content. Padding: 10px (all borders) if : 10px 5px (1st - top/bottom, 2nd - left/right) else if : 10px 5px 2px (1st - top, 2nd - left/right, 3rd - bottom) else if : 10px 8px 6px 4px (1st - top, 2nd- right, 3rd - bottom, 4th - left)
7. What does the following code using arrow syntax function declaration do?
Arrow syntax - () => 3 the () takes parameters and => replaces function, 3 is what it would return.
8. What does the following code using map with an array output?
Map runs a function to map an array to a NEW array. a.map(i => i + i) if you did this to an array [1,2,3] it would map a new array [2,4,6]
9. What does the following code output using getElementByID and addEventListener?
getElementByID(“idname”) grabs the element with the associated ID.
addEventListener(event, function, useCapture) event - string of the event (onclick, mouseover, mouseout (leaves item) function - what you want to happen, and useCapture is optional boolean.
10. What does the following line of Javascript do using a # selector?
.querySelector(#id) to check by id
querySelectorAll(‘p’) would select all elements with the p tag, can’t with ids
Can also use getElementById(‘name’)
11. Which of the following are true? (mark all that are true about the DOM)
Document Object Model - can access with document
You can provide a CSS selector to the querySelectorAll function in order to select elements from the document. The textContent property contains all of the element's text. You can even access a textual representation of an element's HTML content with the innerHTML property. You can also createElement and then appendChild to put it into the doc
(picture)


12. By default, the HTML span element has a default CSS display property value of: 
inline
13. How would you use CSS to change all the div elements to have a background color of red?
Div {
	Background-color: red;
}
14. How would you display an image with a hyperlink in HTML?
You would wrap the <img> with a <a> tag to make it a hyperlink. Src = link to image, alt = alternative text if it doesn’t load.
15. In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
Content, padding, border, margin
16. Given the following HTML, what CSS would you use to set the text "troubl" to green and leave the "double" text unaffected?
Last style applied will stay. If you made 2 style declarations it would take the last. 
Specificity(from least to most): element tag, class, id, the actual element in html
Inheritance: children will take some styles of parents (like font, color)
17. What will the following code output when executed using a for loop and console.log?
For loop works like c++ (let i = 0; i<5; i++) starts with i = 0 and then iterates until i is 5 and then will stop. using var, the variable declared in the loop redeclares the variable outside the loop.
In the second example, using let, the variable declared in the loop does not redeclare the variable outside the loop.
When let is used to declare the i variable in a loop, the i variable will only be visible within the loop.
18. How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
document.getElementById("byu").style.color = "green";
19. What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
\<p>, \<ol>, \<ul>, \<h2>, \<h1>, and \<h3>
20. How do you declare the document type to be html?
\<!DOCTYPE html>
21. What is valid javascript syntax for if, else, for, while, switch statements?
If (condition) {
} else {
}
switch(expression) {
  case x:
    break;
  case y:
    break;
  default:
}
For (exp. Done once, condition to execute, executed after each iteration) {
}
While (condition) {
}


22. What is the correct syntax for creating a javascript object?
const car = {type:"Fiat", model:"500", color:"white"}; (name:value)
23. Is is possible to add new properties to javascript objects?
Yes
24. If you want to include JavaScript on an HTML page, which tag do you use?
\<script>
25. Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
RegExp - textual pattern matchers 
You use a regular expression to find text in a string so that you can replace it, or simply to know that it exists.
const objRegex = new RegExp('ab*', 'i');
const literalRegex = \/ab\*/i;

You can use match to return anything that matches the strings, replace to change it to something.
const petRegex = /(dog)|(cat)|(bird)/gim;
const text = 'Both cats and dogs are pets, but not rocks.';
text.match(petRegex);
// RETURNS: ['cat', 'dog']
text.replace(petRegex, 'animal');
// RETURNS: Both animals and animals are pets, but not rocks.
petRegex.test(text);
// RETURNS: true
26. Which of the following correctly describes JSON?
JSON stands for JavaScript Object Notation
JSON is a lightweight format for storing and transporting data
JSON is often used when data is sent from a server to a web page
JSON is "self-describing" and easy to understand
27. What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
chmod -  used to modify the permissions and access mode of files and directories.
Pwd - It prints the path of the working directory, starting from the root
Cd - change directory
Ls - list files
Vim - goes into vim to code directly there
Nano - text editor
Mkdir - makes a directory (folder)
Mv - move file: mv file.name /location
Rm - remove
Man - views the manual for a command
Ssh - securely log into a remote machine and execute commands on that machine.
Ps - writes the status of active processes and if the -m flag is given, displays the associated kernel threads to standard output. 
Wget -a networking command-line tool that lets you download files and interact with REST APIs
Sudo - allows you to run programs with the security privileges of another user
Which of the following console command creates a remote shell session?
ssh -i [key pair file] ubuntu@[ip address]
28. Which of the following is true when the -la parameter is specified for the ls console command?
For example, ls can list all files (even hidden ones) in a long format if you provide the parameter -la.
29. Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
TLD - .click (they’re organized by governing board of internet). Root - bozo.click. Subdomain - banana.fruit
30. Is a web certificate is necessary to use HTTPS.
Yes
31. Can a DNS A record point to an IP address or another A record.
Yes
32. Port 443, 80, 22 is reserved for which protocol?
443 - HTTPS
80 - HTTP
22 - SSH
33. What will the following code using Promises output when executed?
The promise object has three functions: then, catch, and finally. 
then function is called if the promise is fulfilled
catch is called if the promise is rejected
and finally is always called after all the processing is completed.
We can rework our coinToss example and make it so 10 percent of the time the coin falls off the table and resolves to the rejected state. Otherwise the promise resolves to fulfilled with a result of either heads or tails.
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});
coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed


