import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Button, Uploader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function App() {
  const onUpload = async (fileList: any[]) => {
    const file = fileList.at(-1);
    const formData = new FormData();
    const name = file?.name.split('.docx')[0];

    formData.append("file", file.blobFile);
    axios.post("http://127.0.0.1:5009/parser", formData, {responseType: 'blob'}).then( async (response: any) => {
      const blob = new Blob([response.data], {type: 'application/octet-stream'});
      saveAs(blob, `${name}.leg`);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
       <Uploader action="http://127.0.0.1:5009/parser" autoUpload={false} onChange={onUpload} multiple={false} accept=".docx" fileListVisible={false}>
        <Button>Konvertuoti docx į LEG</Button>
       </Uploader>
      </header>
    </div>
  );
}

export default App;
