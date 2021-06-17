import React, { lazy } from 'react';
import { PAGES_URL } from './contant';

// const Page404 = lazy(() => import('../templates/ErrorPage/Page404'));
const Login = lazy(() => import('./templates/Account/Login'));
const ForgotPassword = lazy(() => import('./templates/Account/ForgotPassword'));
const Register = lazy(() => import('./templates/Account/Register'));
const Home = lazy(() => import('./templates/Home/Home'));
const Profile = lazy(() => import('./templates/Profile/Profile'));
const Product = lazy(() => import('./templates/Product/Product'));
const Admin = lazy(() => import('./templates/Admin/Admin'));
const User = lazy(() => import('./templates/User/ManageUser/ManageUser'));
const CreateUser = lazy(() => import('./templates/User/CreateUser/CreateUser'));
const EditUser = lazy(() => import('./templates/User/EditUser/EditUser'));
const Author = lazy(() => import('./templates/Author/ManageAuthor/ManageAuthor'));
const CreateAuthor = lazy(() => import('./templates/Author/CreateAuthor/CreateAuthor'));
const Category = lazy(() => import('./templates/Category/ManageCategory/ManageCategory'));
const CreateCategory = lazy(() => import('./templates/Category/CreateCategory/CreateCategory'));
const Book = lazy(() => import('./templates/Book/ManageBook/ManageBook'));
const CreateEditBook = lazy(() => import('./templates/Book/CreateEditBook/CreateEditBook'));

const LOGINS = [
    {
        "path": PAGES_URL.login.url,
        "component": Login
    },
    {
        "path": PAGES_URL.forgotPassword.url,
        "component": ForgotPassword
    },
    {
        "path": PAGES_URL.register.url,
        "component": Register
    },
]

const MAIN = [
    {
        "path": PAGES_URL.home.url,
        "component": Home
    },
    {
        "path": PAGES_URL.home.url + "category/:categoryId",
        "component": Home
    },
    {
        "path": PAGES_URL.profile.url + "/:accountId",
        "component": Profile
    },
    {
        "path": PAGES_URL.product.url + "/:bookId",
        "component": Product
    },
]

const ADMIN = [
    {
        "path": PAGES_URL.admin.url,
        "component": Admin,
        "label": "Bảng điều khiển"
    },
    {
        "path": PAGES_URL.user.url,
        "component": User,
        "label": "Quản lý người dùng"
    },
    {
        "path": PAGES_URL.user.url + "/add",
        "component": CreateUser,
        "label": "Thêm người dùng"
    },
    {
        "path": PAGES_URL.user.url + "/:accountId",
        "component": EditUser,
        "label": "Cập nhật người dùng"
    },
    {
        "path": PAGES_URL.user.url + "/:accountId",
        "component": EditUser,
        "label": "Cập nhật người dùng"
    },
    {
        "path": PAGES_URL.author.url ,
        "component": Author,
        "label": "Quản lý tác giả"
    },
    {
        "path": PAGES_URL.author.url + "/add",
        "component": CreateAuthor,
        "label": "Thêm tác giả"
    },
    {
        "path": PAGES_URL.category.url,
        "component": Category,
        "label": "Quản lý danh mục"
    },
    {
        "path": PAGES_URL.category.url + "/add",
        "component": CreateCategory,
        "label": "Thêm danh mục"
    },
    {
        "path": PAGES_URL.book.url,
        "component": Book,
        "label": "Quản lý sách"
    },
    {
        "path": PAGES_URL.book.url + "/add",
        "component": CreateEditBook,
        "label": "Thêm sách"
    },
    {
        "path": PAGES_URL.book.url + "/:bookId",
        "component": CreateEditBook,
        "label": "Sửa sách"
    },
]

// error page
const ERROR = [
    // {
    //     "path": "/404",
    //     "component": Page404,
    //     "label": ""
    // }
]

const getPathList = (DATA) => {
    var list = []
    for (var i = 0; i < DATA.length; i++) {
        if (DATA[i]) {
            list.push(DATA[i].path)
        }
    }
    return list
}

export { MAIN,LOGINS, ADMIN, getPathList }
