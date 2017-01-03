using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudWithJquery.Controllers
{
    public class CrudController : Controller
    {
        // GET: Players
        public ActionResult Jquery()
        {
            return View();
        }

        public ActionResult JavaScript()
        {
            return View();
        }

        public ActionResult Knockout()
        {
            return View();
        }
    }
}
