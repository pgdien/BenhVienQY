using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using CMS.Models;

namespace CMS.Controllers
{
    [RoutePrefix("danh-muc-bai-viet")]
    public class DanhMucBaiVietController : Controller
    {
        private BenhVienQYEntities db = new BenhVienQYEntities();

        [Route]
        public ActionResult Index()
        {
            ViewBag.Title = "Danh mục bài viết";

            return View();
        }

        [Route("phong-nghi")]
        public ActionResult PhongNghi()
        {
            return View();
        }

        [Route("nha-hang-va-su-kien")]
        public ActionResult NhaHangSuKien()
        {
            return View();
        }

        [Route("dich-vu-khach-san")]
        public ActionResult DichVuKhachSan()
        {
            return View();
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Show(string alias, int id)
        {
            var model = db.Category.Where(p => p.idCategory == id && p.alias == alias).FirstOrDefault();

            

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
