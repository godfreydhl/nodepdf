import './App.css';
import React, {useState} from 'react'
import axios from 'axios'
import {saveAs} from 'file-saver'

function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [receipt, setReceipt] = useState('')
  const [price1, setPrice1] = useState(0)
  const [price2, setPrice2] = useState(0)
  const [price3, setPrice3] = useState(0)

  const data = {name, receipt, email, price1, price2, price3}

  const SubmitForm = async (e)=>{
    e.preventDefault();
    await axios.post(`http://localhost:8000/createPdf`, data)
    .then(()=>{
      axios.get(`http://localhost:8000/fetchPdf`, {responseType: 'blob'})
      .then((res)=>{
        const pdfBlob = new Blob([res.data], {type:'application/pdf'})

        saveAs(pdfBlob, 'InvoiceDocument.pdf')

        setName('')
        setReceipt('')
        setEmail('')
        setPrice1(0)
        setPrice2(0)
        setPrice3(0)
      })
      .then(()=>{
        axios.post(`http://localhost:8000/sendPdf`, {email:email} )
        .then((response)=>{
          console.log(response);
          alert(response.data)
          
        })
      })
    })

  }
  
  return (
    <div className="main-block">
      <h1>Generate and Download Pdf</h1>
      <form onSubmit={SubmitForm}>
        <div className="info">
          <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
          <br/>
          <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <br/>
          <input type="text" placeholder="Receipt ID" value={receipt} onChange={(e)=>setReceipt(e.target.value)}/>
          <br/>
          <input type="number" placeholder="Price 1" value={price1} onChange={(e)=>setPrice1(e.target.value)}/>
          <br/>
          <input type="number" placeholder="Price 2" value={price2} onChange={(e)=>setPrice2(e.target.value)}/>
          <br/>
          <input type="number" placeholder="Price 3" value={price3} onChange={(e)=>setPrice3(e.target.value)}/>
        </div>
        <button type="submit">Download Pdf</button>

      </form>
       
    </div>
  );
}

export default App;
