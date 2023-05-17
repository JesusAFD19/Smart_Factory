/* Componente base de Tarjeta */

export const CustomCard = (props) => {
  const handleOnClick = (event) => {
    const parentId = event.currentTarget.id;
    if (typeof props.handleClick === 'function') {
      props.handleClick(parentId);
    }
  };
  return (
    <section id={props.id} className={props.customClass} onClick={handleOnClick} draggable={props.draggable} onDragStart={props.onDragStart}>
      <div className="card-image">{props.cardImage}</div>
      <div className="card-content">{props.content}</div>
      <div className="card-footer">{props.footer}</div>
    </section>
  )
}
