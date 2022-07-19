<template >
  <!--eslint-disable-->
  <title>{{ title }}</title>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav>
      <div class="branding">
        <img src="img/large.svg" alt="Logo" />
      </div>
      <ul v-show="!mobile" class="navigation">
        <li v-if="auth">
          <router-link class="link" :to="{ path: '/' }">Home </router-link>
        </li>

        <li v-if="auth">
          <router-link class="link" :to="{ path: '/ListModel' }"
            >Modeles
          </router-link>
        </li>
        <li v-if="auth">
          <router-link class="link" :to="{ name: 'ListeFiltres' }"
            >Filtres
          </router-link>
        </li>
        <li v-if="auth">
          <div>
            <router-link to="/" class="btn me-2 link" @click="logout">
              Logout
            </router-link>
          </div>
        </li>

        <li>
          <div v-if="!auth">
            <router-link to="/login" class="btn me-2 link"> Login </router-link>
            <router-link to="/register" class="btn me-2 link"
              >Register</router-link
            >
          </div>
        </li>
      </ul>
      <div v-show="mobile" class="icon">
        <i
          @click="toggleMobileNav"
          class="bi bi-justify fs-3"
          :class="{ 'icon-active': mobileNav }"
        ></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li v-if="auth">
            <router-link class="link" :to="{ path: '/' }">Home </router-link>
          </li>

          <li v-if="auth">
            <router-link class="link" :to="{ path: '/ListModel' }"
              >Modeles
            </router-link>
          </li>
          <li v-if="auth">
            <router-link class="link" :to="{ name: 'ListeFiltres' }"
              >Filtres
            </router-link>
          </li>

          <li v-if="auth">
            <div>
              <router-link to="/" class="btn me-2 link" @click="logout">
                Logout
              </router-link>
            </div>
          </li>

          <li>
            <div v-if="!auth">
              <router-link to="/login" class="btn me-2 link">
                Login
              </router-link>
              <router-link to="/register" class="btn me-2 link"
                >Register</router-link
              >
            </div>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>
<script>
/* eslint-disable */
import { computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "nav-item",
  props: ["title"],
  data() {
    return {
      scrolledNav: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  updated() {
    const scrollPos = window.scrollY;
    if (scrollPos > 50) {
      this.scrolledNav = true;
      return;
    }
    this.scrolledNav = false;
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 950) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
    },
  },
  setup(title) {
    const store = useStore();

    const auth = computed(() => store.state.auth);
    const router = useRouter();
    const logout = async () => {
      await axios.post("logout", {}, { withCredentials: true });
      axios.defaults.headers.common["Authorization"] = "";
      await store.dispatch("setAuth", false);
      router.push("/login");
    };
    return {
      auth,
      logout,
    };
  },
};
</script>
<style lang="scss"  scoped>
header {
  background-color: rgb(37, 57, 111);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: #fff;
  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: 0.5s ease all;
    width: 90%;
    margin: 0 auto;

    @media (min-width: 1140) {
      max-width: 1140px;
    }
    ul,
    .link {
      font-weight: 500;
      color: #fff;

      list-style: none;
      text-decoration: none;
    }
    li {
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }
    .link {
      font-size: 14px;
      transition: 0.5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;
      &:hover {
        color: rgb(145, 174, 252);
        border-color: rgb(145, 174, 252);
      }
    }
    .branding {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        transition: 0.5s ease all;
      }
    }
    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }
    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;
      i {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;
      }
    }
    .icon-active {
      transform: rotate(180deg);
    }
    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      background-color: #fff;
      top: 0;
      left: 0;
      li {
        margin-left: 0;
        .link {
          color: #000;
          &:hover {
            color: rgb(145, 174, 252);
            border-color: rgb(145, 174, 252);
          }
        }
      }
      .mobile-nav-enter-active,
      .mobile-nav-leave-active {
        transition: 1s ease all;
      }
      .mobile-nav-enter-from,
      .mobile-nav-leaave-to {
        transform: translateX(-250px);
      }
      .mobile-nav-enter-to {
        transform: translateX(0);
      }
    }
  }
}
.scrolled-nav {
  background-color: rgb(37, 57, 111);
  box-shadow: 0px 4px 6px -1xp rgba(37, 57, 111, 0.1), 0px 2px 4px -1xp,
    rgba(37, 57, 111, 0.06);
  nav {
    padding: 8px 0;
    .branding {
      img {
        width: 40px;
        box-shadow: 0px 4px 6px -1xp rgba(37, 57, 111, 0.1), 0px 2px 4px -1xp,
          rgba(37, 57, 111, 0.06);
      }
    }
  }
}
</style>
