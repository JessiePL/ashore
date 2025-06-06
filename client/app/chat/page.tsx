'use client';
import {useState, useEffect} from 'react';

interface Message{
          sender:'user' | 'ai';
          content:string;
}

export default function chatPage(){
          const [messages, setMessages] = useState<Message[]>([]);
          const [input, setInput] = useState('');
          const aiAvatar = '/chat/heron_profile.jpg';
          const userAvatar = '/settings/profile.png';

          useEffect(() => 
          {
                    const timer = setTimeout(()=> {
                              setMessages([{sender:'ai', content:'How do you feel today?'}] as const);
                    },500);

                    return () => clearTimeout(timer);
          },[]);

          const handleSend = () => {
                    if(!input.trim()) return;

                    const newMessages = [...messages, {sender:'user' as 'user', content:input}];
                    setMessages(newMessages);
                    setInput('');
          

                    setTimeout(() => {
                              setMessages((prev) => [...prev, { sender:'ai', content:'Happy to hear that!'}]);
                    },1000);
          };

          return (
                    <div className="container py-3" style={{height:'80vh', display:'flex', flexDirection:'column'}}>
                              <div className="flex-grow-1 overflow-auto mb-3 border rounded p-3 bg-light">
                                        {messages.map((msg, index)=>(
                                                  <div
                                                  key={index}
                                                  className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end':'justify-content-start'}`}
                                                  >
                                                            {msg.sender === 'ai' && (
                                                                      <img
                                                                      src={aiAvatar}
                                                                      alt="AI Avatar"
                                                                      width={40}
                                                                      height={40}
                                                                      className="rounded-circle me-2"
                                                                      />
                                                            )}
                                                            <div
                                                            className={`p-2 rounded ${msg.sender === 'user'? 'bg-primary text-white': 'bg-white border'}`}
                                                            style = {{ maxWidth:'70%'}}
                                                            >
                                                                      {msg.content}
                                                            </div>
                                                            {msg.sender === 'user' && (
                                                                      <img
                                                                      src={userAvatar}
                                                                      alt="user Avatar"
                                                                      width={40}
                                                                      height={40}
                                                                      className="rounded-circle ms-2"
                                                                      />
                                                            )}
                                                  </div>
                                        ))}
                              </div>
                              <div className="d-flex">
                                        <input
                                                  className="form-control me-2"
                                                  placeholder="..."
                                                  value={input}
                                                  onChange = {(e)=>setInput(e.target.value)}
                                                  onKeyDown={(e)=>e.key === 'Enter' && handleSend()}
                                        />
                                        <button className = "btn btn-primary" onClick={handleSend}>
                                                  Send
                                        </button>
                              </div>
                    </div>
          );
}
