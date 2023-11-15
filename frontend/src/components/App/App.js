import Container from 'react-bootstrap/Container';
import FormInput from '../Main/Main';
import Navbar from '../Navbar';

import styles from "./App.module.css";

const App = () => {
  return (
    <Container fluid="container-md">
      <div className={styles.headerWrapper}>
        <Navbar/>
      </div>
      <div style={{padding: '20px'}}>
        <FormInput/>
      </div>
    </Container>
  );
}

export default App;
