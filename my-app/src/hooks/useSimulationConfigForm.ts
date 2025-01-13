/**
 * Custom hook for managing the simulation configuration form.
 * It utilizes `react-hook-form` for form handling and `zod` for schema validation.
 */

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SimulationConfigSchema } from '../schemas/SimulationCongigSchema';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setSimulationParams } from '../slices/SimulationParametersSlice';
import { useNavigate } from 'react-router-dom';

type SimulationConfig = z.infer<typeof SimulationConfigSchema>;

export const useSimulationConfigForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<SimulationConfig>({
    resolver: zodResolver(SimulationConfigSchema),
    defaultValues: SimulationConfigSchema.parse({}),
    mode: 'onBlur',
  });

  // Memoize the submit function
  const onSubmit = useCallback(
    (data: SimulationConfig) => {
      const {
        chargePoints,
        arrivalProbability,
        carConsumption,
        chargingPower,
      } = data;
      dispatch(
        setSimulationParams({
          chargePoints: chargePoints,
          arrivalProbability: arrivalProbability,
          carConsumption: carConsumption,
          chargingPower: chargingPower,
        }),
      );

      navigate('/results');
    },
    [dispatch, navigate],
  );

  const isButtonDisabled = useMemo(() => {
    return (watchedValues: SimulationConfig) => {
      return Object.values(watchedValues).some((value) => value <= 0);
    };
  }, []);

  return {
    control,
    handleSubmit,
    errors,
    trigger,
    onSubmit,
    isButtonDisabled,
    watch,
  };
};
