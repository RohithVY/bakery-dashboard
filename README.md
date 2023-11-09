# Baker Delights Dashboard

This is a React-based dashboard application for a bakery. It displays various charts and statistics based on the data provided.

## Features

- Display charts and statistics for orders, prices, and items
- Filter charts based on date range
- Display top contributors
- Interactive charts that allow users to zoom in/out, select different items and order states

## Installation

### Client side setup

1. Clone the repository and open client folder in terminal
2. Install dependencies with `npm install`
3. Start the application with `npm run dev`
  - <b><i>Note: This application is a standalone client-side application. However, if you wish to integrate it with server-side code, please follow the server-side code setup instructions first. Once the server-side setup is complete, you can uncomment the server-side API URL in the `src/api/orders.jsx` file on the client side.</i></b>

### Server side setup

1. Clone the repository and open server folder in terminal
2. Install dependencies with `npm install`
3. Start the application with `npm run dev`

## Usage

The dashboard can be accessed by navigating to `http://localhost:5173/` in your web browser.


## Screenshots

![image](https://github.com/RohithVY/bakery-dashboard/assets/110025038/1642082e-3a8c-4f70-941c-59033c2ae8ac)

![image](https://github.com/RohithVY/bakery-dashboard/assets/110025038/d0290a22-fe3a-4574-a46e-3a3ef093aa09)

  
## Components

### `Charts`

This component displays various charts based on the data provided. It uses Redux to manage state, and React-Redux to connect to the Redux store.

### `BarChart`

This component displays a bar chart based on the provided data. It allows users to select different items and order states, and displays a chart based on their selection.

### `TimeSeries`

This component displays a time series chart based on the provided data.

### `TopContributors`

This component displays the top contributors based on the provided data.


