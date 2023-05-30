import { CustomNavbar, CustomButton, CustomCard, Footer, Loading, Drag, Drop } from '../components/components'
import useMultiStepForm from '../hooks/useMultiStepForm';
import useCardData from '../hooks/useCardData';
import useMediaQuery from '../hooks/useMediaQuery';
import sendToBack from '../helpers/sendToBack';

export const FormPage = () => {

  const API = process.env.REACT_APP_API;
  const { data, selected, setSelected, pieces, setPieces } = useCardData(API);
  const { step, handleNextStep, handlePrevStep } = useMultiStepForm();

  // Media query que dicta orientación de drag and drop
  const dndVertical = useMediaQuery('(max-width: 800px)');

  // Funcionalidades de formulario multi-step
  const handleCardSelect = (parentId) => {
    setSelected(parentId)
  }
  const handleSubmit = (e) => {
    let message = { shape: selected, pieces: pieces.join('/')}
    sendToBack(`${API}/sendMqtt`,message)
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

                  <Drop
                    direction={dndVertical ? 'vertical' : 'horizontal'}
                    items={pieces} setItems={setPieces}

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
