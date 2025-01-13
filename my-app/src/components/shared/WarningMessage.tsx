/**
 * A reusable component that displays a warning message when the arrival probability is low,
 * indicating that it may affect simulation accuracy.
 */

const WarningMessage = () => {
  return (
    <div className="text-yellow-500 text-sm mt-2">
      Warning: Arrival probability is very low, which may affect simulation
      accuracy.
    </div>
  );
};

export default WarningMessage;
