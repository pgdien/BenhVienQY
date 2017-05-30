using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("bai-viet")]
    public class BaiVietController : Controller
    {
        private BenhVienQYEntities db = new BenhVienQYEntities();

        [Route]
        public ActionResult ShowAllBaiViet()
        {
            return View();
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Index(string alias, int id)
        {

            var model = db.Post.Where(p => p.idPost == id && p.alias == alias).FirstOrDefault();

            if (model == null)
            {
                return RedirectToAction("Index", "Home");
            }

            //SEO
            ViewBag.Title = model.title;
            ViewBag.Description = model.description;
            ViewBag.Keywords = model.metakewords;
            ViewBag.Robots = model.robots;
            ViewBag.Image = model.image;

            return View(model);
        }

        public JsonResult Search(string search)
        {
            var model = db.Post.Where(p => p.alias.Contains(search) ||
                                            p.content.Contains(search) ||
                                            p.description.Contains(search) ||
                                            p.title.Contains(search));
            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}