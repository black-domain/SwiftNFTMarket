/** @format */


/**
 * @description
 * 页面主要内容显示区域
 * Layout布局风格组件
 * */


interface PropsData {
    element: any;
}

export const Loader = (props: PropsData) => {
    return (
        <div
            style={{ padding: "0px 0px", marginTop: '6.25rem' }}
        >
            <div
                className="site-layout-background"
                style={{ minHeight: "100vh", margin: "0 17.5rem" }}
            >
                {props.element}
            </div>
        </div>
    );
}
export default Loader;
