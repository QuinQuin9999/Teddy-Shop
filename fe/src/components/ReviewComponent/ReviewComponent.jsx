import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Avatar, Rate, Skeleton, Typography, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

const ReviewComponent = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/api/v1/review/searchByProduct/${productId}`);
        console.log('Fetched Reviews:', response.data); 
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/v1/review/searchByProduct/${productId}`);
      console.log('Fetched Reviews:', response.data); 
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const newReview = {
        productId,
        userId: "1", 
        rating: values.rating,
        reviewContent: values.reviewContent,
        reviewDate: new Date()
      };
      await axios.post('http://localhost:8083/api/v1/review/save', newReview);
      form.resetFields();
      fetchReviews(); 
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async (reviewId, values) => {
    setFeedbackSubmitting(prevState => ({ ...prevState, [reviewId]: true }));
    try {
      const newFeedback = {
        userId: "1", 
        comment: values.comment,
        feedbackDate: new Date()
      };
      console.log("Submitting feedback:", newFeedback); 
      await axios.post(`http://localhost:8083/api/v1/review/feedback/${reviewId}`, newFeedback);
      fetchReviews(); 
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setFeedbackSubmitting(prevState => ({ ...prevState, [reviewId]: false }));
    }
  };

  if (loading) {
    return <Skeleton active />;
  }

  console.log("Reviews with feedback:", reviews)

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <div>
                  User {review.userId} <Rate disabled defaultValue={review.rating} />
                </div>
              }
              description={
                <>
                  <Typography.Text>{review.reviewContent}</Typography.Text>
                  <br />
                  <Typography.Text type="secondary">
                    {moment(review.reviewDate).format('MMMM Do YYYY, h:mm:ss a')}
                  </Typography.Text>
                  {review.feedback && review.feedback.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      {review.feedback.map((fb, index) => (
                        <div key={index} style={{ paddingLeft: '20px' }}>
                          <Typography.Text>{fb.comment}</Typography.Text>
                          <br />
                          <Typography.Text type="secondary">
                            {moment(fb.feedbackDate).format('MMMM Do YYYY, h:mm:ss a')}
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
                      <Form.Item>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Đăng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewComponent;
