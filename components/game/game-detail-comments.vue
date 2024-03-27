<template>
    <div class="latest-comments">
        <ul class="list-wrap">
            <li v-for="comment in comments" :key="comment.id">
                <div class="comments-box">
                    <div class="comments-avatar">
                        <img src="/images/blog/comment01.png" alt="img">
                    </div>
                    <div class="comments-text">
                        <div class="avatar-name">
                            <h6 class="name">{{ comment.memberId }} <a href="" class="comment-reply-link"
                                    @click.prevent="toggleVisibility"><i class="fas fa-reply"></i> 查看回復</a></h6>
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
                <ul class="children" v-show="showComments">
                    <!-- v-show="replyComments" -->
                    <li>
                        <div class="comments-box">                          
                            <div class="comments-text">
                                <div class="avatar-name">
                                    <h6 class="name">leave a comment </h6>                                 
                                </div>
                                <form class="comment-form" @submit.prevent="submitAttachedComment(comment.id)" :validation-schema="schema">
                                    <div class="form-grp">
                                        <err-message :msg="errors.comment" />
                                        <Field name="comment" v-slot="{ field }">
                                            <textarea v-bind="field" name="comment" placeholder="Reply The Comment *"></textarea>
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
import { useForm, Field } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';

const props = defineProps({
    gameId: Number,
});

let comments = ref(null);

async function fetchComments(gameId) {
    try {
        const response = await axios.get(`https://localhost:7048/api/Comments/${gameId}`);
        comments.value = response.data; // 返回获取到的评论数据
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch comments'); // 如果出现错误，抛出一个错误
    }
}

(async () => {
    try {
        fetchComments(props.gameId);
    } catch (error) {
        console.log(error);
    }
})();

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

const schema = yup.object({
  comment: yup.string().required().label("Comment")
});

const { errors, handleSubmit , resetForm} = useForm({
  validationSchema: schema
});

const submitAttachedComment = (commentId) => {
  handleSubmit((values) => {
    values.mainCommentId = commentId; // 将评论ID添加到表单数据中
    values.memberId = 2;
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