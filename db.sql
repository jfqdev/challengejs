
create table tipo (
	tipoid SERIAL NOT NULL PRIMARY KEY,
	caja VARCHAR(50) NOT NULL
);

create table usuario (
	userid SERIAL NOT NULL PRIMARY KEY,
	mail VARCHAR(50) NOT NULL,
    pass VARCHAR(255) NOT NULL,
	nombre VARCHAR(255) NOT NULL
);

create table categoria (
	catid SERIAL NOT NULL PRIMARY KEY,
	descripcion VARCHAR(50) NOT NULL,
	cat_tipo_id INTEGER NOT NULL REFERENCES tipo(tipoid)
);


create table operacion (
    opid SERIAL NOT NULL PRIMARY KEY,
	concepto VARCHAR(50) NOT NULL,
	fecha DATE NOT NULL,
	monto BIGINT NOT NULL,
	tipo_id INTEGER NOT NULL REFERENCES tipo(tipoid),
	usuario_id INTEGER NOT NULL REFERENCES usuario(userid),
	categoria_id INTEGER NOT NULL REFERENCES categoria(catid)
);


insert into tipo (caja) values ('ingreso');
insert into tipo (caja) values ('egreso');

insert into categoria (descripcion,cat_tipo_id) values('Salario',1);
insert into categoria (descripcion,cat_tipo_id) values('Reembolsos',1);
insert into categoria (descripcion,cat_tipo_id) values('Premios',1);
insert into categoria (descripcion,cat_tipo_id) values('Bono',1);
insert into categoria (descripcion,cat_tipo_id) values('Regalo',1);
insert into categoria (descripcion,cat_tipo_id) values('Cupones',1);
insert into categoria (descripcion,cat_tipo_id) values('Otros',1);

insert into categoria (descripcion,cat_tipo_id) values('Comida',2);
insert into categoria (descripcion,cat_tipo_id) values('Navidad',2);
insert into categoria (descripcion,cat_tipo_id) values('Casa',2);
insert into categoria (descripcion,cat_tipo_id) values('Compras',2);
insert into categoria (descripcion,cat_tipo_id) values('Transporte',2);
insert into categoria (descripcion,cat_tipo_id) values('Viajar',2);
insert into categoria (descripcion,cat_tipo_id) values('Varios',2);

insert into usuario (mail, pass, nombre) values ('admin', 'admin', 'admin');


insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Banco Ciudad', '2020-08-04', 60000, 1, 1, 1);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Casa de Ropa', '2020-08-10', 1000, 1, 1, 2);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Bingo', '2020-08-20', 5000, 1, 1, 3);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Banco Ciudad', '2020-09-12', 10000, 1, 1, 4);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Amigos', '2020-09-15', 10000, 1, 1, 5);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Rappi Creditos', '2020-09-17', 500, 1, 1, 6);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Google Ads', '2020-09-18', 15000, 1, 1, 7);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Cena Virual Amigos', '2020-09-20', -900, 2, 1, 8);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Compra Regalos', '2020-09-18', -10000, 2, 1, 9);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Arreglo puerta', '2020-10-18', -2000, 2, 1, 10);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Supermercado', '2020-11-20', -15000, 2, 1, 11);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Venta Celular', '2020-12-18', 30000, 1, 1, 7);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Bingo', '2020-12-23', 2000, 1, 1, 3);
insert into operacion (concepto, fecha, monto, tipo_id, usuario_id, categoria_id) values ('Champagne', '2020-12-31', -15000, 2, 1, 14);

