create database itrash;
use itrash;

CREATE table TipoEmpleado(
	CodigoTipoEmpleado int not null AUTO_INCREMENT,
    CodigoEmpleado int not null,
    NombrePuesto varchar(30) not null,    
	PRIMARY KEY (CodigoTipoEmpleado)    
);

CREATE table Empleado(
	CodigoEmpleado int not null AUTO_INCREMENT,
    PrimerNombre varchar(30) not null,
    SegundoNombre varchar(30) not null,
    PrimerApellido varchar(30) not null,
    SegundoApellido varchar(30) not null,
    ApellidoDeCasada varchar(30) null, 
    CodigoDocumentoIdentificacion varchar(13) not null,
    Activo boolean default true,    
    CodigoTipoEmpleado int not null,
	PRIMARY KEY (CodigoEmpleado),
    FOREIGN KEY (CodigoTipoEmpleado) REFERENCES TipoEmpleado(CodigoTipoEmpleado)
);

CREATE  table BitacoraContraseña(
	CodigoContraseña int not null AUTO_INCREMENT,
    CodigoEmpleado int not null,
    Contraseña text(65535) not null,
    FechaInicio date not null,
    FechaFin date,    
	PRIMARY KEY (CodigoContraseña),    
	FOREIGN KEY (CodigoEmpleado) REFERENCES Empleado(CodigoEmpleado)
);

CREATE table TelefonoEmpleado(
	CodigoTelefono int not null AUTO_INCREMENT,
    CodigoEmpleado int not null,
    NumeroDeTelefono BIGINT not null,
    Activo boolean default true,    
    PRIMARY KEY (CodigoTelefono),    
    FOREIGN KEY (CodigoEmpleado) REFERENCES Empleado(CodigoEmpleado)
);

CREATE  table CorreoEmpleado(
	CodigoCorreo int not null AUTO_INCREMENT,
    CodigoEmpleado int not null,
    DireccionCorreo varchar(30) not null,
    Activo boolean default true,    
    PRIMARY KEY (CodigoCorreo),    
    FOREIGN KEY (CodigoEmpleado) REFERENCES Empleado(CodigoEmpleado)
);


CREATE table LicenciaConducir(
	CodigoLicencia int not null AUTO_INCREMENT,
    CodigoEmpleado int not null,
    TipoLicencia varchar(1) not null,
    NumeroDocumento BigInt not null,    
    FechaVencimiento date not null,
	PRIMARY KEY (CodigoLicencia),
    FOREIGN KEY (CodigoEmpleado) REFERENCES Empleado(CodigoEmpleado),
    CONSTRAINT VALIDAR CHECK(TipoLicencia = 'A' OR TipoLicencia = 'B' OR TipoLicencia = 'C' OR TipoLicencia = 'D')    
);


CREATE table Ruta(
	CodigoRuta int not null AUTO_INCREMENT,
    CodigoEmpleado int not null,
    Distancia double not null,
    FechaCreacion date not null,
    HoraInicio time not null,
    HoraFin time not null,
    Estado boolean default true,
	PRIMARY KEY (CodigoRuta),
    FOREIGN KEY (CodigoEmpleado) REFERENCES Empleado(CodigoEmpleado),
    CONSTRAINT CHK_Horas CHECK(HoraFin > HoraInicio)    
);

CREATE table Basurero(
	CodigoBasurero int not null AUTO_INCREMENT,
    VolumenActualBasura double not null,
    Direccion varchar(150) not null,
    Latitud double not null,
    Longitud double not null,
    Capacidad double not null,
    Activo boolean default true,       
    PRIMARY KEY (CodigoBasurero)
);

CREATE table BitacoraRuta(
    CodigoBitacoraRuta int not null AUTO_INCREMENT,
	CodigoRuta int not null,
    CodigoBasurero int not null,
    HoraRecoleccion time not null,
    PosicionRuta varchar(50) not null,    
    PRIMARY KEY (CodigoBitacoraRuta),
	FOREIGN KEY (CodigoRuta) REFERENCES Ruta(CodigoRuta),
    FOREIGN KEY (CodigoBasurero) REFERENCES Basurero(CodigoBasurero)
);



