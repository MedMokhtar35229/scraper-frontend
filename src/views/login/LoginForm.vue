<template>
  <div id="auth row h-100">
    <div class="col-md-6 col-12 mx-auto">
      <div id="auth-left">
        <div
          class="align-items-center"
          style="padding-top: 5rem; padding-right: 0rem; padding-left: 0rem"
        >
          <img
            style="width: 10rem; height: 8rem; border-color: black; border: 2px"
            src="img/large.svg"
            alt="Logo"
            class="col d-inline-block rounded"
          />
          <h1 class="d-inline-block text-center">Log in</h1>
        </div>

        <form @submit.prevent="submit">
          <div class="form-group position-relative has-icon-left mb-4">
            <label :class="{ 'text-danger': m }">Email de l'utilisateur</label>

            <input
              :class="{ 'is-invalid': m }"
              v-model="login.email"
              type="email"
              class="form-control form-control-xl"
              placeholder="Email"
            />
            <div class="form-control-icon">
              <i class="bi bi-envelope"></i>
            </div>
          </div>
          <div class="form-group position-relative has-icon-left mb-4">
            <label :class="{ 'text-danger': m }"
              >Password de l'utilisateur</label
            >

            <input
              :class="{ 'is-invalid': m }"
              v-model="login.password"
              type="password"
              class="form-control form-control-xl"
              placeholder="Password"
            />
            <div class="form-control-icon">
              <i class="bi bi-shield-lock"></i>
            </div>
            <div class="invalid-tooltip">infos invalident</div>
          </div>

          <button class="btn btn-primary shadow-lg form-control">Log in</button>
        </form>

        <div class="text-center text-lg fs-4">
          <p class="small text-dark">
            Don't have an account?
            <router-link to="/register" class="font-bold">Sign up</router-link>.
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
</template>
<script lang="ts">
import { reactive, ref, SetupContext } from "vue";
import axios from "axios";

export default {
  name: "LoginForm",
  emits: ["loginData", "success"],
  setup(props: any, context: SetupContext) {
    const login = reactive({
      email: "",
      password: "",
    });
    let m = ref(false);

    const submit = async () => {
      const { status, data } = await axios.post("login", login);
      if (status !== 200) {
        m.value = true;
      }
      if (status === 200) {
        m.value = false;
      }
      context.emit("loginData", data);
    };

    return {
      login,
      submit,
      m,
    };
  },
};
</script>
