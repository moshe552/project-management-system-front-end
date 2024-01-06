import { Button, DialogActions, Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";

export default function DialogProfect(props) {
    return (
        <Dialog open={props.editDialogOpen} onClose={props.handleCloseEditDialog}>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogContent>
                <TextField
                    label="Project Name"
                    value={props.editingProject?.name || ""}
                    onChange={(e) => props.setEditingProject(prev => ({ ...prev, name: e.target.value }))}
                    fullWidth
                />
                <TextField
                    label="Description"
                    value={props.editingProject?.description || ""}
                    onChange={(e) => props.setEditingProject(prev => ({ ...prev, description: e.target.value }))}
                    fullWidth
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseEditDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleSaveEdit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
};

