<template>
    <div class="latest-comments">
        <ul class="list-wrap">
            <li v-for="comment in comments">
                <div class="comments-box">
                    <div class="comments-avatar">
                        <img src="/images/blog/comment01.png" alt="img">
                    </div>
                    <div class="comments-text">
                        <div class="avatar-name">
                            <h6 class="name">{{ comment.memberId }} <a href="" class="comment-reply-link"
                                    @click.prevent="toggleVisibility"><i class="fas fa-reply"></i> Reply</a></h6>
                            <span class="date">{{ formatDate(comment.date) }}</span>
                        </div>
                        <p>{{ comment.comment1 }}"</p>
                    </div>
                </div>
                <ul v-show="showComments" v-if="comment.attachedComment.length > 0" class="children">
                    <li v-for="attachedComment in comment.attachedComment">
                        <div class="comments-box">
                            <div class="comments-avatar">
                                <img src="/images/blog/comment02.png" alt="img">
                            </div>
                            <div class="comments-text">
                                <div class="avatar-name">
                                    <h6 class="name">{{ attachedComment.memberId }} </h6>
                                    <span class="date">{{ formatDate(attachedComment.dateTime) }}</span>
                                </div>
                                <p>{{ attachedComment.comment }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="children">
                    <!-- v-show="replyComments" -->
                    <li>
                        <div class="comments-box">
                            <div class="comments-avatar">
                                <img src="/images/blog/comment02.png" alt="img">
                            </div>
                            <div class="comments-text">
                                <div class="avatar-name">
                                    <h6 class="name">memberName </h6>
                                    <span class="date"> {{ formatDate(currentDate) }} </span>
                                </div>
                                <form class="comment-form" @submit.prevent="onSubmit" :validation-schema="schema">
                                    <div class="form-grp">
                                        <err-message :msg="errors.comment" />
                                        <Field name="comment" v-slot="{ field }">
                                            <textarea v-bind="field" name="comment" placeholder="Comment *"></textarea>
                                        </Field>
                                    </div>
                                    <!-- <Field name="id" v-slot="{ field }">
                                        <input type="hidden" v-bind="field" value="0" />
                                    </Field>
                                    <Field name="mainCommentId" v-slot="{ field }">
                                        <input type="hidden" v-bind="field" :value="comment.id" />
                                    </Field>
                                    <Field name="memberId" v-slot="{ field }">
                                        <input type="hidden" v-bind="field" :value="2" />
                                    </Field>
                                    <Field name="dateTime" v-slot="{ field }">
                                        <input type="hidden" v-bind="field" :value="formatDate(currentDate)" />
                                    </Field>
                                    <Field name="mainComment" v-slot="{ field }">
                                        <input type="hidden" v-bind="field" value="null" />
                                    </Field>
                                    <Field name="member" v-slot="{ field }">
                                        <input type="hidden" v-bind="field" value="null" />
                                    </Field> -->
                                    <button type="submit">Post Comment</button>
                                </form>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
            <!-- <li>
                <div class="comments-box">
                    <div class="comments-avatar">
                        <img src="/images/blog/comment03.png" alt="img">
                    </div>
                    <div class="comments-text">
                        <div class="avatar-name">
                            <h6 class="name">Luna Rose <a href="#" class="comment-reply-link"><i
                                        class="fas fa-reply"></i> Reply</a></h6>
                            <span class="date">September 6, 2023</span>
                        </div>
                        <p>Axcepteur sint occaecat atat non proident, sunt culpa officia deserunt mollit anim id est
                            labor umLor emdolor eam enim ad minim veniam quis nostrud today.</p>
                    </div>
                </div>
            </li> -->
        </ul>
    </div>
</template>

<script setup>
import { useForm, Field } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps({
    comments: Object,
});

const currentDate = new Date();

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
};

const showComments = ref(false);

function toggleVisibility() {
    showComments.value = !showComments.value;
}

// 定义验证规则
const schema = yup.object({
    comment: yup.string().required().label('Comment'),
});

const { handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
    console.log('Form Values:', values);
    alert(JSON.stringify(values, null, 2));
});
</script>