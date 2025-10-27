
jest.mock('sequelize');
// IMPORTANTE: Mockear el REPOSITORIO, NO el servicio
jest.mock('../repositorios/usuario-repositorio');

import usuarioServicio  from "../servicios/usuarios-servicio";
import usuarioRepositorio from '../repositorios/usuario-repositorio';
import usuariosServicio from "../servicios/usuarios-servicio";

describe("Servicio - obtenerUsuarioPorId", ()=>{
    // Limpiar mocks antes de CADA test (incluyendo cada caso del it.each)
  beforeEach(() => {
    jest.clearAllMocks();
  });


describe("Happy Path", ()=>{
    it('Deberia retornar el usuario cuando el Id es valido y existe', async ()=>{
        // preparacion
        const idValido = 1;
        const usuarioEsperado = {
            id: 1,
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            contraseña: "4234Aasfa"
        };

        // Mockear el REPOSITORIO
      (usuarioRepositorio.obtenerUsuarioPorId as jest.Mock)
        .mockResolvedValue(usuarioEsperado);

      // Ejecución
      const usuario = await usuariosServicio.obtenerUsuarioPorId(idValido);

      // Verificación
      expect(usuario).toEqual(usuarioEsperado);
      
      // Verificar que el REPOSITORIO fue llamado
      expect(usuarioRepositorio.obtenerUsuarioPorId).toHaveBeenCalledTimes(1);
      expect(usuarioRepositorio.obtenerUsuarioPorId).toHaveBeenCalledWith(idValido);
    });

    it('Debería retornar null cuando el usuario no existe', async () => {
      const idNoExiste = 999;

      (usuarioRepositorio.obtenerUsuarioPorId as jest.Mock)
        .mockResolvedValue(null);

      const resultado = await usuariosServicio.obtenerUsuarioPorId(idNoExiste);

      expect(resultado).toBeNull();
      expect(usuarioRepositorio.obtenerUsuarioPorId).toHaveBeenCalledWith(idNoExiste);
    });
  
});



describe("Validacion de Id", ()=>{
    // preparacion

    it.each([{
        caso: "Id negativo",
        id:  -3,
        errorEsperado: "ID inválido"
    },{
        caso: "Id no numerico",
        id:  "abc",
        errorEsperado: "ID inválido"
    },{
        caso: "Id decimal",
        id:  4.5,
        errorEsperado: "ID inválido"
    },{
        caso: "id null",
        id:  null,
        errorEsperado: "ID inválido"
    }])('Deberia lanzar error para $caso', async ({id, errorEsperado})=>{
       
       // Verificación: Se debe lanzar el error
      await expect(
        usuariosServicio.obtenerUsuarioPorId(id as any)
      ).rejects.toThrow(errorEsperado);

      // Verificar que el REPOSITORIO no fue llamado
      expect(usuarioRepositorio.obtenerUsuarioPorId).not.toHaveBeenCalled();
    })
       
});
});