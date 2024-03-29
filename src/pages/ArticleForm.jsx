import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function ArticleForm({ action }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
    const { id } = useParams();
    const inquirerId =
        new URLSearchParams(useLocation().search).get('inquirerId') || null;
    const navigate = useNavigate();

    async function editPost() {
        console.log('edit post fired');

        try {
            const res = await fetch(
                `${process.env.REACT_APP_FETCH_URL}/api/hanshiReply/${id}`,
                {
                    credentials: 'include',
                }
            );

            console.log('res', res);

            const json = await res.json();

            const reply = json.data[0];

            setTitle(reply.title);
            setBody(reply.body);
        } catch (error) {
            console.log(error);
        }
    }

    async function submitForm(e) {
        e.preventDefault();
        setDisableSubmitBtn(true);
        console.log('submit form fired', action);

        let method;
        let data = {
            title: title,
            body: body,
        };

        if (action === 'reply' || action === 'create') {
            method = 'POST';
            data.questionId = id || null;
            data.inquirerId = inquirerId;
        }

        if (action === 'edit') {
            method = 'PUT';
            data.replyId = id;
        }

        console.log('data to be sent', data);

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        };

        console.log('options', options);

        let res;

        switch (action) {
            case 'create':
                res = await fetch(
                    `${process.env.REACT_APP_FETCH_URL}/api/hanshiReply/create`,
                    options
                );
                break;
            default:
                res = await fetch(
                    `${process.env.REACT_APP_FETCH_URL}/api/hanshiReply`,
                    options
                );
        }

        const json = await res.json();

        if (!json || json.status === 400) {
            return toast.error('Could not perform requeset. Please try again.');
        }

        switch (action) {
            case 'reply':
                if (json.status === 201) {
                    toast.success(
                        'Successfully replied to question. Redirecting ...'
                    );
                    setTimeout(() => navigate('/dashboard'), 7000);
                } else {
                    toast.error(
                        'Something went wrong. Please try again later.'
                    );
                    setDisableSubmitBtn(false);
                }
                break;
            case 'edit':
                if (json.status === 200) {
                    toast.success(
                        'Successfully updated article. Redirecting ...'
                    );
                    setTimeout(() => navigate(-1), 7000);
                } else {
                    toast.error(
                        'Something went wrong. Please try again later.'
                    );
                    setDisableSubmitBtn(false);
                }
                break;
            case 'create':
                if (json.status === 201) {
                    toast.success(
                        'Successfully created article. Redirecting ...'
                    );
                    setTimeout(() => navigate(-1), 7000);
                } else {
                    toast.error(
                        'Something went wrong. Please try again later.'
                    );
                    setDisableSubmitBtn(false);
                }
                break;
            default:
                if (json.status === 200) {
                    toast.success(
                        'Successfully updated article. Redirecting ...'
                    );
                    setTimeout(() => navigate(-1), 7000);
                } else {
                    toast.error(
                        'Something went wrong. Please try again later.'
                    );
                    setDisableSubmitBtn(false);
                }
                break;
        }
    }

    useEffect(() => {
        if (action === 'edit') {
            editPost();
        }
    });

    return (
        <div>
            <h1 className='text-3xl font-bold mb-4'>Article Form - {action}</h1>
            <form>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={title}
                        className='block w-full border border-gray-700 p-1 bg-transparent mb-1'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='body'>Body</label>
                    <textarea
                        name='body'
                        id='body'
                        value={body}
                        className='block w-full border border-gray-700 p-1 bg-transparent mb-1'
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
                <button
                    type='submit'
                    className='mt-8 border border-black rounded px-2 py-1 bg-gray-300'
                    onClick={(e) => submitForm(e)}
                    disabled={disableSubmitBtn}
                >
                    Submit
                </button>
            </form>
            <button
                className='mt-8 border border-black rounded px-2 py-1 bg-gray-300'
                onClick={() => navigate(-1)}
            >
                Back
            </button>
            <ToastContainer />
        </div>
    );
}

export default ArticleForm;
