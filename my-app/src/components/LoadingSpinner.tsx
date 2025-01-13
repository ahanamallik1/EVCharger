/**
 * The LoadingSpinner component renders a circular spinner animation
 * centered on the screen, typically used to indicate loading state.
 */
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
