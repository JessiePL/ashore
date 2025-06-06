//app/home/page.tsx
'use client';
import {useState} from 'react';

export default function HomePage()
{
          const MAX_LENGTH = 140;
          const name = 'Jerry';

          const [text, setText] = useState('');
          const [mood, setMood] = useState('');
          const [submitted, setSubmitted] = useState(false);

          const remaining = MAX_LENGTH - text.length;
          const isOver = remaining < 0;


          const handleSubmit = () =>{
                    if(text && mood)
                    {
                              setSubmitted(true);
                    }
          }

          return(
                    <div className="container mt-5">
                              {/*Part 1: Greeting */}
                              <h1 className = "mb-4">{`Hello, ${name ? name : 'User'} What's new today?`}</h1>
                              {/*Part 2: Input area*/}
                              <div className="mb-3 position-relative">
                                        <textarea 
                                        className={`form-control ${isOver ? 'border-danger' : ''}`}
                                        placeholder="write your thoughts here..."
                                        value={text}
                                        onChange={(e)=>setText(e.target.value)}
                                        rows={5}
                                        />

                                        <div
                                                  className={`position-absolute bottom-0 end-0 m-2 small ${
                                                            isOver? 'text-danger' : 'text-muted'
                                                  }`}
                                        >
                                                  {remaining}
                                        </div>
                              </div>

                              <div className="mb-3">
                                        <label className="form-label me-3">Your Mood:</label>
                                        {['😊', '😢', '😡', '😐'].map((emoji)=>(
                                                  <button
                                                  key={emoji}
                                                  type="button"
                                                  className={`btn btn-outline-secondary me-2 fs-4 ${
                                                            mood === emoji ? 'active border-primary':''
                                                  }`}
                                                  onClick={()=>setMood(emoji)}
                                                  >
                                                            {emoji}
                                                  </button>
                                        ))}
                              </div>

                              <button className="btn btn-primary" onClick={handleSubmit}>
                                        Submit
                              </button>
                              {/*Part 3: Feedback */}
                              {submitted && (
                                        <div className="alert alert-info mt-4" role="alert">
                                                  <h5 className="alert-heading">Thanks for sharing!</h5>
                                                  <p>You're feeling <strong>{mood}</strong> today.</p>
                                                  <hr />
                                                  <p className="mb-0">Here's a little reminder: you're not alone</p>
                                        </div>
                              )}
                    </div>
          )
}