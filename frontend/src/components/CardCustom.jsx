/* Componente base de Tarjeta */

export const CardCustom = (props) => {
  return (
    <section>
      <div className="card-image">{props.cardImage}</div>
      <div className="card-content">
        {props.content.map((element, index) => (
          <div>contenido: {index}</div>
        ))}
      </div>
      <div className="card-footer">
        {props.footer.map((element, index) => (
          <div>footer: {index}</div>
        ))}
      </div>
    </section>
  )
}
