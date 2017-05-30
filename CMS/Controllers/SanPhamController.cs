using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("san-pham")]
    public class SanPhamController : Controller
    {
        private BenhVienQYEntities db = new BenhVienQYEntities();

        // GET: SanPham
        [Route]
        public ActionResult EnterNone()
        {
            return Redirect("/san-pham");
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Index(string alias, int id)
        {

            var model = db.Product.Where(p => p.idProduct == id && p.alias == alias).FirstOrDefault();

            //SEO
            ViewBag.Title = model.title;
            ViewBag.Description = model.metadescription;
            ViewBag.Keywords = model.metakewords;
            ViewBag.Robots = model.robots;
            ViewBag.Image = model.image;

            if (model == null)
            {
                return HttpNotFound();
            }

            return View(model);
        }

        //Search
        public JsonResult Search(string search)
        {
            //var model = db.Product.Where(p => p.title.Contains(search) ||
            //                                    p.description.Contains(search) ||
            //                                    p.content.Contains(search) ||
            //                                    p.feature.Contains(search) ||
            //                                    p.feature.Contains(search));

            var model = db.Product.Where(p => p.title.Contains(search) ||
                                                p.description.Contains(search) ||
                                                p.content.Contains(search));

            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}