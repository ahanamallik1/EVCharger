/**
 * SimulationConfigForm component is a form used to configure the simulation parameters,
 * The form integrates react-hook-form for form validation and submission,
 * along with zod for schema validation.
 * It includes: Debounced slider value, Dynamic error handling, reusable components.
 */

import React from 'react';
import { useSimulationConfigForm } from '../hooks/useSimulationConfigForm';
import TextInput from './shared/TextInput';
import SliderInput from './shared/SliderInput';
import { Controller } from 'react-hook-form';
import useDebounce from '../hooks/useDebounce';
import { z } from 'zod';
import { SimulationConfigSchema } from '../schemas/SimulationCongigSchema';
import SubmitButton from './SubmitButton';
import WarningMessage from './shared/WarningMessage';

const SimulationConfigForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    errors,
    trigger,
    onSubmit,
    isButtonDisabled,
    watch,
  } = useSimulationConfigForm();

  // Watch values to update the button state immediately
  const watchedValues = watch();
  type SimulationConfig = z.infer<typeof SimulationConfigSchema>;

  // Watch and debounce the slider value
  const arrivalProbabilityValue = watchedValues.arrivalProbability || 0;
  const debouncedArrivalProbability = useDebounce(arrivalProbabilityValue, 300); // Debounce the value with a 300ms delay

  // Memoize the button disabled state to avoid recalculating on each render
  const isDisabled = isButtonDisabled(watchedValues);

  // A reusable error rendering function with type-safe access to errors
  const renderError = (field: keyof SimulationConfig) => {
    // Use keyof to ensure the field is valid and type-safe
    const error = errors[field];
    return error && <p className="text-red-500 text-sm">{error.message}</p>;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 -mt-20">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Simulation Configuration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Charge Points */}
            <Controller
              name="chargePoints"
              control={control}
              render={({ field }) => (
                <div>
                  <TextInput
                    label="Number of Charge Points"
                    {...field}
                    onBlur={() => {
                      field.onBlur(); // Mark field as touched
                      trigger('chargePoints'); // Trigger validation
                    }}
                  />
                  {renderError('chargePoints')} {/* Ensure type safety */}
                </div>
              )}
            />

            {/* Arrival Probability */}
            <Controller
              name="arrivalProbability"
              control={control}
              render={({ field }) => (
                <div>
                  <SliderInput
                    label="Arrival Probability Multiplier"
                    min={0}
                    max={200}
                    inputValue={debouncedArrivalProbability || field.value} // use debounced value or field value
                    {...field}
                  />
                  {renderError('arrivalProbability')} {/* Ensure type safety */}
                </div>
              )}
            />
            {/* Display warning reusable component when arrivalProbability is less than 20 */}
            {arrivalProbabilityValue < 20 && <WarningMessage />}

            {/* Car Consumption */}
            <Controller
              name="carConsumption"
              control={control}
              render={({ field }) => (
                <div>
                  <TextInput
                    label="Consumption of Cars (kWh)"
                    {...field}
                    onBlur={() => {
                      field.onBlur();
                      trigger('carConsumption');
                    }}
                  />
                  {renderError('carConsumption')}
                </div>
              )}
            />

            {/* Charging Power */}
            <Controller
              name="chargingPower"
              control={control}
              render={({ field }) => (
                <div>
                  <TextInput
                    label="Charging Power per Charge Point (kW)"
                    {...field}
                    onBlur={() => {
                      field.onBlur();
                      trigger('chargingPower');
                    }}
                  />
                  {renderError('chargingPower')} {/* Ensure type safety */}
                </div>
              )}
            />
          </div>

          {/* Submit Button */}
          <SubmitButton isDisabled={isDisabled} />
        </form>
      </div>
    </div>
  );
};

export default SimulationConfigForm;
