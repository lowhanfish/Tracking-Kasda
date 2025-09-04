import React from 'react'
import { ImageListItemBar, IconButton, ImageListItem, ImageList } from "@mui/material";
import { Search } from '@mui/icons-material';


function ListImage() {
    return (
        <div style={{ paddingRight: '20px', paddingLeft: '20px' }}>

            <ImageList sx={{ width: '100%', height: 357 }} cols={4} rowHeight={164}>

                {
                    [...Array(9)].map((_, index) => (
                        <ImageListItem key={index}>
                            <img
                                srcSet={`${'http://localhost:5173/src/assets/img/images/' + (index + 1) + '.png'}`}
                                src={`${'http://localhost:5173/src/assets/img/images/' + (index + 1) + '.png'}`}
                                alt={'Image Title'}
                                loading="lazy"
                            />

                            <ImageListItemBar
                                title={'Image Title 123456 78910 111213141516'}
                                sx={{
                                    '& .MuiImageListItemBar-title': {
                                        fontSize: '10px', // Ganti dengan ukuran yang Anda inginkan
                                    },
                                }}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${'Image Title'}`}
                                    >
                                        <Search />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>

                    ))
                }

            </ImageList>
        </div>
    )
}

export default ListImage
