import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import UpdateProfile from '../views/UpdateProfile.vue'
import Restaurants from '../views/Restaurants.vue'
import Questionnaire from '../views/Questionnaire.vue'
import Matchmaking from '../views/Matchmaking.vue'
import FavoriteRestaurants from '../views/FavoriteRestaurants.vue'


Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'startup',
    //   component: StartupPage
    // },
    {
      path: '/profile',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false 
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/update-profile",
      name: "update-profile-view",
      component: UpdateProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/restaurants",
      name: "restaurants",
      component: Restaurants
    },
    {
      path: "/questionnaire",
      name: "questionnaire",
      component: Questionnaire,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/matches",
      name: "match-making",
      component: Matchmaking,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoriteRestaurants,
      meta: {
        requiresAuth: true
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/");
  } else {
    // Else let them go to their next destination
    next();
  }
});

// const originalPath = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPath.call(this, location).catch(err => err)
// }

export default router;
