<template>
  <div class="home">
    <div class="container">
      <div class="main">
        <div id="auth row h-100">
          <div class="col-md-6 col-12 mx-auto">
            <div id="auth-left">
              <div
                class="align-items-normal"
                style="
                  padding-top: 5rem;
                  padding-right: 0rem;
                  padding-left: 0rem;
                "
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

                <h1 class="d-inline-block text-center">Register</h1>
              </div>

              <form @submit.prevent="submit">
                <div class="form-group position-relative has-icon-left mb-2">
                  <input
                    :class="{ 'is-invalid': m }"
                    v-model="data.first_name"
                    type="text"
                    class="form-control form-control-xl"
                    placeholder="First Name"
                  />
                  <div class="form-control-icon">
                    <i class="bi bi-person"></i>
                  </div>
                </div>
                <div class="form-group position-relative has-icon-left mb-2">
                  <input
                    :class="{ 'is-invalid': m }"
                    v-model="data.last_name"
                    type="text"
                    class="form-control form-control-xl"
                    placeholder="Last Name"
                  />
                  <div class="form-control-icon">
                    <i class="bi bi-person"></i>
                  </div>
                </div>
                <div class="form-group position-relative has-icon-left mb-2">
                  <input
                    :class="{ 'is-invalid': m }"
                    v-model="data.email"
                    type="email"
                    class="form-control form-control-xl"
                    placeholder="Email"
                  />
                  <div class="form-control-icon">
                    <i class="bi bi-envelope"></i>
                  </div>
                </div>
                <div class="form-group position-relative has-icon-left mb-2">
                  <input
                    :class="{ 'is-invalid': m }"
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
                    :class="{ 'is-invalid': m }"
                    v-model="data.password_confirm"
                    type="password"
                    class="form-control form-control-xl"
                    placeholder="Password Confirm"
                  />
                  <div class="form-control-icon">
                    <i class="bi bi-shield-lock"></i>
                  </div>
                  <div class="invalid-tooltip">
                    garder l'unicite de vos infos et le meme mdp
                  </div>
                </div>

                <button class="btn btn-primary btn-block btn-lg shadow-lg">
                  Submit
                </button>
              </form>
              <div class="text-center text-lg fs-4">
                <p class="small text-dark">
                  Don't have an account?
                  <router-link to="/register" class="font-bold"
                    >Sign up</router-link
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
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "register-item",
  setup() {
    const data = reactive({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirm: "",
    });
    const m = ref(false);
    const router = useRouter();
    async function submit() {
      const { status } = await axios.post("register", data);
      if (status == 200) {
        await router.push("/login");
      } else {
        m.value = true;
      }
    }
    return {
      data,
      submit,
      m,
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
  background-color: #fff;
  background-attachment: fixed;
  position: relative;
  height: 100vh;
  overflow-x: hidden;
  margin-top: 0rem;
}
</style>
