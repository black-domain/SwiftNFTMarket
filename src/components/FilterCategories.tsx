import * as React from "react";
import { Checkbox, Divider } from 'antd';
import {useState} from "react";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import styled from "styled-components";

const CheckboxGroup = Checkbox.Group;

const CheckboxWrapper = styled(CheckboxGroup)`
  display: flex;
  flex-direction: column;
  > label{
    padding:0.625rem 1.25rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    font-size: 1.125rem;
      color:white;

    > span > input[type="checkbox"]{
      filter: sepia(100%) brightness(80%) hue-rotate(170deg) saturate(70%) contrast(300%);
    }
  }
  
`
const Catgory = styled.div`
	color:white;
	width:20vw;
	font-weight:900;
	background:#14141f;
	height:100%;
	div {
		padding:0.75rem 2.125rem;
		display:flex;
		justify-content:space-between;
		font-weight:700;
		font-size:1.75rem;
	}
`

export const FilterCategories=()=>{
    const [checkedList, setCheckedList] = useState<any>([]);
    const plainOptions = ['Apple', 'Pear', 'Orange', 'Pear2', 'Orange2', '3333', 'Orange32'];
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };
    return (
        <>
        	<Catgory>
				<div>catgory <span>x</span></div>
				<CheckboxWrapper  style={{display:"flex",flexDirection:"column",padding:"0.75rem 0.75rem",fontWeight:900}}
					options={plainOptions}
					value={checkedList}
					onChange={onChange} >
				</CheckboxWrapper>
            </Catgory>
        </>
    )
}