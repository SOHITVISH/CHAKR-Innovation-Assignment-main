# Dashboard App with Dynamic Graph 

Visit the App :- [DASHBOARD](https://chakr-innovation-assignment.vercel.app/)

![CHAKR_UI_1](/CHAKR_UI_1.png);

![CHAKR_UI_2](/CHAKR_UI_2.png);

![CHAKR_UI_3](/CHAKR_UI_3.png);


## Table of Contents

- [Dashboard App with Dynamic Graph](#dashboard-app-with-dynamic-graph)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Features](#features)
  - [Component Architecture](#component-architecture)

## Introduction

This project is a web application developed using React and tailored for data visualization and interaction. It includes a custom frontend dashboard with a backend graph integration, showcasing interactive and dynamic data representation.

## Installation

To get started with this project, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
npm install
npm run dev
```


## Features

- **Interactive Graph Component**: Visualizes data relationships using Chart.js, featuring a sophisticated downsampling algorithm for efficient large dataset handling.
- **Dynamic Sidebar**: A collapsible sidebar with navigation items, including support for nested items and responsive design.
- **Scroll-to-Top Button**: A user-friendly feature for scrolling to the top of the page, enhancing navigation in long-scroll interfaces.
- **Data Fetching**: Automated data loading from a CSV file located in the public folder, enabling seamless data integration.
- **Customer Component**: Displays Customer details customizing each customer item.
## Component Architecture 

The application's component architecture is designed for modularity and reusability:

- **GraphComponent**: Responsible for rendering the interactive graph.
- **Sidebar**: A collapsible navigation sidebar with support for multiple items and responsive design.
- **FileUpload**: Handles the mounting and parsing of CSV data files.
- **ScrollToTopButton**: A floating button that appears on scroll and enables users to easily return to the top of the page.