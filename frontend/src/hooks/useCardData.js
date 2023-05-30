// Hook personalizado useCardData
import { useState, useEffect } from 'react';

const useCardData = (API) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    fetch(`${API}/cards`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setPieces(data.Pieces);
      });
  }, [API]);

  return { data, selected, setSelected, pieces, setPieces };
};

export default useCardData;
