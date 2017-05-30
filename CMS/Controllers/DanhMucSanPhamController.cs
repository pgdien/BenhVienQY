using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Models;

namespace CMS.Controllers
{
    [RoutePrefix("danh-muc-san-pham")]
    public class DanhMucSanPhamController : Controller
    {
        private BenhVienQYEntities db = new BenhVienQYEntities();

        // GET: DanhMucSanPham
        [Route()]
        public ActionResult Index()
        {
            ViewBag.Title = "Danh mục sản phẩm";

            return View();
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Show(string alias, int id)
        {
            var model = db.CategoryProduct.Where(p => p.idCategory == id && p.alias == alias).FirstOrDefault();

            if (model == null)
            {
                return HttpNotFound();
            }

            //SEO
            ViewBag.Title = model.title;
            ViewBag.Description = model.metadescription;
            ViewBag.Keywords = model.metakewords;
            ViewBag.Robots = model.robots;
            ViewBag.Image = model.image;

            return View(model);
        }

    }
}