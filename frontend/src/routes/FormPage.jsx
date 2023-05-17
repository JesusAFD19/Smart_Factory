import { useState, useEffect } from 'react'
import { CustomNavbar, CustomButton, CustomCard, Footer, Loading, Drag, Drop } from '../components/components'

export const FormPage = () => {

  // Form Cards
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(null)
  const [pieces, setPieces] = useState([])
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
        setPieces(data.Pieces)
      }
    )
  }, [API])


  // Funcionalidades de formulario multi-step
  const handleNextStep = (e) => {
    e.preventDefault()
    setStep(step + 1)
  }
  const handlePrevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  }
  const handleCardSelect = (parentId) => {
    setSelected(parentId)
  }
  const sendToBack = async (route, msg) => {
    try {
      const response = await fetch(`${API}${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: msg }),
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e) => {
    let message = { shape: selected, pieces: pieces.join('/')}
    console.log(message)
    sendToBack('/sendMqtt',message)
    setStep(step + 1)
  }

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
                      id={shape}
                      customClass={`card ${selected === shape ? 'selected' : ''}`}
                      handleClick={handleCardSelect}
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
                {(typeof pieces === 'undefined') ? (
                  <Loading/>
                ) : (

                  <Drop direction='horizontal' items={pieces} setItems={setPieces}

                    dragItems = {
                      pieces.map((piece, i) => (
                        <Drag key={`${i}`} id={piece} draggableId={`${i}`} index={i}
                          item={
                            <CustomCard
                              customClass='card'
                              cardImage={<img src={`${API}/cards/pieces/${piece}.jpg`} alt={`img_${piece}`}/>}
                            />
                          }
                        ></Drag>
                      ))
                    }
                  
                  ></Drop>

                )}
              </div>
              <CustomButton text={'Atras'} func={handlePrevStep}/>
              <CustomButton text={'Siguiente'} func={handleSubmit}/>
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
