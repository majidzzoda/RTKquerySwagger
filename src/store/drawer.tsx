import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { addImageIcon, cancelIcon, deleteIcon, infoIcon } from './storeIcon';
import { useAddImageMutation, useDeleteImageMutation, useInfoDataQuery } from '../api/todoApi';
import SwiperComponent from './swiper';

const DrawerComponent: React.FC = ({ id }) => {
    const [delImageFunc] = useDeleteImageMutation();
    const [fileSelected, setFileSelected] = useState(null);
    const [addImageFunc] = useAddImageMutation()
    let { data } = useInfoDataQuery(id)
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    function showAddImage(e) {
        e.preventDefault();
        if (!fileSelected) return;
        const formData = new FormData();
        formData.append("Images", fileSelected);
        addImageFunc({ id, newImage: formData }).then(() => setFileSelected(null));
    }
    return (
        <div>
            <span onClick={showDrawer}>{infoIcon}</span>
            <Drawer
                title="Info about user"
                open={open}
                style={{ "backgroundColor": "#111827", backdropFilter: "5px", color: "white" }}
            >
                <button className='absolute top-[15px]' onClick={onClose}>{cancelIcon}</button>
                <div className='flex flex-col lg:gap-[50px]'>
                    <div className='flex flex-col text-center items-center'>
                        <h1 className='text-[12px] font-bold text-gray-500'>{data?.data?.id}</h1>
                        <h1 className='text-[25px] font-bold text-blue-500'>{data?.data?.name}</h1>
                        <p className="max-w-[200px] text-gray-500 text-[18px] break-words">{data?.data?.description}</p>
                        <b className={data?.data?.isCompleted ? 'text-green-500' : 'text-red-500'}>{data?.data?.isCompleted ? "Active" : "Inactive"}</b>
                    </div>
                    <div>
                        <SwiperComponent>
                            {data?.data?.images.map((image) => {
                                return (
                                    <div key={image.id} className="flex flex-col items-center">
                                        <img className="rounded-[40px] border-[30px] border-gray-900 h-[350px] object-cover w-full" src={`http://37.27.29.18:8001/images/${image.imageName}`} alt="" />
                                        <button className='mt-[20px]' onClick={() => delImageFunc(image.id)}>{deleteIcon}</button>
                                    </div>
                                )
                            })}
                        </SwiperComponent>
                    </div>
                    <form action="" onSubmit={showAddImage}>
                        <label htmlFor="addImage">
                            <span className='absolute lg:top-[220px] lg:left-[235px] bg-blue-500 py-[5px] px-[10px] rounded-[5px] transition-all duration-300 cursor-pointer hover:opacity-50'>Add Image</span>
                            <input onChange={(e) => setFileSelected(e.target.files[0])} name='images' id='addImage' type="file" className='hidden' />
                        </label>
                        <button className={fileSelected ? 'bg-blue-500 absolute text-white py-[5px] px-[10px] rounded-[5px] transition-all duration-500 hover:scale-[110%] cursor-pointer' : 'hidden'} type='submit'>Save Image</button>
                    </form>
                </div>
            </Drawer>
        </div>
    );
};

export default DrawerComponent;