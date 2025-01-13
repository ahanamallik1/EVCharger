Charging Station Simulation - Frontend
This project visualizes the input parameters for a simulation of electric vehicle (EV) charging stations and displays various output metrics. The application uses React, Typescript, and TailwindCSS for creating a responsive and user-friendly interface.

Installation
1.Download the folder <ahana-task2-frontend> and if required unzip it.
2.Navigate to the folder <my-app>
2.Run the following commands in the terminal

- Install Dependencies - yarn install
- Run the Development Server - yarn start

Usage

1.Open the Application: Open your web browser and navigate to http://localhost:3000

2.Configure Simulation Parameters: (With Uniform Charge Points)

    - Number of Charge points
    - Arrival Probability
    - Car Consumption
    - Charging Power per Charge Point

3.View Simulation Output: (Metrics)

    - Total Energy Charged per Day (in KWh)
    - Charging Events per Day/Week/Month/Year
    - Total Capacity per day (in KWh)
    - The charging values (in kW) per chargepoint at a useful aggregation level (daily Basis).
    - Utilization Rate (in %) (Exemplary day)
    - Concurrency Factor (in %) (varies based on arrival probability and Charge points)
    - There are also Charts to visulize the metrics

4.Configure Simulation Parameters (Bonus Task): - (With Mixed Charge Points)

    - UI with different types of Charge points (User can add mutiple types of charge points).
        For exaple (e.g. 5 x 11kW, 3 x 22kW, 1 x 50kW).
    - Arrival Probability.
    - Car Consumption.

5.View Simulation Output: (Bonus Task): - (Metrics)

    - Total Energy Charged per Day (in kWh)
    - Total Power Consumed by Charge Points (kW).
    - Charging Events per Day/Week/Month/Year.
    - Total Capacity per Day (in kWh)
    - Utilization Rate (in %) (Exemplary day).
    - Concurrency Factor (in %) (varies based on arrival probability and Charge points).
    - Tabular view of charge points distribution.

6.Concurrency Deviation is displayed after User submits both the forms (Uniform Charging Points) and (Mixed Charging Points)

7.Code Structure

    - src/components: Contains React components for the input form, charts, and other UI elements.
    - src/schemas: Zod schemas for form validation.
    - src/hooks: Custom hooks for form management and debouncing.
    - src/slices: Redux slices for managing application state.
    - src/store: Redux store.
    - src/selectors: On-demand calculations based on user inputs.
    - src/types: Specify the variable types used.
    - src/utils: Helper Functions.
    - src/data: Metrics data needed to display the output.
    - src/visualization: Chart vissulization data.

8.Dependencies

    - React: JavaScript library for building user interfaces.
    - Typescript: Typed superset of JavaScript for type safety.
    - TailwindCSS: Utility-first CSS framework for styling.
    -  React Hook Form: Forms library for managing form state and validation.
    -  Chart.js: Library for creating charts and graphs.
    - Zod: TypeScript-first schema declaration and validation library.
    - Redux Toolkit: State management library.
    - Redux-persist: Persist the store.
    - React-icons: For icons used in project.
    - React-router-dom: For seamless user navigation.
