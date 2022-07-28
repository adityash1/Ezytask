import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";

const AddButton = ({ type }) => {
  return (
    <Box>
      <Fab
        aria-label="add"
        type={type}
        sx={{
          backgroundColor: "#ECF3F3",
          borderRadius: "7px",
          width: "300px",
          height: "25%",
        }}
      >
        <AddIcon sx={{ color: "#329C89" }} />
      </Fab>
    </Box>
  );
};

export default AddButton;
