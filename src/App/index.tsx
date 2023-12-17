import '../designs/styles/color.css'
import '../designs/styles/typography.css'
import '../designs/styles/other.css'

import './styles.css'

import icon from '../assets/icon.svg'
import TotalEQPerHourOnYesterdayCard from './components/TotalEQPerHourOnYesterdayCard'
import Top3StateCard from './components/Top3StateCard'

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
            <p id="desc">This page showcases some of data visualization curated from 'https://earthquake.usgs.gov/fdsnws/event/1/'.</p>
          </div>
        </header>
        <main id="app-content">
          <section className="content-row"> 
          <TotalEQPerHourOnYesterdayCard />
          </section>
          <section className="content-row"> 
          <Top3StateCard />
          </section>
        </main>
      </div>
    </div>
  )
}


export default App;