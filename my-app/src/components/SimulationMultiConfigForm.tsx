/**
 * Form for configuring simulation of mixed type charging stations, including arrival probability,
 * car consumption, and dynamic charge point types. Uses `react-hook-form` and `zod`
 * for validation with debounced inputs.
 */

import React from 'react';
import { Controller } from 'react-hook-form';
import TextInput from './shared/TextInput';
import SliderInput from './shared/SliderInput';
import { useChargingStationConfigForm } from '../hooks/useChargingStationConfigForm';
import { z } from 'zod';
import { ChargingStationConfigSchema } from '../schemas/ChargingStationConfigSchema';
import SubmitButton from './SubmitButton';
import useDebounce from '../hooks/useDebounce';
import WarningMessage from './shared/WarningMessage';

const SimulationConfigForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    trigger,
    errors,
    chargePointTypes,
    handleAddChargePoint,
    onSubmit,
    watch,
    isButtonDisabled,
  } = useChargingStationConfigForm();

  // Define the type of Charging Station configuration using the Zod schema for validation
  type ChargingStationConfig = z.infer<typeof ChargingStationConfigSchema>;

  // Helper function to render error messages for form fields
  const renderError = (field: keyof ChargingStationConfig) => {
    const error = errors[field];
    return error && <p className="text-red-500 text-sm">{error.message}</p>;
  };

  // Watch the form values for the 'arrivalProbability' field to use debouncing
  const watchedValues = watch();
  const arrivalProbabilityValue = watchedValues.arrivalProbability || 0;

  // Reuse custom hook `useDebounce` to delay changes in 'arrivalProbability'
  const debouncedArrivalProbability = useDebounce(arrivalProbabilityValue, 300);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 -mt-5 mb-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Simulation Configuration <p> (Mixed Charge Point Types) </p>
        </h2>
        {/* Form submission handler */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Slider for Arrival Probability Multiplier */}
          <Controller
            name="arrivalProbability"
            control={control}
            render={({ field }) => (
              <SliderInput
                label="Arrival Probability Multiplier"
                min={0}
                max={200}
                inputValue={debouncedArrivalProbability || field.value}
                {...field}
              />
            )}
          />
          {/* Display error for arrivalProbability */}
          {renderError('arrivalProbability')}
          {/* Show warning reusable component if arrival probability is below 20 */}
          {arrivalProbabilityValue < 20 && <WarningMessage />}
          {/* Input for Car Consumption (kWh) */}
          <Controller
            name="carConsumption"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Consumption of Cars (kWh)"
                {...field}
                onBlur={() => {
                  field.onBlur();
                  trigger('carConsumption'); // Trigger validation when the input loses focus
                }}
              />
            )}
          />
          {renderError('carConsumption')}
          {/* Display error for carConsumption */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Charge Point Types
            </label>

            {/* Dynamically render inputs for each charge point type */}
            {chargePointTypes.map((point, index) => (
              <div key={index} className="flex space-x-4">
                {/* Controller for Quantity of Charge Points */}
                <Controller
                  name={`chargePointTypes.${index}.quantity`}
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Quantity"
                      {...field}
                      onBlur={() => {
                        field.onBlur();
                        trigger(`chargePointTypes.${index}.quantity`);
                      }}
                      min={1}
                    />
                  )}
                />
                {/* Controller for Power of Charge Points (kW) */}
                <Controller
                  name={`chargePointTypes.${index}.power`}
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Power (kW)"
                      {...field}
                      onBlur={() => {
                        field.onBlur();
                        trigger(`chargePointTypes.${index}.power`);
                      }}
                      min={1}
                    />
                  )}
                />
              </div>
            ))}
            {/* Button to add a new charge point type */}
            <button
              type="button"
              onClick={handleAddChargePoint}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
            >
              Add Charge Point Type
            </button>
            <p className="text-blue-500 text-sm mt-2">
              Quantity and Power must be at least 1 for each charge point type.
            </p>
          </div>
          {/* Submit Button */}
          <div className="mt-6">
            <div className="mt-6">
              <SubmitButton isDisabled={isButtonDisabled} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimulationConfigForm;
