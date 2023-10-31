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

    const inputHandle = (e)=>{
        e.preventDefault();

        setLoading(false);

        const newComponent = <Input text={text} />;
        const reponseComponent = <Response loading={loading} responseResult={responseResult} />;

        setConversationList([...conversationList, newComponent, reponseComponent]);

        setText('')
        setTypingBtn(true)
        setTyping(true);



        fetch(`${ chatType === 'csv' ? process.env.REACT_APP_CHAT_SALES_URL : process.env.REACT_APP_CHAT_GENE_URL}/${text}`)
        .then((respone=> respone.json() )).then(result=>{
            let type = null;
            let response = null;
            // const {response} = result;
            const {text, table, image} = result;

            console.log(table, 'table');

            if(text){
                response = text;
            }
            else if(table){
                type = 'table'
                response = table;
            }
            else if(image){
                response = image;
                type = 'image'
            }
            else{
                const {response : re} = result;
                response = re;

            }

            // console.log(result, 'hello')
            setConversationList((prevList) => {
                const updatedList = [...prevList];
                const lastComponent = updatedList[updatedList.length - 1];
                
                updatedList[updatedList.length - 1] = React.cloneElement(lastComponent, { loading: true, responseResult :response, type: type });
                
                return updatedList;
              });

              setResponseResult('')
              setLoading(false)
              setTyping(false)

        }).catch(error=>{
            
            setConversationList((prevList) => {
                const updatedList = [...prevList];
                const lastComponent = updatedList[updatedList.length - 1];
                console.log(lastComponent)
                
                updatedList[updatedList.length - 1] = React.cloneElement(lastComponent, { loading: true, responseResult :'unexpected character' });
                
                return updatedList;
              });
              setTypingBtn(true)
            setTyping(false);
            setLoading(false)
            console.log('some error occure', error);
        })
    }

    const faqsHandle = (e)=>{
        const faqsText = e.target.textContent;
        console.log(e.target.textContent)

        setLoading(false);

        setConversationList([])

        const newComponent = <Input text={faqsText} />;
        const reponseComponent = <Response loading={loading} responseResult={responseResult} />;

        setConversationList([...conversationList, newComponent, reponseComponent]);

        setText('')
        setTypingBtn(true)
        setTyping(true);


        fetch(`${ chatType === 'csv' ? process.env.REACT_APP_CHAT_SALES_URL : process.env.REACT_APP_CHAT_GENE_URL}/${faqsText}`)
        .then((respone=> respone.json() )).then(result=>{
            let type = null;
            let response = null;
            // const {response} = result;
            const {text, table, image} = result;

            // console.log(table, 'table');

            if(text){
                response = text;
            }
            else if(table){
                type = 'table'
                response = table;
            }
            else if(image){
                response = image;
                type = 'image'
            }
            else{
                const {response : re} = result;
                response = re;

            }

            // console.log(result, 'hello')
            setConversationList((prevList) => {
                const updatedList = [...prevList];
                const lastComponent = updatedList[updatedList.length - 1];
                
                updatedList[updatedList.length - 1] = React.cloneElement(lastComponent, { loading: true, responseResult :response, type: type });
                
                return updatedList;
              });

              setResponseResult('')
              setLoading(false)
              setTyping(false)

        }).catch(error=>{
            setLoading(false)
            setTyping(false);
            setConversationList((prevList) => {
                const updatedList = [...prevList];
                const lastComponent = updatedList[updatedList.length - 1];
                console.log(lastComponent)
                
                updatedList[updatedList.length - 1] = React.cloneElement(lastComponent, { loading: true, responseResult :'unexpected character' });
                
                return updatedList;
              });
             

            console.log('some error occure', error);
        })

    }



    return (
        <div className="chat-container">
            <Sidebar toggle={toggle} toggleHandle={toggleHandle} faqsHandle={faqsHandle} setPromptList={setPromptList} promptList={promptList} chatType={chatType}  />
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