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

namespace CMS.Areas.Admin.Controllers
{
    [Authorize]
    public class ProductsController : Controller
    {
        private BenhVienQYEntities db = new BenhVienQYEntities();

        // GET: Admin/Products
        public async Task<ActionResult> Index()
        {
            return View(await db.Product.ToListAsync());
        }

        [AllowAnonymous]
        public JsonResult RelateProduct(int idProduct, int numLimit)
        {
            Product product = db.Product.Where(p => p.idProduct == idProduct).FirstOrDefault();

            var model = db.Product.Where(p => p.idCategoryProduct == product.idCategoryProduct && p.idProduct != product.idProduct).Take(numLimit);


            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult GetByCategory(int idCategory)
        {
            var model = db.Product.Where(p => p.idCategoryProduct == idCategory);

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        // GET: Admin/Products/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = await db.Product.FindAsync(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // GET: Admin/Products/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/Products/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "idProduct,idCategoryProduct,idUserCreated,idUserModified,timeCreated,timeModified,title,alias,content,note,description,published,image,tags,version,deleted,feature,metadescription,metakewords,author,robots,gra0w40_specification,gra0w40_technical,gra5w20_specification,gra5w20_technical,gra5w30_specification,gra5w30_technical,gra5w50_specification,gra5w50_technical,gra10w30_specification,gra10w30_technical,gra15w50_specification,gra15w50_technical")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Product.Add(product);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(product);
        }

        // GET: Admin/Products/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = await db.Product.FindAsync(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // POST: Admin/Products/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "idProduct,idCategoryProduct,idUserCreated,idUserModified,timeCreated,timeModified,title,alias,content,note,description,published,image,tags,version,deleted,feature,metadescription,metakewords,author,robots,gra0w40_specification,gra0w40_technical,gra5w20_specification,gra5w20_technical,gra5w30_specification,gra5w30_technical,gra5w50_specification,gra5w50_technical,gra10w30_specification,gra10w30_technical,gra15w50_specification,gra15w50_technical")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Entry(product).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(product);
        }

        // GET: Admin/Products/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = await db.Product.FindAsync(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // POST: Admin/Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Product product = await db.Product.FindAsync(id);
            db.Product.Remove(product);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
