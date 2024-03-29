import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Exams() {
    const [exams, setExams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getExams() {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_FETCH_URL}/api/exams`,
                {
                    credentials: 'include',
                }
            );

            const exams = await res.json();

            console.log('exams', exams, exams.data);

            setExams(exams.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getExams();
    }, []);

    if (isLoading) {
        return <p>Loading ... </p>;
    }

    return (
        <div>
            <h1 className='text-3xl font-bold mb-4'>CAFI Exams</h1>
            <div className='flex flex-col lg:flex-row lg:flex-wrap'>
                {exams.map((exam) => (
                    <div key={exam._id} className='basis-1/2 px-4 py-2'>
                        <Link to={`/exams/${exam._id}`}>
                            <div className='flex justify-center items-center w-5/6 h-20 mx-auto border border-gray-900 bg-gray-600 rounded text-white font-bold cursor-pointer'>
                                <p className='text-xl'>{exam.name.rankEng}</p>
                            </div>
                        </Link>
                    </div>
                ))}
                <div className='basis-1/2 px-4 py-2 dan-shite-waza'>
                    <Link to={`/exams/dan-shite-waza`}>
                        <div className='flex justify-center items-center w-5/6 h-20 mx-auto border border-gray-900 bg-gray-600 rounded text-white font-bold cursor-pointer'>
                            <p className='text-xl'>Dan Shite Waza</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Exams;
