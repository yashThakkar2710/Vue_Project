import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Shorten from "../components/Home.vue";
import UpdateUrl from "../components/UpdateUrl.vue";

const isAuthenticated = () => !!localStorage.getItem("accessToken"); // Authentication check

const routes = [
  {
    path: "/",
    name: "Register",
    component: Register,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next("/home");
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next("/home");
      } else {
        next();
      }
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/shorten",
    name: "Shorten",
    component: Shorten,
    meta: { requiresAuth: true },
  },
  {
    path: "/update/:userId",
    name: "UpdateUrl",
    component: UpdateUrl,
    meta: { requiresAuth: true },
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: () => import("@/components/NotFound.vue"), // Optional 404 page
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/login"); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to route
  }
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  // If the route requires authentication but the user is not authenticated, redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next(); // Proceed to route
  }
});

export default router;
