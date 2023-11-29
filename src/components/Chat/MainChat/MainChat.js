import React, { useState } from 'react'
import { FaSave } from 'react-icons/fa';
import "./mainChat.css"
import { FaArrowRight, FaBars } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../context/UserAuthContext';
import { BiLogOut } from 'react-icons/bi';




const MainChat = ({ promptList ,toggle, toggleHandle, conversationList, typingBtn, setTypingBtn, inputHandle, typing, text, setText, setPromptList, setConversationList }) => {
    const { logOut } = useUserAuth();

    const navigate = useNavigate();

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

        setPromptList([...promptList, text ]);
        setText('')
        console.log('save')
    }

    function handleClearChat() {
        setConversationList([]);
      }


    return (
        <main className="chat">

            <nav className='navbar'>
                <div className='mobileBtn'>
                    <button onClick={() => toggleHandle()} ><FaBars /></button>
                </div>

                <div>
                    <Link to={"/"}>
                        <img src={process.env.PUBLIC_URL + "/dist/images/xloop-chat-logo.png"} width="180px" alt='ge logo' className='navbar-logo' />
                    </Link>
                </div>
                
                <div className='top-right'>
                    <button className='clearChat' onClick={handleClearChat}>
                        <span className='button-content'>
                            <AiOutlineClear className="clear-icon" />
                        </span>
                    </button>
                    <div onClick={() => handleLogOut()}>
                        <BiLogOut color='white' cursor={'pointer'} />
                    </div>
                </div>


            </nav>

            <div className='chat-messages'>

                {
                    conversationList.map((component, index) => {
                        return (
                            <>
                                <div key={index}>
                                    {component}
                                </div>
                            </>

                        )
                    })
                }
            </div>
            <form onSubmit={(e) => inputHandle(e)} className={toggle ? 'input-full' : 'input-container'}>
                <input disabled={typing} onChange={(e) => {
                    const text1 = e.target.value;
                    setText(text1)
                    setTypingBtn(text1.trim() === '');

                }} value={text} placeholder="Enter Prompt" type="text" className='chat-input' />
                <button disabled={typingBtn} type='submit' className={typingBtn ? 'submitbtnDisbaled' : 'submitbtn'} onClick={(e) => inputHandle(e)} ><FaArrowRight /></button>
                <div style={{ display: 'flex', alignItems: 'center' }} disabled={typingBtn} className={typingBtn ? 'submitbtnDisbaled' : 'Savebtn'} onClick={(e) => saveHandle(e)} ><FaSave /> </div>
            </form>

        </main>
    )
}

export default MainChat;