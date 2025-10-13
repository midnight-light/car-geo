import React from 'react';
import { Button } from '@/shared/ui/Button';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={() => console.log('Button clicked!')}>Click me</Button>
    </div>
  );
};

export default HomePage;
