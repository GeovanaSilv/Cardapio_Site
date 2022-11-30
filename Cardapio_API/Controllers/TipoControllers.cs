using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Cardapio_API.Data;
using Cardapio_API.Models;

namespace Cardapio_API.Controllers{

    [Route("api/[controller]")]
    [ApiController]

    public class TipoController: ControllerBase{

        private CardapioContext _context;
        public TipoController(CardapioContext context){

            _context = context;
        }

       [HttpGet]
       public ActionResult<List<Tipo>> GetAll(){
        return _context.Tipo.ToList();
       }

        [HttpGet("{TipoId}")]
        public ActionResult<List<Tipo>> Get(int TipoId){

            try{
                var resultado = _context.Tipo.Find(TipoId);
                if(resultado == null)
                {
                    return NotFound();
                }
                return Ok(resultado);
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha com o banco de dados");
            }
            
        

        }
   [HttpPost]
        public async Task<ActionResult> POST (Tipo model){

            try{
                _context.Tipo.Add(model);
                if(await _context.SaveChangesAsync() == 1){
                     
                    return Created($"/api/Tipo/{model.nomeTipo}",model);
                }
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha com o banco de dados");
            }
            return BadRequest();
        }

         [HttpDelete("{TipoId}")]
        public async Task<ActionResult> DELETE (int TipoId ){

            try{
                var tipoCar = await _context.Tipo.FindAsync(TipoId);
                if(tipoCar == null){
                    return NotFound();
                }
                _context.Remove(tipoCar);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha com o banco de dados");
            }
            
        }

         [HttpPut("{TipoId}")]
        public async Task<ActionResult> PUT (Tipo dadosTipoAlt, int TipoId){

            try{
                 var resultado = await _context.Tipo.FindAsync(TipoId);
                if(TipoId != resultado.id){

                   return  BadRequest();
                }
                resultado.nomeTipo = dadosTipoAlt.nomeTipo;
                resultado.codTipo = dadosTipoAlt.codTipo;
              
                await _context.SaveChangesAsync();
                return Created($"/api/Tipo/{dadosTipoAlt.nomeTipo}", dadosTipoAlt);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha com o banco de dados");
            }
            
        }
    }
}
