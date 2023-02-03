import React from 'react'

const ConditionGenerator = () => {
    var keyArr=['Title','Quantity','Price','Brand']
    var strConditonArr=['==','!=','%Like%','!%Like%']
    var intConditionArr=['==','!=','<=','>=']

  return (
    <div className='col-12 text-center'>
        <h3>String Condition Generator</h3>
        <div className='d-flex flex-row text-center col-12 justify-content-center align-items-center'>
            <label className='m-1'>Select Condition: </label>
            <label className='m-1'>All Condition:</label><input type='radio' name='sd' className='m-1'/>
            <label className='m-1'>Any Condition:</label><input type='radio' name='sd' className='m-1'/>
        </div>
        <select className='col-4'>
            {keyArr.map((item)=>{
                return <option key={item}>{item}</option>
            })}
        </select>
        <select>
            {strConditonArr.map((item)=>{
                return <option key={item}>{item}</option>
            })}
        </select>
        <input/>
        <button className='btn btn-info'>Delete</button>
        <br/>
        <button>Add More</button>
        <br/>
        <label>Current Conditions: </label>
    </div>
  )
}

export default ConditionGenerator