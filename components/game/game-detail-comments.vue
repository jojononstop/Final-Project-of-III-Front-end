<template>
    <div class="latest-comments">
        <ul class="list-wrap">
            <li v-for="comment in comments" :key="comment.id">
                <div class="comments-box">
                    <div class="comments-avatar">
                        <img :src="comment.avatarUrl" alt="img">
                    </div>
                    <div class="comments-text">
                        <div class="avatar-name">
                            <h6 class="name">{{ comment.name }} <a href="" class="comment-reply-link"
                                    @click.prevent="toggleVisibility(comment.id)"><i class="fas fa-reply"></i> 查看回復</a>
                            </h6>
                            <span class="date">{{ formatDate(comment.date) }}</span>
                        </div>
                        <p>{{ comment.comment1 }}"</p>
                    </div>
                </div>
                <ul v-show="showComments[comment.id]" v-if="comment.attachedComment.length > 0" class="children">
                    <li v-for="attachedComment in comment.attachedComment">
                        <div class="comments-box">
                            <div class="comments-avatar">
                                <img :src="attachedComment.avatarUrl" alt="img">
                            </div>
                            <div class="comments-text">
                                <div class="avatar-name">
                                    <h6 class="name">{{ attachedComment.name }} </h6>
                                    <span class="date">{{ formatDate(attachedComment.dateTime) }}</span>
                                </div>
                                <p>{{ attachedComment.comment }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="children" v-show="showComments[comment.id]">
                    <li>
                        <div class="comments-box">
                            <div class="comments-text">
                                <div class="avatar-name">
                                    <h6 class="name">reply the comment </h6>
                                </div>
                                <form class="comment-form" @submit.prevent="submitAttachedComment(comment.id)"
                                    :validation-schema="schema">
                                    <div class="form-grp">
                                        <err-message :msg="errors.comment" />
                                        <Field name="comment" v-slot="{ field }">
                                            <textarea v-bind="field" name="comment"
                                                placeholder="Reply The Comment *"></textarea>
                                        </Field>
                                    </div>
                                    <button type="submit">Post Reply</button>
                                </form>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { VueCookieNext as $cookie } from 'vue-cookie-next'
import { useForm, Field } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';

const props = defineProps({
    gameId: Number,
});

let comments = ref([]);


async function fetchComments(gameId) {
    try {
        const response = await axios.get(`https://localhost:7048/api/Comments/${gameId}`);
        comments.value = response.data.filter(comment => comment.memberId === memberId);
        for (const comment of comments.value) {
            comment.avatarUrl = await getMemberAvatar(comment.memberId);
            comment.name = await getMemberName(comment.memberId)
            for (const attachedComment of comment.attachedComment) {
                attachedComment.avatarUrl = await getMemberAvatar(attachedComment.memberId);
                attachedComment.name = await getMemberName(attachedComment.memberId)
            }
        }
        console.log(comments.value)
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch comments'); // 如果出现错误，抛出一个错误
    }
}

async function getMemberAvatar(memberId) {
    try {
        const response = await axios.get(`https://localhost:7048/api/Comments/memberAvatar/${memberId}`);
        const avatarUrl = response.data;
        return avatarUrl;
    } catch (error) {
        console.error(error);
    }
}

async function getMemberName(memberId) {
    try {
        const response = await axios.get(`https://localhost:7048/api/Comments/memberName/${memberId}`);
        const name = response.data;
        return name;
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    try {
        fetchComments(props.gameId);
    } catch (error) {
        console.log(error);
    }
})();


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
};

const showComments = reactive(
    Object.fromEntries(comments.value.map(comment => [comment.id, false]))
);


function toggleVisibility(commentId) {
    showComments[commentId] = !showComments[commentId];
}

const schema = yup.object({
    comment: yup.string().required().label("Comment")
});

const { errors, handleSubmit, resetForm } = useForm({
    validationSchema: schema
});

let id = $cookie.getCookie("accountId");
let memberId;
axios.post(`https://localhost:7048/api/Members/MemberId?protectId=${id}`, id)
    .then(response => {
        memberId = response.data
    })
    .catch(error => {
        console.log(error);
    });

const submitAttachedComment = (commentId) => {
    handleSubmit((values) => {

        values.memberId = memberId;
        values.mainCommentId = commentId;
        values.dateTime = new Date();

        axios.post('https://localhost:7048/api/Comments/attachedComment', values)
            .then(response => {
                fetchComments(props.gameId);
                alert('提交成功');

            })
            .catch(error => {
                alert('提交失败');
                console.error(error);
            });

        alert(JSON.stringify(values, null, 2));
        resetForm()
    })();
};
</script>