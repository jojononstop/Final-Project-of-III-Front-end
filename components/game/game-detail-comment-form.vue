<template>
	<div class="latest-comments">
        <ul class="list-wrap">
            <li >
                <!-- <div class="comments-box">
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
                </ul> -->
                <ul >
                    <li>
                        <div class="comments-box">    
							<div class="comments-avatar">
                                <img src="/images/blog/comment02.png" alt="img">
								<div class="container-wrapper">
									<div class="container d-flex align-items-center justify-content-center">
										<div class="row justify-content-center">
							
											<!-- star rating -->
											<div class="rating-wrapper">
							
												<!-- star 5 -->
												<input type="radio" id="5-star-rating" name="star-rating" value="5" @click="getRating">
												<label for="5-star-rating" class="star-rating">
													<i class="fas fa-star d-inline-block"></i>
												</label>
							
												<!-- star 4 -->
												<input type="radio" id="4-star-rating" name="star-rating" value="4" @click="getRating">
												<label for="4-star-rating" class="star-rating star">
													<i class="fas fa-star d-inline-block"></i>
												</label>
							
												<!-- star 3 -->
												<input type="radio" id="3-star-rating" name="star-rating" value="3" @click="getRating">
												<label for="3-star-rating" class="star-rating star">
													<i class="fas fa-star d-inline-block"></i>
												</label>
							
												<!-- star 2 -->
												<input type="radio" id="2-star-rating" name="star-rating" value="2" @click="getRating">
												<label for="2-star-rating" class="star-rating star">
													<i class="fas fa-star d-inline-block"></i>
												</label>
							
												<!-- star 1 -->
												<input type="radio" id="1-star-rating" name="star-rating" value="1" @click="getRating">
												<label for="1-star-rating" class="star-rating star">
													<i class="fas fa-star d-inline-block"></i>
												</label>
							
											</div>
							
										</div>
									</div>
								</div>
                            </div>                      
                            <div class="comments-text">
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

	<!-- <div class="container-wrapper">
		<div class="container d-flex align-items-center justify-content-center">
			<div class="row justify-content-center">

				<div class="rating-wrapper">

					<input type="radio" id="5-star-rating" name="star-rating" value="5" @click="getRating">
					<label for="5-star-rating" class="star-rating">
						<i class="fas fa-star d-inline-block"></i>
					</label>

					<input type="radio" id="4-star-rating" name="star-rating" value="4" @click="getRating">
					<label for="4-star-rating" class="star-rating star">
						<i class="fas fa-star d-inline-block"></i>
					</label>

					<input type="radio" id="3-star-rating" name="star-rating" value="3" @click="getRating">
					<label for="3-star-rating" class="star-rating star">
						<i class="fas fa-star d-inline-block"></i>
					</label>

					<input type="radio" id="2-star-rating" name="star-rating" value="2" @click="getRating">
					<label for="2-star-rating" class="star-rating star">
						<i class="fas fa-star d-inline-block"></i>
					</label>

					<input type="radio" id="1-star-rating" name="star-rating" value="1" @click="getRating">
					<label for="1-star-rating" class="star-rating star">
						<i class="fas fa-star d-inline-block"></i>
					</label>

				</div>

			</div>
		</div>
	</div> -->

</template>

<script setup>

	import { useForm, Field } from 'vee-validate';
	import * as yup from 'yup';
	import axios from 'axios';

	const props = defineProps({
		gameId: Number,
	});

	const schema = yup.object({
		comment: yup.string().required().label("Comment")
	});

	const { errors, handleSubmit, resetForm } = useForm({
		validationSchema: schema
	});

	let value = null;
	function getRating() {
		const radioButtons = document.getElementsByName('star-rating');

		radioButtons.forEach(button => {
			if (button.checked) {
				value = button.value;
			}
		});


		console.log(value);
	}

	const submitAttachedComment = (commentId) => {
		handleSubmit((values) => {
			values.mainCommentId = commentId; // 将评论ID添加到表单数据中
			values.memberId = 2;
			values.dateTime = new Date();

			axios.post('https://localhost:7048/api/Comments', values)
				.then(response => {
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

<style scoped>
	/* .container-wrapper {
  background-color: #EDF0F9;
} */

	.container {
  height: 10vh;
}

	.rating-wrapper {
		background-color: #edf0f9e0;
		align-self: center;
		box-shadow: 7px 7px 20px rgba(198, 206, 237, .7),
			-7px -7px 30px rgba(255, 255, 255, .7),
			inset 0px 0px 4px rgba(255, 255, 255, .9),
			inset 7px 7px 15px rgba(198, 206, 237, .8);
		border-radius: 5rem;
		display: inline-flex;
		direction: rtl !important;
		padding: 1px 10px;
		margin-left: auto;


		label {
			color: #E1E6F6;
			cursor: pointer;
			display: inline-flex;
			font-size: 20px;
			padding: 1rem .2rem;
			transition: color 0.5s;
		}

		svg {
			-webkit-text-fill-color: transparent;
			-webkit-filter: drop-shadow (4px 1px 6px rgba(198, 206, 237, 1));
			filter: drop-shadow(5px 1px 3px rgba(198, 206, 237, 1));
		}

		input {
			height: 100%;
			width: 100%;
		}

		input {
			display: none;
		}

		label:hover,
		label:hover~label,
		input:checked~label {
			color: #34AC9E;
		}

		label:hover,
		label:hover~label,
		input:checked~label {
			color: #34AC9E;
		}
	}
</style>