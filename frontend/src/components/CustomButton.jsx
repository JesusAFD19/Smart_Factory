/* Componente de Botón personalizable */
export const CustomButton = ({text, customClass, func, disabled}) => {
  return (
    <button className={customClass} onClick={func} disabled={disabled}>
      {text}
    </button>
  )
}