import { useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm';
import Layout from './layouts/Layouts';
import FaceRecognition from './components/FaceRecognition';

interface User {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
}

interface Box {
  topRow: number;
  rightCol: number;
  bottomRow: number;
  leftCol: number;
}

function App() {
  const [input, setInput] = useState<string>('');
  const [src, setSrc] = useState<string>('');
  const [box, setBox] = useState({});
  const [loading, setLoading] = useState<boolean>(false);

  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = import.meta.env.VITE_PAT;
  const USER_ID = import.meta.env.VITE_USER_ID;
  const APP_ID = import.meta.env.VITE_APP_ID;
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = src;

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  const calculateFaceLocation = (data: {
    outputs: Array<{
      data: {
        regions: Array<{
          region_info: {
            bounding_box: {
              left_col: number;
              top_row: number;
              right_col: number;
              bottom_row: number;
            };
          };
        }>;
      };
    }>;
  }): {
    leftCol: number;
    topRow: number;
    rightCol: number;
    bottomRow: number;
  } => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage') as HTMLImageElement;
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  function displayFaceBox(box: Box) {
    setBox(box);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  async function onButtonSubmit() {
    setLoading(true);
    setSrc(input);
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key ' + PAT,
      },
      body: raw,
    };
    try {
      const response = await fetch(
        `/api/v2/users/${USER_ID}/apps/${APP_ID}/models/${MODEL_ID}/outputs`,
        requestOptions
      );
      const data = await response.json();
      const faceBox = calculateFaceLocation(data);
      displayFaceBox(faceBox);
    } catch (error) {
      console.error('error', error);
    }
    setLoading(false);
  }
  return (
    <Layout>
      <div className='flex justify-center place-items-center flex-col'>
        {loading && <p>Calculating...</p>} {/* Display loading indicator */}
        <ImageLinkForm
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
        />
        <FaceRecognition box={box} imageUrl={IMAGE_URL} />
      </div>
    </Layout>
  );
}

export default App;
