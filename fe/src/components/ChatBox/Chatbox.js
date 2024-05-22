import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chatstyle.css';
import { useSelector } from 'react-redux';
import { updateUser} from "../../redux/slices/userSlide";
import * as UserService from "../../services/UserService";
import { Button, Modal } from 'antd';


const ChatBox = ({onClose }) => {
  const [data, setData] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const user = useSelector((state) => state.user);
  const [userID, setUserId] = useState("");
  useEffect(() => {
    console.log("User:", user);
    setUserId(prevUserId => {
      console.log(prevUserId); 
      return user?.id; 
    });
  }, [user?.id]);
  useEffect(() => {
    fetchMessages();
  }, [userID]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/conversation/${userID}`);
      setData(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy tin nhắn:', error);
    }
  };
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleLogin = () => {
    window.location.href = '/signin';
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const sendMessage = async () => {
    if(!userID){
      setShowLoginModal(true);
      return;
    }
    try {
      await axios.post(`http://localhost:8083/api/conversation/message/${userID}`, {
        senderID: userID,
        messageContent: newMessage
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h2>Chat Box</h2>
        <button onClick={onClose} className="close-button">Đóng</button>
      </div>
      <div className="messages">
      {data ? (
        <>
            {data.messages && data.messages.map((message, index) => (
              <div key={index} className={`message ${message.senderID === userID ? 'user-message' : 'admin-message'}`}>
                <p>{message.content}</p>
                <p>{new Date(message.date).toLocaleString()}</p>
              </div>
            ))}
        </>
      ) : (
        <p><i>Lịch sử chat trống. Mời gửi tin nhắn</i></p>
      )}
      </div>
      <div className="new-message">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>
      <Modal
            title="Yêu cầu đăng nhập"
            visible={showLoginModal}
            onCancel={handleCloseModal}
            footer={[
              <Button key="cancel" onClick={handleCloseModal}>
                OK
              </Button>,
              <Button key="login" type="primary" onClick={handleLogin}>
                Đăng nhập
              </Button>
            ]}
          >
            Bạn cần đăng nhập để có thể gửi tin nhắn
     </Modal>  
    </div>
  );
};

export default ChatBox;