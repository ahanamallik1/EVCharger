/**
 * Custom hook to manage and validate charging station configuration form.
 */

import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChargingStationConfigSchema } from '../schemas/ChargingStationConfigSchema';
import { useDispatch } from 'react-redux';
import {
  addChargePoint,
  setChargingStationConfig,
} from '../slices/ChargingStationConfigSlice';
import { useNavigate } from 'react-router-dom';

// Define the type based on the ChargingStationConfigSchema
type ChargingStationConfig = z.infer<typeof ChargingStationConfigSchema>;

export const useChargingStationConfigForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set up the form with react-hook-form and Zod schema validation
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    watch,
  } = useForm<ChargingStationConfig>({
    resolver: zodResolver(ChargingStationConfigSchema),
    defaultValues: {
      arrivalProbability: 100,
      carConsumption: 18,
      chargePointTypes: [{ quantity: 1, power: 22 }],
    },
  });

  // Watch chargePointTypes dynamically from the form
  const [chargePointTypes, setChargePointTypes] = useState(
    watch('chargePointTypes'),
  );

  // Memoize the onSubmit function
  const onSubmit = useCallback(
    (data: ChargingStationConfig) => {
      // Dispatch the action to update Redux state
      dispatch(setChargingStationConfig(data));
      // Navigate to the results page
      navigate('/chargingStationResults');
    },
    [dispatch, navigate],
  );

  // Function to handle adding a new charge point
  const handleAddChargePoint = () => {
    const newChargePoint = {
      quantity: 1,
      power: 22,
    };
    setChargePointTypes((prev) => {
      const updatedChargePointTypes = [...prev, newChargePoint];
      return updatedChargePointTypes;
    });
    dispatch(addChargePoint(newChargePoint));
  };

  // Watch the form values
  const watchedValues = watch();

  // Determine if the submit button should be disabled based on the form values
  const isButtonDisabled = useMemo(() => {
    const isAnyValueInvalid = Object.entries(watchedValues).some(
      ([key, value]) => {
        if (key === 'chargePointTypes') return false;
        if (typeof value === 'number') {
          return value <= 0 || value === undefined || value === null;
        }

        return false;
      },
    );
    const isChargePointTypesInvalid = chargePointTypes.some(
      (point) =>
        point.quantity < 1 ||
        point.power < 1 ||
        point.quantity === undefined ||
        point.power === undefined,
    );
    const isChargePointTypesEmpty = chargePointTypes.length === 0;
    return (
      isAnyValueInvalid || isChargePointTypesInvalid || isChargePointTypesEmpty
    );
  }, [watchedValues, chargePointTypes]);

  return {
    control,
    handleSubmit,
    setValue,
    trigger,
    errors,
    chargePointTypes,
    handleAddChargePoint,
    onSubmit,
    isButtonDisabled,
    watch,
  };
};
