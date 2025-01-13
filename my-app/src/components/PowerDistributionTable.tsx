/**
 * The PowerDistributionTable component displays a table showing power distribution
 * details for charging stations, including charge point type, power, quantity,
 * and total power. If no data is available, it uses default values.
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { selectChargingStationSimulationResults } from '../selectors/selectChargingStationResults';
import { RootState } from '../store/store';

const PowerDistributionTable: React.FC = () => {
  const simulationResults = useSelector((state: RootState) =>
    selectChargingStationSimulationResults(state),
  );
  const { powerDistribution } = simulationResults;

  // Default values if powerDistribution is empty
  const defaultValues = [{ power: 22, quantity: 1, totalPower: 22 }];

  // Use the default values if powerDistribution is empty
  const dataToDisplay =
    powerDistribution.length > 0 ? powerDistribution : defaultValues;

  return (
    <>
      {/* Power Distribution Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Charge Point Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Power (kW)
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Total Power (kW)
              </th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map(({ power, quantity, totalPower }) => (
              <tr key={power} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-700">{`Charge Point (${power} kW)`}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {power} kW {power === 22 && quantity === 1 && '(default)'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {quantity} {quantity === 1 && power === 22 && '(default)'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {totalPower} kW
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PowerDistributionTable;
