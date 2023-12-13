# Notes
<br>

![image](https://github.com/Spencer-Gardner/CS_260/assets/120418845/e326599a-e96d-409d-ab64-2a787edbd125)
![image](https://github.com/Spencer-Gardner/CS_260/assets/120418845/a8da1b20-6911-4481-a0e8-5b7294405d0b)
<br>


## Bash
- `sudo ssh -i ./Keys/CS260_Instance.pem ubuntu@spencer-gardner.click `
- `sudo ../deployFiles.sh -k ../../Keys/CS260_Instance.pem -h spencer-gardner.click -s startup `
<br>


## Midterm Study Guide

1. _In the following code, what does the `<link>` element do?_  
`<link>` defines the relationship between the current document and an external resource.

2. _In the following code,  what does a `<div>` tag do?_  
`<div>` is used as a container for HTML elements.

3. _In the following code, what is the difference between the `#title` and `.grid` selector?_  
`#` selects all elements with a given ID; `.` selects all elements of a given class.

4. _In the following code, what is the difference between padding and margin?_  
Padding represents the amount of inner space an element has; margin is whitespace available surrounding an element.

5. _Given this HTML and this CSS, how will the images be displayed using flex?_  
The flex display layout is useful when you want to partition your application into areas that responsively move around as the window resizes or the orientation changes.
```css
body {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0;
  height: 100vh;
}
```

6. _What does the following CSS padding do?_  
The CSS padding properties are used to generate space around an element's content, inside of any defined borders. With CSS, you have full control over the padding. There are properties for setting the padding for each side of an element (top, right, bottom, and left).

7. _What does the following code using arrow syntax do?_  
This syntax replaces the need for the `function` keyword with the symbols `=>` placed after the parameter declaration. The enclosing curly braces are optional. The `return` keyword is also optional if no curly braces are provided for the function and it contains a single expression.
```js
const a = [1, 2, 3, 4];

// standard function syntax
a.sort(function (v1, v2) {
  return v1 - v2;
});

// arrow function syntax
a.sort((v1, v2) => v1 - v2);
```

8. _What does the following code using `map` with an array output do?_  
`map` runs a function to map an array to a new array.
```js
const a = [1, 2, 3];

console.log(a.map((i) => i + i));
// OUTPUT: [2,4,6]
```

9. _What does the following code output using `getElementByID` and `addEventListener`?_  
`getElementById()` returns an element with a specified value; `addEventListener()` attaches an event handler to an element.

10. _What does the following line of JavaScript do using a `#` selector?_  
The `#` selector is used to select elements in the DOM.
```js
const submitDataEl = document.querySelector('#submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});
```

11. _Which of the following are true? (mark all that are true about the DOM)_  
The Document Object Model (DOM) is an object representation of the HTML elements that the browser uses to render the display. The browser also exposes the DOM to external code so that you can write programs that dynamically manipulate the HTML. The browser provides access to the DOM through a global variable name `document` that points to the root element of the DOM. For everything in an HTML document there is a node in the DOM. This includes elements, attributes, text, comments, and whitespace. All of these nodes form a big tree, with the document node at the top.
Every element in an HTML document implements the DOM Element interface, which is derived from the DOM Node interface. The DOM Element Interface provides the means for iterating child elements, accessing the parent element, and manipulating the element's attributes. You can provide a CSS selector to the `querySelectorAll` function in order to select elements from the document. The `textContent` property contains all of the element's text. You can even access a textual representation of an element's HTML content with the `innerHTML` property.
The DOM supports the ability to insert, modify, or delete the elements in the DOM. To create a new element you first create the element on the DOM document. You then insert the new element into the DOM tree by appending it to an existing element in the tree.
The DOM also allows you to inject entire blocks of HTML into an element. However, directly injecting HTML as a block of text is a common attack vector for hackers, so if you are injecting HTML, make sure that it cannot be manipulated by a user.
All DOM elements support the ability to attach a function that gets called when an event occurs on the element. These functions are called event listeners.

12. _By default, the HTML `<span>` element has a default CSS display property value of:_  
By default, the HTML `<span>` element has a default CSS display property value of `inline`. This means that a `<span>` element is displayed inline with the surrounding text, and it does not create a line break before or after it.

13. _How would you use CSS to change all the `<div>` elements to have a background color of red?_  
```css
div {
  background-color: red;
}
```

14. _How would you display an image with a hyperlink in HTML?_  
```html
<a href="your_link_url">
  <img src="your_image_url" alt="Image Description">
</a>
```

15. _In the CSS box model, what is the ordering of the box layers starting at the inside and working out?_  
![image](https://github.com/Spencer-Gardner/CS_260/assets/120418845/7d9a0c30-d18a-4d84-8a35-d1dcd0244848)

16. _Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?_  
Selectors define the patterns to select elements to which a set of CSS rules are then applied along with their specificity.

17. _What will the following code output when executed using a `for` loop and `console.log`?_  
```js
for (let i = 0; i < 2; i++) {
  console.log(i);
}
// OUTPUT: 0 1
```

18. _How would you use JavaScript to select an element with the ID of “byu” and change the text color of that element to green?_  
```js
// Select the element with ID "byu"
var element = document.getElementById("byu");

// Change the text color to green
element.style.color = "green";
```

19. _What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, and third level heading?_  
Parapraph: `<p>`  
Ordered List: `<ol>`  
Unordered List: `<ul>`  
First Level Heading: `<h1>`  
Second Level Heading: `<h2>`  
Third Level Heading: `<h3>`

21. _How do you declare the document type to be HTML?_  
```html
<!DOCTYPE html>
```

21. _What is valid JavaScript syntax for `if`, `else`, `for`, `while`, and `switch` statements?_  
```js
if (a === 1) {
  //...
} else if (b === 2) {
  //...
} else {
  //...
}

a === 1 ? console.log(1) : console.log('not 1');
```
```js
for (let i = 0; i < 2; i++) {
  console.log(i);
}
// OUTPUT: 0 1
```
```js
let i = 0;
while (i < 2) {
  console.log(i);
  i++;
}
// OUTPUT: 0 1
```
```js
switch (expression) {
  case value1:
    // Code to be executed if expression matches value1
    break;
  case value2:
    // Code to be executed if expression matches value2
    break;
  // Additional cases as needed
  default:
    // Code to be executed if no case matches the expression
}
```

22. _What is the correct syntax for creating a JavaScript object?_  
```js
const obj = new Object({a:3});
obj['b'] = 'fish';
obj.c = [1, 2, 3];
obj.hello = function () {
  console.log('hello');
};

console.log(obj);
// OUTPUT: {a: 3, b: 'fish', c: [1,2,3], hello: func}
```
```js
const obj = {
  a: 3,
  b: 'fish',
};
```

23. _Is is possible to add new properties to JavaScript objects?_  
Once declared, you can add properties to the object by simply referencing the property name in an assignment. Any type of variable can be assigned to a property. This includes a sub-object, array, or function. The properties of an object can be referenced either with dot (`obj.prop`) or bracket notation (`obj['prop']`).

24. _If you want to include JavaScript on an HTML page, which tag do you use?_  
`<script>`

25. _Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?_  

26. _Which of the following correctly describes JSON?_  
JavaScript Object Notation (JSON) was conceived by Douglas Crockford in 2001 while working at Yahoo! JSON, pronounced like the name Jason, received official standardization in 2013 and 2017 (ECMA-404, RFC 8259).
JSON provides a simple, and yet effective way, to share and store data. By design, JSON is easily convertible to, and from, JavaScript objects. This make it a very convenient data format when working with web technologies. Because of its simplicity, standardization, and compatibility with JavaScript, JSON has become one of the world's most popular data formats.
A JSON document contains one of the following data types: `string`, `number`, `boolean`, `array`, `object`, or `null`. It cannot represent `undefined`.
Most commonly, a JSON document contains an object. Objects contain zero or more key-value pairs. The key is always a string, and the value must be one of the valid JSON data types. Key-value pairs are delimited with commas. Curly braces delimit an object, square brackets and commas delimit arrays, and strings are always delimited with double quotes.
You can convert JSON to and from JavaScript using the `JSON.parse` and `JSON.stringify` functions.

27. _What does the console command `chmod`, `pwd`, `cd`, `ls`, `vim`, `nano`, `mkdir`, `mv`, `rm`, `man`, `ssh`, `ps`, `wget`, and `sudo` do?_  
Change File Permissions: `chmod`  
Print Working Directory: `pwd`  
Change Directory: `cd`  
List: `ls`  
Vim: `vim`  
Nano: `nano`  
Make Directory: `mkdir`  
Move: `mv`  
Remove: `rm`  
Manual: `man`  
Secure Shell: `ssh`  
Process Status: `ps`  
Web Get: `wget`  
Superuser Do: `sudo`  

28. _Which of the following console command creates a remote shell session?_  
`ssh`

29. _Which of the following is true when the `-la` parameter is specified for the `ls` console command?_  
Long All: `-la`

30. _Which of the following is true for the domain name `banana.fruit.bozo.click`, which is the top level domain, which is a subdomain, which is a root domain?_  
![image](https://github.com/Spencer-Gardner/CS_260/assets/120418845/2ecca67a-a8a0-4c17-8a81-b22d84087518)

31. _Is a web certificate necessary to use HTTPS?_  
Yes, a web certificate, specifically an SSL/TLS certificate, is necessary to use HTTPS (Hypertext Transfer Protocol Secure) on a website. HTTPS is the secure version of HTTP, and it encrypts the data exchanged between a user's web browser and the web server. This encryption is essential for securing sensitive information, such as login credentials, personal data, and payment details, transmitted over the internet.

32. _Can a DNS A record point to an IP address or another A record?_  
The DNS database records that facilitate the mapping of domain names to IP addresses come in several flavors. The main ones we are concerned with are the address (A) and the canonical name (CNAME) records. An A record is a straight mapping from a domain name to an IP address. A CNAME record maps one domain name to another domain name. This acts as a domain name alias. You would use a CNAME to do things like map `byu.com` to the same IP address as `byu.edu` so that either one could be used.

33. _Port 443, 80, 22 is reserved for which protocol?_  
HTTPS: Port 443  
HTTP: Port 80  
SSH: Port 22  

34. _What will the following code using `Promise` output when executed?_  
```js
const delay = (msg, wait) => {
  setTimeout(() => {
    console.log(msg, wait);
  }, 1000 * wait);
};

new Promise((resolve, reject) => {
  // Code executing in the promise
  for (let i = 0; i < 3; i++) {
    delay('In promise', i);
  }
});

// Code executing after the promise
for (let i = 0; i < 3; i++) {
  delay('After promise', i);
}

// OUTPUT:
//   In promise 0
//   After promise 0
//   In promise 1
//   After promise 1
//   In promise 2
//   After promise 2
```
```js
coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed
```


## Final Study Guide

1. _What ports are used for HTTP, HTTPS, SSH?_
HTTP: Port 80
HTTPS: Port 443
SSH: Port 22

2. _What do HTTP status codes in the 300, 400, 500 range indicate?_
Redirection Messages
Client Error
Server Error

3. _What does the HTTP header content-type allows you to do?_
See Midterm

4. _What do the following attributes of a cookie do?_
Domain = 
Path = 
SameSite = Only return cookie to generated domain.
HTTPOnly = Prevent JavaScript from running on the browser until read.

5. _Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /foo/bar?_
Function, Order, Output

6. _Given the following Express service code: What does the following JavaScript fetch return?_
fetch is a front-end call that returns the results from communication with a server client.

7. _Given the following MongoDB query, `{ cost: { $gt: 10 }, name: /fran.*/}`, select all of the matching documents.
Select all documents with a cost greater than ten and name starting with fran. Returns an array

8. _How should you store user passwords in a database?_
Hashed and Salted

9. _Assuming the following Node.js service code is executing with websockets, what will be logged to the console of the web browser?_
Study Simon's Websocket (onconnect, ondisconnect, onmessage...)

10. _What is the WebSocket protocol used for?_
Connection where either server or client can initiate the contact.

11. _What is JSX and how are the curly braces rendered?_
JavaScript and HTML File
Anything within the return is rendered to the screen. Curly braces for functions and variables.

12. _Assuming an HTML document with `<div id="root"></div>`, what content will the following React component generate?
```jsx
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  function App() {
    return (
      <div>
        <Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
      </div>
    );
  }
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
```
```
  Hello, Sara
  Hello, Cahal
  Hello, Edite
```

13. _Assuming an HTML document with `<div id="root"></div>`, what content will the following React component generate?_
```jsx
  function Numbers() { 
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );
    return(<ul>{listItems}</ul>)
  }
  const root = ReactDOM.createRoot(document.getElementById('root')); 
  root.render(<Numbers/>);
```
```
* 1
* 2
* 3
* 4
* 5
```
    
14. _What does the following React component do?_
```jsx
  function Example() {
    // Declare a new state variable, which we'll call "count"  
    const [count, setCount] = useState(0);
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
```
Each click increments the count.

15. _What are React Hooks used for?_
Handle the state. Handle life-cycle events. Modify state of the component.

16. _What is the useEffect hook used for?_
Monitor life-cycle and modify a state in response to a change in another state.

17. _What does this code do?_
```jsx
  export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
```
Defines paths and reroutes/renders the corresponding component based on the path

18. _What role does npm play in web development?_
Manages Node packages; allows dowloading external packages

19. _What does package.json do in a npm project?_
Lists packages; specifies scripts such as for deployment 

20. _What does the fetch function do?_


21. _What does node.js do?_
Runs the server

22. _What does Vite do?_
Allows you to bundle all your React code for production and deployment
Transposing .jsx code to JavaScript allowing th browser to run it

