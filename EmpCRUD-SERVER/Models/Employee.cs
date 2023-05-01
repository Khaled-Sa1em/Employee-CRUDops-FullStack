using System.ComponentModel.DataAnnotations;

namespace EmpCRUD_SERVER.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public long Salary { get; set; }

        public string DeptName { get; set; }



    }
}
