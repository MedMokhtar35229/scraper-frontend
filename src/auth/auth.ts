/* eslint-disable */
import { onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
    name: "auth",
    setup() {
        const message = reactive({
            name: "",
            email: "",
        });

        const store = useStore();
        const router = useRouter();
        const auth = computed(() => store.state.auth);
        onMounted(async () => {

            try {
                const { data } = await axios.get("user");
                message.name = `${data.first_name}   ${data.last_name}`;
                message.email = `${data.email}`;
                await store.dispatch("setAuth", true);
            } catch (e) {
                await store.dispatch("setAuth", false);
                router.push("/login");
            }
        });

        return {
            auth,

        };
    },
};
