import { Container } from '@mui/material';
import './App.css';

import level1 from './Data/Relevel Level 1.json'

function App() {

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level}
          label="level"
          onChange={handleLevel}
        >
          <MenuItem value={1}>Level 1</MenuItem>
          <MenuItem value={2}>Level 2</MenuItem>
          <MenuItem value={3}>Level 3</MenuItem>
          <MenuItem value={4}>Level 4</MenuItem>
          <MenuItem value={5}>Level 5</MenuItem>
          <MenuItem value={6}>Level 6</MenuItem>
        </Select>
      </FormControl> */}
      <h1>Level 1</h1>
      <div className="grid-container"
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        }}>
        {level1.results.map(each => (
          <a key={each.uuid}
            onClick={() => openInNewTab(`https://relevel.com/courses/frontend-development-course-0007/schedule/class-details/${each.uuid}?level=1&module=1`)}
            style={{
              color: 'black', textDecoration: 'none',
              backgroundColor: 'white', margin: '10px',
              padding: '2px 10px', borderRadius: '20px',
              display: 'flex', gap: '10px', alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <img src={each.educators[0] ? each.educators[0]?.profile_pic_url : 'https://static.thenounproject.com/png/4381137-200.png'} alt=""
              style={{ width: '100px', height: '100px', borderRadius: '20px', objectFit: 'fill' }}
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
          </a>
        ))}
      </div>

    </Container>
  );
}

export default App;
