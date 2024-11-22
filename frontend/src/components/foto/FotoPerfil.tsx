import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface Props {
    name: string;
    imgUrl?: string;
}

export default function FotoPerfil({ name, imgUrl }: Props) {
    const names = name.split(' ');
    const [title, setTitle] = useState<string[]>([]);

    // Use useEffect to set the title when the component is mounted
    useEffect(() => {
        if (names.length > 2) {
            setTitle([names[0].charAt(0).toUpperCase(), names[1].charAt(0).toUpperCase()]);
        } else {
            setTitle([names[0].charAt(0).toUpperCase(), names[0].charAt(1).toUpperCase()]);
        }
    }, [name]); // Depend on name so it updates when 'name' changes

    return (
        <div className="flex items-center justify-center">
            {imgUrl ? (
                <div className="rounded-full overflow-hidden">
                    <img src={imgUrl} alt={'foto de perfil de ' + name} className="w-20 h-20 object-cover" />
                </div>
            ) : (
                <div className="rounded-full bg-gray-300 w-20 h-20 flex items-center justify-center">
                    <Typography variant="h5" sx={{ color: 'black' }}>
                        {title[0] + ' ' + title[1]}
                    </Typography>
                </div>
            )}
        </div>
    );
}
