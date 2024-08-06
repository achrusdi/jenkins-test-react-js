// import { useState } from 'react'
import { Divider } from '@nextui-org/react';
import './App.css'
import CardDefault from './components/cards/CardDefault';
import CardMusic from './components/cards/CardMusic';
import CardNext from './components/cards/CardNext';
import CardProfile from './components/cards/CardProfile';
import { Footer, Header } from './components/templating'
import RandomColor from './components/RandomColor';
import StopWatch from './components/StopWatch';
import { useEffect, useState } from 'react';
import TestForm from './components/forms/TestForm';
import TestForm1 from './components/forms/TestForm1';
import FormLogin from './components/forms/FormLogin';
import useLocalStorage from './hooks/useLocalStorage';
import useSessionStorage from './hooks/useSessionStorage';
import useCoockies from './hooks/useCoockies';

function App() {
  // const [count, setCount] = useState(0)
  const [isLoading, isLoadingSet] = useState(true);
  // const [name, setName, removeName] = useLocalStorage('name');
  // const [role, setRole, removeRole] = useSessionStorage('role');
  const [token, setToken, removeToken] = useCoockies('token');

  // setName('Jihn');
  // console.log(name());
  // removeName();

  // sessionStorage.setItem('username', 'juhn');
  // setRole('Juhn');
  // console.log(username());
  // removeRole();

  setToken('anunymous');
  console.log(token());
  removeToken();

  // const username = window.sessionStorage.getItem('username')
  // const username = window.sessionStorage.setItem('username', 'huhu');
  // console.log(username);

  const data = [
    {
      imgUrl: 'https://via.placeholder.com/150',
      title: 'Card title 1',
      content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    },
    {
      imgUrl: 'https://via.placeholder.com/150',
      title: 'Card title 2',
      content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    },
    {
      imgUrl: 'https://via.placeholder.com/150',
      title: 'Card title 3',
      content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    },
    {
      imgUrl: 'https://via.placeholder.com/150',
      title: 'Card title 4',
      content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    },
    {
      imgUrl: 'https://via.placeholder.com/150',
      title: 'Card title 5',
      content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    }
  ];

  const initialTheme = () => {
    const newTheme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', newTheme);
    console.log("ini theme", newTheme);
  };

  const handleLoading = () => {
    setTimeout(() => {
      isLoadingSet(false);
    }, 2000);
  }

  useEffect(() => {
    // console.log("ini theme", localStorage.getItem('theme'));
    initialTheme();
    handleLoading();
    // console.log("ini theme", localStorage.getItem('theme'));
  }, []);

  return (
    <main>
      <Header />

      {/* <div className='container' style={{ marginTop: '100px', marginBottom: '120px', width: '100%' }}>
        <div className='row justify-content-center'>
          {data.map((item, index) => (
            <CardDefault
              imgUrl={item.imgUrl}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </div> */}

      <div className='container mx-auto flex justify-center items-center my-24'>
        {/* <CardNext/> */}

        {/* <TestForm1 /> */}
        <FormLogin isLoading={isLoading} />
      </div>

      {/* <div className='container mx-auto flex justify-center items-center my-24'>
        <CardProfile
          name="rusdi"
          username="rusdie"
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
      </div>

      <div className='container flex mx-auto justify-center items-center my-24 flex-col gap-4'>
        <RandomColor />
        <Divider />
        <StopWatch />
      </div> */}




      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <Footer />
    </main>
  )
}

export default App
