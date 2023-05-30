import { CustomNavbar, CustomButton, CustomCard, Footer, Loading, Drag, Drop } from '../components/components'
import useMultiStepForm from '../hooks/useMultiStepForm';
import useCardData from '../hooks/useCardData';

export const FormPage = () => {

  const API = process.env.REACT_APP_API;
  const { data, selected, setSelected, pieces, setPieces } = useCardData(API);
  const { step, handleNextStep, handlePrevStep } = useMultiStepForm();

  // Funcionalidades de formulario multi-step
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
    sendToBack('/sendMqtt',message)
    handleNextStep(e);
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
