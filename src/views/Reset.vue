<template>
  <div id="auth">
    <div class="row h-100">
      <div class="col-md-6 col-12 mx-auto">
        <div id="auth-left">
          <div
            class="align-items-normal"
            style="padding-top: 5rem; padding-right: 0rem; padding-left: 0rem"
          >
            <img
              style="
                width: 10rem;
                height: 8rem;
                border-color: black;
                border: 2px;
              "
              src="img/large.svg"
              alt="Logo"
              class="col d-inline-block rounded"
            />

            <h1 class="d-inline-block text-center">Set New Password</h1>
          </div>

          <form @submit.prevent="submit">
            <div class="form-group position-relative has-icon-left mb-2">
              <input
                v-model="data.password"
                type="password"
                class="form-control form-control-xl"
                placeholder="Password"
              />
              <div class="form-control-icon">
                <i class="bi bi-shield-lock"></i>
              </div>
            </div>
            <div class="form-group position-relative has-icon-left mb-2">
              <input
                v-model="data.password_confirm"
                type="password"
                class="form-control form-control-xl"
                placeholder="Password Confirm"
              />
              <div class="form-control-icon">
                <i class="bi bi-shield-lock"></i>
              </div>
            </div>

            <button class="btn btn-primary btn-block btn-lg shadow-lg">
              Submit
            </button>
          </form>
          <div class="text-center text-lg fs-4">
            <p class="small">
              Don't have an account?
              <router-link to="/register" class="font-bold">Sign up</router-link
              >.
            </p>
            <p>
              <router-link to="/forgot" class="font-bold"
                >Forgot password?</router-link
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "reset-item",
  setup() {
    const data = reactive({
      password: "",
      password_confirm: "",
    });
    const route = useRoute();
    const router = useRouter();
    const submit = async () => {
      await axios.post("reset", {
        ...data,
        token: route.params.token,
      });
      await router.push("/login");
    };
    return {
      data,
      submit,
    };
  },
};
</script>
<style>
body {
  background-color: #fff;
}

#auth {
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  position: sticky;
  margin-top: 4rem;
}

#auth #auth-left {
  padding-left: 6rem;
  padding-right: 5rem;
}

#auth #auth-left .auth-title {
  font-size: 2rem;
  padding-bottom: 0rem;
}

#auth #auth-left .auth-subtitle {
  font-size: 1rem;
  line-height: 1.5rem;
  color: #a8aebb;
}

#auth #auth-left .auth-logo {
  padding-bottom: 0rem;
  padding-top: 1rem;
  float: center;
}

#auth #auth-left .auth-logo img {
  height: 40%;
  width: 10%;
  border: 1px solid rgb(0, 253, 63);
  background: green;
}
</style>