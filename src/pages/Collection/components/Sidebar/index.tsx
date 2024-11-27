import { Select } from '@arco-design/web-react'
import Space from '@arco-design/web-react/es/Space'
import React, { useState } from 'react'
import styled1 from 'styled-components'
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Divider } from '@mui/material';
import MultiSelect from './MultiSelect';


const Card = styled1.div`
display: flex;
justify-content: center;
align-items: center;
margin: 1rem 2rem;
margin-top: 8.75rem;
width: 18rem;
height: 43rem;
background-image: linear-gradient(163deg, #cd8d5d 0%, #ffa361 100%);
border-radius: 1.25rem;
transition: all .3s;
 .card2 {
    color: #e5e7eb;
     overflow: hidden;
     width: 18rem;
    height: 43.5rem;
    background-color: #000000;
    transition: all .2s;
    transform: scale(0.98);
    border-radius: 1.25rem;
    box-shadow: 0px 0px 10px 1px rgba(167, 214, 189, 0.3);
}
`

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 24,
    height: 24,
    backgroundColor: "#374151",
    border: "1px solid #6b7280",
    'input:disabled ~ &': {
        boxShadow: 'none',

        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#3b82f6',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    border: "none",
    '&:before': {
        display: 'block',
        width: 24,
        height: 24,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#106ba3',
    },
});

function BpRadio(props: RadioProps) {
    return (
        <Radio
            sx={{
                '&:hover': {
                    bgcolor: 'transparent',
                },
            }}
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
}

const Option = Select.Option;
function index() {
    const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
    const [switches, setSwitches] = useState(true) // 开关
    const [isExpanded, setIsExpanded] = useState(false);
    const [rotation, setRotation] = useState(true);

    const [value, setValue] = React.useState('All');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleClick = () => {
        setIsExpanded(!isExpanded);
        const down = document.querySelector('.down') as SVGSVGElement;
        let a = rotation ? 180 : 0
        setRotation(!rotation)
        down && (down.style.transform = `rotate(${a}deg)`);
        down && (down.style.transition = 'transform 0.5s ease'); // 添加过渡效果
    };

    return (
        <Card >
            <div className="card2" >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
                    <span className='my-iconfont'>Buy Now</span>
                    <div className="check">
                        <input id="check" type="checkbox" defaultChecked={switches} />
                        <label htmlFor="check"></label>
                    </div>
                </Box>
                <Divider sx={{ background: "#394150", margin: "0.3rem 0", }} variant="fullWidth" />
                <Box sx={{ padding: "1rem" }}>
                    <div className='my-iconfont mb'>Rarity</div>
                    <div onClick={handleClick} className='ComboBox' style={{border: "1px solid #ffa361"}} >
                        <span style={{ fontSize: "1.2rem" }}>{value}</span>
                        <span>{
                            <svg className="down" id="headerDown" fill="#Fff" viewBox="0 0 32 32" width="14" height="14"><path d="M15.992 25.304c-0 0-0 0-0.001 0-0.516 0-0.981-0.216-1.31-0.563l-0.001-0.001-14.187-14.996c-0.306-0.323-0.494-0.76-0.494-1.241 0-0.998 0.809-1.807 1.807-1.807 0.517 0 0.983 0.217 1.313 0.565l0.001 0.001 12.875 13.612 12.886-13.612c0.331-0.348 0.797-0.565 1.314-0.565 0.481 0 0.918 0.187 1.242 0.493l-0.001-0.001c0.723 0.687 0.755 1.832 0.072 2.555l-14.201 14.996c-0.33 0.348-0.795 0.564-1.311 0.564-0.001 0-0.003 0-0.004 0h0z"></path>
                            </svg>
                        }
                        </span>
                    </div>
                    <div className='ComboBox-content' style={{ display: isExpanded ? "block" : "none", zIndex: isExpanded ? "2" : "0", borderRadius: isExpanded ? "0 0 0.6rem 0.6rem" : "0.6rem" }}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                defaultValue="All"
                                aria-label="gender"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 36,
                                    },
                                }}
                            >
                                <FormControlLabel value="All" control={<BpRadio />} label="All" />
                                <FormControlLabel value="MYTHIC" control={<BpRadio />} label="MYTHIC" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Box>
                <Box className='mb container' sx={{ height: "27rem" }} >
                    <Space size='large' direction='vertical' style={{ width: "100%", height: "100%" }} >
                        <span className='my-iconfont'>Properties</span>
                        {
                            [1, 2, 3, 4, 5, 6].map((pro, index) => {
                                return <MultiSelect pro={pro} index={index} />
                            })

                        }
                    </Space>
                </Box>
            </div>
        </Card>
    )
}

export default index