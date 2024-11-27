
import React, { CSSProperties } from "react";
import { Typography } from "antd";
import "./index.less";
import { Tooltip, TooltipProps, Zoom, styled, tooltipClasses } from "@mui/material";

const { Text } = Typography;

/**
 * @description
 * 如果想省略文本的中间部分，并且以身略号代替显示，可以尝试使用次组件
 * 文本两端以对称方式显示，文本末尾与开头显示的字符长度一致
 * */
const EllipsisMiddle: React.FC<{ className?: string | undefined; style?: CSSProperties | undefined; suffixCount: number; children: string, disableHoverListener?: boolean }> = (
  /**
   * @param
   * className
   * suffixCount: 需要显示文本末尾的字符数量
   * children: 文本内容
   * */
  { className, style, suffixCount, children,disableHoverListener }
) => {
  // 有数据才渲染组件 否则不渲染
  if (!children) {
    return null;
  }
  // 数据长度大于10才做处理 否则直接返回
  if (children.length < 10) {
    return <span>{children}</span>;
  }
  const start = children.slice(0, suffixCount).trim();
  const suffix = children.slice(-suffixCount).trim();

  return (
    <Tooltip disableHoverListener={disableHoverListener} TransitionComponent={Zoom} title={children} arrow>
      <div className={`${className || ""} ellipsis-sp`} style={{ ...style }}>
        {start}
        <span className={"ellipsis"}>{children.slice(suffixCount, -suffixCount).replace(" ", "")}</span>
        {suffix}
      </div>
    </Tooltip>

  );
};

export default EllipsisMiddle;
