using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("lien-he")]
    public class LienHeController : Controller
    {
        // GET: LienHe
        [Route]
        public ActionResult Index()
        {
            return View();
        }
    }
}