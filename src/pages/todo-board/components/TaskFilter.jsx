import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Select, MenuItem, Grid, Typography, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { useUsersContext } from "../../../context/useUsersContext";
import { useProjectsContext } from "../../../context/useProjectContext";
import { useParams } from "react-router-dom";

export default function TaskFilter() {
  const { users } = useUsersContext();
  const { projects, dispatchProjects } = useProjectsContext();
  const { previousState, setPreviousState } = useProjectsContext();
  const { boardId } = useParams();
  
  const [selectAssignee, setSelectAssignee] = useState(["All"]);
  const [selectDate, setSelectDate] = useState("All");
  
  
  const handleAssigneeSelectChange = (event) => {
   const selectedList = event.target.value
   if (selectedList.length > 1) {
      if (selectedList[0] === 'All') {
          selectedList.shift()
      } else {
        if (selectedList[selectedList.length -1] === 'All') {
          setSelectAssignee(['All'])
          return
        }
      }
   } 
    setSelectAssignee(selectedList)
    assigneeFilter(selectAssignee, previousState)
  };

  const assigneeFilter = (selectAssignee, previousState) => {
    if (selectAssignee.includes('All')) {
      return dispatchProjects({type: 'UPDATE_PROJECT', payload: previousState})
    } else {
      const updatedProject = {...previousState};
      const updatedTaske = previousState.tasks.filter((t) => {
        if (Array.isArray(t.user)) {
          return  t.user.some((u) => selectAssignee.includes(u))
        }
        else {
          console.log('We must change the add task component!')
          return false
        }
      })
      updatedProject.tasks = updatedTaske
      return dispatchProjects({type: 'UPDATE_PROJECT', payload: updatedProject })
    }
  };

  const renderSelectAssignee = (selected) => {
    return selected.map((s) => s).join(",");
  };

  const handleDateSelectChange = (event) => {
    const newSelectDate = event.target.value;
    setSelectDate(newSelectDate)
    dateFilter(newSelectDate, previousState)
  }
  
  const dateFilter = (selectDate, previousState) => {
    const currentDate = new Date();
    const updatedProject = {...previousState}

    const calculateStartDate = (daysAgo) => {
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - daysAgo)
      return startDate
    };

    if (selectDate.includes('All')) {
      return dispatchProjects({type: 'UPDATE_PROJECT', payload: previousState})
    } else {
     const myDay = calculateStartDate(
      selectDate.includes('Last day') ? 1
      : selectDate.includes('3 days ago') ? 3
      : selectDate.includes('One week ago') ? 7
      : 0
     );

      const updatedTasks = previousState.tasks.filter((t) => {
      const taskCeartionDate = new Date(t.creationDate);
      return taskCeartionDate >= myDay && taskCeartionDate <= currentDate;
    })

      updatedProject.tasks = updatedTasks
      return dispatchProjects({type: 'UPDATE_PROJECT', payload: updatedProject })
    }
  };

  const renderSelectDate = (selected) => {
    return selected
  };

  useEffect(() => {
    setPreviousState(projects.find(p => p._id === boardId))
    setSelectAssignee(['All']);
    setSelectDate('All');
  },[boardId])

  const assignee = {
    type: "Assignee",
    selected: ["All", ...users.map((u) => `${u.firstName} ${u.lastName}`)],
    value: "All",
  };

  const date = {
    type: "Date",
    selected: ["All", "Last day", "3 days ago", "One week ago"],
    value: "All",
  };

  return (
    <Grid
      sx={{ borderRadius: 3, m: 1.5, width: "100%" }}
      container
      direction="row"
      alignItems="flex-start"
      height={"10%"}
    >
      <Grid item xs={12} sm={6} lg={3} >
        <Typography variant="h6" sx={{ m: 1, color: "#FFF", width: "95%" }}>
          {assignee.type}
        </Typography>
        <Select
          multiple
          fullWidth
          value={selectAssignee}
          onChange={handleAssigneeSelectChange}
          renderValue={() => renderSelectAssignee(selectAssignee)}
          style={{
            background: "#121231",
            color: "#ffffff",
          }}
          IconComponent={() => (
            <InputAdornment position="end">
              <KeyboardArrowDownIcon sx={{ color: "#fff", m: 1 }} />
            </InputAdornment>
          )}
        >
          {assignee.selected.map((u, index) => (
            <MenuItem key={index} value={u}>
              {u}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6} lg={3} sx={{ml: 0.5}}>
        <Typography variant="h6" sx={{ m: 1, color: "#FFF", width: "95%" }}>
          {date.type}
        </Typography>
        <Select
          fullWidth
          value={selectDate}
          onChange={handleDateSelectChange}
          renderValue={() => renderSelectDate(selectDate)}
          style={{
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
