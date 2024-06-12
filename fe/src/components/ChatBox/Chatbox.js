import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chatstyle.css';
import { useSelector } from 'react-redux';
// import { updateUser} from "../../redux/slices/userSlide";
// import * as UserService from "../../services/UserService";
import { Button, Modal } from 'antd';


const ChatBox = ({ onClose, user }) => {
  const [data, setData] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const SignInUser = useSelector((state) => state.user);
  const [userID, setUserId] = useState("");
  // useEffect(() => {console.log("data", data)})
  useEffect(() => {
    console.log("User:", user);
    setUserId(prevUserId => {
      console.log(prevUserId); 
      return user?.id === "SignInUser"? SignInUser.id : user?.id; 
    });
  }, [user?.id]);
  useEffect(() => {
    if(userID) {
      fetchMessages();
    }
  }, [userID]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/conversation/${userID}`);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.warn('Lỗi khi lấy tin nhắn:', error);
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
        senderId: SignInUser.id,
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
            {/* <p>Hellu</p> */}
            {data.messages && data.messages.map((message, index) => (
              <div key={index} style={{marginBottom: '10px', float: `${message.senderId === SignInUser.id ? 'right' : 'left'}`}}>
                <span style={{color: '#D9D9D9', fontSize: '13px', display: 'block', textAlign:  `${message.senderId === SignInUser.id ? 'right' : 'left'}`}}>{new Date(message.date).toLocaleString()}</span>
                <span className={`message ${message.senderId === SignInUser.id ? 'user-message' : 'admin-message'}`}>
                  {message.content}
                </span>
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
            open={showLoginModal}
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