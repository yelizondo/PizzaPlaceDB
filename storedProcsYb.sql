CREATE PROC SP_IngredientesPorPizza
	@PizzaName VARCHAR(50)
AS
	SELECT I.Descripcion
	FROM INGREDIENTE AS I
		INNER JOIN INGREDIENTExPIZZA AS IxP
			ON I.PK_ID = IxP.FK_ID_INGREDIENTE
		INNER JOIN PIZZA AS P
			ON IxP.FK_ID_PIZZA = P.PK_ID
	WHERE P.Descripcion LIKE @PizzaName;
GO

CREATE PROC SP_TodasLasPizzas
AS
	SELECT P.Descripcion
	FROM PIZZA AS P
GO

CREATE PROC SP_TodasLasEnsaladas
AS
	SELECT E.Descripcion
	FROM ENSALADA AS E
GO

CREATE PROC SP_TodasLasBebidas
AS
	SELECT B.Descripcion
	FROM BEBIDA AS B
GO

-- -111 Atributo NULL
-- -112 Email ya existe
-- -113 Exito
-- Registro y login de clientes
ALTER PROC SP_CrearNuevoCliente
	@Nombre VARCHAR(50),
	@Telefono INT,
	@Direccion VARCHAR(50),
	@Email VARCHAR(50),
	@Result INT OUTPUT
AS
	IF (@Nombre IS NULL OR @Telefono IS NULL OR @Direccion IS NULL OR @Email IS NULL)
	BEGIN
		RETURN(-111)
	END
	ELSE
	BEGIN
		IF EXISTS (SELECT C.PK_ID FROM CLIENTE AS C WHERE C.Email = @Email)
		BEGIN
			RETURN(-112)
		END
		ELSE
		BEGIN
			INSERT INTO CLIENTE 
			(
				Nombre,
				Telefono,
				Direccion,
				Email
			)
			VALUES
			(
				@Nombre,
				@Telefono,
				@Direccion,
				@Email
			)
			RETURN(-113)
		END
	END
GO


ALTER PROC SP_DoesClientExist
	@Email VARCHAR(50),
	@Result INT OUTPUT
AS
	IF (@Email IS NULL)
		RETURN(-111)
	ELSE
		IF EXISTS ( SELECT C.PK_ID FROM CLIENTE AS C WHERE C.Email = @Email)
			RETURN(1)
		ELSE 
			RETURN(0)
GO

-- Returns boolean in 0 and 1
-- -111 for null args
ALTER PROC SP_DoesAdminExist
	@Email VARCHAR(50)
AS
	IF (@Email IS NULL)
		RETURN(-111)
	ELSE
		IF EXISTS ( SELECT A.PK_ID FROM ADMINISTRADOR AS A WHERE A.Email = @Email)
			RETURN(1)
		ELSE 
			RETURN(0)
GO

ALTER PROC SP_CrearNuevoAdmin
	@Email VARCHAR(50)
AS
	IF (@Email IS NULL)
		RETURN(-111)
	ELSE
		IF EXISTS (SELECT A.PK_ID FROM ADMINISTRADOR AS A WHERE A.Email = @Email)
			RETURN(-112)
		ELSE
		BEGIN
			INSERT INTO ADMINISTRADOR 
			(
				Email
			)
			VALUES
			(
				@Email
			)
			RETURN(-113)
		END
GO

