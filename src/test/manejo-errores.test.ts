import { Request, Response, NextFunction } from 'express';
import { manejoErrores } from '../middlewares/manejo-errores';

describe('Middleware - manejoErrores', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockRequest = {};
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    mockNext = jest.fn();

    // Silenciar console.error en los tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('Happy Path - Error de email duplicado', () => {
    it('debería retornar 409 cuando el email ya está en uso', () => {
      const error = new Error('El email ya está en uso');

      manejoErrores(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'El email ya está en uso'
      });
      expect(console.error).toHaveBeenCalledWith('Error:', error);
    });

    it('debería manejar el mensaje exacto del error', () => {
      const errorMessage = 'El email ya está en uso';
      const error = new Error(errorMessage);

      manejoErrores(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const jsonCall = (mockResponse.json as jest.Mock).mock.calls[0][0];
      expect(jsonCall.error).toBe(errorMessage);
    });
  });

  describe('Unhappy Path - Errores genéricos', () => {
    it('debería retornar 500 para errores no específicos', () => {
      const error = new Error('Error desconocido');

      manejoErrores(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Error interno del servidor'
      });
    });

    it('debería manejar error de conexión a BD', () => {
      const error = new Error('ECONNREFUSED');

      manejoErrores(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Error interno del servidor'
      });
    });

    it('debería manejar errores sin mensaje', () => {
      const error = new Error();

      manejoErrores(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });

  describe('Edge Cases', () => {
    it('debería loguear el error antes de responder', () => {
      const error = new Error('Test error');

      manejoErrores(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith('Error:', error);
    });

    it('debería diferenciar entre error de email y otros errores', () => {
      const errorEmail = new Error('El email ya está en uso');
      const errorOtro = new Error('Otro error');

      // Error de email
      manejoErrores(
        errorEmail,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(409);

      jest.clearAllMocks();

      // Otro error
      manejoErrores(
        errorOtro,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('debería retornar void (no devuelve nada)', () => {
      const error = new Error('Test');

      const resultado = manejoErrores(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(resultado).toBeUndefined();
    });
  });

  describe('Verificación de respuesta JSON', () => {
    it('debería tener la estructura correcta de respuesta para error 409', () => {
      const error = new Error('El email ya está en uso');

      manejoErrores(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const responseJson = (mockResponse.json as jest.Mock).mock.calls[0][0];
      
      expect(responseJson).toHaveProperty('error');
      expect(typeof responseJson.error).toBe('string');
      expect(responseJson.error).toBe('El email ya está en uso');
    });

    it('debería tener la estructura correcta para error 500', () => {
      const error = new Error('Error aleatorio');

      manejoErrores(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const responseJson = (mockResponse.json as jest.Mock).mock.calls[0][0];
      
      expect(responseJson).toHaveProperty('error');
      expect(responseJson.error).toBe('Error interno del servidor');
    });
  });

  describe('Múltiples errores consecutivos', () => {
    it('debería manejar múltiples errores de email', () => {
      const error1 = new Error('El email ya está en uso');
      const error2 = new Error('El email ya está en uso');

      manejoErrores(error1, mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(409);

      jest.clearAllMocks();

      manejoErrores(error2, mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(409);
    });
  });
});