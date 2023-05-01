using EmpCRUD_SERVER.Models;
using Microsoft.EntityFrameworkCore;

namespace EmpCRUD_SERVER.Data
{
    public class EmpContext : DbContext
    {
        public EmpContext(DbContextOptions ops) : base(ops)
        { }

        public DbSet<Employee> Employees { get; set; }
    }
}
