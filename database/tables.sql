CREATE TABLE cardType (
    id SERIAL PRIMARY KEY,
    nombre TEXT
);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    nombre TEXT,
    codigo VARCHAR(1) NOT NULL,
    tipo SMALLINT NOT NULL,

    FOREIGN KEY (tipo)
        REFERENCES cardType(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT cards_codigo_unique UNIQUE (codigo)
);
