import React from 'react';
import { VehicleFeed } from '@/widgets/vehicle/vehicle-feed.ui';

const HomePage = (): React.ReactElement => {
  return (
    <div className="container mx-auto px-4 py-8">
      <VehicleFeed />
    </div>
  );
};

export default HomePage;
