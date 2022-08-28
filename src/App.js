import { GitHub, LinkedIn, Warning } from '@mui/icons-material';
import { Alert, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './App.css';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from './FirebaseSetup';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';


function App() {

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const [level, setLevel] = useState(1)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ error: false, message: '' })

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const pathReference = ref(storage, `Relevel Level ${level}.json`);
        const url = await getDownloadURL(pathReference)
        const res = await axios.get(url)
        console.log(res)
        setData(res.data.results)
        setError({ error: false, message: '' })
      } catch (error) {
        console.log(error)
        if (error.code === 'storage/object-not-found') {
          console.log('file not found')
          setError({ error: true, message: 'File not found' })
        } else {
          console.log(error)
        }
      }
      setLoading(false)
    }
    fetch()
  }, [level])

  return (
    <Container style={{ marginTop: '20px' }} justify="center">
      <div className="header">
        <p>Note: You must be logged into relevel platform for redirecting to the class page.</p>
        <div>
          <GitHub
            style={{ cursor: 'pointer' }}
            onClick={() => openInNewTab('https://github.com/riyazuddin515')}
          />
          <LinkedIn
            style={{ cursor: 'pointer', marginLeft: '10px' }}
            onClick={() => openInNewTab('https://www.linkedin.com/in/mohammed-riyazuddin-8829a41a2/')}
          />
        </div>
      </div>
      <FormControl fullWidth style={{ marginTop: '15px', marginBottom: '15px' }}>
        <InputLabel id="demo-simple-select-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level}
          label="level"
          onChange={(e) => setLevel(e.target.value)}
        >
          <MenuItem value={1}>Level 1</MenuItem>
          <MenuItem value={2}>Level 2</MenuItem>
          <MenuItem value={3}>Level 3</MenuItem>
          <MenuItem value={4}>Level 4</MenuItem>
          <MenuItem value={5}>Level 5</MenuItem>
          <MenuItem value={6}>Level 6</MenuItem>
        </Select>
      </FormControl>
      <div className="grid-container">
        {
          loading
            ? <CircularProgress className='grid-col-span-2' />
            :
            error.error
              ? <Alert className='grid-col-span-2' severity="error">File not Found</Alert>
              : data.map(each => (
                <div
                  className='class'
                  key={each.uuid}
                  onClick={() => openInNewTab(`https://relevel.com/courses/frontend-development-course-0007/schedule/class-details/${each.uuid}?level=1&module=1`)}
                  style={{
                    color: 'black', textDecoration: 'none',
                    backgroundColor: 'white', margin: '10px',
                    padding: '2px 10px', borderRadius: '20px',
                    display: 'flex', gap: '10px', alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <img className='img' src={each.educators[0] ? each.educators[0]?.profile_pic_url : 'https://static.thenounproject.com/png/4381137-200.png'} alt=""
                  // style={{ width: '100px', height: '100px', borderRadius: '20px', objectFit: 'fill' }}
                  />
                  <div>
                    <p>
                      <b>{new Date(each.start_time).toDateString()}</b>
                      · {each.duration} ·
                      <span>{each.state}</span>
                    </p>
                    <p><b>{each.title}</b> </p>
                    <p>Educator: {each.educators[0]?.name}</p>
                  </div>
                </div>
              ))

        }
      </div>
      <div className="footer">
        <Warning />
        <p>
          The data used to display the classes is taken from&nbsp;
          <u onClick={() => openInNewTab('https://relevel.com/')} style={{ color: 'blue' }}>Relevel</u>.
          The whole purpose of this site
          is to provide an effective way of accessing the classes.</p>
      </div>
    </Container>
  );
}

export default App;
