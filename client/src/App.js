import { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';

function App() {
  const [filename,setFilename] = useState(null);
  return (
    <div>
      <FileUpload />
   
    </div>
  );
}

export default App;
