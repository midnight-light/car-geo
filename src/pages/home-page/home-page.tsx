import React from 'react';
import { VehicleFeed } from '@/widgets/vehicle/vehicle-feed.ui';
import { Button } from '@/shared/ui/shadcn/button';

const HomePage = (): React.ReactElement => {
  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={() => console.log('Button clicked!')}>Click me</Button>
      <VehicleFeed />
    </div>
  );
};

export default HomePage;
