// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.replace('light-mode', 'dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Theme toggle button click event
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.replace('light-mode', 'dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Code examples modal functionality
    const modal = document.getElementById('codeModal');
    const modalTitle = document.getElementById('modalTitle');
    const codeExample = document.getElementById('codeExample').querySelector('code');
    const explanationDiv = document.createElement('div'); // Create explanation div
    explanationDiv.id = 'codeExplanation';
    explanationDiv.className = 'code-explanation';
    document.querySelector('.modal-content').insertBefore(explanationDiv, document.getElementById('learnMoreLink')); // Add it to DOM
    
    const learnMoreLink = document.getElementById('learnMoreLink');
    const closeButton = document.querySelector('.close-button');
    const codeLinks = document.querySelectorAll('.code-example-link');

    // Sample code examples with explanations
    const codeExamples = {
        html: {
            title: 'HTML Example',
            code: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My First HTML Page</title>\n</head>\n<body>\n    <h1>Hello World!</h1>\n    <p>This is a paragraph of text.</p>\n    <ul>\n        <li>List item 1</li>\n        <li>List item 2</li>\n        <li>List item 3</li>\n    </ul>\n</body>\n</html>',
            explanation: `<h3>How This HTML Code Works:</h3>
            <ul>
                <li><code><!DOCTYPE html></code>: Declares the document type and HTML version</li>
                <li><code><html></code>: The root element of the HTML page</li>
                <li><code><head></code>: Contains meta-information about the document</li>
                <li><code><title></code>: Sets the title of the page (appears in browser tab)</li>
                <li><code><body></code>: Contains all the content visible on the page</li>
                <li><code><h1></code>: Creates a main heading</li>
                <li><code><p></code>: Creates a paragraph</li>
                <li><code><ul></code> & <code><li></code>: Creates an unordered list with list items</li>
            </ul>
            <p>This basic structure forms the foundation of every HTML document</p>`,
            link: 'https://www.w3schools.com/html/'
        },
        css: {
            title: 'CSS Example',
            code: 'body {\n    font-family: Arial, sans-serif;\n    background-color: #f0f0f0;\n    margin: 0;\n    padding: 20px;\n}\n\nh1 {\n    color: #333;\n    text-align: center;\n}\n\n.container {\n    max-width: 800px;\n    margin: 0 auto;\n    background: white;\n    padding: 20px;\n    border-radius: 5px;\n    box-shadow: 0 0 10px rgba(0,0,0,0.1);\n}',
            explanation: `<h3>How This CSS Code Works:</h3>
            <ul>
                <li><code>body { }</code>: Styles the entire document body
                    <ul>
                        <li><code>font-family</code>: Sets the text font with fallback options</li>
                        <li><code>background-color</code>: Sets the page background using hex color</li>
                        <li><code>margin/padding</code>: Controls spacing around elements</li>
                    </ul>
                </li>
                <li><code>h1 { }</code>: Styles all h1 headings
                    <ul>
                        <li><code>color</code>: Sets text color</li>
                        <li><code>text-align</code>: Centers the text</li>
                    </ul>
                </li>
                <li><code>.container { }</code>: Styles elements with class="container"
                    <ul>
                        <li><code>max-width</code>: Limits width but allows responsiveness</li>
                        <li><code>margin: 0 auto</code>: Centers the container horizontally</li>
                        <li><code>box-shadow</code>: Creates a subtle shadow effect</li>
                    </ul>
                </li>
            </ul>
            <p>CSS uses selectors (like element names or class names) followed by properties inside curly braces.</p>`,
            link: 'https://www.w3schools.com/css/'
        },
        php: {
            title: 'PHP Example',
            code: '<?php\n// Define variables\n$greeting = "Hello, World!";\n$colors = ["Red", "Green", "Blue"];\n\n// Display a greeting\necho "<h1>" . $greeting . "</h1>";\n\n// Loop through an array\necho "<ul>";\nforeach ($colors as $color) {\n    echo "<li>" . $color . "</li>";\n}\necho "</ul>";\n\n// Simple function\nfunction addNumbers($a, $b) {\n    return $a + $b;\n}\n\necho "2 + 3 = " . addNumbers(2, 3);\n?>',
            explanation: `<h3>How This PHP Code Works:</h3>
            <ul>
                <li><code><?php ... ?></code>: PHP code must be enclosed in these tags</li>
                <li><code>$greeting = "Hello, World!";</code>: Defines a string variable (variables start with $)</li>
                <li><code>$colors = ["Red", "Green", "Blue"];</code>: Creates an array variable</li>
                <li><code>echo "</code>: Outputs content to the browser</li>
                <li><code>.</code>: The concatenation operator to join strings</li>
                <li><code>foreach ($colors as $color) { }</code>: Loop through each item in the array</li>
                <li><code>function addNumbers($a, $b) { }</code>: Defines a reusable function</li>
                <li><code>return $a + $b;</code>: Returns the sum of two parameters</li>
            </ul>
            <p>PHP is a server-side language that can generate dynamic HTML content.</p>`,
            link: 'https://www.php.net/manual/en/tutorial.php'
        },
        js: {
            title: 'JavaScript Example',
            code: '// Variables and data types\nconst greeting = "Hello, World!";\nconst colors = ["Red", "Green", "Blue"];\n\n// Function declaration\nfunction displayGreeting() {\n    document.getElementById("greeting").textContent = greeting;\n}\n\n// Array manipulation with arrow function\nconst colorItems = colors.map(color => `<li>${color}</li>`);\n\n// DOM manipulation\ndocument.addEventListener("DOMContentLoaded", () => {\n    displayGreeting();\n    document.getElementById("colorList").innerHTML = colorItems.join("");\n    \n    // Event listener\n    document.getElementById("changeBtn").addEventListener("click", () => {\n        document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];\n    });\n});',
            explanation: `<h3>How This JavaScript Code Works:</h3>
            <ul>
                <li><code>const greeting = "Hello, World!";</code>: Declares a constant variable</li>
                <li><code>const colors = ["Red", "Green", "Blue"];</code>: Creates an array</li>
                <li><code>function displayGreeting() { }</code>: Declares a named function</li>
                <li><code>document.getElementById()</code>: Retrieves an HTML element by its ID</li>
                <li><code>colors.map(color => \`<li>\${color}</li>\`)</code>: 
                    <ul>
                        <li>Modern arrow function syntax</li>
                        <li>Maps each array item to create HTML list items</li>
                        <li>Template literals (\`\`) allow embedding variables with \${}</li>
                    </ul>
                </li>
                <li><code>document.addEventListener("DOMContentLoaded", () => { });</code>: Runs code after page loads</li>
                <li><code>addEventListener("click", () => { });</code>: Sets up a click event handler</li>
                <li><code>Math.floor(Math.random() * colors.length)</code>: Generates a random index number</li>
            </ul>
            <p>JavaScript allows you to create interactive web elements and manipulate the page content.</p>`,
            link: 'https://www.w3schools.com/js/'
        }
    };

    // Open modal with appropriate content when clicking on code links
    codeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const codeType = this.getAttribute('data-type');
            const example = codeExamples[codeType];
            
            if (example) {
                modalTitle.textContent = example.title;
                codeExample.textContent = example.code;
                explanationDiv.innerHTML = example.explanation; // Add the explanation
                learnMoreLink.href = example.link;
                modal.classList.add('show');
            }
        });
    });

    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            // Simple search implementation - you could enhance this
            window.open(`https://www.google.com/search?q=${encodeURIComponent('web development ' + searchTerm)}`, '_blank');
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Add vintage paper effect to elements (subtle animation)
    const contentElements = document.querySelectorAll('.content, .sidebar, .header');
    
    contentElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            // Subtle shadow movement for vintage paper effect
            element.style.boxShadow = `
                0 10px 20px rgba(0, 0, 0, 0.1),
                ${(xPercent - 0.5) * 10}px ${(yPercent - 0.5) * 10}px 30px rgba(0, 0, 0, 0.05)
            `;
        });
        
        element.addEventListener('mouseleave', function() {
            // Reset shadow to default
            element.style.boxShadow = '';
        });
    });
    
    // Background animation - random moving gold boxes
    const wrap = document.querySelector('.wrap');
    const boxContainer = document.createElement('div');
    boxContainer.className = 'background-animation-container';
    
    // Insert the box container before the first child of wrap
    wrap.insertBefore(boxContainer, wrap.firstChild);
    
    // Create multiple boxes
    const numberOfBoxes = 10;
    
    for (let i = 0; i < numberOfBoxes; i++) {
        createRandomBox(boxContainer);
    }
    
    function createRandomBox(container) {
        const box = document.createElement('div');
        box.className = 'animated-box';
        
        // Random size between 10px and 30px
        const size = Math.floor(Math.random() * 20) + 10;
        box.style.width = `${size}px`;
        box.style.height = `${size}px`;
        
        // Random initial position within container
        const posX = Math.floor(Math.random() * 90);
        const posY = Math.floor(Math.random() * 90);
        box.style.left = `${posX}%`;
        box.style.top = `${posY}%`;
        
        // Random opacity between 0.1 and 0.4
        const opacity = (Math.random() * 0.3) + 0.1;
        box.style.opacity = opacity;
        
        // Random animation duration between 20s and 50s
        const duration = Math.floor(Math.random() * 30) + 20;
        box.style.animationDuration = `${duration}s`;
        
        // Random initial delay up to 5s
        const delay = Math.random() * 5;
        box.style.animationDelay = `-${delay}s`;
        
        container.appendChild(box);
    }
});