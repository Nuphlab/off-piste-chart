import '../app/App.css'
import {Container, Row} from "react-bootstrap";
import {Chart} from "../components/chart";
import {NavbarOP} from "../components/navbarop";

function App() {

  return (
      <div className="App">
          <header className="App-header justify-content-end">
              <Container className={'Container'} fluid>
                  <Row>
                      <NavbarOP></NavbarOP>
                  </Row>
                  <Row>
                      <Chart></Chart>
                  </Row>
              </Container>
          </header>
      </div>
  )
}

export default App;
