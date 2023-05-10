import Sidebar from 'components/Sidebar/Sidebar'
import React from 'react'

const Analytics = () => {
  return (
   <>
    
    <div style={{marginLeft:'250px' , marginTop:'50px' , width:'1000px' , height:'400px'}}>  
    <h1 style={{color:'blueviolet' , marginLeft:'550px'  , fontSize:'50px'}}>Analytics </h1>
    <iframe title="engine" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=783fb4a8-14aa-410c-8a25-0fc6a4e4b247&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&filterPaneEnabled=false&navContentPaneEnabled=false" frameborder="0" allowFullScreen="true"></iframe>
    </div>
    <Sidebar />
    </> 
  )
}

export default Analytics
