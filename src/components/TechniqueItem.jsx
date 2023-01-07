import React from 'react';

function TechniqueItem({ technique }) {
    return (
        <div className='flex mb-2 max-w-3xl'>
            <p className='basis-1/6'>{technique.orderVisible})</p>
            <div className='basis-5/6'>
                <p className='font-bold'>
                    {technique.name.romanji}
                    {technique.suwariTachiWaza && (
                        <span> (Suwari Waza Mata Wa Tachi Waza)</span>
                    )}
                </p>
                <p>
                    {technique.name.english}
                    {technique.suwariTachiWaza && (
                        <span> (Kneeling Technique or Standing Technique)</span>
                    )}
                </p>
                {technique.variants.length > 0 && (
                    <div>
                        {technique.variants.map((variant) => (
                            <div key={variant._id}>
                                <p className='font-bold'>
                                    {variant.name.romanji}
                                    {variant.suwariTachiWaza && (
                                        <span>
                                            {' '}
                                            (Suwari Waza Mata Wa Tachi Waza)
                                        </span>
                                    )}
                                </p>
                                <p>
                                    {variant.name.english}
                                    {variant.suwariTachiWaza && (
                                        <span>
                                            {' '}
                                            (Kneeling Technique or Standing
                                            Technique)
                                        </span>
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TechniqueItem;
