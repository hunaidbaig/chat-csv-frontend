import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import "./mainChat.css";
import { FaArrowRight, FaBars } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthContext";
import { BiLogOut } from "react-icons/bi";
import { Button, Spin, Upload, message, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import JSZip from "jszip";

const MainChat = ({
  promptList,
  toggle,
  toggleHandle,
  conversationList,
  typingBtn,
  setTypingBtn,
  inputHandle,
  typing,
  text,
  setText,
  setPromptList,
  setConversationList,
}) => {
  const { logOut } = useUserAuth();

  const navigate = useNavigate();
  const [csvFile, setcsvFile] = useState(null);
  const [spinLoading, setSpinLoading] = useState(false);

  const handleLogOut = async () => {
    try {
      await logOut();
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const saveHandle = () => {
    setPromptList([...promptList, text]);
    setText("");
    console.log("save");
  };

  function handleClearChat() {
    setConversationList([]);
  }


  const compressFile = (file) => {
    const fileName = file.name.replace(".csv", "")
    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvData = event.target.result;
      const zip = new JSZip();
      zip.file(file.name, csvData);
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipFile = new File([zipBlob], file.name + '.zip', { type: 'application/zip' });
      handleUploadCsvFile(zipFile);
    };
    reader.readAsBinaryString(file);
  };

  const handleUploadCsvFile = async (file) => {
    console.log("file after compressed ", file)
    setSpinLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CHAT_SALES_URL + `/upload`}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok || !response.body) {
        setSpinLoading(false);
        notification.error({
            message: "Server Error",
            description: response.statusText,
          });
        throw response.statusText;
      } else if (response.ok) {
        const result = await response.json();
        notification.success({
          message: "File uploaded",
          description: result.message,
        });
        setcsvFile(null);
        setSpinLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setSpinLoading(false);
      notification.error({
        message: "Server Error",
        description: error.message,
      });
    }
  };

  const props = {
    beforeUpload: (file) => {
      console.log("File before compressed  ",file);
      const isCSV = file.type === "text/csv";
      if (!isCSV) {
        message.error(`${file.name} is not a CSV file`);
      } else {
        setSpinLoading(true);
        // setcsvFile(file);
        // handleUploadCsvFile(file);
        compressFile(file)
      }
      return false;
    },
    onChange: (info) => {
      console.log("file " + info);
    },
  };

  return (
    <main className="chat">
      <nav className="navbar">
        <div className="mobileBtn">
          <button onClick={() => toggleHandle()}>
            <FaBars />
          </button>
        </div>

        <div>
          <Link to={"/"}>
            <img
              src={process.env.PUBLIC_URL + "/dist/images/xloop-chat-logo1.png"}
              width="150px"
              alt="ge logo"
              className="navbar-logo"
            />
          </Link>
        </div>

        <div className="top-right">
          <button className="clearChat" onClick={handleClearChat}>
            <span className="button-content">
              <AiOutlineClear className="clear-icon" />
            </span>
          </button>
          <div onClick={() => handleLogOut()}>
            <BiLogOut color="white" cursor={"pointer"} />
          </div>
        </div>
      </nav>

      <div className="chat-messages">
        {conversationList.map((component, index) => {
          return (
            <>
              <div key={index}>{component}</div>
            </>
          );
        })}
      </div>
      <form
        onSubmit={(e) => inputHandle(e)}
        className={toggle ? "input-full" : "input-container"}
      >
        <input
          disabled={typing}
          onChange={(e) => {
            const text1 = e.target.value;
            setText(text1);
            setTypingBtn(text1.trim() === "");
          }}
          value={text}
          placeholder="Enter Prompt"
          type="text"
          className="chat-input"
        />
        <button
          disabled={typingBtn}
          type="submit"
          className={typingBtn ? "submitbtnDisbaled" : "submitbtn"}
          onClick={(e) => inputHandle(e)}
        >
          <FaArrowRight />
        </button>
        <Upload
          {...props}
          accept=".csv"
          fileList={csvFile ? [csvFile] : []}
          showUploadList={false}
        >
          <Button
            icon={
              spinLoading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 24,
                        color: "#ffffff",
                      }}
                      spin
                    />
                  }
                />
              ) : (
                <UploadOutlined />
              )
            }
            className="upload-file-btn"
          ></Button>
        </Upload>
        <div
          style={{ display: "flex", alignItems: "center" }}
          disabled={typingBtn}
          className={typingBtn ? "submitbtnDisbaled" : "Savebtn"}
          onClick={(e) => saveHandle(e)}
        >
          <FaSave />{" "}
        </div>
      </form>
    </main>
  );
};

export default MainChat;
