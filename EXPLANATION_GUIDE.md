# Developer Explanation Guide: PopX Mobile App

This guide is designed for developers who know basic HTML and CSS and want to understand how this React application is structured, how the code flows, and how React manages dynamic page changes.

---

## 📂 File Structure Map (What is in Which File)

Here is a map of the key files in your `assignment` directory and what they do:

### 1. Root Level (Configuration & Entry)
* **`public/index.html`**
  * *What it is:* The entry HTML template loaded by the browser.
  * *What it contains:* The root `<div>` where React renders the app, and Google Font links (`Inter`) in the `<head>`.
* **`package.json`**
  * *What it is:* The project configuration file.
  * *What it contains:* The scripts (like `start` and `build`) and packages needed for the Webpack-based compilation.
* **`.gitignore`**
  * *What it is:* Git version control config.
  * *What it contains:* Tells Git to ignore folders like `node_modules` and `build` when tracking changes.

### 2. Source Folder (`/src`)
* **`src/index.js`**
  * *What it is:* The entry Javascript file.
  * *What it contains:* Launches React and injects the `<App />` component into the HTML's `<div id="root">`.
* **`src/App.js`**
  * *What it is:* The core layout and application logic file.
  * *What it contains:* The page navigation state, the form elements, inputs, buttons, and state updating functions.
* **`src/index.css`**
  * *What it is:* The stylesheet.
  * *What it contains:* Mobile frame styling, colors, centering layout, floating labels, custom radios, and page transitions.

### 3. Assets Folder (`/src/assets`)
* **`src/assets/marry_doe.png`**
  * *What it is:* An image file.
  * *What it contains:* The professional avatar picture displayed on the Profile (Account Settings) screen.

---

## 1. Project Flow Overview

The app is built as a **Single Page Application (SPA)**. Instead of loading new HTML files from a server when you click a link, React swaps out different segments of HTML dynamically in the browser.

```
       [ Welcome Screen ]
          /           \
   (Create Account)  (Login Button)
        /               \
 [ Signup Form ]     [ Login Form ]
        \               /
     (Submit Form / Validated)
          \           /
       [ Profile Screen ]
```

---

## 2. HTML Tags Used & Why

In React, we write HTML tags inside Javascript files. This is called **JSX**. Here are the tags used in this project and why they were chosen:

### Shell/Containers
* **`<div>`**: Used as generic boxes to group sections (like `.phone-container` to represent the phone shell and `.input-group` to wrap each input field).
* **`<span>`**: Used for short inline text elements, like the purple header text on the Profile screen or form asterisks.

### Forms and Inputs
* **`<form>`**: Wraps inputs. Using a form allows the user to submit by pressing the "Enter" key, which matches default browser behavior.
* **`<input>`**: The interactive fields where the user types data. We use:
  * `type="text"` for name and company.
  * `type="tel"` for phone numbers.
  * `type="email"` for email validation.
  * `type="password"` to hide characters.
  * `type="radio"` for selecting "Yes" or "No" agency status.
* **`<label>`**: Holds the description of the input. In our CSS, we position it directly over the input and animate it upward when the input becomes active.

### Actions
* **`<button>`**: Clickable triggers.
  * Buttons with `type="submit"` send the form.
  * Buttons with `type="button"` perform custom actions (like going "Back" or "Logging out").
  * We use the `disabled` property to lock the button if required fields are empty.

---

## 3. React Concepts & Logic Explained

React goes beyond simple HTML by introducing **components**, **state**, and **dynamic event handling**.

### A. What is a Component?
A React component is a JavaScript function that returns HTML structure. In this project, `App()` in `src/App.js` is the main component. It acts like a builder that packages the HTML elements and returns them to the screen.

### B. What is "State" (`useState`)?
In traditional HTML/CSS, you cannot store variables that change dynamically. In React, we use **State** via the `useState` hook. State is a special memory container. When state changes, React immediately re-draws (re-renders) the page to reflect the new data.

We define state like this:
```javascript
const [screen, setScreen] = useState('welcome');
```
* `screen`: The current value (starts as `'welcome'`).
* `setScreen`: The action function used to change that value. Calling `setScreen('signup')` tells React to immediately redraw the page showing the signup screen.

### C. Conditional Rendering (Screen Swapping)
To display different pages without loading new HTML files, we use Javascript conditions inside the HTML:
```jsx
{screen === 'welcome' && (
  <div className="welcome-screen">
     {/* Welcome HTML elements go here */}
  </div>
)}
```
* If `screen` matches `'welcome'`, the browser displays the Welcome Screen.
* If `screen` changes to `'signup'`, the Welcome screen is unmounted, and the Signup screen is rendered instead.

### D. Syncing User Typing with State (Controlled Inputs)
To make sure React knows what the user has typed, we link the input values directly to our React state. 

1. We store inputs inside a state object:
   ```javascript
   const [formData, setFormData] = useState({
     fullName: '',
     email: '',
     // ... other fields
   });
   ```
2. We connect the input value to the state:
   ```jsx
   <input value={formData.fullName} onChange={handleSignupChange} />
   ```
3. Whenever a key is pressed, the `onChange` event fires and triggers `handleSignupChange`:
   ```javascript
   const handleSignupChange = (e) => {
     const { name, value } = e.target; // Gets the field name (e.g. 'fullName') and typed value
     setFormData((prev) => ({
       ...prev,          // Copies the previous fields (so they don't get erased)
       [name]: value,    // Replaces the specific field with the new text
     }));
   };
   ```

### E. Events and DOM Interactions
* **`onClick`**: Triggers a function when an element is clicked.
  * Example: `onClick={() => setScreen('login')}` changes the current screen state to `'login'`.
* **`onSubmit`**: Triggers when a form is submitted (e.g., clicking a submit button).
  * We use `e.preventDefault()` inside the submission function. This is critical because standard HTML forms reload the entire page on submit. `preventDefault` stops this reload so React can handle the submission smoothly inside the single page.
