import React, { useState } from "react";
import Input from "./Input/Input";
import MainChat from "./MainChat/MainChat";
import Response from "./response/Response";
import Sidebar from "./Sidebar/Sidebar";

import './style.css'

const Chat = ({ chatType })=>{

    const [toggle, setToggle] = useState(false)
    const [text, setText] = useState('');
    const [conversationList, setConversationList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typingBtn, setTypingBtn] = useState(true);
    const [typing, setTyping] = useState(false);
    const [responseResult, setResponseResult] = useState('');
    const [ promptList, setPromptList ] = useState([])




    const toggleHandle = ()=>{
        setToggle(!toggle)
    }

    const inputHandle = async(e)=>{
        const faqsText = e.target.textContent;
        // console.log(faqsText);
        const QUESTIONVALUE = faqsText ? faqsText :  text;
        try{
            e.preventDefault();

            setLoading(false);
    
            const newComponent = <Input text={QUESTIONVALUE} />;
            const reponseComponent = <Response loading={loading} responseResult={responseResult} />;
    
            setConversationList([...conversationList, newComponent, reponseComponent]);
    
            setText('')
            setTypingBtn(true)
            setTyping(true);
    
            
            const requestOptions = {
                method: chatType === 'csv' ? 'GET' : 'POST',
                headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json",
                },
              };
              
              if (chatType === 'csv') {
                // If it's a GET request, no need to include the body
                requestOptions.body = undefined;
              } else {
                // If it's a POST request, include the body
                requestOptions.body = JSON.stringify({
                  "messages": [
                    {
                      "role": "user",
                      "content": QUESTIONVALUE
                    }
                  ]
                });
              }
            
    
            const response = await fetch(`${ chatType === 'csv' ? process.env.REACT_APP_CHAT_SALES_URL+`/${QUESTIONVALUE}` : process.env.REACT_APP_CHAT_STREAMING+'/api/chat'}`, requestOptions);
                if (!response.ok || !response.body) {
                    throw response.statusText;
                }
            
                if(chatType === 'csv'){

                    const result = await response.json();

                    let type = null;
                    let res = null;
                    // const {res} = result;
                    const {text, table, image} = result;

                    // console.log(table, 'table');

                    if(text){
                        res = text;
                    }
                    else if(table){
                        type = 'table'
                        res = table;
                    }
                    else if(image){
                        res = image;
                        type = 'image'
                    }
                    else{
                        const {res : re} = result;
                        res = re;

                    }

                    // console.log(result, 'hello')
                    setConversationList((prevList) => {
                        const updatedList = [...prevList];
                        const lastComponent = updatedList[updatedList.length - 1];

                        updatedList[updatedList.length - 1] = React.cloneElement(lastComponent, { loading: true, responseResult :res, type: type });

                        return updatedList;
                    });

                    setResponseResult('')
                    setLoading(false)
                    setTyping(false)

                }else{
                    // Here we start prepping for the streaming response
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    const loopRunner = true;
    
    
                    
                    let flag = '';
    
                    while (loopRunner) {
                        // Here we start reading the stream, until its done.
                        const { value, done } = await reader.read();
                        if (done) {
                            break;
                        }
                        const decodedChunk = decoder.decode(value, { stream: true });
                        // console.log(decodedChunk, 'chunks');
                        flag += decodedChunk;
                        // console.log(flag, 'flag');
    
                        setConversationList((prevList) => {
                            const updatedList = [...prevList];
                            const lastComponent = updatedList[updatedList.length - 1];
                            
                            updatedList[updatedList.length - 1] = React.cloneElement(lastComponent, { loading: true, responseResult : flag, type: 'text' });
                            
                            return updatedList;
                        });
    
                        setResponseResult('')
                        setLoading(false)
                        setTyping(false)
                    // setAnswer(answer => answer + decodedChunk); // update state with new chunk
                    }
                }

        }
        catch(error){
            setLoading(false)
            setTyping(false);
            setConversationList((prevList) => {
                const updatedList = [...prevList];
                const lastComponent = updatedList[updatedList.length - 1];
                // console.log(lastComponent)
                
                updatedList[updatedList.length - 1] = React.cloneElement(lastComponent, { loading: true, responseResult :'Request Time out' });
                
                return updatedList;
              });
             
            console.log('some error occure', error);
        }
       
    }


    return (
        <div className="chat-container">
            <Sidebar toggle={toggle} toggleHandle={toggleHandle} faqsHandle={inputHandle} setPromptList={setPromptList} promptList={promptList} chatType={chatType}  />
            <MainChat 
                toggle={toggle} 
                toggleHandle={toggleHandle}
                inputHandle={inputHandle}
                conversationList={conversationList}
                text={text}
                setText={setText}
                typingBtn={typingBtn}
                typing={typing}
                setTypingBtn={setTypingBtn}
                setTyping={setTyping}
                setPromptList={setPromptList}
                promptList={promptList}
                setConversationList={setConversationList}
            />
        </div>
    )
}

export default Chat;