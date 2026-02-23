1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: (**) getElementById
                                       
* Finds one element using its id.
* Since an id should be unique, it returns a single element.
* Very fast and straightforward.

(**) getElementByClass

* Finds elements using a class name.
* access live HTMLCollection.
* “Live” DOM changes, the list updates automatically.
* Even if there’s only one element with that class, still get a collection, so this need to access by index number.

(**) querySelector

* use this method by access First Element that matches a CSS selector.
* Very flexible because we can use any CSS selector.

(**) querySelectorAll
* all elements that match like a CSS selector.
* A static NodeList it is not live .
* if DOM changes later, this list won’t update automatically.

2. How do you create and insert a new element into the DOM?

Ans: we can create element to use createElement syntax and insert new element through innerHTML = `content`.

3. What is Event Bubbling? And how does it work?

Ans: When click the button, the event doesn’t just stay on the button. It travels upward through its parent elements. That upward movement is called Event Bubbling.

4. What is Event Delegation in JavaScript? Why is it useful?

Ans: Event delegation is a design pattern in JavaScript.
it's useful for 
Improved Performance,
Readable code,
Easy to handles dynamic content 

5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: event.preventDefault() stops the browser's default action for a given event.
     event.stopPropagation() stops the event from moving further up or down in DOM Tree.