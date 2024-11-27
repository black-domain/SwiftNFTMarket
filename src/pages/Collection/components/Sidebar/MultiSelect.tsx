import { Space } from '@arco-design/web-react';
import React, { useState } from 'react';

interface Props {
    index: number;
    pro: any;
}

function MultiSelect(props: Props) {
    const { index, pro } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const [rotation, setRotation] = useState(true);
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (event.target.checked) {
            setCheckedValues((values) => [...values, value]);
        } else {
            setCheckedValues((values) => values.filter((item) => item !== value));
        }
    };


    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
        setRotation((prev) => !prev);
    };

    return (
        <div>
            <div onClick={toggleExpand} className='ComboBox container' style={{ border: rotation ? '1px solid #343e4d' : '1px solid #ffa361' }}>
                <span style={{ fontSize: '1.2rem' }}>{pro}</span>
                <span>
                    <svg className={`down${index}`} id='headerDown' fill='#fff' viewBox='0 0 32 32' width='14' height='14'>
                        <path d='M15.992 25.304c-0 0-0 0-0.001 0-0.516 0-0.981-0.216-1.31-0.563l-0.001-0.001-14.187-14.996c-0.306-0.323-0.494-0.76-0.494-1.241 0-0.998 0.809-1.807 1.807-1.807 0.517 0 0.983 0.217 1.313 0.565l0.001 0.001 12.875 13.612 12.886-13.612c0.331-0.348 0.797-0.565 1.314-0.565 0.481 0 0.918 0.187 1.242 0.493l-0.001-0.001c0.723 0.687 0.755 1.832 0.072 2.555l-14.201 14.996c-0.33 0.348-0.795 0.564-1.311 0.564-0.001 0-0.003 0-0.004 0h0z'></path>
                    </svg>
                </span>
            </div>
            <div
                className='ComboBox-content'
                style={{
                    display: isExpanded ? 'block' : 'none',
                    zIndex: isExpanded ? 2 : 0,
                    borderRadius: isExpanded ? '0 0 0.6rem 0.6rem' : '0.6rem',
                }}
            >
                <Space size='large' direction='vertical' style={{ width: '100%', height: '100%' }}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                            <label className='containera'>
                                <input type='checkbox' value={`FUR(${i})`} onChange={handleCheckboxChange} />
                                <div className='checkmark'></div>
                            </label>
                            <div style={{ marginLeft: '1rem', display: 'flex', flexDirection: 'column' }}>
                                <span>{`FUR(${i})`}</span>
                                <span style={{ fontSize: '0.5rem', color: '#4583d1' }}>0.73% has this</span>
                            </div>
                        </div>
                    ))}
                </Space>
            </div>
        </div>
    );
}

export default MultiSelect;
