import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default localStorage for web
import SimulationParamsReducer from '../slices/SimulationParametersSlice';
import ChargingStationReducer from '../slices/ChargingStationConfigSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['formSubmitted'],
  whitelist: ['simulationParams', 'chargingStationConfig'],
};

// Wrap both reducers with persistReducer
const persistedSimulationParamsReducer = persistReducer(
  persistConfig,
  SimulationParamsReducer,
);

const persistedChargingStationReducer = persistReducer(
  persistConfig,
  ChargingStationReducer,
);

const store = configureStore({
  reducer: {
    simulationParams: persistedSimulationParamsReducer, // Persisted SimulationParams reducer
    chargingStationConfig: persistedChargingStationReducer, // Persisted ChargingStation reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a persistor for the store
export const persistor = persistStore(store);

export default store;
