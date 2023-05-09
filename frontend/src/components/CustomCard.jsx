/* Componente base de Tarjeta */

export const CustomCard = (props) => {
  return (
    <section className={props.customClass} draggable={props.draggable} onDragStart={props.onDragStart}>
      <div className="card-image">{props.cardImage}</div>
      <div className="card-content">{props.content}</div>
      <div className="card-footer">{props.footer}</div>
    </section>
  )
}
