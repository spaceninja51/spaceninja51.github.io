// Create the <nav> element that will serve
// as the navigation bar container
const navMenu = document.createElement('nav');
navMenu.id = 'siteMenu';

// Create a <link> element to include the external CSS 
// stylesheet for styling the navigation bar
const styleSheet = document.createElement('link');
styleSheet.rel = 'stylesheet';
styleSheet.href = '/components/css/nav-bar-v2.css';

// Function to define the menu items as an array of objects
// TODO: Build menu array from directory
defineMenuItems = () => {
    return [
        {text: 'Home', href: '/index.html'},
        // Below this, items go to the right
        {text: 'My Github', href: 'https://github.com/spaceninja51', target: '_blank', class: 'right'},
        {text: 'This Repo', href: 'https://github.com/spaceninja51/spaceninja51.github.io', target: '_blank'}
    ]
}

// Array to store menu items; dynamically populated later
const menuItems = [];

// Function to create a single menu item as an <a> 
// (anchor) element
const createMenuItem = (item) => {
    const menuItem = document.createElement('a');
    menuItem.textContent = item.text;
    menuItem.href = item.href;
    // Adds the class if present
    if (item.class) menuItem.classList.add(item.class);
    // Sets the link target if present
    if (item.target) menuItem.target = item.target;
    return menuItem;
};

// Function to render the navigation 
// menu and attach it to the DOM
// Determines and sets the active page
const renderNavMenu = () => {
    const menuItems = defineMenuItems();
    menuItems.forEach(item => {
        const menuItem = createMenuItem(item);
        if (item.text == document.getElementById("page").textContent) {
            menuItem.classList.add('active');
        }
        navMenu.appendChild(menuItem);

    });
    
    document.body.prepend(navMenu);
};

// Generate and display the navigation menu
document.head.appendChild(styleSheet);
renderNavMenu();