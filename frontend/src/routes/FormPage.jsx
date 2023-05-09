import { useState, useEffect } from 'react'
import { CustomNavbar, CustomButton, CustomCard, DraggableItem, Footer, Loading } from '../components/components'

export const FormPage = () => {

  // Form Cards
  const [data, setData] = useState([{}])
  const [step, setStep] = useState(0);
  const API = process.env.REACT_APP_API;

  // Se ejecuta cuando se renderiza el componente
  useEffect(() => {
    fetch(`${API}/cards`).then(
      res => res.json()
    )
    .then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [API])

  // Funcionalidades de formulario multi-step
  const resetFields = () => {
    //
  }
  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };
  const handlePrevStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      resetFields();
    }
    setStep(step - 1);
  };

  return (
    <section id='BuildForm'>
      <CustomNavbar/>
      <div className="content">
        <form>

          {step === 0 && (
            <div id='step-0'>
              <h2>Selecciona una figura</h2>
              <div className="cards">
                {(typeof data.Shapes === 'undefined') ? (
                  <Loading/>
                ) : (
                  data.Shapes.map((shape, i) => (
                    <CustomCard key={`shape_${i}`}
                      customClass='card'
                      cardImage={<img src={`${API}/cards/shapes/${shape}.png`} alt={`img_${shape}`}/>}
                    />
                  ))
                )}
              </div>
              <CustomButton text={'Siguiente'} func={handleNextStep}/>
            </div>
          )}

          {step === 1 && (
            <div id="step-1">
              <h2>selecciona el orden de las piezas</h2>
              <div className="cards">
                {(typeof data.Pieces === 'undefined') ? (
                  <Loading/>
                ) : (
                  data.Pieces.map((piece, i) => (
                    <CustomCard key={`piece_${i}`}
                      customClass='card' 
                      cardImage={<img src={`${API}/cards/pieces/${piece}.jpg`} alt={`img_${piece}`}/>}
                    />
                  ))
                )}
              </div>
              <CustomButton text={'Atras'} func={handlePrevStep}/>
              <CustomButton text={'Siguiente'} func={handleNextStep}/>
            </div>
          )}

          {step === 2 && (
            <div id="step-2">
              <h2>terminado</h2>
              <CustomButton text={'Atras'} func={handlePrevStep}/>
            </div>
          )}

        </form>
      </div>
      <Footer/>
    </section>
  )
}
