using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Models;

namespace CMS.Controllers
{
    [RoutePrefix("bac-si")]
    public class ViewBacSiController : Controller
    {
        private BenhVienQYEntities db = new BenhVienQYEntities();

        [Route]
        public ActionResult ShowAll()
        {
            return View();
        }

        [Route("{id:int}")]
        public ActionResult Index(int id)
        {

            var model = db.BacSi.Where(p => p.id == id).FirstOrDefault();

            if (model == null)
            {
                return RedirectToAction("Index", "Home");
            }

            //SEO
            //ViewBag.Title = model.title;
            //ViewBag.Description = model.description;
            //ViewBag.Keywords = model.metakewords;
            //ViewBag.Robots = model.robots;
            //ViewBag.Image = model.image;

            return View(model);
        }

        //public JsonResult Search(string search)
        //{
        //    var model = db.Post.Where(p => p.alias.Contains(search) ||
        //                                    p.content.Contains(search) ||
        //                                    p.description.Contains(search) ||
        //                                    p.title.Contains(search));
        //    return Json(model, JsonRequestBehavior.AllowGet);
        //}
    }
}