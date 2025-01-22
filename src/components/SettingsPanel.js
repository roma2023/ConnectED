import React, { useState } from 'react';
import './SettingsPanel.css';
import { Select, MenuItem, Slider, Button } from '@mui/material';

const SettingsPanel = () => {
  const [voice, setVoice] = useState('Alloy');
  const [threshold, setThreshold] = useState(0.5);

  return (
    <div className="settings-panel">
      <h2>Customization</h2>
      <label>Educational Websites</label>
      <Select value={voice} onChange={(e) => setVoice(e.target.value)}>
      <MenuItem value=""></MenuItem>
        <MenuItem value="Khan Academy">Khan Academy</MenuItem>
        <MenuItem value="Coursera">Coursera</MenuItem>
        <MenuItem value="edX">edX</MenuItem>
        <MenuItem value="Udemy">Udemy</MenuItem>
        <MenuItem value="Skillshare">Skillshare</MenuItem>
      </Select>

      <label>Threshold</label>
      <Slider 
        value={threshold}
        onChange={(e, val) => setThreshold(val)}
        min={0} max={1} step={0.1}
      />

      <Button variant="contained" className="add-function">
        + Add Function
      </Button>
    </div>
  );
};

export default SettingsPanel;
