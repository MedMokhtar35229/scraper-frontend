<template>
  <div class="home">
    <div class="container">
      <LoginForm
        v-if="loginData.id == 0"
        @login-data="setLoginData"
        @success="success"
      />
      <!--eslint-disable-next-line-->
      <AuthenticatorForm
        v-if="loginData.id !== 0"
        :login-data="loginData"
        @success="success"
      />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

import LoginForm from "@/views/login/LoginForm.vue";
import AuthenticatorForm from "./AuthenticatorForm.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "login-item",
  components: { LoginForm, AuthenticatorForm },
  setup() {
    const loginData = reactive({
      id: 0,
      secret: "",
      otpauth_url: "",
    });
    const router = useRouter();
    const store = useStore();
    const setLoginData = (data) => {
      loginData.id = data.id;
      if (data.secret) {
        loginData.secret = data.secret;
        loginData.otpauth_url = data.otpauth_url;
      }
    };
    const success = async () => {
      await store.dispatch("setAuth", true);
      await router.push("/");
    };
    return { loginData, setLoginData, success };
  },
};
</script>
