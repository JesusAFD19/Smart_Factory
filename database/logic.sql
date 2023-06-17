CREATE OR REPLACE FUNCTION selectShapes()
  RETURNS TABLE (id INT, nombre TEXT, codigo VARCHAR(1), tipo SMALLINT)
AS $$
BEGIN
  RETURN QUERY
    SELECT id, nombre, codigo, tipo
    FROM cards
    WHERE tipo = 0;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION selectPieces()
  RETURNS TABLE (id INT, nombre TEXT, codigo VARCHAR(1), tipo SMALLINT)
AS $$
BEGIN
  RETURN QUERY
    SELECT id, nombre, codigo, tipo
    FROM cards
    WHERE tipo = 1;
END;
$$ LANGUAGE plpgsql;
