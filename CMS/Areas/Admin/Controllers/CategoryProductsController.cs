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
    public class CategoryProductsController : Controller
    {
        private BenhVienQYEntities db = new BenhVienQYEntities();

        // GET: Admin/CategoryProducts
        public async Task<ActionResult> Index()
        {
            var categoryProduct = db.CategoryProduct.Include(c => c.CategoryProduct2);
            return View(await categoryProduct.ToListAsync());
        }

        [AllowAnonymous]
        public JsonResult GetCategoryProduct()
        {
            db.Configuration.ProxyCreationEnabled = false;

            var model = db.CategoryProduct.Where(p => p.idCategoryParent == 1);

            return Json(model, JsonRequestBehavior.AllowGet);
        }


        // GET: Admin/CategoryProducts/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CategoryProduct categoryProduct = await db.CategoryProduct.FindAsync(id);
            if (categoryProduct == null)
            {
                return HttpNotFound();
            }
            return View(categoryProduct);
        }

        // GET: Admin/CategoryProducts/Create
        public ActionResult Create()
        {
            ViewBag.idCategoryParent = new SelectList(db.CategoryProduct, "idCategory", "idUserCreated");
            return View();
        }

        // POST: Admin/CategoryProducts/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "idCategory,idCategoryParent,idUserCreated,idUserModified,timeCreated,timeModified,title,alias,note,description,published,image,tags,version,deleted,metadescription,metakewords,author,robots")] CategoryProduct categoryProduct)
        {
            if (ModelState.IsValid)
            {
                db.CategoryProduct.Add(categoryProduct);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.idCategoryParent = new SelectList(db.CategoryProduct, "idCategory", "idUserCreated", categoryProduct.idCategoryParent);
            return View(categoryProduct);
        }

        // GET: Admin/CategoryProducts/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CategoryProduct categoryProduct = await db.CategoryProduct.FindAsync(id);
            if (categoryProduct == null)
            {
                return HttpNotFound();
            }
            ViewBag.idCategoryParent = new SelectList(db.CategoryProduct, "idCategory", "idUserCreated", categoryProduct.idCategoryParent);
            return View(categoryProduct);
        }

        // POST: Admin/CategoryProducts/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "idCategory,idCategoryParent,idUserCreated,idUserModified,timeCreated,timeModified,title,alias,note,description,published,image,tags,version,deleted,metadescription,metakewords,author,robots")] CategoryProduct categoryProduct)
        {
            if (ModelState.IsValid)
            {
                db.Entry(categoryProduct).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.idCategoryParent = new SelectList(db.CategoryProduct, "idCategory", "idUserCreated", categoryProduct.idCategoryParent);
            return View(categoryProduct);
        }

        // GET: Admin/CategoryProducts/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CategoryProduct categoryProduct = await db.CategoryProduct.FindAsync(id);
            if (categoryProduct == null)
            {
                return HttpNotFound();
            }
            return View(categoryProduct);
        }

        // POST: Admin/CategoryProducts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            CategoryProduct categoryProduct = await db.CategoryProduct.FindAsync(id);
            db.CategoryProduct.Remove(categoryProduct);
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
