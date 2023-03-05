import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('')
        } else {
            setError('Title is required')
        }

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }


    return (
        <div>
            <TextField
                label={'Type value'}
                type='text'
                value={title}
                helperText={error}
                error={!!error}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler}
            />
            {/*<Button name={'+'} callBack={addTaskHandler}/>*/}
            <IconButton
                color={'primary'}
                onClick={addTaskHandler}>
                <ControlPoint />
            </IconButton>
        </div>
    );
};
