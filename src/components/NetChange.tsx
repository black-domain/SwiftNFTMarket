import { Space, Select } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
const Option = Select.Option;
import { useEffect, useState } from "react"
import { useHandleNotify } from '../hooks/useNotify';
import './NetChange.less'

export const NetChange = () => {
    const [currentNet, setNet] = useState(sessionStorage.getItem("net"))
    const { handleNewNotification } = useHandleNotify()

    useEffect(() => {
        sessionStorage.setItem("net", "testnet")
    }, [])

    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className='NetChange-div' >
            <Space size='large'>
                <Select
                    renderFormat={(option, value) => {
                        return capitalizeFirstLetter(value + "")
                    }}
                    defaultValue={currentNet ? currentNet : "testnet"}
                    bordered={false}
                    suffixIcon={<IconDown style={{ width: "0.875rem" }} />}
                    arrowIcon={null}
                    triggerProps={{ position: 'br' }}
                    // defaultActiveFirstOption
                    // // @ts-ignore
                    // getPopupContainer={() => document.getElementById("network")}
                    // popupClassName="popup"
                    // placement="bottomLeft"

                    onChange={(value) => {
                        if (value == "mainnet") {
                            sessionStorage.setItem("net", "mainnet")
                        } else {
                            sessionStorage.setItem("net", "testnet")
                        }

                        handleNewNotification('success', `Success ${value}`, 'Success')
                        window.location.replace("/");
                    }}
                    options={[
                        {
                            value: "mainnet",
                            label: <div style={{ display: "flex", alignItems: "center" }}><img style={{ width: "1rem", height: "1rem", margin: "0 1rem" }} src={currentNet == 'mainnet' ? '/assets/xianzz.svg' : '/assets/xuanz.svg'}></img>Mainnet</div>
                        },
                        {
                            value: "testnet",
                            label: <div style={{ display: "flex", alignItems: "center" }}><img style={{ width: "1rem", height: "1rem", margin: "0 1rem" }} src={currentNet == 'testnet' ? '/assets/xianzz.svg' : '/assets/xuanz.svg'}></img>Testnet</div>
                        }
                    ]}
                />
            </Space>


        </div>
    );
}

