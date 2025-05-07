
**EV Charger Power and Energy Consumption Simulation**
Introduction
As a shop owner with 200 parking spaces, you're observing an increasing number of electric vehicles (EVs) parking in your lot. 
To accommodate this trend, we are planning to install EV charge points.

**Why This Matters**
Installing 20 charging stations with a maximum charging speed of 11kW each results in a theoretical maximum power demand of 220kW.
This is an expensive figure that may require a new, more powerful grid connection. However, it's statistically unlikely for all 20 chargers to operate at full power simultaneously.
By simulating how electric chargers are used, we can estimate the total energy consumption (kWh), peak power loads (kW), and how these figures change with the number of charge points 
installed. This simulation helps in making informed decisions about infrastructure investments and energy requirements.

Installation
1.Navigate to the folder cd my-app
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

4.Configure Simulation Parameters (With Mutiple type Charge Points)

    - UI with different types of Charge points (User can add mutiple types of charge points).
        For exaple (e.g. 5 x 11kW, 3 x 22kW, 1 x 50kW).
    - Arrival Probability.
    - Car Consumption.

5.View Simulation Output: (Metrics)

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
