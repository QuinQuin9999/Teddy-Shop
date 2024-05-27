import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Avatar, Rate, Skeleton, Typography, Form, Input, Button, Empty, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { getDetailsUser } from '../../services/UserService';
import { useHistory } from 'react-router-dom';

const { TextArea } = Input;

const fetchReviewsWithUserNames = async (reviews, token) => {
  const reviewsWithUserNames = await Promise.all(
    reviews.map(async (review) => {
      try {
        const userResponse = await getDetailsUser(review.userId, token);
        const feedbacksWithUserNames = await Promise.all(
          review.feedback.map(async (fb) => {
            try {
              const feedbackUserResponse = await getDetailsUser(fb.userId, token);
              return {
                ...fb,
                userName: feedbackUserResponse?.data?.username,
              };
            } catch (error) {
              console.error('Error fetching user details for feedback:', error);
              return fb;
            }
          })
        );
        return {
          ...review,
          userName: userResponse?.data?.username,
          feedback: feedbacksWithUserNames,
        };
      } catch (error) {
        console.error('Error fetching user details for review:', error);
        return review;
      }
    })
  );

  return reviewsWithUserNames;
};

const ReviewComponent = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState({});
  const [form] = Form.useForm();

  const user = useSelector((state) => state.user);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/v1/review/searchByProduct/${productId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const reviewsWithUserNames = await fetchReviewsWithUserNames(response.data, user.token);
      setReviews(reviewsWithUserNames);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, user.token]);

  const handleSubmit = async (values) => {
    if (!user.id) {
      message.error('Vui lòng đăng nhập để viết đánh giá.');
      window.location.href = '/signin';
      return;
    }

    setSubmitting(true);
    try {
      const newReview = {
        productId,
        userId: user.id,
        rating: values.rating,
        reviewContent: values.reviewContent,
        reviewDate: new Date(),
      };
      await axios.post('http://localhost:8083/api/v1/review/save', newReview, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      form.resetFields();
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async (reviewId, values) => {
    if (!user.id) {
      message.error('Vui lòng đăng nhập để phản hồi.');
      window.location.href = '/signin';
      return;
    }

    setFeedbackSubmitting((prevState) => ({ ...prevState, [reviewId]: true }));
    try {
      const newFeedback = {
        userId: user.id,
        comment: values.comment,
        feedbackDate: new Date(),
      };
      await axios.post(`http://localhost:8083/api/v1/review/feedback/${reviewId}`, newFeedback, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      form.resetFields();
      fetchReviews();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setFeedbackSubmitting((prevState) => ({ ...prevState, [reviewId]: false }));
    }
  };

  if (loading) {
    return <Skeleton active />;
  }

  console.log('user', user)

  return (
    <div>
      <Form form={form} onFinish={handleSubmit} style={{ marginTop: '20px' }}>
        <Form.Item
          name="rating"
          rules={[{ required: true, message: 'Vui lòng chọn rating!' }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item
          name="reviewContent"
          rules={[{ required: true, message: 'Vui lòng viết đánh giá của bạn!' }]}
        >
          <TextArea rows={4} placeholder="Viết đánh giá ..." />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Đăng
          </Button>
        </Form.Item>
      </Form>
      {reviews.length === 0 ? (
        <Empty description="Chưa có đánh giá nào" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={
                  <div>
                    {review.userName} <Rate style={{marginLeft: '10px'}} disabled defaultValue={review.rating} />
                  </div>
                }
                description={
                  <>
                    <Typography.Text>{review.reviewContent}</Typography.Text>
                    <br />
                    <Typography.Text type="secondary">
                      {format(new Date(review.reviewDate), 'H:mm - dd/MM/yyyy')}
                    </Typography.Text>
                    {review.feedback && review.feedback.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        {review.feedback.map((fb, index) => (
                          <div key={index} style={{ paddingLeft: '20px' }}>
                            <div>{fb.userName}</div>
                            <Typography.Text>{fb.comment}</Typography.Text>
                            <br />
                            <Typography.Text type="secondary">
                              {format(new Date(fb.feedbackDate), 'H:mm - dd/MM/yyyy')}
                            </Typography.Text>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ marginTop: '10px' }}>
                      <Form
                        onFinish={(values) => handleFeedbackSubmit(review.reviewId, values)}
                        style={{ marginTop: '10px' }}
                      >
                        <Form.Item
                          name="comment"
                          rules={[{ required: true, message: 'Vui lòng viết phản hồi của bạn!' }]}
                        >
                          <TextArea rows={2} placeholder="Viết phản hồi ..." />
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'right' }}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={feedbackSubmitting[review.reviewId]}
                          >
                            Phản hồi
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ReviewComponent;