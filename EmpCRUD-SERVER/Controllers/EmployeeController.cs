using EmpCRUD_SERVER.Data;
using EmpCRUD_SERVER.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmpCRUD_SERVER.Controllers
{
    // wan't have any views
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly EmpContext _ctx;
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(EmpContext ctx,ILogger<EmployeeController> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _ctx.Employees.ToListAsync();
            return Ok(employees);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllEmployees(Guid id)
        {
            var employee = await _ctx.Employees.FirstOrDefaultAsync(e => e.Id == id);
            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee newEmployee)
        {

            newEmployee.Id = Guid.NewGuid();
            await _ctx.Employees.AddAsync(newEmployee);
            await _ctx.SaveChangesAsync();
            //string url = Url.Link("GetOneDeptRoute", new { id = Dept.Id });
            //[HttpGet("{id:int}", Name = "GetOneDeptRoute")]
            //Created("", newEmployee);

            return Ok(newEmployee);
        }



        [HttpPut]
        public async Task<IActionResult> EditEmployee([FromBody] Employee neweditEmployee)
        {

            //var editEmployee = _ctx.Employees.FirstOrDefaultAsync(e => e.Id == neweditEmployee.Id);
            //if (editEmployee == null) { return BadRequest("employee not found"); }
            _ctx.Employees.Update(neweditEmployee);
            await _ctx.SaveChangesAsync();
            //string url = Url.Link("GetOneDeptRoute", new { id = Dept.Id });
            //[HttpGet("{id:int}", Name = "GetOneDeptRoute")]
            //Created("", newEmployee);

            return Ok(neweditEmployee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            _logger.LogInformation("from DeleteEmployee");
            var employee = await _ctx.Employees.FirstOrDefaultAsync(e => e.Id == id);
            _ctx.Employees.Remove(employee);
            await _ctx.SaveChangesAsync();
            return Ok(employee);
        }

    }
}
