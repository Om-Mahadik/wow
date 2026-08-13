import React from 'react';
import Founders from './Founders'; // Adjust the import path based on your folder structure
import AboutOverview from './AboutOverview';
import InstallationStory from './InstallationStory';

export default function AboutView() {
  return (
    <div className="space-y-0">
      
         <AboutOverview />
        <InstallationStory />
        <Founders />
       
    </div>
  );
}