using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CMS.Models;

namespace CMS.Areas.Admin.Controllers
{
    public class BannerAPIController : ApiController
    {
        private BenhVienQYEntities db = new BenhVienQYEntities();

        // GET: api/BannerAPI
        public IQueryable<Banner> GetBanner()
        {
            return db.Banner;
        }

        // GET: api/BannerAPI/5
        [ResponseType(typeof(Banner))]
        public IHttpActionResult GetBanner(int id)
        {
            Banner banner = db.Banner.Find(id);
            if (banner == null)
            {
                return NotFound();
            }

            return Ok(banner);
        }

        // PUT: api/BannerAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBanner(int id, Banner banner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != banner.id)
            {
                return BadRequest();
            }

            db.Entry(banner).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BannerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/BannerAPI
        [ResponseType(typeof(Banner))]
        public IHttpActionResult PostBanner(Banner banner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Banner.Add(banner);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = banner.id }, banner);
        }

        // DELETE: api/BannerAPI/5
        [ResponseType(typeof(Banner))]
        public IHttpActionResult DeleteBanner(int id)
        {
            Banner banner = db.Banner.Find(id);
            if (banner == null)
            {
                return NotFound();
            }

            db.Banner.Remove(banner);
            db.SaveChanges();

            return Ok(banner);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BannerExists(int id)
        {
            return db.Banner.Count(e => e.id == id) > 0;
        }
    }
}