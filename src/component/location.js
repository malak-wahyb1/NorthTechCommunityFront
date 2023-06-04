import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocationCity } from '@mui/icons-material';

export default function CountrySelect(onCityChange) {
  const [city,setCity]=React.useState("")
  const cities = [
    'Beirut',
    'Tripoli',
    'Sidon',
    'Tyre',
    'Byblos',
    'Jounieh',
    'Baalbek',
    'Nabatieh',
    'Zahle',
    'Anjar',
    'Batroun',
    'Bcharré',
    'Chekka',
    'Bhamdoun',
    'Jbeil',
    'Aley',
    'Baabda',
    'Zouk Mosbeh',
    'Choueifat',
    'Saida',
    'Ras Baalbek',
    'Deir el Qamar',
    'Jiyeh',
    'Zahlé',
    'Marjayoun',
    'Majdal Anjar',
    'Bint Jbeil',
    'Marjeyoun',
    'Dahr el Baydar',
    'Mtein',
    'Moukhtara',
    'Barouk',
    'Kfardebian',
    'Damour',
    'Hammana',
    'Beiteddine',
    'Bzommar',
    'Bdadoun',
    'Mkalles',
    'Dik El Mehdi',
    'Rayfoun',
    'Rabieh',
    'Broumana',
    'Jeita',
    'Naameh',
    'Ain Saade',
    'Dbayeh',
    'Sin El Fil',
    'Chiyah',
    'Fanar',
    'Zalka',
    'Jal El Dib',
    'Bsalim',
    'Antelias',

    'Awkar',
    'Adma',
    'Dora',
   
    
    "online"
  ];
  const handleCityChange = (event, newCity) => {
    setCity(newCity);
    onCityChange(newCity);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Autocomplete
        disablePortal
        options={cities}
        renderInput={(params) => (
          <TextField
            {...params}
            label={<LocationCity sx={{ color: "gray" }} />}
            onChange={handleCityChange}
            value={city}
            sx={{ borderRadius: "15", color: "white" }}
          />
        )}
      />
    </Box>
  );
}