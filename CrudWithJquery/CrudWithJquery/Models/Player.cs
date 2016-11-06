using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudWithJQuery.Models
{
    public class Player
    {
        public Guid PlayerId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Position { get; set; }
        public string StrongLeg { get; set; }
        public int Age { get; set; }
        public int PlayerNumber { get; set; }
    }
}