import "./App.css";

import CertificateTable from "./component/certificates/CertificateTable";
import Secured from "./component/security/Secured";

function App() {
  return (
    <div>
      <Secured />
      <div className="app-page">
        <CertificateTable></CertificateTable>
      </div>
    </div>
  );
}

export default App;
