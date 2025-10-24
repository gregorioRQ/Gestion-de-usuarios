import { NextFunction, Request, Response } from 'express';
import { validarCrearUsuario } from '../middlewares/validar-usuario';


// mock del servicio
jest.mock("../servicios/usuarios-servicio");

describe('Middleware - validarCrearUsuario', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = { body: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  describe('Happy Path - Validación exitosa', () => {
    it('debería llamar a next() cuando todos los campos son válidos', () => {
      mockRequest.body = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        contraseña: 'pAssword123'
      };

      validarCrearUsuario(
        mockRequest as Request, 
        mockResponse as Response, 
        mockNext
      );

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('Edge case - Validación de contraseña', () => {
    it('debería rechazar contraseña sin mayúscula', () => {
      mockRequest.body = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        contraseña: 'password123' // sin mayúscula
      };

      validarCrearUsuario(
        mockRequest as Request, 
        mockResponse as Response, 
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: expect.stringContaining('mayúscula') 
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("Edge case - Validacion de contraseña",()=>{
    it("deberia rechazar la contraseña si no tiene un numero", ()=>{
        // Preparacion
        mockRequest.body = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        contraseña: 'passworddd' // sin mayúscula
      };

      validarCrearUsuario(
        mockRequest as Request, 
        mockResponse as Response, 
        mockNext
      );

      // Aserciones
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockNext).not.toHaveBeenCalled();
    })
  })

  describe("Edge case - Validaciond de contraseña", ()=>{
    it("deberia rechazar la contraseña si tiene menos de 9 caracteres", ()=>{
        // preparacion
        mockRequest.body = {
            nombre: "Juan Pérez",
            email: "juan@example.com",
            contraseña: "pass12"
        }
        validarCrearUsuario(
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        // aserciones
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockNext).not.toHaveBeenCalled();
  })

  describe("Edge case - Validacion de contraseña", ()=>{
    it("deberia rechazar la contraseña si tiene espacios en blanco", ()=>{
        // preparacion
        mockRequest.body = {
            nombre: "Juan Pérez",
            email: "juan@example.com",
            contraseña: " pass 12 "
        };

        validarCrearUsuario(
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        // aserciones
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockNext).not.toHaveBeenCalled();
    });
});
});
});
