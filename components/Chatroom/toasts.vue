<template>
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
        <div v-for="(toast, index) in toasts" :key="index" class="toast align-items-center"
            :class="[toast.variant ? 'bg-' + toast.variant : '', 'text-white']" role="alert" aria-live="assertive"
            aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    {{ toast.message }}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"
                    @click="removeToast(index)"></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            toasts: [],
        };
    },
    methods: {
        addToast(message, variant = null) {
            this.toasts.push({ message, variant });
            setTimeout(() => {
                this.removeToast(this.toasts.length - 1);
            }, 5000); // 设置 Toast 显示时间
        },
        removeToast(index) {
            this.toasts.splice(index, 1);
        },
    },
};
</script>

<!-- 样式引入，确保你的项目中已经引入了 Bootstrap 样式 -->
<style scoped>
.toast {
    position: relative;
    max-width: 350px;
}
</style>