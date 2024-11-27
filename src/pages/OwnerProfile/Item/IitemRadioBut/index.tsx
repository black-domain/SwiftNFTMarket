import { Button, Dropdown, Menu, Space } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react'
import { Root } from '../../OwnerProfileType';
import EllipsisMiddle from '../../../../components/EllipsisMiddle';


interface Props {
    IitemRadioButType: any[]
    typeFunctions: (key: string, event: any, keyPath: string[]) => void
}

function index(props: Props) {
    const { IitemRadioButType, typeFunctions } = props
    const [alignment, setAlignment] = React.useState<string | null>('left');

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };

    const changsFun = (e: any) => {
        console.log(e.target.value);
    }

    console.log(IitemRadioButType);
    

    const dropList = (
        <Menu onClickMenuItem={(key: string, event, keyPath: string[]) => typeFunctions(key, event, keyPath)}>
            {
                IitemRadioButType.map((item, j) => {
                    return <Menu.Item key={item}>
                        <EllipsisMiddle suffixCount={12}>{"Type :" + item}</EllipsisMiddle>
                    </Menu.Item>
                })
            }

        </Menu>
    );

    return (
        <>
            <div className='raidioBut'>

                <Space>
                    <div className="container">
                        <div className="tabs" onChange={(e) => { changsFun(e) }}>
                            <input type="radio" id="radio-1" name="tabs" value={"All"} />
                            <label className="tab" htmlFor="radio-1">All</label>
                            <input type="radio" id="radio-2" name="tabs" value={"Rate rentals"} />
                            <label className="tab" htmlFor="radio-2">Rate rentals</label>
                            <input type="radio" id="radio-3" name="tabs" value={"Fixed duration"} />
                            <label className="tab" htmlFor="radio-3" >Fixed duration</label>
                            <span className="glider"></span>
                        </div>
                    </div>

                    <Dropdown droplist={dropList} trigger='click' position='br'>
                        <Button type='text'>
                            Select attributes to filter
                            <IconDown />
                        </Button>
                    </Dropdown>

                    <Dropdown droplist={dropList} trigger='click' position='br'>
                        <Button type='text'>
                            Prince:Low to Hight
                            <IconDown />
                        </Button>
                    </Dropdown>

                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        sx={{
                            svg: {
                                width: "2rem !important",
                                height: "2rem !important"
                            }
                        }}
                    >
                        <ToggleButton value="left" aria-label="left aligned">
                            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2568" width="20" height="20"><path d="M187.392 70.656q28.672 0 48.64 19.456t19.968 48.128l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.128t47.616-19.456l54.272 0zM889.856 70.656q27.648 0 47.616 19.456t19.968 48.128l0 52.224q0 28.672-19.968 48.64t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.128t48.64-19.456l437.248 0zM187.392 389.12q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 27.648-19.968 47.616t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-47.616l0-52.224q0-28.672 19.968-48.64t47.616-19.968l54.272 0zM889.856 389.12q27.648 0 47.616 19.968t19.968 48.64l0 52.224q0 27.648-19.968 47.616t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-47.616l0-52.224q0-28.672 19.968-48.64t48.64-19.968l437.248 0zM187.392 708.608q28.672 0 48.64 19.968t19.968 47.616l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-48.64l0-52.224q0-27.648 19.968-47.616t47.616-19.968l54.272 0zM889.856 708.608q27.648 0 47.616 19.968t19.968 47.616l0 52.224q0 28.672-19.968 48.64t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-27.648 19.968-47.616t48.64-19.968l437.248 0z" p-id="2569"></path></svg>
                        </ToggleButton>
                        <ToggleButton value="center" aria-label="centered">
                            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2729" width="20" height="20"><path d="M248.832 63.488q28.672 0 48.64 19.968t19.968 48.64l0 116.736q0 28.672-19.968 48.64t-48.64 19.968l-116.736 0q-28.672 0-48.64-19.968t-19.968-48.64l0-116.736q0-28.672 19.968-48.64t48.64-19.968l116.736 0zM572.416 63.488q28.672 0 48.64 19.968t19.968 48.64l0 116.736q0 28.672-19.968 48.64t-48.64 19.968l-118.784 0q-28.672 0-48.64-19.968t-19.968-48.64l0-116.736q0-28.672 19.968-48.64t48.64-19.968l118.784 0zM891.904 63.488q28.672 0 48.64 19.968t19.968 48.64l0 116.736q0 28.672-19.968 48.64t-48.64 19.968l-118.784 0q-28.672 0-48.64-19.968t-19.968-48.64l0-116.736q0-28.672 19.968-48.64t48.64-19.968l118.784 0zM248.832 385.024q28.672 0 48.64 19.968t19.968 48.64l0 116.736q0 28.672-19.968 48.64t-48.64 19.968l-116.736 0q-28.672 0-48.64-19.968t-19.968-48.64l0-116.736q0-28.672 19.968-48.64t48.64-19.968l116.736 0zM572.416 385.024q28.672 0 48.64 19.968t19.968 48.64l0 116.736q0 28.672-19.968 48.64t-48.64 19.968l-118.784 0q-28.672 0-48.64-19.968t-19.968-48.64l0-116.736q0-28.672 19.968-48.64t48.64-19.968l118.784 0zM891.904 385.024q28.672 0 48.64 19.968t19.968 48.64l0 116.736q0 28.672-19.968 48.64t-48.64 19.968l-118.784 0q-28.672 0-48.64-19.968t-19.968-48.64l0-116.736q0-28.672 19.968-48.64t48.64-19.968l118.784 0zM248.832 706.56q28.672 0 48.64 19.968t19.968 48.64l0 116.736q0 28.672-19.968 48.64t-48.64 19.968l-116.736 0q-28.672 0-48.64-19.968t-19.968-48.64l0-116.736q0-28.672 19.968-48.64t48.64-19.968l116.736 0zM572.416 706.56q28.672 0 48.64 19.968t19.968 48.64l0 116.736q0 28.672-19.968 48.64t-48.64 19.968l-118.784 0q-28.672 0-48.64-19.968t-19.968-48.64l0-116.736q0-28.672 19.968-48.64t48.64-19.968l118.784 0zM891.904 706.56q28.672 0 48.64 19.968t19.968 48.64l0 116.736q0 28.672-19.968 48.64t-48.64 19.968l-118.784 0q-28.672 0-48.64-19.968t-19.968-48.64l0-116.736q0-28.672 19.968-48.64t48.64-19.968l118.784 0z" p-id="2730"></path></svg>                        </ToggleButton>
                        <ToggleButton value="right" aria-label="right aligned">
                            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2992" width="20" height="20"><path d="M380.928 67.584q26.624 0 45.568 18.944t18.944 45.568l0 256q0 26.624-18.944 45.568t-45.568 18.944l-256 0q-26.624 0-45.056-18.944t-18.432-45.568l0-256q0-26.624 18.432-45.568t45.056-18.944l256 0zM380.928 580.608q26.624 0 45.568 18.432t18.944 45.056l0 256q0 26.624-18.944 45.568t-45.568 18.944l-256 0q-26.624 0-45.056-18.944t-18.432-45.568l0-256q0-26.624 18.432-45.056t45.056-18.432l256 0zM893.952 67.584q26.624 0 45.056 18.944t18.432 45.568l0 256q0 26.624-18.432 45.568t-45.056 18.944l-256 0q-26.624 0-45.568-18.944t-18.944-45.568l0-256q0-26.624 18.944-45.568t45.568-18.944l256 0zM893.952 580.608q26.624 0 45.056 18.432t18.432 45.056l0 256q0 26.624-18.432 45.568t-45.056 18.944l-256 0q-26.624 0-45.568-18.944t-18.944-45.568l0-256q0-26.624 18.944-45.056t45.568-18.432l256 0z" p-id="2993"></path></svg>
                        </ToggleButton>
                        <ToggleButton value="justify" aria-label="justified" >
                            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3313" width="20" height="20"><path d="M64 480h352V128H64v352z m64-288h224v224H128V192zM64 928h352V576H64v352z m64-288h224v224H128v-224zM526.848 224H928a32 32 0 1 0 0-64H526.848a32 32 0 0 0 0 64zM928 608H526.848a32 32 0 1 0 0 64H928a32 32 0 1 0 0-64zM928 384H526.848a32 32 0 0 0 0 64H928a32 32 0 1 0 0-64zM928 832H526.848a32 32 0 1 0 0 64H928a32 32 0 1 0 0-64z" p-id="3314"></path></svg>                        </ToggleButton>
                    </ToggleButtonGroup>

                </Space>



            </div >

        </>
    )
}

export default index