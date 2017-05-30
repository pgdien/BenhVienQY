using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Models;
using CMS.Models.Account;
using WebMatrix.WebData;
using System.Web.Security;
using System.Net;

namespace CMS.Controllers
{
    public class AccountController : Controller
    {
        BenhVienQYEntities db = new BenhVienQYEntities();

        [Authorize(Roles = "Admin")]
        // Get: Account
        public ActionResult Index()
        {
            //Get list account
            var User = db.User.ToList();

            return View(User);
        }

        //Register
        //Get
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult Register()
        {

            //Load Default Data
            ViewBag.role = new SelectList(db.webpages_Roles, "RoleId", "RoleName");

            return View();
        }

        //Post
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Register(Register register)
        {
            if (ModelState.IsValid)
            {
                //Them nguoi dung
                WebSecurity.CreateUserAndAccount(register.Username, register.Password);

                //Them nguoi dung vao nhom quyen
                string rolename = db.webpages_Roles.Where(p => p.RoleId == register.Role).First().RoleName;
                Roles.AddUserToRole(register.Username, rolename);

                db.SaveChanges();
                return RedirectToAction("Index", "Account");
            }

            //Load Default Data
            ViewBag.role = new SelectList(db.webpages_Roles, "RoleId", "RoleName", register.Role);

            return View(register);
        }

        //ChangePassword
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult ChangePassword(int? id)
        {
            db.Configuration.AutoDetectChangesEnabled = false;
            db.Configuration.LazyLoadingEnabled = false;
            db.Configuration.ProxyCreationEnabled = false;

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var user = db.User.Find(id);
            ChangePassword model = new ChangePassword();
            model.Username = user.Username;
            //model.Role = ;
            if (user == null)
            {
                return HttpNotFound();
            }
            //Load Default Data

            return View(model);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ChangePassword(ChangePassword changePassword)
        {
            if (ModelState.IsValid)
            {
                //Đổi mật khẩu
                var token = WebSecurity.GeneratePasswordResetToken(changePassword.Username);

                WebSecurity.ResetPassword(token, changePassword.Password);


                db.SaveChanges();
                return RedirectToAction("Index", "Account");
            }


            return View(changePassword);
        }


        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult Edit(int? id)
        {
            db.Configuration.AutoDetectChangesEnabled = false;
            db.Configuration.LazyLoadingEnabled = false;
            db.Configuration.ProxyCreationEnabled = false;

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var user = db.User.Find(id);
            Register model = new Register();
            model.Username = user.Username;
            //model.Name = user.Name;
            //model.Role = ;
            if (user == null)
            {
                return HttpNotFound();
            }
            //Load Default Data
            ViewBag.role = new SelectList(db.webpages_Roles, "RoleId", "RoleName", Roles.GetRolesForUser(user.Username)[0]);

            return View(user);
        }

        //Delete
        [Authorize(Roles = "Admin")]
        public ActionResult Delete(int id)
        {
            var user = db.User.Where(p => p.UserId == id).FirstOrDefault();
            var userMem = db.webpages_Membership.Where(p => p.UserId == id).FirstOrDefault();
            if (user != null)
            {
                var role = Roles.GetRolesForUser(user.Username);
                Roles.RemoveUserFromRole(user.Username, role[0]);
                db.User.Remove(user);
                db.webpages_Membership.Remove(userMem);
                db.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        //Login
        //Get
        [HttpGet]
        public ActionResult Login()
        {
            if (WebSecurity.IsAuthenticated == true)
            {
                return RedirectToAction("Index", "Posts", new { Area = "Admin" });
            }

            return View();
        }

        //Post
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(Login login, string ReturnUrl)
        {
            if (ModelState.IsValid)
            {
                if (WebSecurity.Login(login.Username, login.Password))
                {
                    if (ReturnUrl != null)
                    {
                        return Redirect(ReturnUrl);
                    }
                    else
                    {
                        return RedirectToAction("Index", "Posts", new { Area = "Admin" });
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Tài khoản hoặc Mật khẩu không đúng!");
                }
            }

            return View(login);
        }

        //Logout
        [Authorize]
        public ActionResult Logout()
        {
            WebSecurity.Logout();

            return RedirectToAction("Login", "Account");
        }
    }
}