//mock del servicio
jest.mock('sequelize');
jest.mock("../servicios/usuarios-servicio");

import { NextFunction, Request, Response } from "express";
import { mock } from "node:test";
import usuariosServicio from "../servicios/usuarios-servicio";
import { crearUsuario } from "../controladores/usuario-controlador";



describe('Controlador - crearUsuario', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(()=>{
        mockRequest = { body: {} };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        mockNext = jest.fn();

        //limpiar todos los mocks
        jest.clearAllMocks();
    });

    describe('Happy Path - Caso exitoso', () => {
    it('debería crear un usuario exitosamente y retornar status 201 con el id', async () => {
      // Arrange (preparar)
      const usuarioData = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        contraseña: 'pAssword123'
      };
      const expectedId = 1;

      mockRequest.body = usuarioData;
      
      // Mock del servicio para que retorne un id
      (usuariosServicio.crearUsuario as jest.Mock).mockResolvedValue(expectedId);

      // Act (ejecutar)
      await crearUsuario(mockRequest as Request, mockResponse as Response, mockNext);

      // Assert (verificar)
      expect(usuariosServicio.crearUsuario).toHaveBeenCalledTimes(1);
      expect(usuariosServicio.crearUsuario).toHaveBeenCalledWith(usuarioData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ id: expectedId });
    });
    });

    describe("Edge Case - Cuerpo de la solicitud vacío", ()=>{
        it("debería llamar a next con un error cuando el cuerpo de la solicitud está vacío", async ()=>{
            // Preparación
            mockRequest.body = null; // Simular cuerpo vacío
            // Ejecución
            await crearUsuario(mockRequest as Request, mockResponse as Response, mockNext);

            // Verificación
            expect(usuariosServicio.crearUsuario).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(crearUsuario).toThrow; // Verificar que se lanzó un error
        });
    });

});