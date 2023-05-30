// Hook personalizado useMediaQuery
import { useEffect, useState } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleMediaQueryChange = (e) => {
      setMatches(e.matches);
    };

    // Ejecutar la comprobación inicial
    handleMediaQueryChange(mediaQuery);

    // Agregar el listener para detectar cambios en la media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Limpiar el listener al desmontar el componente
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
