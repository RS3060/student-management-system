import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="loader-container">
      <Loader2 className="spinner-icon" size={50} />
      <p>Syncing with Database...</p>
    </div>
  );
};

export default Loader;
