import { useState, useEffect } from 'react'
import { CustomNavbar } from '../components/CustomNavbar'
import { CardCustom } from '../components/CardCustom'
import { Footer } from '../components/Footer'

export const FormPage = () => {

  // Form Cards
  const API = process.env.REACT_APP_API;

  // Se ejecuta cuando se renderiza el componente
  const [data, setData] = useState([{}])
  useEffect(() => {
    fetch('http://127.0.0.1:5000/cards')
    .then(
      res => res.json()
    )
    .then(
      data => {
        console.log(data)
      }
    )
  }, [])

  return (
    <section id='BuildForm'>
      <CustomNavbar/>
      <div className="content">
        
      </div>
      <div>FormPage</div>
      <Footer/>
    </section>
  )
}
