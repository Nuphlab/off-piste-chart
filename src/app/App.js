import '../app/App.css'
//let d3 handle the controlling of dom through use ref
import {Container, Row} from "react-bootstrap";
import {Chart} from "../components/chart";
import {NavbarOP} from "../components/navbarop";

function App() {
/*
    useEffect(async () => {
       // const coinInfo = await getTokenInfo('bitcoin')
       // setTokenName(coinInfo.id.toUpperCase())
       // setTokenImg(coinInfo.image.thumb)
        // onst coinInfo = await getMarketData()
    })
    useEffect(async () => {
        const price = setInterval(async () => {
            //const info = await coinDataRefresh('bitcoin', 'usd')
            // const response = await getCoin('bitcoin', 'usd')
            //setTokenData(info)
            //setTokenName(info.id)
            //console.log('hi')
        },1000)
    })
    useEffect(async () => {
        //const list = await fullTokenList()
        //setTokenList(list)
        //console.log(list)
    }, [])

 */

  return (
      <div className="App">
          <header className="App-header">
              <Container className={'Container'} fluid>
                  <Row>
                      <NavbarOP></NavbarOP>
                  </Row>
                  <Row>
                      <Chart className={'mb-5'}></Chart>
                  </Row>
              </Container>
          </header>
      </div>
  )
}

export default App;
