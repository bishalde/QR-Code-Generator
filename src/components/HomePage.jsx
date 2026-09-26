import Navbar from './Navbar/Navbar'
import Homebox from './Homebox/Homebox'
import Generator from './Generator/Generator'
import Footer from './Footer'

function HomePage() {
  return (
    <>
    <Navbar />
    <main>
      <Homebox />
      <Generator />
    </main>
    <Footer />
    </>
  )
}

export default HomePage
