import React, { useState,useRef } from 'react';

type defaultType ={
    id:number,key:string,condition:string,inp:string|number
}
var condArr = [{id:1,key:'Title',condition:'Equals ( == )',inp:'abc'}]
var keyArr:string[]=['Title','Quantity','Price','Brand']
var strConditonArr:string[]=['Equals ( == )','Not Equals ( != )','Contain (%LIKE%)','Not Contain (!%LIKE%)']
var intConditionArr:string[]=['Equals ( == )','Not Equals ( != )','Less Than equals ( <= )','Greater than equals ( >= )']

const ConditionGenerator = () => {

    var [conditions,setConditions]=useState<defaultType[]>(condArr)
    var [condition,setCondition]=useState<string>('Any Condition')
    var refsArr = useRef<any>([])
    var keyRefs=useRef<any>([])
    var condRefs=useRef<any>([])

    // handler for radio inputs for selecting any or all condition
    const radioInp=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.value==='Any Condition'){
            setCondition('Any Condition')
        }
        else{
            setCondition('All Condition')
        }
    }
    // handles the select key value
    const selectKey =(e:React.ChangeEvent<HTMLSelectElement>,i:number)=>{
        conditions[i].key=keyRefs.current[i].value
        setConditions([...conditions])
    }
    // handles the select condition value
    const selectCondition=(e:React.ChangeEvent<HTMLSelectElement>,i:number)=>{
        conditions[i].condition=e.currentTarget.value
        setConditions([...conditions])
    }
    // input handler function 
    const inpHandler =(i:number)=>{
        conditions[i].inp=refsArr.current[i].value
        setConditions([...conditions])
    }
    // function adds the new row to condition
    const addRow =()=>{
        if(conditions[conditions.length-1].inp!==''){
            var obj={id:2,key:'Title',condition:'==',inp:''}
            conditions.push(obj)
            setConditions([...conditions])
        }
        else{
            alert('Fill input Field')
        }
    }
    // function deletes the selected row
    const delHandler=(i:number)=>{
        conditions.splice(i,1)
        setConditions([...conditions])
    }
    // function renders the string conditions
    const conditionString=()=>{
        let str=''
        let sign=(condition==='Any Condition')? ' || ':' && '
        conditions.map((item)=>{
            var start = item.condition.indexOf('(')
            var end = item.condition.indexOf(')')
            var conditionStr = item.condition.substring(start+1,end)
            str+=item.key+" "+conditionStr+" "+item.inp+sign
        })
        return str.substring(0,str.length-3)
    }

    return (
    <div className='col-12 text-center border mt-4 rounded p-2'>
        <div className='d-flex flex-row text-center col-12 justify-content-center align-items-center'>
            <label className='m-1'>Products must match: </label>
            <label className='m-1'>Any Condition:</label>
            <input onChange={(e)=>radioInp(e)} value='Any Condition' defaultChecked type='radio' name='sd' className=' me-3'/>
            <label className='m-1'>All Condition:</label>
            <input onChange={(e)=>radioInp(e)} value='All Condition' type='radio' name='sd' className='m-1'/>
        </div>
        {conditions.map((item,i)=>{
            // renders the array on the basis of key
            let arr=(item.key==='Title' || item.key==='Brand')?strConditonArr:intConditionArr;
            return (
            <div className='col-12 d-flex flex-row justify-content-center align-items-center'>
                <select value={item.key} onChange={(e)=>{selectKey(e,i)}} ref={(ref)=>keyRefs.current[i]=ref} className='col-3 p-2 m-1 rounded shadow fs-6 border-3 border-primary'>
                    {keyArr.map((item:any)=>{
                        return <option key={item}>{item}</option>
                    })}
                </select>
                <select value={item.condition} onChange={(e)=>selectCondition(e,i)} ref={(ref)=>condRefs.current[i]=ref} className='col-3 p-2 m-1 rounded shadow fs-6 border-3 border-primary'>
                    {arr.map((item:any)=>{
                        return <option key={item}>{item}</option>
                    })}
                </select>
                <input value={item.inp} type={item.key==='Title'||item.key==='Brand'?'text':'number'} ref={(ref)=>refsArr.current[i]=ref} onChange={()=>inpHandler(i)} className='col-3 p-2 m-1 rounded shadow fs-6 border-3 border-primary'/>
                {i!==0?<button className='btn btn-danger' onClick={()=>delHandler(i)}>Delete</button>:<button className='btn text-white' disabled>Delete</button>}
            </div>
            )
        })}
        <button className='btn btn-info' onClick={addRow}>Add More</button>
        <label className='m-1'>Current Conditions: &nbsp; 
        {conditionString()}
        </label>
    </div>
    ) 
}

export default ConditionGenerator