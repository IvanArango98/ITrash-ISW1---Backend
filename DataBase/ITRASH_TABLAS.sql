use itrash;

create table TipoEmpleado(
	CodigoTipoEmpleado int not null,
    CodigoEmpleado int not null,
    NombrePuesto varchar(30) not null,    
	PRIMARY KEY (CodigoTipoEmpleado)    
);

create table Empleado(
	CodigoEmpleado int not null,
    PrimerNombre varchar(30) not null,
    SegundoNombre varchar(30) not null,
    PrimerApellido varchar(30) not null,
    SegundoApellido varchar(30) not null,
    ApellidoDeCasada varchar(30) null, 
    CodigoDocumentoIdentificacion int not null,
    Activo boolean not null default true,    
    CodigoTipoEmpleado int not null,
	PRIMARY KEY (CodigoEmpleado),
    FOREIGN KEY (CodigoTipoEmpleado) REFERENCES TipoEmpleado(CodigoTipoEmpleado)
);

create table BitacoraContraseña(
	CodigoContraseña int not null,
    CodigoEmpleado int not null,
    Contraseña varchar(20) not null,
    FechaInicio date not null,
    FechaFin date not null,    
	PRIMARY KEY (CodigoContraseña),    
	FOREIGN KEY (CodigoEmpleado) REFERENCES Empleado(CodigoEmpleado)
);

create table TelefonoEmpleado(
	CodigoTelefono int not null,
    CodigoEmpleado int not null,
    NumeroDeTelefono int(8) not null,
    Activo boolean not null default true,    
    PRIMARY KEY (CodigoTelefono),    
    FOREIGN KEY (CodigoEmpleado) REFERENCES Empleado(CodigoEmpleado)
);

create table CorreoEmpleado(
	CodigoCorreo int not null,
    CodigoEmpleado int not null,
    DireccionCorreo varchar(30) not null,
    Activo boolean not null default true,    
    PRIMARY KEY (CodigoCorreo),    
    FOREIGN KEY (CodigoEmpleado) REFERENCES Empleado(CodigoEmpleado)
);


create table LicenciaConducir(
	CodigoLicencia int not null,
    CodigoEmpleado int not null,
    TipoLicencia varchar(5) not null,
    NumeroDocumento BigInt(13) not null,    
    FechaVencimiento date not null,
	PRIMARY KEY (CodigoLicencia),
    FOREIGN KEY (CodigoEmpleado) REFERENCES Empleado(CodigoEmpleado)
);

create table Ruta(
	CodigoRuta int not null,
    CodigoEmpleado int not null,
    Distancia double not null,
    FechaCreacion date not null,
    HoraInicio time not null,
    HoraFin time not null,
    Estado boolean not null default true,
	PRIMARY KEY (CodigoRuta),
    FOREIGN KEY (CodigoEmpleado) REFERENCES Empleado(CodigoEmpleado)
);

create table Basurero(
	CodigoBasurero int not null,
    VolumenActualBasura double not null,
    Direccion varchar(150) not null,
    Latitud double not null,
    Longitud double not null,
    Capacidad double not null,
    Activo boolean not null default true,    
    PRIMARY KEY (CodigoBasurero)
);

create table BitacoraRuta(
	CodigoRuta int not null,
    CodigoBitacoraRuta int not null,
    CodigoBasurero int not null,
    HoraRecoleccion time not null,
    PosicionRuta varchar(50) not null,    
    PRIMARY KEY (CodigoBitacoraRuta),
	FOREIGN KEY (CodigoRuta) REFERENCES Ruta(CodigoRuta),
    FOREIGN KEY (CodigoBasurero) REFERENCES Basurero(CodigoBasurero)
);



