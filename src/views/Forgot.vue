<template>
  <div id="auth row h-100">
    <div class="col-md-6 col-12 mx-auto">
      <div id="auth-left">
        <div
          class="align-items-normal"
          style="padding-top: 5rem; padding-right: 0rem; padding-left: 0rem"
        >
          <img
            style="width: 10rem; height: 8rem; border-color: black; border: 2px"
            src="img/large.svg"
            alt="Logo"
            class="col d-inline-block rounded"
          />
          <h1 class="d-inline-block text-center">Ur New Password</h1>
        </div>

        <div
          v-if="notify.cls"
          :class="`alert alert-${notify.cls} alert-dismissible show fade`"
          role="alert"
        >
          {{ notify.message }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="submit">
          <div class="form-group position-relative has-icon-left mb-4">
            <input
              v-model="email"
              type="email"
              class="form-control form-control-xl"
              placeholder="Email"
            />
            <div class="form-control-icon">
              <i class="bi bi-envelope"></i>
            </div>
          </div>

          <button class="btn btn-primary btn-block btn-lg shadow-lg">
            Submit
          </button>
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

<script>
import { ref, reactive } from "vue";
import axios from "axios";
export default {
  name: "forgot-item",
  setup() {
    const email = ref("");
    const notify = reactive({
      cls: "",
      message: "",
    });
    const submit = async () => {
      try {
        const response = await axios.post("forgot", { email: email.value });
        notify.cls = "success";
        notify.message = "Email transferer";
      } catch (e) {
        notify.cls = "danger";
        notify.message = "Email non trouver";
      }
    };
    return {
      submit,
      notify,
      email,
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
  margin-top: 4%;
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
  padding-bottom: 2rem;
  padding-top: 1rem;
  float: center;
}
</style>