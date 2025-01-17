import {
  Select,
  MenuItem,
  Grid,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { UseContext } from "../../../context/UseContext";
import { useParams } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { UsersContext } from "../../../context/usersContext";
import { ProjectsContext } from "../../../context/projectContext";

export default function TaskFilter() {
  const { users } = UseContext(UsersContext);
  const { projects, dispatchProjects } = UseContext(ProjectsContext);
  const { previousState, setPreviousState } = UseContext(ProjectsContext);
  console.log("previousState", previousState);
  const { boardId } = useParams();

  const [selectAssignee, setSelectAssignee] = useState(["All"]);
  const [selectDate, setSelectDate] = useState("All");

  const correntProject = useMemo(() => {
    console.log("usrMemo");
    return projects && projects.find((p) => p._id === boardId);
  }, [ boardId]);

  const projectUsersId = correntProject ? correntProject.users : [];
  const projectUsers = useMemo(() => {
    return users.filter(u => projectUsersId.includes(u._id));
  }, [users, projectUsersId]);

  const handleAssigneeSelectChange = (event) => {
    let selectedList = event.target.value;
    if (selectedList.length === 0) {
      selectedList = ["All"];
    } else {
      if (selectedList[0] === "All") {
        selectedList.shift();
      } else {
        if (selectedList[selectedList.length - 1] === "All") {
          selectedList = ["All"];
        }
      }
    }
    setSelectAssignee(selectedList);
  };

  const assigneeFilter = (selectUsers, tasks) => {
    const taskList =
      tasks &&
      tasks.filter((task) => task.user && selectUsers.includes(task.user));
    return taskList;
  };

  const dateFilter = (selectDate, tasks) => {
    const currentDate = new Date();
    const calculateStartDate = (daysAgo) => {
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - daysAgo);
      return startDate;
    };
    const myDay = calculateStartDate(
      selectDate.includes("Last day")
        ? 1
        : selectDate.includes("3 days ago")
        ? 3
        : selectDate.includes("One week ago")
        ? 7
        : 0
    );
    const taskList =
      tasks &&
      tasks.filter((t) => {
        const taskCeartionDate = new Date(t.creationDate);
        return taskCeartionDate >= myDay && taskCeartionDate <= currentDate;
      });
    return taskList;
  };

  const updateState = () => {
    let updatedProject = { ...previousState };
    let tasks = updatedProject.tasks;
    if (!selectAssignee.includes("All")) {
      tasks = assigneeFilter(selectAssignee, tasks);
    }
    if (!selectDate.includes("All")) {
      tasks = dateFilter(selectDate, tasks);
    }
    updatedProject.tasks = tasks;
    dispatchProjects({ type: "UPDATE_PROJECT", payload: updatedProject });
  };

  const renderSelectAssignee = (selected) => {
    if (selectAssignee.includes("All")) {
      return "All";
    }
    return selected
      .map((selectedId) => {
        const selectedUser =
          projectUsers && projectUsers.find((user) => user._id === selectedId);
        return selectedUser
          ? `${selectedUser.firstName} ${selectedUser.lastName}`
          : "";
      })
      .join(", ");
  };

  const handleDateSelectChange = (event) => {
    const newSelectDate = event.target.value;
    setSelectDate(newSelectDate);
  };

  const renderSelectDate = (selected) => {
    return selected;
  };

  useEffect(() => {
    updateState();
  }, [selectAssignee, selectDate]);

  useEffect(() => {
    if (correntProject && JSON.stringify(correntProject) !== JSON.stringify(previousState)) {
      setPreviousState(correntProject);
      setSelectAssignee(["All"]);
      setSelectDate("All");
    }
  }, [correntProject]);

  const assignee = projectUsers && {
    type: "Assignee",
    selected: ["All", ...projectUsers],
    value: "All",
  };

  const date = {
    type: "Date",
    selected: ["All", "Last day", "3 days ago", "One week ago"],
    value: "All",
  };

  return (
    <Grid
      sx={{ borderRadius: 3, ml: 2, width: "100%" }}
      container
      direction="row"
      alignItems="flex-start"
      height={"10%"}
    >
      <Grid item xs={12} sm={6} lg={3} sx={{ pr: 1.3 }}>
        <Typography
          variant="h6"
          sx={{ mt: 1.3, ml: 1, color: "#FFF", width: "95%" }}
        >
          {assignee && assignee.type}
        </Typography>
        <Select
          multiple
          fullWidth
          value={selectAssignee}
          onChange={handleAssigneeSelectChange}
          renderValue={() => renderSelectAssignee(selectAssignee)}
          sx={{ background: "#121231", color: "#fff" }}
          IconComponent={() => (
            <InputAdornment position="end">
              <KeyboardArrowDownIcon sx={{ color: "#fff", m: 1 }} />
            </InputAdornment>
          )}
        >
          {assignee &&
            assignee.selected.map((u, index) => (
              <MenuItem key={index} value={u === "All" ? "All" : u._id}>
                {u === "All" ? "All" : `${u.firstName} ${u.lastName}`}
              </MenuItem>
            ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6} lg={3} sx={{ pr: 1, pl: 0.6 }}>
        <Typography
          variant="h6"
          sx={{ mt: 1.3, ml: 1, color: "#FFF", width: "95%" }}
        >
          {date.type}
        </Typography>
        <Select
          fullWidth
          value={selectDate}
          onChange={handleDateSelectChange}
          renderValue={() => renderSelectDate(selectDate)}
          sx={{
            background: "#121231",
            color: "#ffffff",
          }}
          IconComponent={() => (
            <InputAdornment position="end">
              <KeyboardArrowDownIcon sx={{ color: "#fff", m: 1 }} />
            </InputAdornment>
          )}
        >
          {date.selected.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
}
