import React, {ChangeEvent, FC, useState} from 'react';
import TextField from '@material-ui/core/TextField';

type EditableSpanPropsType = {
    title: string,
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    };
    return (
        editMode
        ? <TextField onChange={onChangeHandler} value={title} autoFocus onBlur={offEditMode} />
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};
