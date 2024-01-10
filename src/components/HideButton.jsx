import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const HideButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleHide = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <Box
          sx={{
            maxWidth: '900px',
            margin: 'auto',
            marginTop: '4',
            position: 'relative',
          }}
        >
          <Paper elevation={3}             sx={{
              p: 3,
              borderRadius: '12px',
              backgroundColor: '#F88c2c', // Orange color
              color: 'white', // White text color
            }}>
            <h2 className="text-xl font-bold mb-2">Instructiuni:</h2>
            <p>
                        Pentru a adauga un document nou apasati "Document Nou +". Tastati un nume pentru acesta in fereastra deschisa.
                    </p>
                    <p>
                        Pentru a adauga o noua imagine apasati "Adauga +". Selectati poza din galeria personala, adaugati un titlu si o lista de tag-uri pentru cautare.
                        Acum poza este afisata si puteti sa o taiati cum doriti.
                    </p>
                    <p>
                        Pentru a fi salvata, apasati "Adauga imaginea".
                    </p>
                    <p>
                        Functia de cautare functioneaza dupa tag-uri. Tastati un tag in casuta de cautare din bara de navigare pentru a afisa doar imaginile cu acel tag.
                    </p>
            <IconButton
              onClick={handleHide}
              sx={{ position: 'absolute', top: '8px', right: '8px' }}
            >
              <CloseIcon />
            </IconButton>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default HideButton;
