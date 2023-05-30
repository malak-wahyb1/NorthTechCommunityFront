import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { IconButton, Popover, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ResponsiveTimePickers({ onTimeChange }) {
  const [time, setTime] = React.useState(dayjs('2022-04-17T15:30'));
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    onTimeChange(newTime);
    setOpen(false); // Close the time picker popover
  };

  const handleIconClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'TimePicker',
          'MobileTimePicker',
          'DesktopTimePicker',
          'StaticTimePicker',
        ]}
      >
        <DemoItem >
          <Box>
            <IconButton
              ref={anchorRef}
              onClick={handleIconClick}
              size="small"
            >
              <AccessTimeIcon sx={{color:"white"}}/>
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorRef.current}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <TimePicker value={time} onChange={handleTimeChange} />
            </Popover>
          </Box>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
