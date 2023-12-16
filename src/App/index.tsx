import '../designs/styles/color.css'
import '../designs/styles/typography.css'
import '../designs/styles/other.css'

import './styles.css'
import icon from '../assets/icon.svg'

const App = () => {
  return (
    <div id="app-con">
      <div id="app">
        <header id="app-header">
          <div id="icon-con">
            <img src={icon} alt="" id="icon" />
          </div>
          <div id="heading-con">
            <h2 id="subtitle">Data Visualization Dashboard:</h2>
            <h1 id="title">USGS Recorded US Earthquake</h1>
            <p id="desc">Any brief description here..</p>
          </div>
        </header>
      </div>
    </div>
  )
}


export default App;