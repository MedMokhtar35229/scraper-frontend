<template>
  <div class="auth-form">
    <div class="auth">
      <div class="col-md-6 col-12 mx-auto row h-100">
        <div id="auth-left">
          <div
            class="align-items-normal"
            style="margin-bottom: 2rem; padding-right: 0rem; padding-left: 0rem"
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
            <h1 class="d-inline-block text-center">Ur Digit Code</h1>
          </div>

          <form @submit.prevent="submit">
            <label :class="{ 'text-danger': m }">Code de 6 chiffres </label>

            <div class="form-group position-relative has-icon-left mb-4">
              <input
                :class="{ 'is-invalid': m }"
                v-model="code"
                type="text"
                class="form-control form-control-xl"
                placeholder="6 digits code"
              />
              <div class="form-control-icon">
                <i class="bi bi-file-code-fill"></i>
              </div>
              <div class="invalid-tooltip">
                Regardez bien!, le code est invalide
              </div>
            </div>

            <button class="btn btn-primary btn-block btn-lg shadow-lg">
              Sauvé
            </button>
          </form>
          <center>
            <br />
            <img :src="img" class="w-25 h-25 shadow-lg" v-if="img" />
          </center>
          <div class="text-center text-lg fs-4">
            <p class="small text-dark">
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
import { ref, SetupContext } from "vue";
import axios from "axios";
import qrcode from "qrcode";
export default {
  name: "AuthenticatorForm",
  emits: ["success"],
  props: ["loginData"],
  setup(props: { loginData: any }, context: SetupContext) {
    const code = ref("");
    const img = ref<string | null>(null);
    if (props.loginData.otpauth_url) {
      qrcode.toDataURL(props.loginData.otpauth_url, (err, data) => {
        img.value = data;
      });
    }
    const m = ref(false);

    const submit = async () => {
      const { data, status } = await axios.post("two-factor", {
        ...props.loginData,
        code: code.value,
      });
      if (status === 200) {
        context.emit("success");
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        m.value = false;
      }
      if (status !== 200) {
        m.value = true;
      }
    };

    return { code, img, submit, m };
  },
};
</script>
<style lang="scss" scoped>
.auth-form {
  padding-top: 6rem;
}
</style>

