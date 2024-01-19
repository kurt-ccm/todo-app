## Todo App

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



## About The Project

This application is a lightweight interface for interacting with a Todo List API. You can add todo items, update their status when they are done (or if you need more time), and delete them individually. In addition, there is functionality to search the list of retrieved todos by text, sort alphabetically, and filter by their "Completed" status. I hope you enjoy using our app!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With:
[![Vue][Vue.js]][Vue-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Getting Started

### Prerequisites

The first thing you will need is to make sure npm is installed on your machine:

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kurt-ccm/todo-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the server
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

On page load, the site should populate with todo data. If no data is available, a message will appear. Simply create your own todo by clicking the "Create a new todo" button and putting in your information for name and checking the box if the todo is completed.

Clicking the "Reset" button at any time restores the data to it's original state from the server.

In addition, you can click either of the buttons next to "Create a new todo" to filter only completed/not completed todos.

There are also arrow buttons in the "Title" header of the data table. Clicking the up arrow sorts the table alphabetically by todo title; the down arrow sorts in reverse.

You can change an individual todo's completed status by clicking the appropriate button under the "Actions" header in the table, for that respective element. There is also a "Delete" button here which removes the todo from the server. Clicking either of these buttons will refresh the information on the page so you are always getting up-to-the-second information.

Finally, you can search the todos list by entering your text in the search bar directly above the table. Clicking "Search" will filter the table with only todos that contain those characters in their title.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Kurt Riecken  - [Email me directly](kurt.riecken@myccmortgage.com)

Project Link: [Github project repository](https://github.com/kurt-ccm/todo-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
