import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IconButton, Popover, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function ResponsiveDatePickers({ onDateChange }) {
  const [date, setDate] = React.useState(dayjs());
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate); // Call the callback function with the selected date
    setOpen(false); // Close the calendar popover
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
          'DatePicker',
          'MobileDatePicker',
          'DesktopDatePicker',
          'StaticDatePicker',
        ]}
      >
        <DemoItem >
          <Box>
            <IconButton
              ref={anchorRef}
              onClick={handleIconClick}
              size="small"
            >
              <CalendarTodayIcon  sx={{color:"white"}}/>
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
              <DatePicker sx={{color:"white"}} value={date} onChange={handleDateChange} />
            </Popover>
          </Box>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
