import React, {useState} from 'react'

const Hero:React.FC = () => {
    const [data, setData]=useState<any>(null);
    const [ipValue, setIpValue]=useState<string>(""); 

    async function getData(ipAddress: string) {
        const res = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_17MkcxfgUM5oPglQ4uyRY5dYNcL9J&ipAddress=${ipAddress}`);
        const data = await res.json();
        setData(data)     
        console.log(data);
          
    }
    const changeIpValue=(v:string)=>{
        setIpValue(v)
        
    }
    const handleSubmit=(v:React.FormEvent<HTMLFormElement>)=>{
        v.preventDefault();
        getData(ipValue);
    }
  return (
    <div className="hero">
        <h1>IP Address Tracker</h1>
        <form action="ip" onSubmit={(e)=>{handleSubmit(e)}}>
            <input onChange={(v)=>{changeIpValue(v.target.value)}} value={ipValue} type="text" placeholder="Search for any IP address or domain"/>
            <button type='submit'>
                <img src="../public/arrow-right-s-line.svg" alt=">" />
            </button>
        </form>
        <div id="info">
            <div>
                <h6>IP Address</h6>
                <p>{data?.ip}</p>
            </div>
            <div>
                <h6>Location</h6>
                <p>{data?.location.region}, {data?.as.name} <br/>{data?.as.asn}</p>
            </div>
            <div>
                <h6>Timezone</h6>
                <p>UTC {data?.location.timezone}</p>
            </div>
            <div>
                <h6>ISP</h6>
                <p>{data?.isp}</p>
            </div>
        </div>
    </div>
  )
  }
export default Hero;
