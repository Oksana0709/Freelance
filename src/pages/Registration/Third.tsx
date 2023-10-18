import { useState } from 'react';
import './Registration.scss';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormValues, Props } from './index';

import ProfileType from './ProfileType';

const Third = ({ formValues, onChange }: Props) => {
    return (
        <>
            <ProfileType formValues={formValues} onChange={onChange} />
        </>
    );
};

export default Third;
